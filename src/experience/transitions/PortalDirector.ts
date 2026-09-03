import * as THREE from 'three';

/**
 * PortalDirector
 * Transición 3D entre épocas: en lugar del "sweep" plano, un anillo 3D que
 * aparece y se gira/expande cruzando la escena, como una "boca de portal"
 * temporal a través de la que se pasa al siguiente capítulo.
 * Se funde con el TimeTunnel (impulso) y el tilt temporal de la cámara.
 */
export class PortalDirector {
  private ring?: THREE.Mesh;
  private ringMat!: THREE.MeshBasicMaterial;
  private discMat!: THREE.MeshBasicMaterial;
  private disc?: THREE.Mesh;
  private active = false;
  private triggerSection = -1;
  private progress = 1; // 1 = inactivo
  private readonly scene: THREE.Scene;
  private accent = new THREE.Color(0xc9a24a);
  private reduce: boolean;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.ringMat = new THREE.MeshBasicMaterial({
      color: this.accent,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    this.discMat = new THREE.MeshBasicMaterial({
      color: this.accent,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }

  setAccent(color: string) {
    this.accent.set(color);
  }

  update(snap: { section: number }) {
    if (this.reduce) return;
    if (this.triggerSection !== snap.section) {
      this.triggerSection = snap.section;
      if (!this.active) this.begin();
    }
    if (!this.active) return;

    this.progress += 0.045;
    this.progress = Math.min(1, this.progress);

    const t = this.progress;
    if (this.ring && this.disc) {
      // el anillo avanza hacia la cámara mientras gira y se expande
      this.ring.position.z = 6 - t * 16;
      this.ring.rotation.z += 0.06;
      this.ring.rotation.x = Math.PI / 2 + (0.15 * Math.sin(t * Math.PI * 2));
      const scale = 0.2 + t * 1.4;
      this.ring.scale.setScalar(scale);

      // opacidad: aparece, brilla en el centro, se desvanece
      const env = (1 - Math.sin(Math.PI * t)) * 0.9; // 0->1->0
      this.ringMat.opacity = Math.max(0, Math.min(0.7, env * 0.6));
      this.discMat.opacity = Math.max(0, env * 0.35);
      this.ringMat.color.copy(this.accent);
      this.discMat.color.copy(this.accent);

      this.disc.position.z = this.ring.position.z;
      this.disc.scale.setScalar(scale * 0.6);
    }

    if (this.progress >= 1) {
      this.end();
    }
  }

  private begin() {
    this.active = true;
    this.progress = 0;
    if (!this.ring) {
      const geo = new THREE.TorusGeometry(2.4, 0.12, 8, 90);
      this.ring = new THREE.Mesh(geo, this.ringMat);
      const discGeo = new THREE.RingGeometry(0.2, 2.2, 64);
      this.disc = new THREE.Mesh(discGeo, this.discMat);
      this.scene.add(this.ring, this.disc);
    }
    this.ring.position.set(0, 0, 6);
    this.ring.scale.setScalar(0.2);
  }

  private end() {
    this.active = false;
    if (this.ring) this.ring.visible = false;
    if (this.disc) this.disc.visible = false;
  }

  isActive() {
    return this.active;
  }

  dispose() {
    this.scene.remove(this.ring!, this.disc!);
    this.ringMat.dispose();
    this.discMat.dispose();
    this.ring?.geometry?.dispose();
    this.disc?.geometry?.dispose();
  }
}
