import type { Era } from '../data/types';

export interface EraCameraDef {
  era: Era;
  /** posición de la cámara [x, y, z] */
  position: [number, number, number];
  /** punto de mira [x, y, z] */
  target: [number, number, number];
  fov: number;
}

/**
 * Cámara por capítulo — FASE 4
 * Define la "toma" inicial de cada era. El prototipo de FASE 2 las usa
 * para que el scroll avance la cámara entre épocas.
 */
export const eraCameraDefs: EraCameraDef[] = [
  { era: 'pre-code', position: [0, 0.5, 8], target: [0, 0, 0], fov: 46 },
  { era: 'algorithms', position: [0, 1.2, 10], target: [0, 0, -2], fov: 44 },
  { era: 'machines', position: [0, 0.8, 9], target: [0, 0, -1], fov: 45 },
  { era: 'computers', position: [-1.5, 1, 9], target: [0, 0.5, -1], fov: 43 },
  { era: 'machine-language', position: [-0.8, 0.5, 8.5], target: [0, 0, 0], fov: 46 },
  { era: 'assembly', position: [0.6, 0.6, 9], target: [0, 0, 0], fov: 45 },
  { era: 'first-languages', position: [0, 12, -2], target: [0, 0, -2], fov: 42 }, // vista cenital
  { era: 'enterprise', position: [0, 0.4, 9], target: [0, 0, 0], fov: 45 },
  { era: 'structured', position: [0, 1, 9], target: [0, 0, -0.5], fov: 44 },
  { era: 'c', position: [-2, 0.6, 8], target: [0, 0, 0], fov: 45 },
  { era: 'oop', position: [0, 1.4, 10], target: [0, 0, 0], fov: 46 },
  { era: 'internet', position: [0, 1.8, 11], target: [0, 0, -2], fov: 50 },
  { era: 'web', position: [0, 1, 9], target: [0, 0, -1], fov: 45 },
  { era: 'modern', position: [1.5, 0.8, 9], target: [0, 0, -1], fov: 45 },
  { era: 'mobile', position: [0, 0.6, 8.5], target: [0, 0, 0], fov: 45 },
  { era: 'systems', position: [0, 0.9, 9], target: [0, 0, 0], fov: 44 },
  { era: 'ai', position: [0, 1, 10], target: [0, 0, 0], fov: 47 },
  { era: 'future', position: [0, 1.5, 11], target: [0, 0, 0], fov: 48 },
];

export const getEraCamera = (): EraCameraDef[] => eraCameraDefs;
export const getEraCameraFor = (era: Era): EraCameraDef =>
  eraCameraDefs.find((d) => d.era === era) ?? eraCameraDefs[0];