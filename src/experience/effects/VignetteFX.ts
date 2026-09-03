/**
 * VignetteFX
 * Viñeta cinematográfica (elemento CSS fijo, z54) + grano de película
 * (canvas fijo z60, mix-blend overlay) sobre toda la página.
 * El grano se reduce con prefers-reduced-motion y se pausa con pestaña oculta.
 */
export class VignetteFX {
  private grain: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private frame = 0;
  private reduceMotion: boolean;
  private hidden = false;
  private onResize = () => this.resize();
  private onVisibility = () => {
    this.hidden = document.hidden;
  };

  constructor() {
    this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const vignette = document.createElement('div');
    vignette.id = 'vignette';
    document.body.appendChild(vignette);

    if (this.reduceMotion) return;
    this.grain = document.createElement('canvas');
    this.grain.id = 'grain';
    document.body.appendChild(this.grain);
    this.ctx = this.grain.getContext('2d');
    this.resize();
    window.addEventListener('resize', this.onResize);
    document.addEventListener('visibilitychange', this.onVisibility);
  }

  private resize() {
    if (!this.grain || !this.ctx) return;
    const dpr = Math.min(window.devicePixelRatio, 1.5);
    this.grain.width = window.innerWidth * dpr;
    this.grain.height = window.innerHeight * dpr;
    this.grain.style.width = `${window.innerWidth}px`;
    this.grain.style.height = `${window.innerHeight}px`;
  }

  update(_t: number, _progress: number) {
    if (!this.grain || !this.ctx || this.hidden) return;
    const ctx = this.ctx;
    const { width, height } = this.grain;
    this.frame++;
    if (this.frame % 3 !== 0) return;
    ctx.clearRect(0, 0, width, height);
    ctx.globalAlpha = 0.14;
    for (let i = 0; i < 140; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const r = Math.random() * 1.7;
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.6)';
      ctx.fillRect(x, y, r, r);
    }
    ctx.globalAlpha = 1;
  }

  dispose() {
    window.removeEventListener('resize', this.onResize);
    document.removeEventListener('visibilitychange', this.onVisibility);
    this.grain?.remove();
    document.querySelector('#vignette')?.remove();
  }
}