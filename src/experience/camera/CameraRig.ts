import * as THREE from 'three';
import type { ScrollSnapshot } from './ScrollDriver';

export interface CameraKey {
  position: THREE.Vector3;
  target: THREE.Vector3;
  fov?: number;
}

/**
 * CameraRig
 * Define una serie de keyframes (una por tramo de scroll).
 * Entre cada par realiza interpolación suave (smoothstep) para evitar
 * cortes y conseguir ese movimiento cinematográfico "slow" propio del plan.
 */
export class CameraRig {
  readonly keys: CameraKey[] = [];
  baseFov: number;

  constructor(
    private camera: THREE.PerspectiveCamera,
    keys: CameraKey[] = [],
    baseFov = 45,
  ) {
    this.baseFov = baseFov;
    this.camera.fov = baseFov;
    this.camera.updateProjectionMatrix();
    this.keys = keys;
  }

  setKeys(keys: CameraKey[]) {
    this.keys.length = 0;
    this.keys.push(...keys);
    this.applyTo(0);
  }

  private smoothstep(a: number, b: number, t: number) {
    const x = THREE.MathUtils.clamp(t, 0, 1);
    const s = x * x * (3 - 2 * x);
    return a + (b - a) * s;
  }

  applyTo(segment: number) {
    const count = this.keys.length;
    if (count === 0) return;
    const idx = Math.min(Math.floor(segment), count - 1);
    const next = Math.min(idx + 1, count - 1);
    const t = segment - idx;
    const a = this.keys[idx];
    const b = this.keys[next];

    this.camera.position.lerpVectors(a.position, b.position, this.smoothstep(0, 1, t));
    this.camera.lookAt(
      a.target.x + (b.target.x - a.target.x) * this.smoothstep(0, 1, t),
      a.target.y + (b.target.y - a.target.y) * this.smoothstep(0, 1, t),
      a.target.z + (b.target.z - a.target.z) * this.smoothstep(0, 1, t),
    );

    const portrait = this.camera.aspect < 1.0;
    // En móviles verticales (aspect ~ 0.5), expandir el FOV vertical para encuadrar los aros 3D completos
    const fovMultiplier = portrait ? Math.min(1.35, 0.72 / Math.max(0.42, this.camera.aspect)) : 1.0;
    const fovA = (a.fov ?? this.baseFov) * fovMultiplier;
    const fovB = (b.fov ?? this.baseFov) * fovMultiplier;
    const fov = this.smoothstep(fovA, fovB, t);
    if (Math.abs(this.camera.fov - fov) > 0.01) {
      this.camera.fov = fov;
      this.camera.updateProjectionMatrix();
    }
  }

  update(snap: ScrollSnapshot) {
    this.applyTo(snap.section + snap.sectionProgress);
  }

  dispose() {}
}