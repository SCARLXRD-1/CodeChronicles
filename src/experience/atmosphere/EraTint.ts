import * as THREE from 'three';

/**
 * EraTint
 * Corrección de color "cinemática": tiñe el fondo, la niebla y las luces
 * hacia el acento del capítulo activo de forma muy sutil (color grading),
 * con pulsos de densidad de niebla que suben con la velocidad de scroll.
 * Complementa al TimeTunnel: mientras el túnel sugiere viaje, aquí el
 * "clima de color" cambia de época en época.
 */
export class EraTint {
  private readonly scene: THREE.Scene;
  private readonly fog: THREE.FogExp2;
  private readonly bgBase = new THREE.Color(0x05070a);
  private readonly accent = new THREE.Color(0x0a0e12);
  private readonly current = new THREE.Color(0x0a0e12);
  private reduce: boolean;

  constructor(scene: THREE.Scene, fog: THREE.FogExp2) {
    this.scene = scene;
    this.fog = fog;
    this.reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.current.copy(this.bgBase);
  }

  setAccent(color: string) {
    this.accent.set(color);
  }

  setDensity(d: number) {
    this.fog.density = THREE.MathUtils.clamp(d, 0.008, 0.09);
  }

  /**
   * @param colorFactor 0..1 cuánto se tiñe hacia el acento (según scroll)
   * @param speedVal    velocidad amortiguada 0..~1 (intensifica niebla/luz)
   */
  update(colorFactor: number, speedVal: number) {
    if (this.reduce) return;
    // mezcla base negra con un tinte del acento
    const tinted = this.bgBase.clone().lerp(this.accent, 0.12 * colorFactor);
    this.current.lerp(tinted, 0.04);
    (this.scene.background as THREE.Color).copy(this.current);
    this.fog.color.copy(this.current);
    // niebla se intensifica al acelerar (sensación de velocidad)
    const density = 0.014 + speedVal * 0.05;
    this.setDensity(THREE.MathUtils.clamp(density, 0.012, 0.09));
  }

  dispose() {}
}
