import './styles/index.css';
import type { Experience } from './experience/Experience';
import { ChroniclesUI } from './ui/ChroniclesUI';
import { DiscoverySystem } from './interactions/DiscoverySystem';
import { PersistenceStore } from './persistence/PersistenceStore';
import { PerfMonitor } from './perf/PerfMonitor';
import { RevealFx } from './cinema/RevealFx';
import { ForegroundSystem } from './cinema/ForegroundSystem';
import { CursorFX } from './cinema/CursorFX';
import { ChapterFlash } from './cinema/ChapterFlash';
import { SpatialPresenter } from './cinema/SpatialPresenter';
import type { ChapterMeta } from './data/chapters';

function init() {
  const store = new PersistenceStore();

  const ui = new ChroniclesUI();
  ui.mount();

  // Capa cinematográfica: reveals, foreground, cursor, spatial 3D
  const mainCanvas = document.querySelector('#overlay') as HTMLElement;
  void new RevealFx(mainCanvas);
  void new ForegroundSystem(mainCanvas);
  void new CursorFX();
  const flash = new ChapterFlash();
  const spatialPresenter = new SpatialPresenter({ scope: mainCanvas });
  flash.onFlash = () => {
    spatialPresenter.triggerWarpImpulse(0.85);
  };

  // Experiencia WebGL (three) cargada de forma diferida
  let experience: Experience | null = null;
  void import('./experience/Experience').then(({ Experience: ExperienceCls }) => {
    experience = new ExperienceCls();
    experience.start();
  });
  let activeChapter: ChapterMeta | null = null;
  let lastFlashTime = 0;
  ui.onActiveSection = ({ chapter }) => {
    const now = Date.now();
    if (chapter && chapter.number > 0 && chapter.id !== activeChapter?.id) {
      activeChapter = chapter;
      // Previene ráfagas de parpadeo si el usuario se detiene cerca del límite de un capítulo
      if (now - lastFlashTime > 2500) {
        lastFlashTime = now;
        flash.show(chapter);
      }
    }
    if (chapter) {
      experience?.setActiveChapter(chapter);
      store.markChapterVisited(chapter.id);
    }
  };

  // Sincronizar barra de progreso con scroll + salida cinemática del hero
  let scrollTick = 0;
  const sync = () => {
    const max = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight,
    );
    const p = Math.min(1, window.scrollY / max);
    cancelAnimationFrame(scrollTick);
    scrollTick = requestAnimationFrame(() => {
      ui.onScroll(p);
      // el contenido del hero se desvanece solo cuando su base cruza el
      // borde inferior del viewport (al inicio del viaje → p = 0)
      const hero = document.getElementById('hero');
      if (hero) {
        const r = hero.getBoundingClientRect();
        const ph = Math.min(1, Math.max(0, (window.innerHeight - r.bottom) / Math.max(1, window.innerHeight)));
        hero.style.setProperty('--p', ph.toFixed(3));
      }
    });
    store.saveScroll(window.scrollY);
  };
  window.addEventListener('scroll', sync, { passive: true });
  sync();
  ui.bindRail((chapterId) => {
    spatialPresenter.triggerWarpImpulse(0.7);
    const el = document.querySelector(`[data-section="${chapterId}"]`);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });

  // Persistencia: restaurar posición al volver (si se recarga la página)
  const savedScroll = store.getState().lastScroll;
  if (savedScroll > 0) {
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: savedScroll, behavior: 'auto' });
    });
  }

  // Preferencias guardadas
  const prefs = store.getState().preferences;
  if (prefs.reducedMotion) {
    document.documentElement.classList.add('reduce-motion');
  }

  const soundBtn = document.querySelector<HTMLElement>('#sound-toggle');
  if (prefs.sound) {
    soundBtn?.classList.add('is-on');
  }
  soundBtn?.addEventListener('click', () => {
    const on = !soundBtn.classList.contains('is-on');
    soundBtn.classList.toggle('is-on', on);
    store.setPreferences({ sound: on });
  });

  // Descubrimiento editorial (FASE 3/6)
  const discovery = new DiscoverySystem();
  discovery.onDiscover = (id, kind) => {
    if (kind === 'language') store.markDiscovered(id, 'languagesExplored');
    else if (kind === 'character') store.markDiscovered(id, 'charactersExplored');
    else store.markDiscovered(id, 'discovered');
  };
  document.addEventListener('click', (e) => {
    const link = (e.target as HTMLElement).closest<HTMLElement>('[data-discover]');
    if (link) {
      e.preventDefault();
      const id = link.getAttribute('data-discover');
      if (id) discovery.open(id);
    }
  });

  // Loader
  const loader = document.createElement('div');
  loader.className = 'loader';
  loader.innerHTML = `<div class="loader__mark">CODECHRONICLES</div><div class="loader__bar"></div>`;
  document.body.appendChild(loader);

  setTimeout(() => {
    loader.classList.add('is-hidden');
    setTimeout(() => loader.remove(), 900);
  }, 800);

  // Métricas de rendimiento (FASE 10) — solo con ?perf=1 o #perf
  if (PerfMonitor.fromLocation()) {
    const perf = new PerfMonitor();
    perf.start();
  }
}

document.addEventListener('DOMContentLoaded', init);