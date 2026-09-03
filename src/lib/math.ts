/**
 * Interpolación exponencial independiente de la frecuencia de refresco.
 * damp(cur, to, rate, dt) = cur + (to - cur) * (1 - exp(-rate*dt))
 * rate alto = más rápido hacia el objetivo.
 */
export function damp(current: number, target: number, rate: number, dt: number): number {
  return current + (target - current) * (1 - Math.exp(-rate * dt));
}