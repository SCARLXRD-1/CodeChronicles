import * as THREE from 'three';

/**
 * FogHaze
 * Bruma atmosférica que evoluciona en densidad según el progreso,
 * ayudando a la transición temporal entre épocas.
 * FASE 10: reutiliza una única instancia de FogExp2 (sin alocar por frame).
 */
export class FogHaze {
  private scene: THREE.Scene;
  private baseColor: THREE.Color;
  private fog: THREE.FogExp2;

  constructor(scene: THREE.Scene, color = 0x0a0b0d) {
    this.scene = scene;
    this.baseColor = new THREE.Color(color);
    this.fog = new THREE.FogExp2(this.baseColor, 0.012);
    this.scene.fog = this.fog;
  }

  setDensity(d: number, color?: number) {
    if (color !== undefined) this.baseColor.setHex(color);
    this.fog.density = THREE.MathUtils.clamp(d, 0, 0.09);
    this.fog.color.copy(this.baseColor);
  }

  getFog() {
    return this.fog;
  }

  update(_t: number, progress: number) {
    const density = 0.012 + Math.sin(progress * Math.PI) * 0.02;
    this.setDensity(density);
  }

  dispose() {
    this.scene.fog = null;
  }
}