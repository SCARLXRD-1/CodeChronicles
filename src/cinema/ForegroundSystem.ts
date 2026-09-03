/**
 * ForegroundSystem
 * Capas de primer plano cinematográficas:
 * cada sección (hero, capítulos, momentos, epílogo) posee un "stage" de
 * siluetas que se levanta a #fg-sky cuando la sección es la más visible,
 * y el stage anterior se retira con fade + blur antes de volver a su dueño.
 * Las siluetas son SVG procedimentales por era (tarjetas, engranajes,
 * relés, tubos, terminales, racks, navegadores...) en tinta casi negra.
 */
import { getChapter } from '../data/chapters';

interface FgEl {
  left: number;
  width: number;
  depth: 1 | 2 | 3;
  svg: string;
}

function svg(inner: string): string {
  return `<svg viewBox="0 0 480 320" preserveAspectRatio="xMidYMax slice" aria-hidden="true">${inner}</svg>`;
}

const INK = '#05070a';
const INK_2 = '#070a0e';

/* ---------- Siluetas por era ---------- */

function pages(): FgEl {
  const sheets = Array.from({ length: 5 }, (_, i) => {
    const y = 150 + i * 26;
    const skew = i % 2 ? 10 : -8;
    const fill = i % 2 ? INK : INK_2;
    return `<rect x="40" y="${y}" width="300" height="170" fill="${fill}" transform="rotate(${skew} 190 ${y})"/>`;
  }).join('');
  return { left: 4, width: 30, depth: 2, svg: svg(`<g>${sheets}<circle cx="190" cy="120" r="46" fill="${INK_2}"/><circle cx="190" cy="120" r="16" fill="${INK}"/></g>`) };
}

function gears(): FgEl {
  const gear = (cx: number, cy: number, r: number, fill: string) =>
    `<g fill="${fill}"><circle cx="${cx}" cy="${cy}" r="${r}"/><circle cx="${cx}" cy="${cy}" r="${r * 0.32}" fill="${INK}"/></g>`;
  return {
    left: 62, width: 26, depth: 3,
    svg: svg(`<g>${gear(120, 170, 150, INK_2)}${gear(260, 300, 120, INK)}${gear(60, 330, 90, INK_2)}</g>`),
  };
}

function relayTowers(): FgEl {
  const tower = (x: number, h: number, fill: string) => {
    const ribs = [];
    for (let i = 0; i < 14; i++) ribs.push(`<rect x="${x}" y="${310 - h + i * Math.ceil(h / 14)}" width="46" height="16" fill="${fill}"/>`);
    return `<g>${ribs.join('')}<rect x="${x + 4}" y="${310 - h}" width="38" height="${h}" fill="${INK}"/></g>`;
  };
  return { left: 66, width: 26, depth: 1, svg: svg(`<g>${tower(40, 300, INK_2)}${tower(140, 340, INK)}${tower(250, 270, INK_2)}</g>`) };
}

function cardStack(): FgEl {
  const cards = Array.from({ length: 6 }, (_, i) => {
    const y = 200 + i * 22;
    return `<g fill="${i % 2 ? INK : INK_2}" transform="rotate(${i % 2 ? 8 : -4} 240 ${y})"><rect x="140" y="${y}" width="200" height="120"/><g fill="#05070a">${[40, 52, 64, 76].map((px) => `<rect x="${140 + px}" y="${y + 30}" width="5" height="34"/><rect x="${140 + px}" y="${y + 78}" width="5" height="30"/>`).join('')}</g></g>`;
  }).join('');
  return { left: 4, width: 32, depth: 2, svg: svg(`<g>${cards}</g>`) };
}

function tubeBank(): FgEl {
  const tubes = Array.from({ length: 12 }, (_, i) => {
    const x = 30 + i * 38;
    return `<rect x="${x}" y="${120}" width="16" height="200" rx="8" fill="${i % 2 ? INK : INK_2}"/><circle cx="${x + 8}" cy="${108}" r="12" fill="${INK}"/>`;
  }).join('');
  return { left: 58, width: 30, depth: 1, svg: svg(`<g>${tubes}<rect x="18" y="120" width="470" height="210" fill="${INK_2}"/><rect x="0" y="300" width="480" height="30" fill="${INK}"/></g>`) };
}

function reels(): FgEl {
  const reel = (x: number, y: number, r: number, fill: string) =>
    `<g fill="${fill}"><circle cx="${x}" cy="${y}" r="${r}"/><circle cx="${x}" cy="${y}" r="${r * 0.45}" fill="${INK}"/><circle cx="${x}" cy="${y}" r="${r * 0.14}" fill="${fill}"/></g>`;
  return { left: 66, width: 26, depth: 2, svg: svg(`<g>${reel(150, 210, 130, INK)}${reel(300, 250, 100, INK_2)}${reel(60, 300, 90, INK_2)}</g>`) };
}

