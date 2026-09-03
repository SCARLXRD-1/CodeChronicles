import * as THREE from 'three';

/**
 * MoonGlow
 * Un resplandor cálido persistente que permanece fijo en el cielo durante todo
 * el viaje (brasa de código y luz ambiental persistente).
 * No pertenece a ninguna era: sobrevive a los cambios de escena y solo
 * desplaza ligeramente su matiz hacia el acento del capítulo activo.
 */
export class MoonGlow {
  readonly group = new THREE.Group();
  private readonly halo: THREE.Sprite;
  private readonly core: THREE.Sprite;
  private readonly haloMat: THREE.SpriteMaterial;
  private readonly coreMat: THREE.SpriteMaterial;
  private readonly targetColor = new THREE.Color(0xc9a24a);
  private readonly currentColor = new THREE.Color(0xc9a24a);

  constructor(scene: THREE.Scene, color = 0xc9a24a) {
    const haloTex = radialTexture(256, [
      { stop: 0, color: 'rgba(255,236,200,0.90)' },
      { stop: 0.25, color: 'rgba(233,199,138,0.35)' },
      { stop: 0.6, color: 'rgba(201,162,74,0.12)' },
      { stop: 1, color: 'rgba(201,162,74,0)' },
    ]);
    const coreTex = radialTexture(128, [
      { stop: 0, color: 'rgba(255,244,214,1)' },
      { stop: 0.4, color: 'rgba(255,225,170,0.55)' },
      { stop: 1, color: 'rgba(255,225,170,0)' },
    ]);

    this.haloMat = new THREE.SpriteMaterial({
      map: haloTex, transparent: true, depthWrite: false, depthTest: true,
      blending: THREE.AdditiveBlending, opacity: 0.6, color: this.currentColor,
    });
    this.halo = new THREE.Sprite(this.haloMat);
    this.halo.scale.set(14, 14, 1);
    this.halo.position.set(8, 7, -26);

    this.coreMat = new THREE.SpriteMaterial({
      map: coreTex, transparent: true, depthWrite: false, depthTest: true,
      blending: THREE.AdditiveBlending, opacity: 0.85,
    });
    this.core = new THREE.Sprite(this.coreMat);
    this.core.scale.set(3.4, 3.4, 1);
    this.core.position.set(8, 7, -26);

    this.group.add(this.halo, this.core);
    this.group.renderOrder = -10;
    scene.add(this.group);
    this.setAccent(color);
  }

  setAccent(color: number | string) {
    this.targetColor.set(color);
  }

  pulse(amount = 1) {
    this.coreMat.opacity = 0.6 + 0.25 * amount;
    this.haloMat.opacity = 0.45 + 0.18 * amount;
    this.core.scale.setScalar(3.4 + 0.5 * amount);
  }

  update(t: number) {
    const drift = Math.sin(t * 0.06) * 0.25;
    this.halo.position.x = 8 + drift;
    this.core.position.x = 8 + drift;
    this.core.position.y = 7 + Math.cos(t * 0.04) * 0.1;
    // transición de matiz hacia el acento del capítulo
    this.currentColor.lerp(this.targetColor, 0.02);
    this.haloMat.color.copy(this.currentColor);
  }

  dispose() {
    this.haloMat.map?.dispose();
    this.haloMat.dispose();
    this.coreMat.map?.dispose();
    this.coreMat.dispose();
    this.group.parent?.remove(this.group);
  }
}

function radialTexture(size: number, stops: { stop: number; color: string }[]) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const g = canvas.getContext('2d')!;
  const radius = size / 2;
  const grad = g.createRadialGradient(radius, radius, 0, radius, radius, radius);
  stops.forEach((s) => grad.addColorStop(s.stop, s.color));
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}