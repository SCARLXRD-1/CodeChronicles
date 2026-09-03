import * as THREE from 'three';

/**
 * TimeTunnel
 * Máquina del tiempo: túnel 3D envolvente con nervaduras temporales,
 * aros cilíndricos y destellos de aceleración relativista.
 */

const RING_PANELS = 12; // paneles por aro
const RINGS = 24; // número de aros
const RING_SPACING = 3.0; // separación en Z
const TUNNEL_RADIUS = 8.2;

export class TimeTunnel {
  readonly group = new THREE.Group();
  private ringMeshes: THREE.Group[] = [];
  private ringMats: THREE.MeshBasicMaterial[] = [];
  private ribLines!: THREE.LineSegments;
  private centerGlowMat!: THREE.MeshBasicMaterial;
  private active = false;
  private reduce: boolean;
  private readonly accent = new THREE.Color(0xc9a24a);
  private readonly currentTint = new THREE.Color(0xc9a24a);

  // movimiento por scroll
  private cursor = 0;
  private readonly scene: THREE.Scene;
  private ringCount = RINGS;

  constructor(scene: THREE.Scene, isMobile = false) {
    this.scene = scene;
    this.ringCount = isMobile ? 12 : RINGS;
    this.reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (this.reduce) return;

    const panelGeo = new THREE.PlaneGeometry(
      TUNNEL_RADIUS * 0.48,
      TUNNEL_RADIUS * 0.35,
    );
    const torusGeo = new THREE.TorusGeometry(TUNNEL_RADIUS, 0.06, 8, 36);

    for (let r = 0; r < this.ringCount; r++) {
      const ring = new THREE.Group();
      const ringColor = 0x6e5229;

      // Aro perimetral de latón/energía
      const ringRimMat = new THREE.MeshBasicMaterial({
        color: ringColor,
        transparent: true,
        opacity: 0.22,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const rim = new THREE.Mesh(torusGeo, ringRimMat);
      ring.add(rim);
      this.ringMats.push(ringRimMat);

      for (let p = 0; p < RING_PANELS; p++) {
        const angle = (p / RING_PANELS) * Math.PI * 2;
        const mat = new THREE.MeshBasicMaterial({
          color: ringColor,
          transparent: true,
          opacity: 0.14,
          side: THREE.DoubleSide,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });
        const panel = new THREE.Mesh(panelGeo, mat);
        const x = Math.cos(angle) * TUNNEL_RADIUS;
        const y = Math.sin(angle) * TUNNEL_RADIUS;
        panel.position.set(x, y, 0);
        panel.lookAt(0, 0, 0);
        ring.add(panel);
        this.ringMats.push(mat);
      }

      ring.position.z = -r * RING_SPACING - 4;
      ring.userData.baseZ = ring.position.z;
      this.group.add(ring);
      this.ringMeshes.push(ring);
    }

    // Nervaduras longitudinales que conectan los aros a lo largo del túnel
    const ribPositions: number[] = [];
    for (let p = 0; p < 8; p++) {
      const angle = (p / 8) * Math.PI * 2;
      const x = Math.cos(angle) * TUNNEL_RADIUS;
      const y = Math.sin(angle) * TUNNEL_RADIUS;
      ribPositions.push(x, y, 2, x, y, -RINGS * RING_SPACING);
    }
    const ribGeo = new THREE.BufferGeometry();
    ribGeo.setAttribute('position', new THREE.Float32BufferAttribute(ribPositions, 3));
    const ribMat = new THREE.LineBasicMaterial({
      color: 0xc9a24a,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
    });
    this.ribLines = new THREE.LineSegments(ribGeo, ribMat);
    this.group.add(this.ribLines);

    // Resplandor de la boca del túnel
    const glowTex = radialTexture(128, [
      [0, 'rgba(255,244,214,0.95)'],
      [0.3, 'rgba(233,199,138,0.4)'],
      [1, 'rgba(233,199,138,0)'],
    ]);
    this.centerGlowMat = new THREE.MeshBasicMaterial({
      map: glowTex,
      transparent: true,
      opacity: 0.2,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      color: this.currentTint,
    });
    const centerGlow = new THREE.Mesh(new THREE.PlaneGeometry(8, 8), this.centerGlowMat);
    centerGlow.position.set(0, 0, -2);
    this.group.add(centerGlow);

    this.tint(0xc9a24a);
    scene.add(this.group);
    this.active = true;
  }

  setAccent(color: string) {
    this.accent.set(color);
  }

  private tint(color: number) {
    if (!this.active) return;
    this.currentTint.set(color);
    for (const m of this.ringMats) m.color.copy(this.currentTint);
    this.centerGlowMat.color.copy(this.currentTint);
    if (this.ribLines) {
      (this.ribLines.material as THREE.LineBasicMaterial).color.copy(this.currentTint);
    }
  }

  update(snapProgress: number, speedVal: number, warp: number) {
    if (!this.active) return;

    const target = snapProgress * this.ringCount * RING_SPACING;
    this.cursor = this.cursor + (target - this.cursor) * Math.min(1, 0.15 + speedVal * 0.4);

    for (let i = 0; i < this.ringCount; i++) {
      const ring = this.ringMeshes[i];
      let z = ring.userData.baseZ + this.cursor;
      if (z > 6) {
        z -= this.ringCount * RING_SPACING;
        ring.userData.baseZ -= this.ringCount * RING_SPACING;
      }
      ring.position.z = z;
      ring.rotation.z += 0.003 * (1 + warp * 2.5 + speedVal * 2);

      // Atenuación en los extremos
      const fade = 1 - Math.min(1, Math.max(0, (6 - z) / 16));
      const targetOp = (0.12 * fade + 0.1) * (1 + warp * 0.8 + speedVal * 0.6);

      ring.children.forEach((c) => {
        const mesh = c as THREE.Mesh;
        const mat = mesh.material as THREE.MeshBasicMaterial;
        if (mat && !Array.isArray(mat)) {
          mat.opacity = Math.min(0.65, targetOp);
        }
      });

      if (i === 0) {
        this.centerGlowMat.opacity = Math.min(0.7, 0.18 + warp * 0.45 + speedVal * 0.2);
      }
    }

    this.currentTint.lerp(this.accent, 0.06);
    for (const m of this.ringMats) m.color.copy(this.currentTint);
    this.centerGlowMat.color.copy(this.currentTint);
    if (this.ribLines) {
      (this.ribLines.material as THREE.LineBasicMaterial).color.copy(this.currentTint);
      (this.ribLines.material as THREE.LineBasicMaterial).opacity = 0.18 + warp * 0.35;
    }
  }

  dispose() {
    if (!this.active) return;
    this.scene.remove(this.group);
    this.ringMats.forEach((m) => {
      m.map?.dispose();
      m.dispose();
    });
    this.centerGlowMat.map?.dispose();
    this.centerGlowMat.dispose();
    if (this.ribLines) {
      this.ribLines.geometry.dispose();
      (this.ribLines.material as THREE.Material).dispose();
    }
    this.group.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) (o as THREE.Mesh).geometry?.dispose();
    });
  }
}

function radialTexture(size: number, stops: [number, string][]) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const g = canvas.getContext('2d')!;
  const r = size / 2;
  const grad = g.createRadialGradient(r, r, 0, r, r, r);
  stops.forEach(([stop, color]) => grad.addColorStop(stop, color));
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}