function tapeSpools(): FgEl {
  const rows = [];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 6; c++) {
      const x = 30 + c * 76;
      const y = 150 + r * 70;
      rows.push(`<g fill="${(r + c) % 2 ? INK : INK_2}"><rect x="${x}" y="${y}" width="58" height="90" rx="6"/><rect x="${x + 14}" y="${y + 16}" width="30" height="30" rx="2"/></g>`);
    }
  }
  return { left: 60, width: 30, depth: 2, svg: svg(`<g>${rows.join('')}</g>`) };
}

function pillars(): FgEl {
  const col = (x: number, h: number, fill: string) => `<rect x="${x}" y="${310 - h}" width="40" height="${h}" fill="${fill}"/><rect x="${x - 10}" y="${310 - h}" width="60" height="10" fill="${INK_2}"/>`;
  return { left: 66, width: 28, depth: 2, svg: svg(`<g>${col(40, 310, INK_2)}${col(120, 340, INK)}${col(200, 300, INK_2)}${col(280, 330, INK)}</g>`) };
}

function terminals(): FgEl {
  const term = (x: number, y: number, fill: string) => `
    <g fill="${fill}"><rect x="${x}" y="${y}" width="120" height="80" rx="6"/><rect x="${x + 10}" y="${y + 12}" width="100" height="52" fill="#081018"/><rect x="${x + 18}" y="${y + 24}" width="60" height="4" fill="${INK}"/><rect x="${x + 18}" y="${y + 36}" width="84" height="4" fill="${INK}"/><rect x="${x + 18}" y="${y + 48}" width="48" height="4" fill="${INK}"/></g>`;
  return { left: 8, width: 40, depth: 1, svg: svg(`<g>${term(40, 220, INK_2)}${term(220, 150, INK)}<rect x="0" y="310" width="480" height="20" fill="${INK}"/></g>`) };
}

function spheres(): FgEl {
  const orb = (x: number, y: number, r: number, fill: string) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`;
  return { left: 60, width: 32, depth: 1, svg: svg(`<g>${orb(150, 300, 130, INK_2)}${orb(300, 330, 100, INK)}${orb(70, 340, 80, INK_2)}${orb(230, 280, 55, INK)}</g>`) };
}

function chips(): FgEl {
  const rows = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 5; c++) {
      const x = 30 + c * 90;
      const y = 150 + r * 70;
      rows.push(`<rect x="${x}" y="${y}" width="60" height="60" rx="4" fill="${(r + c) % 2 ? INK : INK_2}"/><rect x="${x + 16}" y="${y + 16}" width="28" height="28" fill="${INK}"/>`);
    }
  }
  return { left: 58, width: 32, depth: 2, svg: svg(`<g>${rows.join('')}</g>`) };
}

function browserFrames(): FgEl {
  const win = (x: number, y: number, w: number, h: number, fill: string) => `
    <g fill="${fill}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/><rect x="${x}" y="${y}" width="${w}" height="18" rx="8"/><rect x="${x + 10}" y="${y + 26}" width="${w * 0.6}" height="${h * 0.6}" fill="#081018"/><rect x="${x + 8}" y="${y + 7}" width="8" height="8" rx="4"/></g>`;
  return { left: 62, width: 30, depth: 1, svg: svg(`<g>${win(30, 150, 200, 190, INK)}${win(260, 210, 170, 140, INK_2)}${win(150, 300, 140, 120, INK)}</g>`) };
}

function racks(): FgEl {
  const rack = (x: number, h: number, fill: string) => {
    const units = [];
    for (let i = 0; i < 8; i++) units.push(`<rect x="${x + 6}" y="${310 - h + i * 18 + 4}" width="60" height="12" fill="#081018"/>`);
    return `<g fill="${fill}"><rect x="${x}" y="${310 - h}" width="70" height="${h}"/>${units.join('')}</g>`;
  };
  return { left: 62, width: 30, depth: 1, svg: svg(`<g>${rack(30, 330, INK_2)}${rack(160, 300, INK)}${rack(290, 340, INK_2)}${rack(60, 250, INK)}</g>`) };
}

function neural(): FgEl {
  const ring = Array.from({ length: 16 }, (_, i) => {
    const a = (i / 16) * Math.PI;
    return `<circle cx="${250 + Math.cos(a) * 200}" cy="${300 - Math.sin(a) * 200}" r="14" fill="${i % 2 ? INK : INK_2}"/>`;
  }).join('');
  return { left: 56, width: 34, depth: 2, svg: svg(`<g>${ring}<circle cx="250" cy="290" r="90" fill="none"/><circle cx="250" cy="290" r="40" fill="${INK_2}"/></g>`) };
}

function futureRings(): FgEl {
  const arcs = Array.from({ length: 7 }, (_, i) => {
    const r = 60 + i * 55;
    return `<circle cx="260" cy="340" r="${r}" fill="none" stroke="${i % 2 ? INK : INK_2}" stroke-width="14"/>`;
  }).join('');
  return { left: 58, width: 32, depth: 2, svg: svg(`<g>${arcs}<rect x="0" y="360" width="480" height="40" fill="${INK}"/></g>`) };
}

