/**
 * PerfMonitor — FASE 10
 * Instrumentación opcional de rendimiento: FPS, tiempo de carga y memoria.
 * Se activa añadiendo `?perf=1` o `#perf` a la URL.
 * No afecta al render ni al bundle si está desactivado.
 */
export class PerfMonitor {
  private frames = 0;
  private last = performance.now();
  private raf = 0;
  private el?: HTMLElement;
  private fpsEl?: HTMLElement;

  static fromLocation(): boolean {
    const url = new URLSearchParams(location.search);
    return url.has('perf') || location.hash === '#perf';
  }

  start() {
    this.buildOverlay();
    this.logLoadMetrics();
    const loop = () => {
      this.raf = requestAnimationFrame(loop);
      this.frames++;
      const now = performance.now();
      const dt = now - this.last;
      if (dt >= 1000) {
        const fps = (this.frames * 1000) / dt;
        this.frames = 0;
        this.last = now;
        if (this.fpsEl) this.fpsEl.textContent = `${fps.toFixed(0)} fps`;
        this.logMemory();
      }
    };
    this.last = performance.now();
    loop();
  }

  private buildOverlay() {
    this.el = document.createElement('div');
    this.el.style.cssText =
      'position:fixed;left:12px;bottom:12px;z-index:60;font:11px/1.4 var(--font-mono,monospace);color:#7dffb0;background:rgba(0,0,0,0.6);padding:6px 10px;pointer-events:none;border:1px solid rgba(255,255,255,0.12);';
    this.fpsEl = document.createElement('span');
    this.el.appendChild(this.fpsEl);
    document.body.appendChild(this.el);
  }

  private logLoadMetrics() {
    const nav = performance.getEntriesByType('navigation')[0] as
      | PerformanceNavigationTiming
      | undefined;
    if (nav) {
      const load = Math.round(nav.loadEventEnd - nav.startTime);
      const dom = Math.round(nav.domContentLoadedEventEnd - nav.startTime);
      console.info(
        `[perf] load ${load}ms · DOMContentLoaded ${dom}ms · ttfb ${Math.round(
          nav.responseStart - nav.startTime,
        )}ms`,
      );
    }
    const res = performance
      .getEntriesByType('resource')
      .filter((e) => e.name.endsWith('.js') || e.name.endsWith('.css'));
    res.forEach((r) => {
      const size = (r as PerformanceResourceTiming).transferSize;
      console.info(`[perf] asset ${r.name.split('/').pop()} · ${Math.round(size / 1024)} KB`);
    });
  }

  private logMemory() {
    const mem = (performance as unknown as { memory?: { usedJSHeapSize: number } }).memory;
    if (mem) {
      console.info(`[perf] JS heap ${Math.round(mem.usedJSHeapSize / 1024 / 1024)} MB`);
    }
  }

  dispose() {
    cancelAnimationFrame(this.raf);
    this.el?.remove();
  }
}