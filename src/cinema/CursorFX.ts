/**
 * CursorFX
 * Cursor personalizado tipo "dot + anillo" editorial cinemático.
 * Solo se activa con puntero fino; en táctil / coarse no existe (CSS lo oculta
 * y el cursor del sistema permanece). Lerp del punto con rAF; el anillo se
 * expande sobre elementos interactivos ([data-cursor], enlaces, botones, cards).
 */
export class CursorFX {
  private dot!: HTMLElement;
  private x = -100;
  private y = -100;
  private sx = -100;
  private sy = -100;
  private raf = 0;
  private fine =
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  constructor() {
    if (!this.fine) return;
    document.documentElement.classList.add('cur-active');
    this.dot = document.createElement('div');
    this.dot.className = 'cur-dot';
    this.dot.innerHTML = '<div class="cur-dot__ring"></div><div class="cur-dot__core"></div>';
    document.body.appendChild(this.dot);
    this.wirePointer();
    this.loop();
  }

  private wirePointer() {
    window.addEventListener('pointermove', (e) => {
      this.x = e.clientX;
      this.y = e.clientY;
    }, { passive: true });

    const interactive =
      'a, button, [data-discover], [data-cursor], .card, .timeline-panel, .compare, summary, input, select, textarea';
    document.addEventListener('pointerover', (e) => {
      if ((e.target as HTMLElement).closest(interactive)) {
        this.dot.classList.add('is-active');
      }
    });
    document.addEventListener('pointerout', (e) => {
      if ((e.target as HTMLElement).closest(interactive)) {
        this.dot.classList.remove('is-active');
      }
    });
  }

  private loop = () => {
    this.raf = requestAnimationFrame(this.loop);
    this.sx += (this.x - this.sx) * 0.18;
    this.sy += (this.y - this.sy) * 0.18;
    this.dot.style.transform = `translate3d(${this.sx}px, ${this.sy}px, 0)`;
  };

  dispose() {
    cancelAnimationFrame(this.raf);
    document.documentElement.classList.remove('cur-active');
    this.dot?.remove();
  }
}