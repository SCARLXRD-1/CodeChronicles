import * as THREE from 'three';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

const ChromaticAberrationShader = {
  name: 'ChromaticAberrationShader',
  uniforms: {
    tDiffuse: { value: null },
    uOffset: { value: 0.0 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float uOffset;
    varying vec2 vUv;

    void main() {
      if (uOffset <= 0.0001) {
        gl_FragColor = texture2D(tDiffuse, vUv);
        return;
      }

      vec2 dir = vUv - vec2(0.5);
      float dist = length(dir);
      vec2 shift = normalize(dir) * (dist * dist * uOffset);

      float r = texture2D(tDiffuse, vUv + shift).r;
      float g = texture2D(tDiffuse, vUv).g;
      float b = texture2D(tDiffuse, vUv - shift).b;
      float a = texture2D(tDiffuse, vUv).a;

      gl_FragColor = vec4(r, g, b, a);
    }
  `,
};

export class ChromaticAberrationFX {
  public readonly pass: ShaderPass;
  private currentOffset = 0;
  private readonly reduceMotion: boolean;

  constructor() {
    this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.pass = new ShaderPass(ChromaticAberrationShader);
    this.pass.enabled = !this.reduceMotion;
  }

  update(speedVal: number, warpSmooth: number) {
    if (this.reduceMotion) return;
    const target = Math.min(0.022, speedVal * 0.018 + warpSmooth * 0.012);
    this.currentOffset = THREE.MathUtils.lerp(this.currentOffset, target, 0.18);
    this.pass.uniforms.uOffset.value = this.currentOffset;
  }

  dispose() {
    this.pass.dispose();
  }
}
