export interface SpatialPresenterOptions {
  scope?: HTMLElement;
}

/**
 * SpatialPresenter (3D Card Hologram & Pointer Tilt Director)
 * Proporciona cabeceo tridimensional sutil e interactivo (tilt) y
 * resplandor especular reflectivo dinámico en tarjetas y módulos superpuestos.
 */
export class SpatialPresenter {
  private scope: HTMLElement;
  private readonly reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  private cleanups: Array<() => void> = [];

  constructor(options: SpatialPresenterOptions = {}) {
    this.scope = options.scope ?? (document.getElementById('overlay') || document.body);
    if (this.reduceMotion) return;

    this.bindCardParallax();
  }

  public bindCardParallax() {
    this.cleanupListeners();
    const cards = this.scope.querySelectorAll<HTMLElement>(
      '.card, .card-stack-item, .tcode, .timeline-panel, .cur .les, .chip',
    );

    cards.forEach((card) => {
      const onPointerMove = (e: PointerEvent) => {
        const rect = card.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const tiltX = (y - 0.5) * -12;
        const tiltY = (x - 0.5) * 14;

        card.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`);
        card.style.setProperty('--my', `${(y * 100).toFixed(1)}%`);
        card.style.setProperty('--tilt-x', `${tiltX.toFixed(2)}deg`);
        card.style.setProperty('--tilt-y', `${tiltY.toFixed(2)}deg`);
      };

      const onPointerLeave = () => {
        card.style.removeProperty('--mx');
        card.style.removeProperty('--my');
        card.style.removeProperty('--tilt-x');
        card.style.removeProperty('--tilt-y');
      };

      card.addEventListener('pointermove', onPointerMove, { passive: true });
      card.addEventListener('pointerleave', onPointerLeave, { passive: true });

      this.cleanups.push(() => {
        card.removeEventListener('pointermove', onPointerMove);
        card.removeEventListener('pointerleave', onPointerLeave);
      });
    });
  }

  private cleanupListeners() {
    this.cleanups.forEach((fn) => fn());
    this.cleanups = [];
  }

  public triggerWarpImpulse(_intensity = 1) {
    // Impulso cinematográfico sutil
  }

  public refresh() {
    if (this.reduceMotion) return;
    this.bindCardParallax();
  }

  public dispose() {
    this.cleanupListeners();
  }
}
