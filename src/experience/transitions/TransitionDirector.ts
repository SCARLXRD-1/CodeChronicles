import * as THREE from 'three';

/**
 * TransitionDirector
 * Gestiona las transiciones entre épocas dentro del mundo 3D.
 * Aplica un "sweep" cinematográfico: una puerta de luz/fragmentos que
 * cruza la escena cuando se detecta un cambio de sección.
 */
export class TransitionDirector {
  private sweep?: THREE.Mesh;
  private sweepMat?: THREE.MeshBasicMaterial;
  private active = false;
  private triggerSection = -1;
  private progress = 1;
  private readonly scene: THREE.Scene;

  /** Color que acompaña cada transición (por capítulo). */
  private accent = new THREE.Color(0xe8e6e1);
  private readonly baseZ = 6;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  setAccent(color: string) {
    this.accent.set(color);
  }

  /**
   * Llamar en cada frame con el snapshot.
   * Cuando se detecta un cambio de sección, dispara un sweep.
   */
  update(snap: { section: number }) {
    if (this.triggerSection !== snap.section) {
      this.triggerSection = snap.section;
      this.begin();
    }

    if (!this.active) return;

    this.progress += 0.05;
    this.progress = Math.min(1, this.progress);

    if (this.sweep && this.sweepMat) {
      const t = this.progress;
      this.sweep.position.z = this.baseZ - t * 22;
      this.sweepMat.opacity = t < 0.15 ? t * 2.4 : 0.4 * (1 - (t - 0.15) / 0.85);
      this.sweepMat.color.copy(this.accent).multiplyScalar(t < 0.15 ? 1 : 1 - (t - 0.15) / 0.85);
    }

    if (this.progress >= 1) {
      this.end();
    }
  }

  private begin() {
    this.active = true;
    this.progress = 0;
    if (!this.sweep) {
      this.sweepMat = new THREE.MeshBasicMaterial({
        color: this.accent,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      this.sweep = new THREE.Mesh(new THREE.PlaneGeometry(60, 40), this.sweepMat);
      this.sweep.position.z = this.baseZ;
      this.scene.add(this.sweep);
    } else {
      this.sweepMat!.color.copy(this.accent);
    }
  }

  private end() {
    this.active = false;
    if (this.sweep) this.scene.remove(this.sweep);
  }

  isActive() {
    return this.active;
  }

  dispose() {
    if (this.sweep) this.scene.remove(this.sweep);
    this.sweepMat?.dispose();
    this.sweep?.geometry?.dispose();
  }
}