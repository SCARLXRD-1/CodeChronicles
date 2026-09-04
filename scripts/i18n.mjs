#!/usr/bin/env node
/**
 * scripts/i18n.mjs
 * ============================================================================
 * Herramienta CLI para la gestión integral de internacionalización (i18n)
 * de CodeChronicles.
 * 
 * Modos de uso:
 *   node scripts/i18n.mjs audit             -> Audita claves en el código vs diccionarios
 *   node scripts/i18n.mjs export            -> Exporta diccionarios a JSON en src/i18n/locales/
 *   node scripts/i18n.mjs import            -> Regenera diccionarios TS desde JSON en src/i18n/locales/
 *   node scripts/i18n.mjs translate [lang]  -> Traduce automáticamente claves faltantes vía API MyMemory
 * ============================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const DICTS_DIR = path.join(SRC, 'i18n', 'dicts');
const LOCALES_DIR = path.join(SRC, 'i18n', 'locales');

const SUPPORTED_LANGS = ['es', 'en', 'fr', 'pt', 'zh', 'ja', 'de'];

// 1. Cargar el diccionario maestro combinando los archivos existentes
async function loadMasterDict() {
  try {
    const indexPath = path.join(DICTS_DIR, 'index.ts');
    // Para cargar directamente archivos ts sin compilar, usamos una importación dinámica con data URI o leemos los slices
    const dict = {};
    const files = fs.readdirSync(DICTS_DIR).filter(f => f.endsWith('.ts') && f !== 'index.ts');
    
    for (const file of files) {
      const content = fs.readFileSync(path.join(DICTS_DIR, file), 'utf-8');
      // Extrae entradas con regex de claves y bloques
      const entryRegex = /'([a-zA-Z0-9_.-]+)'\s*:\s*\{([^}]+)\}/gs;
      let match;
      while ((match = entryRegex.exec(content)) !== null) {
        const key = match[1];
        const inner = match[2];
        const langObj = {};
        
        const langRegex = /([a-z]{2})\s*:\s*(?:'([^']*(?:\\.[^']*)*)'|"([^"]*(?:\\.[^"]*)*)")/g;
        let lMatch;
        while ((lMatch = langRegex.exec(inner)) !== null) {
          const l = lMatch[1];
          const val = (lMatch[2] !== undefined ? lMatch[2] : lMatch[3]).replace(/\\'/g, "'").replace(/\\"/g, '"');
          langObj[l] = val;
        }
        dict[key] = langObj;
      }
    }
    return dict;
  } catch (err) {
    console.error('Error al cargar masterDict:', err);
    return {};
  }
}

// 2. Extraer todas las claves usadas en el código fuente
function scanUsedKeys(dir = SRC) {
  const keys = new Set();
  const files = fs.readdirSync(dir, { recursive: true });

  for (const f of files) {
    const full = path.join(dir, f);
    if (!fs.statSync(full).isFile() || (!full.endsWith('.ts') && !full.endsWith('.html'))) continue;
    if (full.includes('i18n/dicts')) continue;

    const code = fs.readFileSync(full, 'utf-8');
    
    // tr('key') o tr(`key`)
    const trRegex = /tr\(\s*['"`]([a-zA-Z0-9_.-]+)['"`]\s*[,)]/g;
    let m;
    while ((m = trRegex.exec(code)) !== null) {
      keys.add(m[1]);
    }

    // data-i18n="key"
    const dataRegex = /data-i18n=["']([a-zA-Z0-9_.-]+)["']/g;
    while ((m = dataRegex.exec(code)) !== null) {
      keys.add(m[1]);
    }
  }

  return Array.from(keys).sort();
}

// 3. Auditoría de cobertura
async function audit() {
  console.log('\n========================================================');
  console.log('  🔍 AUDITORÍA DE INTERNACIONALIZACIÓN (i18n)');
  console.log('========================================================\n');

  const dict = await loadMasterDict();
  const usedKeys = scanUsedKeys();
  const dictKeys = Object.keys(dict);

  console.log(`📌 Claves referenciadas en código: ${usedKeys.length}`);
  console.log(`📚 Claves definidas en diccionarios: ${dictKeys.length}`);

  // Verificar cobertura por idioma
  const coverage = {};
  SUPPORTED_LANGS.forEach(l => coverage[l] = 0);

  const missingKeys = [];
  for (const k of dictKeys) {
    SUPPORTED_LANGS.forEach(l => {
      if (dict[k] && dict[k][l]) coverage[l]++;
    });
  }

  console.log('\n📊 Cobertura por Idioma:');
  console.log('--------------------------------------------------------');
  for (const l of SUPPORTED_LANGS) {
    const count = coverage[l];
    const pct = ((count / dictKeys.length) * 100).toFixed(1);
    const flag = l === 'es' ? '🇪🇸' : l === 'en' ? '🇬🇧' : l === 'fr' ? '🇫🇷' : l === 'pt' ? '🇵🇹' : l === 'zh' ? '🇨🇳' : l === 'ja' ? '🇯🇵' : '🇩🇪';
    console.log(`  ${flag} [${l.toUpperCase()}]  ${count.toString().padStart(3)} / ${dictKeys.length} (${pct}%)`);
  }
  console.log('--------------------------------------------------------\n');

  // Claves usadas en código pero no definidas en dict
  const undefinedKeys = usedKeys.filter(k => !dict[k]);
  if (undefinedKeys.length > 0) {
    console.warn(`⚠️  ALERTA: Hay ${undefinedKeys.length} clave(s) usadas en código que NO están en los diccionarios:`);
    undefinedKeys.forEach(k => console.warn(`   - ${k}`));
  } else {
    console.log('✅ Todas las claves usadas en el código están registradas en los diccionarios.');
  }

  console.log('');
}

// 4. Exportar a archivos JSON por idioma
async function exportToJSON() {
  console.log('\n📦 Exportando diccionarios a JSON...');
  if (!fs.existsSync(LOCALES_DIR)) {
    fs.mkdirSync(LOCALES_DIR, { recursive: true });
  }

  const dict = await loadMasterDict();
  const perLang = {};
  SUPPORTED_LANGS.forEach(l => perLang[l] = {});

  for (const [key, translations] of Object.entries(dict)) {
    SUPPORTED_LANGS.forEach(l => {
      if (translations[l]) {
        perLang[l][key] = translations[l];
      }
    });
  }

  for (const l of SUPPORTED_LANGS) {
    const dest = path.join(LOCALES_DIR, `${l}.json`);
    fs.writeFileSync(dest, JSON.stringify(perLang[l], null, 2), 'utf-8');
    console.log(`  -> Guardado: ${path.relative(ROOT, dest)} (${Object.keys(perLang[l]).length} claves)`);
  }

  console.log('✅ Exportación completada con éxito.\n');
}

// 5. Traductor automático vía MyMemory API (con rate limiting)
async function translateText(text, targetLang) {
  if (!text || targetLang === 'es') return text;
  
  // Limpieza rápida de HTML
  const encoded = encodeURIComponent(text);
  const url = `https://api.mymemory.translated.net/get?q=${encoded}&langpair=es|${targetLang}`;
  
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data && data.responseData && data.responseData.translatedText) {
      return data.responseData.translatedText;
    }
  } catch (err) {
    console.warn(`   [WARN] Error traduciendo "${text.substring(0, 25)}..." a [${targetLang}]: ${err.message}`);
  }
  return null;
}

async function syncTranslations(targetLang = null) {
  const langs = targetLang ? [targetLang] : SUPPORTED_LANGS.filter(l => l !== 'es');
  console.log(`\n🌐 Sincronizando traducciones faltantes para: [${langs.join(', ')}]...`);

  const dict = await loadMasterDict();
  let updatedCount = 0;

  for (const [key, entry] of Object.entries(dict)) {
    const esText = entry['es'];
    if (!esText) continue;

    for (const lang of langs) {
      if (!entry[lang] || entry[lang].trim() === '') {
        console.log(`  Traduciendo [${lang}] "${key}": "${esText.substring(0, 40)}..."`);
        const translated = await translateText(esText, lang);
        if (translated) {
          entry[lang] = translated;
          updatedCount++;
          // Espera 300ms para evitar rate-limits
          await new Promise(r => setTimeout(r, 300));
        }
      }
    }
  }

  console.log(`\n✅ Traducción automática completada: ${updatedCount} textos actualizados.`);
  if (updatedCount > 0) {
    await exportToJSON();
  }
}

// CLI Runner
const [,, cmd, arg] = process.argv;

switch (cmd) {
  case 'audit':
    await audit();
    break;
  case 'export':
    await exportToJSON();
    break;
  case 'translate':
    await syncTranslations(arg);
    break;
  default:
    console.log(`
Uso de scripts/i18n.mjs:
  node scripts/i18n.mjs audit             -> Audita y reporta cobertura de traducción
  node scripts/i18n.mjs export            -> Exporta diccionarios a src/i18n/locales/*.json
  node scripts/i18n.mjs translate [lang]  -> Traduce automáticamente claves faltantes (ej: en, fr, de)
`);
    break;
}
