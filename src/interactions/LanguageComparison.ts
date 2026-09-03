import { languages } from '../data/languages';
import { esc } from '../content/ChroniclesContent';
import type { LanguageEntry } from '../data/types';

/**
 * LanguageComparison — FASE 6
 * Comparador interactivo de lenguajes a través del tiempo.
 * Muestra la evolución de la computación con sintaxis resaltada,
 * numeración de líneas y controles interactivos cinematográficos.
 */

function languageOptions(selectedId?: string): string {
  return languages
    .map(
      (l) =>
        `<option value="${l.id}" ${l.id === selectedId ? 'selected' : ''}>${esc(l.name)} (${l.year})</option>`,
    )
    .join('\n');
}

function fileExtension(id: string): string {
  if (id.includes('fortran')) return 'f';
  if (id.includes('lisp')) return 'lisp';
  if (id.includes('c-lang') || id.includes('c-')) return 'c';
  if (id.includes('python')) return 'py';
  if (id.includes('java-')) return 'java';
  if (id.includes('javascript') || id.includes('js')) return 'js';
  if (id.includes('rust')) return 'rs';
  if (id.includes('go')) return 'go';
  if (id.includes('cobol')) return 'cbl';
  if (id.includes('pascal')) return 'pas';
  if (id.includes('basic')) return 'bas';
  if (id.includes('assembly') || id.includes('asm')) return 'asm';
  return 'src';
}

/**
 * Resalta sintaxis con un lexer determinista que nunca corrompe etiquetas HTML
 */
function highlightSyntax(code: string): string {
  const lines = code.trim().split('\n');
  return lines
    .map((rawLine, idx) => {
      const lineNum = idx + 1;
      const highlighted = highlightLine(rawLine);
      return `<span class="tcode__line"><span class="tcode__line-num">${lineNum}</span><span class="tcode__code">${highlighted}</span></span>`;
    })
    .join('\n');
}

function highlightLine(line: string): string {
  // 1. Aislar comentario final si existe
  let codePart = line;
  let commentPart = '';
  const commentIdx = line.search(/(\/\/|;|#|--)/);
  if (commentIdx !== -1) {
    codePart = line.slice(0, commentIdx);
    commentPart = `<span class="tok-comment">${esc(line.slice(commentIdx))}</span>`;
  }

  // 2. Tokenizar strings, números, palabras clave y operadores
  const tokenRegex =
    /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(\b\d+(?:\.\d+)?\b)|(\b(?:PROGRAM|PRINT|END|defun|if|cond|let|lambda|define|int|char|void|return|function|const|var|val|fn|func|import|package|include|main|printf|puts|println|format|write|SELECT|FROM|WHERE|DO|WHILE|FOR|class|struct|new|nil|null|true|false)\b)|([(){}[\].,;:+\-*/%=<>!&|^~]+)/gi;

  let lastIndex = 0;
  let html = '';
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(codePart)) !== null) {
    if (match.index > lastIndex) {
      html += esc(codePart.slice(lastIndex, match.index));
    }

    const [, str, num, kw, op] = match;
    if (str) {
      html += `<span class="tok-str">${esc(str)}</span>`;
    } else if (num) {
      html += `<span class="tok-num">${esc(num)}</span>`;
    } else if (kw) {
      html += `<span class="tok-kw">${esc(kw)}</span>`;
    } else if (op) {
      html += `<span class="tok-op">${esc(op)}</span>`;
    }

    lastIndex = tokenRegex.lastIndex;
  }

  if (lastIndex < codePart.length) {
    html += esc(codePart.slice(lastIndex));
  }

  return html + commentPart;
}

function codeCard(l: LanguageEntry | undefined, side: 'a' | 'b'): string {
  if (!l) {
    return `<div class="compare__card" data-side="${side}"><p class="meta">Selecciona un lenguaje</p></div>`;
  }
  const ext = fileExtension(l.id);
  const rawCode = l.codeSample ?? '// sin código disponible';

  return `
    <div class="compare__card" data-side="${side}">
      <div class="compare__card-head">
        <div class="compare__title-group">
          <span class="compare__era-badge">${esc(l.era.replace(/-/g, ' '))}</span>
          <h4 class="compare__name">${esc(l.name)}</h4>
        </div>
        <div class="compare__meta-badge">
          <span class="compare__year">${l.year}</span>
          <span class="compare__author">${esc(l.creators[0] ?? '')}</span>
        </div>
      </div>

      <div class="tcode tcode--compare">
        <div class="tcode__bar">
          <span class="tcode__dots" aria-hidden="true"><i></i><i></i><i></i></span>
          <span class="tcode__file">${esc(l.name.toLowerCase())}.${ext}</span>
          <button class="tcode__copy" type="button" data-copy-text="${esc(rawCode)}" aria-label="Copiar código de ${esc(l.name)}">Copiar</button>
        </div>
        <pre class="tcode__body" tabindex="0">${highlightSyntax(rawCode)}<span class="tcode__caret" aria-hidden="true"></span></pre>
      </div>

      <div class="compare__problem">
        <span class="compare__problem-label">Propósito / Problema que resolvió</span>
        <p class="compare__note">${esc(l.problemSolved)}</p>
      </div>
    </div>`;
}

export function comparisonMarkup(): string {
  const first = languages[0];
  const second = languages[1] ?? languages[0];
  return `
    <div class="compare" data-compare>
      <div class="compare__controls">
        <label>
          <span>Primer Lenguaje (A)</span>
          <select class="compare__select" data-compare-select="a">${languageOptions(first.id)}</select>
        </label>
        <div class="compare__versus">FRENTE A</div>
        <label>
          <span>Segundo Lenguaje (B)</span>
          <select class="compare__select" data-compare-select="b">${languageOptions(second.id)}</select>
        </label>
      </div>
      <div class="compare__grid">
        ${codeCard(first, 'a')}
        <div class="compare__arrow" aria-hidden="true">⇄</div>
        ${codeCard(second, 'b')}
      </div>
    </div>`;
}

export function bindComparison(container: HTMLElement) {
  const compare =
    container.matches?.('[data-compare]') === true
      ? container
      : container.querySelector<HTMLElement>('[data-compare]');
  if (!compare) return;

  const wireCopyButtons = () => {
    compare.querySelectorAll<HTMLButtonElement>('.tcode__copy').forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        e.preventDefault();
        const text = btn.getAttribute('data-copy-text') ?? '';
        try {
          await navigator.clipboard.writeText(text);
          const orig = btn.textContent;
          btn.textContent = '¡Copiado!';
          btn.classList.add('is-copied');
          setTimeout(() => {
            btn.textContent = orig;
            btn.classList.remove('is-copied');
          }, 2000);
        } catch {
          btn.textContent = 'Listo';
        }
      });
    });
  };

  const refresh = () => {
    const aSel = compare.querySelector<HTMLSelectElement>('[data-compare-select="a"]');
    const bSel = compare.querySelector<HTMLSelectElement>('[data-compare-select="b"]');
    const a = languages.find((l) => l.id === aSel?.value);
    const b = languages.find((l) => l.id === bSel?.value);
    const grid = compare.querySelector('.compare__grid');
    if (grid) {
      grid.innerHTML = `${codeCard(a, 'a')}<div class="compare__arrow" aria-hidden="true">⇄</div>${codeCard(b, 'b')}`;
      wireCopyButtons();
    }
  };

  compare
    .querySelectorAll<HTMLSelectElement>('.compare__select')
    .forEach((s) => s.addEventListener('change', refresh));

  wireCopyButtons();
}