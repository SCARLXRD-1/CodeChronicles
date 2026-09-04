import * as THREE from 'three';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

const ShockwaveShader = {
  name: 'ShockwaveShader',
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 1.0 }, // 1.0 = inactivo
    uCenter: { value: new THREE.Vector2(0.5, 0.5) },
    uWaveWidth: { value: 0.12 },
    uMaxRadius: { value: 1.15 },
    uAmplitude: { value: 0.045 },
    uAccent: { value: new THREE.Color(0xc9a24a) },
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
    uniform float uTime;
    uniform vec2 uCenter;
    uniform float uWaveWidth;
    uniform float uMaxRadius;
    uniform float uAmplitude;
    uniform vec3 uAccent;
    varying vec2 vUv;

    void main() {
      if (uTime >= 1.0) {
        gl_FragColor = texture2D(tDiffuse, vUv);
        return;
      }

      vec2 dir = vUv - uCenter;
      float dist = length(dir);
      float currentRadius = uTime * uMaxRadius;
      float diff = abs(dist - currentRadius);

      if (diff < uWaveWidth && dist > 0.001) {
        float strength = sin((1.0 - diff / uWaveWidth) * 3.14159265);
        float decay = (1.0 - uTime) * (1.0 - uTime);
        vec2 normDir = normalize(dir);
        vec2 uvOffset = normDir * (strength * uAmplitude * decay);

        vec4 color = texture2D(tDiffuse, vUv - uvOffset);
        // Sutil destello armónico del acento en la cresta de la onda
        color.rgb += uAccent * (strength * decay * 0.22);
        gl_FragColor = color;
      } else {
        gl_FragColor = texture2D(tDiffuse, vUv);
      }
    }
  `,
};

export class ShockwaveFX {
  public readonly pass: ShaderPass;
  private readonly reduceMotion: boolean;
  private active = false;

  constructor() {
    this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.pass = new ShaderPass(ShockwaveShader);
    this.pass.enabled = false;
  }

  trigger(accentColor?: string | number) {
    if (this.reduceMotion) return;
    if (accentColor !== undefined) {
      this.pass.uniforms.uAccent.value.set(accentColor);
    }
    this.pass.uniforms.uTime.value = 0.0;
    this.pass.enabled = true;
    this.active = true;
  }

  update(dt: number) {
    if (this.reduceMotion || !this.active) return;
    const time = this.pass.uniforms.uTime.value + dt * 1.35;
    if (time >= 1.0) {
      this.pass.uniforms.uTime.value = 1.0;
      this.pass.enabled = false;
      this.active = false;
    } else {
      this.pass.uniforms.uTime.value = time;
    }
  }

  dispose() {
    this.pass.dispose();
  }
}
