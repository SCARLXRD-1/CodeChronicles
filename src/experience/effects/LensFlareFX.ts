import * as THREE from 'three';

function makeRadialTexture(size: number, stops: { stop: number; color: string }[]): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  stops.forEach((s) => grad.addColorStop(s.stop, s.color));
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

function makeRingTexture(size: number, color: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 0.08;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size * 0.38, 0, Math.PI * 2);
  ctx.stroke();
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

interface FlareElement {
  sprite: THREE.Sprite;
  material: THREE.SpriteMaterial;
  distFactor: number;
  baseScale: number;
  baseOpacity: number;
}

export class LensFlareFX {
  readonly group = new THREE.Group();
  private elements: FlareElement[] = [];
  private readonly targetColor = new THREE.Color(0xc9a24a);
  private readonly currentColor = new THREE.Color(0xc9a24a);
  private readonly reduceMotion: boolean;
  private readonly isMobile: boolean;

  constructor(scene: THREE.Scene) {
    this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.isMobile =
      window.innerWidth < 768 ||
      /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

    if (this.reduceMotion || this.isMobile) return;

    // Crear texturas procedurales
    const glowTex = makeRadialTexture(128, [
      { stop: 0, color: 'rgba(255,255,255,0.95)' },
      { stop: 0.3, color: 'rgba(255,230,180,0.5)' },
      { stop: 0.7, color: 'rgba(200,160,80,0.15)' },
      { stop: 1, color: 'rgba(200,160,80,0)' },
    ]);

    const ringTex = makeRingTexture(128, 'rgba(230,200,140,0.4)');

    const discTex = makeRadialTexture(64, [
      { stop: 0, color: 'rgba(255,250,220,0.8)' },
      { stop: 0.6, color: 'rgba(210,180,100,0.3)' },
      { stop: 1, color: 'rgba(210,180,100,0)' },
    ]);

    const defs = [
      { tex: glowTex, dist: 0.0, scale: 3.6, opacity: 0.45 },
      { tex: ringTex, dist: 0.35, scale: 2.4, opacity: 0.22 },
      { tex: discTex, dist: 0.65, scale: 1.2, opacity: 0.20 },
      { tex: glowTex, dist: -0.3, scale: 2.2, opacity: 0.18 },
      { tex: discTex, dist: -0.75, scale: 1.5, opacity: 0.15 },
      { tex: ringTex, dist: -1.15, scale: 2.8, opacity: 0.14 },
    ];

    defs.forEach((d) => {
      const mat = new THREE.SpriteMaterial({
        map: d.tex,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        depthTest: false,
        color: this.currentColor,
      });
      const sprite = new THREE.Sprite(mat);
      this.group.add(sprite);
      this.elements.push({
        sprite,
        material: mat,
        distFactor: d.dist,
        baseScale: d.scale,
        baseOpacity: d.opacity,
      });
    });

    this.group.renderOrder = 20;
    scene.add(this.group);
  }

  setAccent(colorStr: string) {
    this.targetColor.set(colorStr);
  }

  update(camera: THREE.PerspectiveCamera, lightWorldPos: THREE.Vector3) {
    if (this.reduceMotion || this.isMobile || this.elements.length === 0) return;

    this.currentColor.lerp(this.targetColor, 0.03);

    // Proyectar coordenadas de la fuente de luz en el espacio de pantalla (NDC)
    const ndc = lightWorldPos.clone().project(camera);

    // Si la fuente está detrás de la cámara
    if (ndc.z > 1.0) {
      this.elements.forEach((el) => {
        el.material.opacity = 0;
      });
      return;
    }

    // Visibilidad según cercanía a los límites de pantalla
    const distFromCenter = Math.hypot(ndc.x, ndc.y);
    const visibility = Math.max(0, 1.0 - distFromCenter * 0.45);

    // El vector óptico va desde la luz pasando por el centro hacia el cuadrante opuesto
    const rayX = -ndc.x;
    const rayY = -ndc.y;

    this.elements.forEach((el) => {
      el.material.color.copy(this.currentColor);
      el.material.opacity = THREE.MathUtils.lerp(
        el.material.opacity,
        el.baseOpacity * visibility,
        0.15,
      );

      // Posición 3D interpolada en el frustum frente a la cámara (a z = -4 delante de cámara)
      const targetNdcX = ndc.x + rayX * el.distFactor;
      const targetNdcY = ndc.y + rayY * el.distFactor;

      const screenPos = new THREE.Vector3(targetNdcX, targetNdcY, -0.9);
      screenPos.unproject(camera);

      el.sprite.position.copy(screenPos);
      el.sprite.scale.setScalar(el.baseScale * (0.8 + visibility * 0.4));
    });
  }

  dispose() {
    this.elements.forEach((el) => {
      el.material.map?.dispose();
      el.material.dispose();
    });
    this.group.parent?.remove(this.group);
  }
}
