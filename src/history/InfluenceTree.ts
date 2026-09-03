import { languages } from '../data/languages';

export interface InfluenceNode {
  id: string;
  name: string;
  year: number;
}

export interface InfluenceEdge {
  from: string;
  to: string;
}

/**
 * Árbol de influencias — FASE 5
 * Las conexiones se basan en los campos `influences` / `influenced`
 * de cada LanguageEntry en el Registry. Se normaliza la comparación
 * para que los nombres coincidan con ids de lenguajes conocidos.
 */

const knownIds = new Set(languages.map((l) => l.id));

/** Mapea nombres que usan los datos hacia ids de lenguajes conocidos. */
const nameToId: Record<string, string> = {
  FORTRAN: 'fortran-language',
  ALGOL: 'algol-language',
  LISP: 'lisp-language',
  COBOL: 'cobol-language',
  'C': 'c-language',
  'C++': 'cpp-language',
  'Pascal': 'pascal-language',
  'Python': 'python-language',
  'Java': 'java-language',
  'JavaScript': 'javascript-language',
  'TypeScript': 'typescript-language',
  'Ruby': 'ruby-language',
  'C#': 'csharp-language',
  'Go': 'go-language',
  'Rust': 'rust-language',
  'Smalltalk': 'smalltalk-language',
};

function resolveName(name: string): string | null {
  if (knownIds.has(name)) return name;
  return nameToId[name] ?? null;
}

export function buildInfluenceTree() {
  const nodes: InfluenceNode[] = languages.map((l) => ({
    id: l.id,
    name: l.name,
    year: l.year,
  }));

  const edges: InfluenceEdge[] = [];
  const seen = new Set<string>();

  languages.forEach((l) => {
    l.influenced.forEach((targetName) => {
      const target = resolveName(targetName);
      if (target) {
        const key = `${l.id}->${target}`;
        if (!seen.has(key)) {
          seen.add(key);
          edges.push({ from: l.id, to: target });
        }
      }
    });
  });

  return { nodes, edges };
}

/** Aeronave de idiomas que influyeron directa o indirectamente a uno dado. */
export function ancestorsOf(id: string, tree = buildInfluenceTree()): string[] {
  const result = new Set<string>();
  const stack = [id];
  while (stack.length) {
    const current = stack.pop()!;
    tree.edges.forEach((e) => {
      if (e.to === current && !result.has(e.from)) {
        result.add(e.from);
        stack.push(e.from);
      }
    });
  }
  return [...result];
}

export function descendantsOf(id: string, tree = buildInfluenceTree()): string[] {
  const result = new Set<string>();
  const stack = [id];
  while (stack.length) {
    const current = stack.pop()!;
    tree.edges.forEach((e) => {
      if (e.from === current && !result.has(e.to)) {
        result.add(e.to);
        stack.push(e.to);
      }
    });
  }
  return [...result];
}

export function findPath(fromId: string, toId: string, tree = buildInfluenceTree()): string[] | null {
  const queue: [string, string[]][] = [[fromId, [fromId]]];
  const visited = new Set<string>([fromId]);
  while (queue.length) {
    const [current, path] = queue.shift()!;
    if (current === toId) return path;
    tree.edges.forEach((e) => {
      if (e.from === current && !visited.has(e.to)) {
        visited.add(e.to);
        queue.push([e.to, [...path, e.to]]);
      }
    });
  }
  return null;
}