function eraElements(era: string): FgEl[] {
  switch (era) {
    case 'pre-code':
    case 'algorithms':
    case 'entrepreneurial':
      return [pages(), gears()];
    case 'machines':
    case 'machine-language':
      return [relayTowers(), cardStack()];
    case 'computers':
    case 'assembly':
      return [tubeBank(), reels()];
    case 'first-languages':
    case 'enterprise':
      return [cardStack(), tapeSpools()];
    case 'structured':
    case 'c':
      return [pillars(), tapeSpools()];
    case 'systems':
      return [racks(), terminals()];
    case 'oop':
      return [spheres(), pillars()];
    case 'modern':
    case 'internet':
      return [chips(), gears()];
    case 'web':
    case 'mobile':
      return [browserFrames(), chips()];
    case 'ai':
      return [neural(), racks()];
    case 'future':
      return [futureRings(), neural()];
    default:
      return [relayTowers(), gears()];
  }
}

/* ---------- Sistema de stages ---------- */

export class ForegroundSystem {
  private sky!: HTMLElement;
  private stages = new Map<HTMLElement, HTMLElement>();
  private active: { owner: HTMLElement; stage: HTMLElement } | null = null;
  private readonly reduce: boolean;
  private ticket = 0;

  constructor(private readonly root: HTMLElement = document.body) {
    this.reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.sky = document.createElement('div');
    this.sky.id = 'fg-sky';
    document.body.appendChild(this.sky);
    this.scaffold();
    this.monitor();
  }

  private chapterEraFor(sec: HTMLElement): string {
    const era = sec.dataset.era;
    if (era) return era;
    const chapterId = sec.dataset.chapter ?? sec.dataset.section ?? '';
    return getChapter(chapterId)?.era ?? 'pre-code';
  }

  private scaffold() {
    const sections = [...this.root.querySelectorAll<HTMLElement>('.hero, .epilogue, .scene')];
    sections.forEach((sec) => {
      const era = this.chapterEraFor(sec);
      const stage = document.createElement('div');
      stage.className = 'fg';
      stage.dataset.fg = era;
      eraElements(era).forEach((el) => {
        const node = document.createElement('div');
        node.className = 'fg-el';
        node.dataset.depth = String(el.depth);
        node.style.setProperty('--fg-left', `${el.left}vw`);
        node.style.setProperty('--fg-w', `${el.width}vw`);
        node.style.setProperty('--fg-h', `${el.depth === 1 ? 46 : el.depth === 2 ? 36 : 26}vh`);
        node.innerHTML = el.svg;
        stage.appendChild(node);
      });
      sec.appendChild(stage);
      this.stages.set(sec, stage);
    });
  }

  private pick(): void {
    const vh = window.innerHeight;
    let best: { owner: HTMLElement; stage: HTMLElement } | null = null;
    let bestScore = 0;
    this.stages.forEach((stage, sec) => {
      if (!sec.isConnected) return;
      const r = sec.getBoundingClientRect();
      const visible = Math.min(r.bottom, vh) - Math.max(r.top, 0);
      if (visible <= 0) return;
      const ratio = visible / Math.max(1, Math.min(r.height, vh));
      const dominance = visible / vh;
      const score = ratio + dominance;
      if (score > bestScore) {
        bestScore = score;
        best = { owner: sec, stage };
      }
    });
    if (best) this.promote(best);
  }

  private promote(candidate: { owner: HTMLElement; stage: HTMLElement }) {
    if (this.active && this.active.stage === candidate.stage && this.active.stage.classList.contains('is-up')) {
      return;
    }
    this.park(this.active);
    this.active = candidate;
    const { owner, stage } = candidate;
    if (stage.parentNode === owner) owner.removeChild(stage);
    stage.classList.remove('fg-retiring');
    this.sky.appendChild(stage);
    if (this.reduce) {
      stage.classList.add('is-up');
      return;
    }
    requestAnimationFrame(() => {
      stage.classList.add('is-up');
    });
  }

  private park(active: { owner: HTMLElement; stage: HTMLElement } | null) {
    if (!active) return;
    const { owner, stage } = active;
    stage.classList.remove('is-up');
    if (this.reduce) {
      if (stage.parentNode) stage.parentNode.removeChild(stage);
      owner.appendChild(stage);
      stage.classList.remove('fg-retiring');
      return;
    }
    stage.classList.add('fg-retiring');
    window.setTimeout(() => {
      if (!this.active || this.active.stage !== stage) {
        stage.classList.remove('fg-retiring');
        if (stage.parentNode) stage.parentNode.removeChild(stage);
        owner.appendChild(stage);
      }
    }, 900);
  }

  private readonly onScroll = () => {
    cancelAnimationFrame(this.ticket);
    this.ticket = requestAnimationFrame(() => this.pick());
  };

  private monitor() {
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('resize', this.onScroll, { passive: true });
    this.pick();
  }

  dispose() {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onScroll);
    this.sky.remove();
  }
}