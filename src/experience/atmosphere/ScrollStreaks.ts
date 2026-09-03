import * as THREE from 'three';

/**
 * ScrollStreaks
 * Líneas de velocidad / estelas que cruzan el encuadre al hacer scroll rápido,
 * reforzando la sensación de "máquina del tiempo". Se atenúan con la velocidad.
 * Implementadas con un único BufferGeometry de puntos alargados (Points con
 * un mapa de "stretch" orientado), o mejor: segmentos 3D cortos que se
 * desplazan hacia +Z según la velocidad.
 */
export class ScrollStreaks {
  readonly points: THREE.Points;
  private readonly geometry: THREE.BufferGeometry;
  private readonly material: THREE.PointsMaterial;
  private readonly count: number;
  private readonly reduce: boolean;
  private readonly scene: THREE.Scene;
  private opacities: Float32Array;

  constructor(scene: THREE.Scene, count = 480) {
    this.scene = scene;
    this.reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.count = count;
    this.geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    this.opacities = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 32;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 2] = -Math.random() * 30;
      this.opacities[i] = 0.2;
    }
    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.geometry.setAttribute('aOpacity', new THREE.BufferAttribute(this.opacities, 1));

    // mapa de punto alargado (streak de velocidad relativista)
    const streakTex = streakTexture(128, 8);

    this.material = new THREE.PointsMaterial({
      color: 0xc9a24a,
      size: 0.65,
      map: streakTex,
      transparent: true,
      opacity: 0.25,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    this.points = new THREE.Points(this.geometry, this.material);
    this.points.visible = !this.reduce;
    scene.add(this.points);
  }

  setAccent(color: string) {
    this.material.color.set(color);
  }

  /**
   * @param speedVal velocidad amortiguada 0..~1
   */
  update(speedVal: number) {
    if (this.reduce) {
      this.points.visible = false;
      return;
    }
    this.points.visible = true;

    // Brillo y estiramiento hiper-espacial con la velocidad
    this.material.opacity = Math.min(0.95, 0.2 + speedVal * 1.5);
    this.material.size = 0.55 + speedVal * 1.1;

    const pos = this.geometry.getAttribute('position') as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    const moveStep = 0.04 + speedVal * 1.85;

    for (let i = 0; i < this.count; i++) {
      arr[i * 3 + 2] += moveStep; // viajan hacia la cámara (+Z)
      if (arr[i * 3 + 2] > 6) {
        arr[i * 3 + 2] = -26 - Math.random() * 8;
        arr[i * 3 + 0] = (Math.random() - 0.5) * 32;
        arr[i * 3 + 1] = (Math.random() - 0.5) * 18;
      }
      this.opacities[i] = Math.min(1, 0.25 + speedVal * 0.75);
    }
    (this.geometry.getAttribute('aOpacity') as THREE.BufferAttribute).needsUpdate = true;
    pos.needsUpdate = true;
  }

  dispose() {
    this.material.map?.dispose();
    this.material.dispose();
    this.geometry.dispose();
    this.scene.remove(this.points);
  }
}

function streakTexture(w: number, h: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const g = canvas.getContext('2d')!;
  const grad = g.createLinearGradient(0, 0, w, 0);
  grad.addColorStop(0, 'rgba(255,255,255,0)');
  grad.addColorStop(0.3, 'rgba(255,255,255,0.6)');
  grad.addColorStop(1, 'rgba(255,255,255,1)');
  g.fillStyle = grad;
  g.fillRect(0, 0, w, h);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}
