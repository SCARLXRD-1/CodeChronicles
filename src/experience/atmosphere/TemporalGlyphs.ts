import * as THREE from 'three';

/**
 * TemporalGlyphs
 * Glifos históricos y fragmentos de código que flotan en el espacio 3D
 * a lo largo del túnel del tiempo (tarjetas perforadas, bits binarios,
 * mnemónicos históricos de Ada, Turing y Unix).
 */

const GLYPH_COUNT = 45;
const TUNNEL_DEPTH = 60;

export class TemporalGlyphs {
  readonly group = new THREE.Group();
  private scene: THREE.Scene;
  private meshes: THREE.Mesh[] = [];
  private materials: THREE.MeshBasicMaterial[] = [];
  private initialZ: number[] = [];
  private reduce: boolean;
  private targetColor = new THREE.Color(0xc9a24a);
  private currentColor = new THREE.Color(0xc9a24a);
  private glyphCount = GLYPH_COUNT;

  constructor(scene: THREE.Scene, isMobile = false) {
    this.scene = scene;
    this.glyphCount = isMobile ? 22 : GLYPH_COUNT;
    this.reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.createGlyphs();
    this.scene.add(this.group);
  }

  private createGlyphs() {
    const textures = this.buildGlyphTextures();
    const planeGeo = new THREE.PlaneGeometry(1.6, 1.0);

    for (let i = 0; i < this.glyphCount; i++) {
      const tex = textures[i % textures.length];
      const mat = new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        color: this.currentColor,
      });

      const mesh = new THREE.Mesh(planeGeo, mat);

      // Distribuir en un cilindro alrededor de la línea de visión
      const angle = (i / this.glyphCount) * Math.PI * 2 * 3.5 + Math.random() * 0.4;
      const radius = 2.8 + Math.random() * 3.8;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius * 0.75;
      const z = -4 - (i / this.glyphCount) * TUNNEL_DEPTH;

      mesh.position.set(x, y, z);
      mesh.rotation.z = (Math.random() - 0.5) * 0.4;
      mesh.rotation.y = (Math.random() - 0.5) * 0.5;

      mesh.userData = {
        baseX: x,
        baseY: y,
        baseZ: z,
        rotSpeed: (Math.random() - 0.5) * 0.4,
        driftSpeed: 0.1 + Math.random() * 0.2,
      };

      this.group.add(mesh);
      this.meshes.push(mesh);
      this.materials.push(mat);
      this.initialZ.push(z);
    }
  }

  private buildGlyphTextures(): THREE.CanvasTexture[] {
    const items = [
      // Tarjeta perforada clásica
      { type: 'punchcard' },
      { type: 'text', text: '1843 · Babbage', sub: 'Bernoulli No.' },
      { type: 'text', text: '01000001 01000100', sub: 'ASCII: A D' },
      { type: 'text', text: 'TURING · 1936', sub: 'Universal Machine' },
      { type: 'text', text: 'MOV AX, 0x01', sub: 'Assembly' },
      { type: 'text', text: 'λx.(x x)', sub: 'Church Lambda' },
      { type: 'text', text: 'FORTRAN IV · 1962', sub: 'DO 10 I=1,N' },
      { type: 'text', text: 'printf("hello\\n");', sub: 'C · Ritchie' },
      { type: 'text', text: '01100011 01101111', sub: 'Bits: C O' },
      { type: 'text', text: 'GOTO 100', sub: 'Line Index' },
      { type: 'text', text: '1969 · UNIX', sub: 'Epoch 0' },
      { type: 'text', text: 'diff(t, dt)', sub: 'Chrono Stream' },
    ];

    return items.map((item) => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 160;
      const ctx = canvas.getContext('2d')!;

      // Borde y marco tipo fósforo / pergamino digital
      ctx.fillStyle = 'rgba(6, 9, 13, 0.85)';
      ctx.fillRect(0, 0, 256, 160);

      ctx.strokeStyle = 'rgba(217, 227, 220, 0.4)';
      ctx.lineWidth = 2;
      ctx.strokeRect(4, 4, 248, 152);

      if (item.type === 'punchcard') {
        // Patrón de agujeros de tarjeta perforada
        ctx.fillStyle = 'rgba(255, 235, 190, 0.8)';
        for (let r = 0; r < 5; r++) {
          for (let c = 0; c < 12; c++) {
            if ((r * 7 + c * 3) % 4 === 0) {
              ctx.fillRect(20 + c * 18, 25 + r * 22, 10, 15);
            }
          }
        }
        ctx.fillStyle = 'rgba(160, 175, 168, 0.7)';
        ctx.font = 'bold 11px monospace';
        ctx.fillText('JACQUARD / IBM CARD', 20, 142);
      } else {
        // Texto histórico o de código
        ctx.fillStyle = 'rgba(255, 245, 220, 0.95)';
        ctx.font = 'bold 15px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(item.text ?? '', 128, 70);

        ctx.fillStyle = 'rgba(201, 162, 74, 0.85)';
        ctx.font = '12px monospace';
        ctx.fillText(item.sub ?? '', 128, 102);

        // Barra inferior de progreso temporal
        ctx.fillStyle = 'rgba(224, 35, 28, 0.6)';
        ctx.fillRect(24, 126, 208, 2);
      }

      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      return tex;
    });
  }

  setAccent(colorHex: string) {
    this.targetColor.set(colorHex);
  }

  update(t: number, dt: number, snapProgress: number, speedVal: number, warp: number) {
    this.currentColor.lerp(this.targetColor, 0.08);

    const speedBoost = 1 + speedVal * 6 + warp * 5;
    const globalAdvance = snapProgress * TUNNEL_DEPTH;

    for (let i = 0; i < this.meshes.length; i++) {
      const mesh = this.meshes[i];
      const mat = this.materials[i];

      mat.color.copy(this.currentColor);

      if (!this.reduce) {
        // Rotación suave del glifo
        mesh.rotation.z += (mesh.userData.rotSpeed as number) * dt * speedBoost;

        // Desplazamiento en Z continuo con avance rápido al hacer scroll
        let z = (mesh.userData.baseZ as number) + globalAdvance + speedVal * 4.2;
        while (z > 4) {
          z -= TUNNEL_DEPTH;
        }
        mesh.position.z = z;

        // Micro-ondulación lateral
        mesh.position.x =
          (mesh.userData.baseX as number) + Math.sin(t * 0.8 + i) * 0.15;
        mesh.position.y =
          (mesh.userData.baseY as number) + Math.cos(t * 0.7 + i) * 0.12;

        // Desvanecimiento e iluminación reactiva con el scroll
        const dist = Math.abs(z);
        const alpha = Math.min(1, Math.max(0, 1 - (dist - 12) / (TUNNEL_DEPTH - 12)));
        mat.opacity = Math.min(0.98, (0.28 + alpha * 0.6) * (1 + warp * 0.6 + speedVal * 0.9));
      }
    }
  }

  dispose() {
    this.scene.remove(this.group);
    this.materials.forEach((m) => {
      m.map?.dispose();
      m.dispose();
    });
    this.meshes.forEach((m) => m.geometry?.dispose());
  }
}
