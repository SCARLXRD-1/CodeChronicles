import * as THREE from 'three';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js';

export class DepthOfFieldFX {
  public readonly pass: BokehPass;
  private readonly reduceMotion: boolean;
  private isMobile: boolean;

  constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
    this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.isMobile =
      window.innerWidth < 768 ||
      /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

    this.pass = new BokehPass(scene, camera, {
      focus: 8.0,
      aperture: 0.0002,
      maxblur: 0.001,
    });

    // Desactivar inicialmente en reposo para preservar 60fps
    this.pass.enabled = false;
  }

  update(speedVal: number) {
    if (this.reduceMotion || this.isMobile) {
      if (this.pass.enabled) this.pass.enabled = false;
      return;
    }

    if (speedVal > 0.06) {
      this.pass.enabled = true;
      const uniforms = (this.pass as any).uniforms;
      if (uniforms) {
        const factor = Math.min(1.0, (speedVal - 0.06) * 1.8);
        uniforms.aperture.value = THREE.MathUtils.lerp(0.0002, 0.012, factor);
        uniforms.maxblur.value = THREE.MathUtils.lerp(0.0005, 0.0075, factor);
      }
    } else {
      if (this.pass.enabled) this.pass.enabled = false;
    }
  }

  dispose() {
    this.pass.dispose();
  }
}
