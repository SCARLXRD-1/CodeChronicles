import { timeline } from '../data/timeline';
import { esc } from '../content/ChroniclesContent';
import { tr } from '../i18n';

/**
 * Interactive Timeline — FASE 5
 * Renderiza la línea temporal como una escala navegable por años + evento.
 * Sin dependencias; los clics se delegan con un callback.
 */

const YEARS = [1800, 1850, 1900, 1950, 2000, 2026];

function distinctYears(): number[] {
  const set = new Set<number>();
  timeline.forEach((e) => {
    const y = Number(e.year);
    if (!Number.isNaN(y)) set.add(y);
  });
  return [...set].sort((a, b) => a - b);
}

export function interactiveTimelineMarkup(): string {
  const years = distinctYears();
  if (years.length === 0) return `<p class="body-text">${esc(tr('ui.timeline.nodata'))}</p>`;
  const min = years[0];
  const max = years[years.length - 1];
  const span = Math.max(1, max - min);

  const stops = years
    .map((y) => {
      const left = ((y - min) / span) * 100;
      const aria = tr('ui.timeline.year_aria').replace('{y}', String(y));
      return `
      <button class="timeline-panel__rst" data-year="${y}" style="left:${left}%" aria-label="${esc(aria)}" title="${y}"></button>`;
    })
    .join('\n');

  const scaleTicks = YEARS.map(
    (y) => `<span class="meta tick" style="left:${((y - min) / span) * 100}%">${y}</span>`,
  ).join('\n');

  return `
    <div class="timeline-panel" data-timeline>
      <p class="eyebrow">${esc(tr('ui.timeline.title'))}</p>
      <div class="timeline-panel__scale" role="radiogroup" aria-label="${esc(tr('ui.timeline.scale_aria'))}">
        <div class="timeline-panel__track"></div>
        ${stops}
        <div class="timeline-panel__ticks">${scaleTicks}</div>
      </div>
      <div class="timeline-panel__events" aria-live="polite">
        <p class="meta">${esc(tr('ui.timeline.prompt'))}</p>
      </div>
    </div>`;
}

export function timelineYearEvents(year: number): string {
  const matches = timeline.filter((e) => Number(e.year) === year);
  if (matches.length === 0)
    return `<p class="body-text">${esc(tr('ui.timeline.empty'))}</p>`;
  return matches
    .map(
      (e) => {
        const title = tr(`card.event.${e.id}.title`, e.title);
        const desc = tr(`card.event.${e.id}.desc`, e.description);
        return `
      <div class="timeline-event">
        <p class="timeline-event__title">${esc(title)}</p>
        <p class="timeline-event__body">${esc(desc)}</p>
        ${e.related.map((r) => `<span class="tag">${esc(r)}</span>`).join(' ')}
      </div>`;
      },
    )
    .join('\n');
}

export function bindInteractiveTimeline(container: HTMLElement) {
  const panel =
    container.matches?.('[data-timeline]') === true
      ? container
      : container.querySelector<HTMLElement>('[data-timeline]');
  if (!panel) return;
  const events = panel.querySelector('.timeline-panel__events');

  const selectYear = (year: number) => {
    panel.querySelectorAll('.timeline-panel__rst').forEach((el) => {
      const on = Number(el.getAttribute('data-year')) === year;
      el.classList.toggle('is-active', on);
      el.setAttribute('aria-checked', String(on));
    });
    if (events) events.innerHTML = timelineYearEvents(year);
  };

  panel.querySelectorAll('.timeline-panel__rst').forEach((el) => {
    el.addEventListener('click', () => selectYear(Number(el.getAttribute('data-year'))));
  });

  // Activar el primer año por defecto
  const first = panel.querySelector<HTMLElement>('.timeline-panel__rst');
  if (first) selectYear(Number(first.getAttribute('data-year')));
}