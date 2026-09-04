import * as THREE from 'three';

const NebulaShader = {
  uniforms: {
    uTime: { value: 0 },
    uColorPrimary: { value: new THREE.Color(0x203548) },
    uColorSecondary: { value: new THREE.Color(0x0c1520) },
    uDensity: { value: 0.35 },
    uProgress: { value: 0 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform float uTime;
    uniform vec3 uColorPrimary;
    uniform vec3 uColorSecondary;
    uniform float uDensity;
    uniform float uProgress;
    varying vec2 vUv;

    // Simplex Noise 2D
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    float fbm(vec2 p) {
      float total = 0.0;
      float amp = 0.55;
      for (int i = 0; i < 3; i++) {
        total += amp * snoise(p);
        p *= 2.05;
        amp *= 0.48;
      }
      return total;
    }

    void main() {
      vec2 uv = (vUv - 0.5) * 2.2;
      float t = uTime * 0.035;

      // Desplazamiento orgánico con el flujo temporal
      vec2 p = uv * 1.35 + vec2(sin(t * 0.5), cos(t * 0.4)) * 0.35;
      p.y += uProgress * 0.8;

      float n1 = fbm(p + vec2(t * 0.3, t * 0.2));
      float n2 = fbm(p * 1.5 - vec2(t * 0.2, -t * 0.3));
      float clouds = smoothstep(-0.2, 0.85, n1 * 0.65 + n2 * 0.35);

      // Desvanecimiento perimetral suave
      float vignette = 1.0 - smoothstep(0.35, 1.35, length(uv));
      float alpha = clouds * vignette * uDensity;

      vec3 col = mix(uColorSecondary, uColorPrimary, clamp(n1 * 0.8 + 0.3, 0.0, 1.0));
      gl_FragColor = vec4(col, alpha);
    }
  `,
};

export class EraNebula {
  readonly mesh: THREE.Mesh;
  private readonly material: THREE.ShaderMaterial;
  private readonly targetPrimary = new THREE.Color(0x15222e);
  private readonly targetSecondary = new THREE.Color(0x060b11);
  private readonly currentPrimary = new THREE.Color(0x15222e);
  private readonly currentSecondary = new THREE.Color(0x060b11);
  private readonly reduceMotion: boolean;

  constructor(scene: THREE.Scene, mobile = false) {
    this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const geometry = new THREE.PlaneGeometry(160, 110);
    this.material = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(NebulaShader.uniforms),
      vertexShader: NebulaShader.vertexShader,
      fragmentShader: NebulaShader.fragmentShader,
      transparent: true,
      depthWrite: false,
      depthTest: true,
      blending: THREE.AdditiveBlending,
    });

    this.mesh = new THREE.Mesh(geometry, this.material);
    this.mesh.position.set(0, 0, -48);
    this.mesh.renderOrder = -20;
    scene.add(this.mesh);

    if (mobile) {
      this.material.uniforms.uDensity.value = 0.10;
    }
  }

  setAccent(colorStr: string) {
    const main = new THREE.Color(colorStr);
    // Color primario: versión muy sutil y profunda del acento (evita sobreexponer)
    this.targetPrimary.copy(main).multiplyScalar(0.09);
    // Color secundario: sombra cósmica armónica casi negra
    this.targetSecondary.copy(main).multiplyScalar(0.015);
  }

  update(t: number, progress: number, speedVal: number) {
    if (this.reduceMotion) return;

    this.currentPrimary.lerp(this.targetPrimary, 0.035);
    this.currentSecondary.lerp(this.targetSecondary, 0.035);

    const uniforms = this.material.uniforms;
    uniforms.uTime.value = t;
    uniforms.uProgress.value = progress;
    uniforms.uColorPrimary.value.copy(this.currentPrimary);
    uniforms.uColorSecondary.value.copy(this.currentSecondary);

    // Densidad sutil que acompaña el viaje sin lavar el vacío espacial
    const baseDensity = 0.14;
    uniforms.uDensity.value = THREE.MathUtils.lerp(
      uniforms.uDensity.value,
      baseDensity + Math.min(0.08, speedVal * 0.12),
      0.12,
    );
  }

  dispose() {
    this.mesh.geometry.dispose();
    this.material.dispose();
    this.mesh.parent?.remove(this.mesh);
  }
}
