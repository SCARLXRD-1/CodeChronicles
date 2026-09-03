import * as THREE from 'three';
import type { Era } from '../../data/types';
import { eras } from './eras';

export interface SceneObject {
  mesh: THREE.Group | THREE.Mesh | THREE.Points;
  update?: (t: number, p: number) => void;
}

/**
 * CinematicScene
 * Compone un conjunto de objetos 3D deterministas según la época histórica.
 * Cada era define su propia colección de elementos (engranajes, paneles, terminales…)
 * incluyendo sus luces dentro del mismo grupo, para que al cambiar de era
 * todo se limpie y no se acumulen luces ni geometrías.
 */
export class CinematicScene {
  readonly group: THREE.Group = new THREE.Group();
  private objects: SceneObject[] = [];
  private currentEra: Era | null = null;
  private readonly scene: THREE.Scene;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.scene.add(this.group);
  }

  setEra(era: Era) {
    if (this.currentEra === era) return;
    this.currentEra = era;
    this.clear();
    const builder = eras[era] ?? eras['pre-code'];
    const built = builder();
    this.objects = built.filter((o) => o !== null);
    this.objects.forEach((o) => {
      this.group.add(o.mesh);
      o.mesh.position.x = o.mesh.position.x; // asegurar actualización de world matrix
    });
  }

  getEra() {
    return this.currentEra;
  }

  clear() {
    this.objects.forEach((o) => {
      this.group.remove(o.mesh);
      disposeMesh(o.mesh);
    });
    this.objects = [];
  }

  update(t: number, p: number) {
    this.objects.forEach((o) => o.update?.(t, p));
  }

  dispose() {
    this.clear();
    this.scene.remove(this.group);
  }
}

export function disposeMesh(obj: THREE.Object3D) {
  obj.traverse((child) => {
    const mesh = child as THREE.Mesh;
    if (mesh.geometry) mesh.geometry.dispose();
    const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
    if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
    else if (mat) mat.dispose();
  });
}