import * as THREE from 'three';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

export interface BloomFXOptions {
  baseStrength?: number;
  maxStrength?: number;
  radius?: number;
  threshold?: number;
}

/**
 * BloomFX
 * Halo de resplandor cinematográfico con UnrealBloomPass.
 * El resplandor se expande e intensifica dinámicamente con la velocidad de viaje temporal.
 */
export class BloomFX {
  public readonly pass: UnrealBloomPass;
  private readonly baseStrength: number;
  private readonly maxStrength: number;
  private currentStrength: number;
  private readonly reduceMotion: boolean;

  constructor(options: BloomFXOptions = {}) {
    const {
      baseStrength = 0.28,
      maxStrength = 0.65,
      radius = 0.42,
      threshold = 0.48,
    } = options;

    this.baseStrength = baseStrength;
    this.maxStrength = maxStrength;
    this.currentStrength = baseStrength;
    this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const res = new THREE.Vector2(window.innerWidth, window.innerHeight);
    this.pass = new UnrealBloomPass(res, baseStrength, radius, threshold);

    if (this.reduceMotion) {
      this.pass.strength = 0.2;
      this.pass.enabled = false;
    }
  }

  update(speedVal: number) {
    if (this.reduceMotion || !this.pass.enabled) return;
    const target = this.baseStrength + Math.min(this.maxStrength - this.baseStrength, speedVal * 0.7);
    this.currentStrength = THREE.MathUtils.lerp(this.currentStrength, target, 0.15);
    this.pass.strength = this.currentStrength;
  }

  dispose() {
    this.pass.dispose();
  }
}
