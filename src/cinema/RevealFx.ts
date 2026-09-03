/**
 * RevealFx
 * Cinemática de entrada editorial:
 *  - [data-reveal]: grupo contenedor. Los [data-rv] hijos se revelan con
 *    escalonamiento (--rv-delay) al entrar en viewport.
 *  - Titulares .display dentro de un grupo se "destapan" palabra a palabra
 *    con máscara (--word-delay), usando IntersectionObserver.
 *  - prefers-reduced-motion: nada se oculta ni se anima.
 */
export class RevealFx {
  private readonly io: IntersectionObserver;
  private readonly reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  constructor(private readonly scope: HTMLElement) {
    this.io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('rv-in');
          this.io.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.02 },
    );
    this.scan();
  }

  private scan() {
    const groups = [...this.scope.querySelectorAll<HTMLElement>('[data-reveal]')];
    groups.forEach((group) => {
      // Titulares palabra a palabra
      group.querySelectorAll<HTMLElement>('h1.display, h2.display, h3.display').forEach((h) => {
        this.prepareHeading(h);
      });
      // Elementos escalonados directos y de tarjetas
      const items = [...group.querySelectorAll<HTMLElement>(':scope > [data-rv], :scope .card[data-rv], :scope .tcode[data-rv], :scope [data-timeline][data-rv], :scope [data-compare][data-rv]')];
      // Deduplicar
      const uniqueItems = Array.from(new Set(items));
      uniqueItems.forEach((el, i) => {
        if (this.reduce) {
          el.classList.add('rv-in');
          return;
        }
        el.classList.add('rv');
        el.style.setProperty('--rv-delay', `${Math.min(600, i * 80)}ms`);
        this.io.observe(el);
      });
      // El grupo activa los titulares cuando se acerca al viewport
      this.io.observe(group);
    });
  }

  private prepareHeading(h: HTMLElement) {
    if (this.reduce || h.getAttribute('data-split') === 'skip') return;
    if (h.querySelector('.word')) return;
    // Requiere marcado explícito para no alterar cabeceras no pensadas
    if (!h.closest('[data-reveal]')) return;

    const original = h.textContent ?? '';
    const tokens = original.split(/\s+/).filter(Boolean);
    const mask = document.createElement('div');
    mask.className = 'heading-mask';
    h.setAttribute('aria-label', original);
    tokens.forEach((word, i) => {
      const w = document.createElement('span');
      w.className = 'word';
      w.setAttribute('aria-hidden', 'true');
      const inner = document.createElement('span');
      inner.className = 'word__inner';
      inner.style.setProperty('--word-delay', `${i * 55}ms`);
      inner.textContent = word;
      w.appendChild(inner);
      mask.appendChild(w);
      if (i < tokens.length - 1) mask.appendChild(document.createTextNode(' '));
    });
    h.textContent = '';
    h.appendChild(mask);
  }

  dispose() {
    this.io.disconnect();
    this.scope
      .querySelectorAll<HTMLElement>('.rv')
      .forEach((el) => el.classList.remove('rv', 'rv-in'));
  }
}