import * as THREE from 'three';

/**
 * ParticleField
 * Campo de partículas atmosférico que reacciona al movimiento de la cámara.
 * Cada partícula es un simple punto con color/opacidad aleatoria.
 */
export class ParticleField {
  readonly points: THREE.Points;
  private material: THREE.PointsMaterial;
  private geometry: THREE.BufferGeometry;
  private reduceMotion: boolean;

  constructor(count = 600, opts: { color?: number; size?: number; spread?: number } = {}) {
    const { color = 0x8a8f98, size = 0.04, spread = 30 } = opts;
    this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const opacities = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
      opacities[i] = 0.3 + Math.random() * 0.7;
    }
    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.geometry.setAttribute('aOpacity', new THREE.BufferAttribute(opacities, 1));

    this.material = new THREE.PointsMaterial({
      color,
      size,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    this.points = new THREE.Points(this.geometry, this.material);
  }

  update(t: number, cameraPosition: THREE.Vector3) {
    this.points.position.copy(cameraPosition);
    if (this.reduceMotion) return;
    // Suave movimiento orbital del campo para dar sensación de estar dentro
    this.points.rotation.y = t * 0.012;
    this.points.rotation.x = Math.sin(t * 0.3) * 0.02;
  }

  dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }
}