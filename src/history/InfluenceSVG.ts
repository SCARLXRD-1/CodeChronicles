import { buildInfluenceTree, type InfluenceEdge, type InfluenceNode } from '../history/InfluenceTree';
import { esc } from '../content/ChroniclesContent';

/**
 * SVGViewer — visor explorable del árbol de influencias.
 * Renderiza nodos y aristas en SVG inline con layout jerárquico simple por año.
 */

interface PositionedNode extends InfluenceNode {
  x: number;
  y: number;
}

const W = 900;
const H = 560;
const PAD = 60;

export function influenceTreeSVG(activeId?: string): string {
  const { nodes, edges } = buildInfluenceTree();
  if (nodes.length === 0) return '<p class="body-text">No hay datos.</p>';

  const byYear = [...nodes].sort((a, b) => a.year - b.year);
  const minYear = byYear[0].year;
  const maxYear = byYear[byYear.length - 1].year;
  const globalYearSpan = Math.max(1, maxYear - minYear);

  const positioned: PositionedNode[] = byYear.map((n, i) => ({
    ...n,
    x: PAD + (i / Math.max(1, byYear.length - 1)) * (W - PAD * 2),
    y: PAD + ((n.year - minYear) / globalYearSpan) * (H - PAD * 2),
  }));

  const posMap = new Map(positioned.map((p) => [p.id, p]));

  const edgePaths = edges.map((e: InfluenceEdge) => {
    const a = posMap.get(e.from);
    const b = posMap.get(e.to);
    if (!a || !b) return '';
    const mx = (a.x + b.x) / 2;
    const curve = `M ${a.x} ${a.y} C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`;
    return `<path d="${curve}" fill="none" stroke="var(--color-line-strong)" stroke-width="1"
      ${activeId && (e.from === activeId || e.to === activeId) ? 'stroke="var(--ch-accent)" stroke-width="2"' : ''} />`;
  });

  const nodeCircles = positioned.map((n) => {
    const isActive = n.id === activeId;
    const isRelated =
      activeId && (edges.some((e) => e.from === activeId && e.to === n.id) ||
        edges.some((e) => e.to === activeId && e.from === n.id));
    return `
      <g transform="translate(${n.x},${n.y})" class="tree-node${isActive ? ' is-active' : ''}${isRelated ? ' is-related' : ''}">
        <circle r="6" fill="${isActive ? 'var(--ch-accent, #e8e6e1)' : 'var(--color-paper-dim)'}"/>
        <text y="-14" text-anchor="middle" class="tree-label">${esc(n.name)}</text>
        <text y="22" text-anchor="middle" class="tree-year">${n.year}</text>
      </g>`;
  });

  return `
    <svg class="tree-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Árbol de influencias de lenguajes de programación">
      ${edgePaths.join('\n')}
      ${nodeCircles.join('\n')}
    </svg>`;
}