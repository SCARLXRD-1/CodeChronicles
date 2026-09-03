/**
 * Emblema de CodeChronicles:
 * La rueda del tiempo de Cronos (Khronos) entrelazada con las perforaciones binarias
 * de las tarjetas de Jacquard/Lovelace, los engranajes de Babbage y la sintaxis de código < / >.
 */
export function getChronosLogoSvg(size = 28, className = 'chronos-emblem'): string {
  return `
    <svg class="${className}" width="${size}" height="${size}" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="emblemBg-${size}" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stop-color="#1c2838"/>
          <stop offset="65%" stop-color="#090e15"/>
          <stop offset="100%" stop-color="#030508"/>
        </radialGradient>
        <linearGradient id="emblemGold-${size}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fff0be"/>
          <stop offset="35%" stop-color="#f0c660"/>
          <stop offset="70%" stop-color="#c99836"/>
          <stop offset="100%" stop-color="#7d5918"/>
        </linearGradient>
        <linearGradient id="emblemAmber-${size}" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#c99836"/>
          <stop offset="50%" stop-color="#fcedb4"/>
          <stop offset="100%" stop-color="#ffffff"/>
        </linearGradient>
      </defs>

      <!-- 1. Disco base oscuro -->
      <circle cx="64" cy="64" r="60" fill="url(#emblemBg-${size})" stroke="url(#emblemGold-${size})" stroke-width="2.5"/>

      <!-- 2. Rueda del tiempo: Dientes mecánicos y graduaciones binarias -->
      <g stroke="url(#emblemGold-${size})" stroke-width="1.8" fill="none" opacity="0.85">
        <circle cx="64" cy="64" r="53" stroke-dasharray="2.5 5.5" stroke-width="1.4"/>
        <line x1="64" y1="4" x2="64" y2="11" stroke-width="3" stroke-linecap="round"/>
        <line x1="64" y1="117" x2="64" y2="124" stroke-width="3" stroke-linecap="round"/>
        <line x1="4" y1="64" x2="11" y2="64" stroke-width="3" stroke-linecap="round"/>
        <line x1="117" y1="64" x2="124" y2="64" stroke-width="3" stroke-linecap="round"/>
        <circle cx="28" cy="28" r="2.2" fill="#f0c660" stroke="none"/>
        <circle cx="100" cy="28" r="2.2" fill="#f0c660" stroke="none"/>
        <circle cx="28" cy="100" r="2.2" fill="#f0c660" stroke="none"/>
        <circle cx="100" cy="100" r="2.2" fill="#f0c660" stroke="none"/>
      </g>

      <!-- 3. Órbita armilar elíptica inclinada -->
      <ellipse cx="64" cy="64" rx="46" ry="18" fill="none" stroke="url(#emblemGold-${size})" stroke-width="1.5" stroke-dasharray="5 3" transform="rotate(-30 64 64)" opacity="0.65"/>

      <!-- 4. Hoz de Cronos en forma de 'C' (Code & Chronicles) -->
      <path d="M 76 22 A 42 42 0 1 0 76 106 A 48 48 0 0 1 76 22 Z" fill="url(#emblemGold-${size})"/>
      <path d="M 68 28 A 36 36 0 0 0 34 64 A 36 36 0 0 0 68 100" fill="none" stroke="#fff5d0" stroke-width="1.5" opacity="0.75" stroke-linecap="round"/>

      <!-- 5. Sintaxis de Programación: < / > -->
      <path d="M 52 52 L 42 64 L 52 76" fill="none" stroke="#fffbf0" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="72" y1="44" x2="56" y2="84" stroke="url(#emblemAmber-${size})" stroke-width="4" stroke-linecap="round"/>
      <path d="M 76 52 L 86 64 L 76 76" fill="none" stroke="#fffbf0" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>

      <!-- 6. Singularidad temporal -->
      <g transform="translate(64, 64)">
        <circle cx="0" cy="0" r="3.5" fill="#ffffff"/>
        <path d="M 0 -8 L 1.5 -2 L 7 0 L 1.5 2 L 0 8 L -1.5 2 L -7 0 L -1.5 -2 Z" fill="#fff5cc"/>
      </g>
    </svg>`;
}
