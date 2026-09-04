import * as THREE from 'three';

interface StarLayer {
  points: THREE.Points;
  geometry: THREE.BufferGeometry;
  material: THREE.PointsMaterial;
  baseY: Float32Array;
  speedFactor: number;
  mouseFactor: number;
  depth: number;
}

export class StarfieldParallax {
  readonly group = new THREE.Group();
  private layers: StarLayer[] = [];
  private readonly targetAccent = new THREE.Color(0xc9a24a);
  private readonly currentAccent = new THREE.Color(0xc9a24a);
  private readonly reduceMotion: boolean;

  constructor(scene: THREE.Scene, mobile = false) {
    this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const layerDefs = mobile
      ? [{ count: 240, size: 0.05, speed: 3.0, mouse: 0.15, depth: -85 }]
      : [
          { count: 180, size: 0.075, speed: 6.5, mouse: 0.35, depth: -65 },
          { count: 360, size: 0.045, speed: 3.5, mouse: 0.2, depth: -110 },
          { count: 650, size: 0.028, speed: 1.5, mouse: 0.08, depth: -160 },
        ];

    layerDefs.forEach((def) => {
      const geo = new THREE.BufferGeometry();
      const positions = new Float32Array(def.count * 3);
      const colors = new Float32Array(def.count * 3);
      const baseY = new Float32Array(def.count);

      const spreadX = 75;
      const spreadY = 90;

      for (let i = 0; i < def.count; i++) {
        const x = (Math.random() - 0.5) * spreadX;
        const y = (Math.random() - 0.5) * spreadY;
        const z = def.depth + (Math.random() - 0.5) * 15;

        positions[i * 3 + 0] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
        baseY[i] = y;

        // 85% estrellas blancas/celestes neutras, 15% con matiz de acento histórico
        if (Math.random() > 0.15) {
          const lum = 0.5 + Math.random() * 0.5;
          colors[i * 3 + 0] = lum * 0.92;
          colors[i * 3 + 1] = lum * 0.95;
          colors[i * 3 + 2] = lum * 1.0;
        } else {
          colors[i * 3 + 0] = this.currentAccent.r;
          colors[i * 3 + 1] = this.currentAccent.g;
          colors[i * 3 + 2] = this.currentAccent.b;
        }
      }

      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const mat = new THREE.PointsMaterial({
        size: def.size,
        vertexColors: true,
        transparent: true,
        opacity: 0.78,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      const pts = new THREE.Points(geo, mat);
      this.group.add(pts);

      this.layers.push({
        points: pts,
        geometry: geo,
        material: mat,
        baseY,
        speedFactor: def.speed,
        mouseFactor: def.mouse,
        depth: def.depth,
      });
    });

    this.group.renderOrder = -15;
    scene.add(this.group);
  }

  setAccent(colorStr: string) {
    this.targetAccent.set(colorStr);
  }

  update(t: number, progress: number, mouseSm: { x: number; y: number }, speedVal: number) {
    if (this.reduceMotion) return;
    this.currentAccent.lerp(this.targetAccent, 0.03);

    this.layers.forEach((layer) => {
      const colAttr = layer.geometry.getAttribute('color') as THREE.BufferAttribute;
      const colors = colAttr.array as Float32Array;


      // Parallax horizontal y vertical por capa y desplazamiento del ratón
      const scrollOffsetX = progress * layer.speedFactor * 24;
      const mouseX = mouseSm.x * layer.mouseFactor * 2.5;
      const mouseY = mouseSm.y * layer.mouseFactor * 2.0;

      layer.points.position.x = -scrollOffsetX + mouseX;
      layer.points.position.y = mouseY;
      layer.points.scale.x = 1 + Math.min(2.2, speedVal * 1.6);

      // Centelleo sutil en las estrellas con velocidad de viaje
      layer.material.opacity = 0.65 + Math.sin(t * 1.8 + layer.depth) * 0.15 + Math.min(0.2, speedVal * 0.25);

      // Actualizar color de las estrellas acentuadas suavemente
      for (let i = 0; i < layer.baseY.length; i++) {
        if (colors[i * 3 + 0] !== colors[i * 3 + 1] || colors[i * 3 + 1] !== colors[i * 3 + 2]) {
          colors[i * 3 + 0] = THREE.MathUtils.lerp(colors[i * 3 + 0], this.currentAccent.r, 0.03);
          colors[i * 3 + 1] = THREE.MathUtils.lerp(colors[i * 3 + 1], this.currentAccent.g, 0.03);
          colors[i * 3 + 2] = THREE.MathUtils.lerp(colors[i * 3 + 2], this.currentAccent.b, 0.03);
        }
      }
      colAttr.needsUpdate = true;
    });
  }

  dispose() {
    this.layers.forEach((layer) => {
      layer.geometry.dispose();
      layer.material.dispose();
    });
    this.group.parent?.remove(this.group);
  }
}
