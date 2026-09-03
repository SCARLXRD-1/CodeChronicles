# ⏳ CodeChronicles — Historia Interactiva de la Programación

> **Una experiencia editorial, interactiva y cinematográfica sobre la evolución de las ciencias de la computación**, desde los primeros engranajes mecánicos del siglo XIX hasta los circuitos cuánticos y la inteligencia artificial moderna.

---

## 🏛️ Descripción General

**CodeChronicles** es un museo digital interactivo que fusiona narrativa editorial profunda, renderizado 3D en tiempo real con WebGL, audio generativo espacial y laboratorios de código interactivos (*workbenches*) directamente en el navegador.

Inspirado en la iconografía de **Cronos** (el tiempo como hilo conductor de la invención humana), el proyecto recorre más de 180 años de historia a través de 11 capítulos meticulosamente documentados, con biografías de pioneros, fichas técnicas de máquinas históricas, análisis de lenguajes de programación y fragmentos ejecutables de código.

---

## ✨ Características Principales

### 🌌 Motor Tridimensional (*3D Chronos Engine*)
- Escena WebGL reactiva implementada con **Three.js**.
- Vórtice de partículas procedurales que representan el flujo temporal.
- Anillo cronológico de Cronos y glifos celestiales que responden al desplazamiento y la navegación.
- Transiciones de iluminación suaves acordes a la época histórica seleccionada.

### 📜 Narrativa Editorial en 11 Capítulos
1. **1843 — Los Orígenes Mecánicos**: Ada Lovelace, Charles Babbage y la Máquina Analítica.
2. **1940s — El Amanecer Electrónico**: Alan Turing, John von Neumann, ENIAC y la arquitectura de programa almacenado.
3. **1950s — La Era de los Compiladores**: Grace Hopper, John Backus, FORTRAN, LISP y COBOL.
4. **1960s — Sistemas y la Crisis del Software**: Margaret Hamilton, Apollo AGC, Unix, lenguajes B y C.
5. **1970s — Objetos y Microprocesadores**: Alan Kay, Xerox Alto, Smalltalk-72 y el nacimiento de SQL.
6. **1980s — Computación Personal y Sistemas Distribuidos**: Bjarne Stroustrup, C++, Perl y la democratización del microprocesador.
7. **1990s — La Web y el Auge de Internet**: Tim Berners-Lee, Brendan Eich, Java, Python, JavaScript y PHP.
8. **2000s — La Nube y la Concurrencia**: Linus Torvalds, Git, Rust, Go y sistemas masivamente distribuidos.
9. **2010s — Sistemas Reactivos y Tipado a Escala**: TypeScript, Swift, Kotlin y arquitecturas frontend modernas.
10. **2020s — La Revolución de la Inteligencia Artificial**: Modelos Transformers, Mojo, kernels acelerados y cómputo tensorial.
11. **El Futuro — Computación Cuántica y Más Allá**: Algoritmos cuánticos, Q#, puertas lógicas (Hadamard, CNOT) y biocomputación.

### 🧪 Laboratorios y Workbenches Interactivos
- **Smalltalk-72 Messaging Sandbox**: Interfaz gráfica interactiva simulando el envío de mensajes a objetos en el entorno pionero de Xerox PARC.
- **CERN Line-Mode Browser**: Emulador de terminal que reproduce la primera experiencia de hipertexto en red diseñada por Tim Berners-Lee en 1991.
- **Matriz de Atención Transformer**: Explorador interactivo de cabezales de atención (*Multi-Head Attention*) con cálculo dinámico de puntuaciones token-a-token.
- **Simulador de Circuitos Cuánticos Q#**: Entorno interactivo para aplicar compuertas cuánticas (Hadamard, Pauli-X, CNOT) y observar el vector de estado cuántico.

### 🎵 Motor de Audio Espacial Generativo
- Síntesis en tiempo real utilizando la **Web Audio API** nativa (sin assets de audio pesados).
- Capas polifónicas de sintetizador ambiental que evolucionan con la navegación temporal.
- Efectos de retroalimentación táctil sonora (*clicks*, resonancias y tonos de confirmación).

### 📐 Diagrama de Arquitectura Integrado
El proyecto incluye un diagrama de arquitectura formal generado con la skill **`archify`**, accesible de forma independiente en:
- [`codechronicles-architecture.html`](./codechronicles-architecture.html) (100% de verificaciones *showcase* aprobadas, con visualizador SVG interactivo y modos claro/oscuro).

---

## 🏗️ Arquitectura del Sistema

```
CodeChronicles/
├── index.html                           # Estructura principal y maquetación de la aplicación
├── codechronicles-architecture.html     # Diagrama de arquitectura interactivo (Archify)
├── archify-codechronicles.candidate.json# Especificación formal del modelo de arquitectura
├── src/
│   ├── main.ts                          # Punto de entrada y orquestador del ciclo de vida
│   ├── content/
│   │   └── ChroniclesContent.ts         # Motor editorial: generador de los 11 capítulos
│   ├── ui/
│   │   ├── ChroniclesUI.ts              # Controlador de UI, scrubber temporal e interactividad
│   │   └── logo.ts                      # Logotipo procedural en SVG basado en Cronos
│   ├── scene/
│   │   └── ThreeScene.ts                # Motor WebGL / Three.js de partículas y glifos
│   ├── sound/
│   │   └── SoundEngine.ts               # Sintetizador procedural con Web Audio API
│   └── data/                            # Capa desacoplada de datos históricos tipados
│       ├── characters/                  # Fichas biográficas de pioneros de la computación
│       ├── languages/                   # Especificaciones de lenguajes de programación
│       ├── machines/                    # Hardware, computadores y especificaciones
│       ├── events/                      # Hitos y sucesos cronológicos fundamentales
│       └── code/                        # Snippets históricos y metadatos de código
├── public/                              # Activos estáticos públicos
├── package.json                         # Dependencias y scripts de ejecución
└── vite.config.ts                       # Configuración de empaquetado de Vite
```

---

## 🚀 Inicio Rápido

### Requisitos Previos
- **Node.js** (versión 18 o superior)
- **npm** (versión 9 o superior)

### Instalación

1. Clona el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd CodeChronicles
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo local:
   ```bash
   npm run dev
   ```

4. Abre tu navegador en:
   ```
   http://localhost:5173/
   ```

---

## 🛠️ Scripts Disponibles

| Comando | Acción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo de Vite con recarga rápida (HMR). |
| `npm run build` | Compila TypeScript y genera el bundle de producción optimizado en `dist/`. |
| `npm run preview` | Previsualiza localmente la versión compilada en `dist/`. |
| `npm run typecheck` | Ejecuta la comprobación de tipos de TypeScript sin emitir archivos. |

---

## 💻 Tecnologías Utilizadas

- **TypeScript**: Tipado estático estricto para modelos de datos y lógica del cliente.
- **Three.js**: Renderizado 3D WebGL acelerado por hardware para fondos cósmicos y efectos procedurales.
- **Vanilla CSS**: Sistema de diseño a medida con glassmorphism, variables CSS y tipografía optimizada.
- **Web Audio API**: Generación de audio procedural y síntesis ambiental en tiempo real.
- **Vite**: Entorno de desarrollo ultrarrápido y empaquetador de producción.
- **Archify**: Motor de diagramación arquitectónica formal con validación SVG determinista.

---

## 📜 Licencia

Distribuido bajo la Licencia MIT. Consulta el archivo `LICENSE` para obtener más información.
