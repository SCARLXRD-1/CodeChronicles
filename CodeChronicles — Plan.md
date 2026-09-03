# 🌌 CodeChronicles — Plan Maestro

## Experiencia editorial cinematográfica e interactiva sobre la historia de la programación

> **Concepto central:** CodeChronicles será una experiencia web editorial, cinematográfica e interactiva que se recorre mediante el scroll, como si el usuario estuviera atravesando visualmente la historia de la programación.

---

# 1. 🧠 Concepto principal

## Nombre definitivo

# **CodeChronicles**

CodeChronicles no será un videojuego, un curso tradicional ni una página de documentación.

Será una **experiencia narrativa digital** que combinará:

* 📖 Narrativa histórica.
* 🎬 Dirección cinematográfica.
* 🌐 Experiencia web interactiva.
* 🧑‍💻 Historia de la programación.
* 💻 Historia de los lenguajes de programación.
* ⚙️ Evolución de las máquinas y computadoras.
* 👨‍🔬 Personajes históricos.
* 🧩 Interacciones educativas.
* 🗓️ Línea temporal.
* 🌌 Escenas 3D/WebGL.
* 🎨 Dirección artística editorial.
* 🔎 Exploración visual mediante scroll.
* 🤖 IA como herramienta educativa complementaria.

### Regla fundamental

> **El usuario no debe sentir que está leyendo una página sobre la historia de la programación. Debe sentir que está atravesándola.**

La interfaz, las animaciones, la cámara, las imágenes, el sonido y la tipografía deben trabajar juntos para construir esa sensación.

---

# 2. 🎬 Filosofía de la experiencia

La experiencia debe sentirse más cercana a:

> **un libro de arte digital + documental interactivo + instalación audiovisual + experiencia WebGL**

que a una aplicación educativa convencional.

El usuario comienza en el presente y, mediante el desplazamiento, comienza a viajar hacia atrás en el tiempo.

Posteriormente recorrerá toda la evolución de la programación hasta regresar al presente y finalmente avanzar hacia una representación del futuro.

---

# 2.B. 🏛️ Arquitectura Actual de la Web: Dirección Editorial Cinemática

La experiencia de CodeChronicles está construida sobre una arquitectura editorial y cinematográfica propia, diseñada para transformar la historia viva del software en una instalación digital interactiva de alta fidelidad.

La web funciona mediante un **sistema bicapa perfectamente sincronizado por scroll**:

```text
┌─────────────────────────────────────────────────────────────┐
│  CAPA 1: CANVAS 3D AMBIENTAL (Chrono-Engine WebGL)          │
│  - Aros concéntricos giroscópicos con diales procedimentales │
│  - Vórtice temporal y singularidad de luz reactiva           │
│  - Cámara amortiguada (CameraRig) guiada por el scroll      │
├─────────────────────────────────────────────────────────────┤
│  CAPA DE PROTECCIÓN: SCRIM AMBIENTAL GLOBAL (#app::before) │
│  - Gradiente radial oscuro obsidian que asegura 100%        │
│    de legibilidad tipográfica sobre el fondo 3D             │
├─────────────────────────────────────────────────────────────┤
│  CAPA 2: OVERLAY EDITORIAL (DOM Semántico de Alto Contraste)│
│  - Escenas de 100vh autosuficientes y equilibradas          │
│  - Placas en cristal ahumado oscuro con elevación fija      │
│  - Tipografía display serif + monospace de precisión        │
└─────────────────────────────────────────────────────────────┘
```

La experiencia se despliega en **escenas cinemáticas de 100vh autosuficientes** compuestas por 7 módulos estructurales:

### 1. Hero Cinemático (El Umbral)
* **Titular en Serif Display de alto impacto:** *"Donde las ideas se convierten en lenguaje."* con color `#ffffff` y sombras volumétricas multicapa que garantizan nitidez absoluta.
* **Ventana de previsualización flotante (`.peek`):** Micro-ventana interactiva en perspectiva sobre el lateral derecho con gradiente ámbar y botón de reproducción sutil.
* **Línea de pulso temporal:** Indicador dinámico de avance.
* **Cuadrícula de acceso directo (`.chapters-grid` / `.chip`):** 4 tarjetas de control en cristal ahumado oscuro (`rgba(8, 13, 20, 0.78)` con `backdrop-filter: blur(20px)`), números dorados luminosos (`#f0c660`) y títulos en blanco nítido que permiten viajar instantáneamente a cada era:
  - `01` ANTES DEL CÓDIGO (1843 — Lovelace & Babbage)
  - `02` LAS MÁQUINAS (1936 — Turing & Zuse)
  - `03` PRIMEROS LENGUAJES (1957 — Fortran & Grace Hopper)
  - `04` SISTEMAS Y RED (1970 — C, Unix & Conexión Global)

### 2. El Portal del Capítulo (Chapter Gate)
Cada época abre con una escena de bienvenida que sitúa al lector en tiempo y espacio:
* **Encabezado editorial (`.sec-head`):** Línea tensada ultrafina con metadatos técnicos monoespaciados (`01 — ANTES DEL CÓDIGO` ────── `1843 · LONDRES`).
* **Composición asimétrica (`.gate-grid`):**
  - Columna izquierda: Titular monumental en serif display con contraste reforzado.
  - Columna derecha: Párrafo lead, narrativa de época y enlace direccional (`.arrowlink`) con flecha técnica SVG que guía al usuario hacia la siguiente escena.
* **Franja de estadísticas de época (`.gate-stats`):** 4 métricas históricas de alto impacto (año clave, velocidad de ciclo, líneas de código fundacionales o creadores clave).

### 3. Galería de Placas Históricas (Dedicated Cards Stagger)
Escena de 100vh dedicada exclusivamente a las 3 piezas fundamentales de la época:
* **Tarjetas en cristal ahumado oscuro:** Fondo `rgba(7, 11, 17, 0.88)` con borde translúcido `1px solid rgba(223, 231, 224, 0.16)` y sombras de profundidad `box-shadow: 0 24px 60px rgba(0,0,0,0.95)`.
* **Elevación escalonada vertical:** La tarjeta 1 se alinea al inicio, la tarjeta 2 baja suavemente y la tarjeta 3 desciende aún más, creando una cascada visual armoniosa que nunca invade ni corta el encabezado.
* **Composición interna de cada placa:**
  - Insignia técnica discreta superior: `CHRONO // OBS`.
  - Eyebrow dorado con la categoría (`Figura Histórica`, `Hardware`, `Lenguaje Pionero`).
  - Nombre en tipografía display.
  - Metadatos (año, profesión, creadores).
  - Cita célebre en cursiva entrecomillada con barra lateral dorada (`.scene__quote`).
  - Pie de tarjeta (`.card-meta`) con resumen técnico.

### 4. Banco Arqueológico (Workbench de Código y Cronología)
* **Terminal Tipográfica (`.tcode`):** Reproduce con fidelidad facsimilar manuscritos algorítmicos históricos (como la Nota G de Ada Lovelace para calcular los números de Bernoulli en la Máquina Analítica de 1843), con barra superior de botones de ventana estilo Unix, numeración de pasos, comentarios explicativos, cursor titilante y botón funcional para copiar el código al portapapeles.
* **Cronología Interactiva (`.timeline-panel`):** Panel en cristal ahumado opaco con escala temporal, riel de deslizamiento y nodos interactivos que permiten inspeccionar hitos sucesivos (Telar de Jacquard, Máquina de Diferencias, Máquina Analítica, etc.) sin que las cintas 3D de fondo transparenten ni molesten la lectura.

### 5. Curriculum y Roadmap de Lenguajes (`.cur` y `.les`)
Diseñado como un catálogo histórico estructurado con alta legibilidad:
* Encabezado con título de transición (`La rebelión contra los ceros y unos: el nacimiento del compilador`) y lead contextual.
* Filas interactivas (`.les`): Cada fila está encapsulada en una placa de cristal oscuro con número de hito, nombre del lenguaje (Fortran, Lisp, COBOL, Simula 67, C, Python), creadores e institución (IBM, MIT, US Navy, Bell Labs), descripción y año dorado.
* **Barra animada en hover (`.bar`):** Al posar el ratón, una barra dorada ultra fina se dibuja de izquierda a derecha con una transición suave de `0.7s`.

### 6. Laboratorio Comparativo de Paradigmas
Comparador interactivo en tiempo real donde el usuario puede contrastar cómo diferentes filosofías (ensamblador, estructurado, funcional, orientado a objetos) resuelven la misma lógica computacional.

### 7. Epílogo Cinemático y Retorno al Umbral
Cierre reflexivo con la síntesis del viaje y botón interactivo tipo píldora (`.cta-pill`) que permite regresar suavemente al inicio de la experiencia.

---

# 2.C. 🚫 Decisiones de Diseño: Lo que YA NO USAMOS ni se implementará

A lo largo de la evolución del proyecto y de acuerdo con el feedback visual directo, se descartaron definitivamente los siguientes elementos y patrones que figuraban en borradores preliminares:

1. ❌ **Giro 3D / Tilt con el mouse en las tarjetas:**
   - *Motivo del descarte:* Provocaba mareo, deformaba la lectura de los textos históricos y rompía la serenidad editorial.
   - *Solución actual:* Las tarjetas son placas fijas con una elevación vertical sutil y sobria (`translateY(-4px)`), manteniendo una experiencia de lectura digna y cinematográfica.

2. ❌ **Micro-momentos hiperfragmentados de una sola frase:**
   - *Motivo del descarte:* Dividir cada capítulo en 8 micro-pantallas de una sola línea hacía que la web se sintiera vacía y provocaba cortes de texto accidentales (como la palabra aislada «máquinas.» en la parte superior).
   - *Solución actual:* Cada momento narrativo se agrupa en una **escena completa de 100vh** (Portal, Galería de Tarjetas, Workbench, Curriculum) donde todo el contenido convive con proporciones áureas.

3. ❌ **Textos sin protección de contraste sobre el lienzo 3D:**
   - *Motivo del descarte:* Los aros dorados y partículas de Three.js cruzaban directamente por detrás de las letras, dificultando la lectura en pantallas de alta resolución.
   - *Solución actual:* Se implementó un **scrim ambiental global** (`#app::before`), filtros cinemáticos al canvas (`brightness(0.68) contrast(1.1)`) y sombras tipográficas multicapa (`text-shadow: 0 2px 4px rgba(0,0,0,0.95)`). El texto es 100% nítido y legible en cualquier punto.

4. ❌ **Sistemas de gamificación tradicional (XP, misiones, combate, inventario):**
   - *Motivo del descarte:* Restan seriedad a la historia y desvían la atención de la belleza cultural y técnica de la informática. La recompensa es el descubrimiento visual e intelectual.

5. ❌ **Dependencia obligatoria de Backend o Base de Datos Externa (Neon/Postgres) para la navegación:**
   - *Motivo del descarte:* Introducía latencia, configuraciones complejas de red y riesgos de indisponibilidad.
   - *Solución actual:* La experiencia completa opera de forma nativa, estática y ultrarrápida mediante Vite + TypeScript con datos modulares locales (`src/data/`), cargando a 60 FPS en cualquier navegador o servidor.

---

# 3. 🖱️ El scroll como mecanismo narrativo principal

El scroll será uno de los elementos fundamentales de CodeChronicles.

No debe utilizarse simplemente para desplazarse verticalmente por una página.

El scroll controlará progresivamente:

* La posición de la cámara.
* La transición entre escenas.
* La aparición de personajes.
* La transformación del entorno.
* La iluminación.
* Las partículas.
* La profundidad de campo.
* La aparición de textos.
* La transformación de objetos.
* Las capas de foreground.
* Los cambios temporales.
* Las transiciones entre capítulos.

### Concepto

```text
SCROLL
   ↓
MOVIMIENTO DE CÁMARA
   ↓
TRANSFORMACIÓN DE ESCENA
   ↓
NUEVO MOMENTO HISTÓRICO
   ↓
NUEVO CAPÍTULO
```

Cada sección debe sentirse como una **toma cinematográfica**.

No debe existir una separación brusca entre capítulos cuando pueda realizarse una transición visual continua.

---

# 4. 🌌 Estructura general de la experiencia

La experiencia completa tendrá una estructura narrativa similar a:

```text
HERO
   ↓
PRÓLOGO
   ↓
ANTES DEL CÓDIGO
   ↓
PRIMEROS ALGORITMOS
   ↓
MÁQUINAS PROGRAMABLES
   ↓
NACIMIENTO DE LA COMPUTACIÓN
   ↓
LENGUAJE DE MÁQUINA
   ↓
ASSEMBLY
   ↓
PRIMEROS LENGUAJES
   ↓
PROGRAMACIÓN EMPRESARIAL
   ↓
PROGRAMACIÓN ESTRUCTURADA
   ↓
C
   ↓
PROGRAMACIÓN ORIENTADA A OBJETOS
   ↓
INTERNET
   ↓
WEB
   ↓
PROGRAMACIÓN MODERNA
   ↓
ERA MÓVIL
   ↓
SISTEMAS MODERNOS
   ↓
IA Y PROGRAMACIÓN ASISTIDA
   ↓
FUTURO DEL CÓDIGO
   ↓
EPÍLOGO
```

Esta estructura es una evolución de la división histórica original de CodeChronicles.

---

# 5. 🕰️ Línea temporal

La historia será organizada cronológicamente.

La interfaz podrá incorporar una línea temporal vertical o horizontal que permita al usuario comprender en qué momento histórico se encuentra.

Ejemplo:

```text
1843
│
├── Ada Lovelace
│
└── Primer algoritmo destinado a una máquina
       │
       ↓
1930s
│
├── Máquinas programables
│
       ↓
1940s
│
├── Computadoras electrónicas
│
       ↓
1950s
│
├── FORTRAN
├── LISP
├── COBOL
│
       ↓
1970s
│
├── C
├── Pascal
│
       ↓
1980s
│
├── C++
│
       ↓
1990s
│
├── Python
├── Java
├── JavaScript
│
       ↓
2000s+
│
├── Go
├── Rust
├── IA
│
       ↓
FUTURO
```

La línea temporal debe ser visual y narrativa, no solamente una lista de fechas.

---

# 6. 🎥 Dirección cinematográfica

CodeChronicles utilizará una composición visual inspirada en experiencias editoriales cinematográficas.

Cada capítulo funcionará como una escena.

Debe existir:

* Cámara cinematográfica.
* Transiciones suaves.
* Profundidad.
* Parallax.
* Movimiento lento.
* Iluminación dinámica.
* Haze.
* Partículas.
* Sombras.
* Vignette.
* Film grain sutil.
* Bloom moderado.
* Desenfoque de profundidad cuando tenga sentido.
* Capas visuales en foreground y background.

### Principio

> **La animación debe contar algo.**

No agregar movimiento simplemente porque puede hacerse.

Cada transición debe representar:

* un cambio temporal,
* una evolución tecnológica,
* una transformación conceptual,
* una aparición histórica,
* una conexión entre ideas,
* o un cambio de época.

---

# 7. 🖥️ Canvas 3D / WebGL

El entorno visual principal podrá utilizar un canvas WebGL a pantalla completa.

El canvas permanecerá como una capa ambiental mientras el contenido editorial se posiciona sobre él.

Conceptualmente:

```text
┌─────────────────────────────────────┐
│                                     │
│         WEBGL / 3D WORLD            │
│                                     │
│    ┌─────────────────────────┐      │
│    │       CONTENIDO         │      │
│    │       EDITORIAL         │      │
│    └─────────────────────────┘      │
│                                     │
│          ATMÓSFERA / FX             │
│                                     │
└─────────────────────────────────────┘
```

El usuario no debe percibir el WebGL como una demo técnica.

Debe percibirlo como **el espacio visual donde ocurre la historia**.

---

# 8. ⚙️ Evolución visual de la programación

La estética debe evolucionar junto con la historia.

No todas las épocas deben tener exactamente el mismo entorno.

### Primeras máquinas

Elementos visuales:

* Engranajes.
* Metal.
* Papel.
* Diagramas.
* Mecanismos.
* Tarjetas perforadas.
* Planos.
* Manuscritos.
* Máquinas mecánicas.

### Primeras computadoras

* Relés.
* Cables.
* Paneles.
* Tubos de vacío.
* Interruptores.
* Grandes estructuras computacionales.
* Papel perforado.

### Era de lenguajes

* Terminales.
* Monitores.
* Texto.
* Código.
* Diagramas.
* Compiladores.
* Consolas.

### Internet

* Redes.
* Nodos.
* Cables.
* Servidores.
* Pantallas.
* Interfaces tempranas.
* Navegadores.

### Era moderna

* Laptops.
* Smartphones.
* Servidores.
* Nubes de datos.
* Sistemas distribuidos.
* Código moderno.

### IA / futuro

* Redes neuronales.
* Flujos de datos.
* Modelos.
* Sistemas autónomos.
* Interfaces naturales.
* Computación avanzada.

---

# 9. 🎨 Dirección artística

La dirección visual debe ser:

> **Cinemática + editorial + tecnológica + histórica + minimalista.**

No se buscará hiperrealismo.

Tampoco se buscará una estética genérica de "web tecnológica".

Debe existir una identidad propia.

### Evitar

* ❌ Glassmorphism excesivo.
* ❌ Gradientes genéricos.
* ❌ Neones utilizados sin propósito.
* ❌ Interfaces saturadas.
* ❌ Animaciones constantes.
* ❌ Elementos decorativos aleatorios.
* ❌ Estética de dashboard.
* ❌ Apariencia de videojuego.
* ❌ HUD tradicional.
* ❌ Barras de vida.
* ❌ XP.
* ❌ Puntos.
* ❌ Misiones.

---

# 10. 🖼️ Editorial digital

La interfaz tendrá una fuerte influencia editorial.

Utilizar:

* Grandes titulares.
* Tipografía display.
* Números de capítulo.
* Fechas.
* Etiquetas técnicas.
* Líneas finas.
* Mucho espacio negativo.
* Composiciones asimétricas.
* Textos breves.
* Citas históricas.
* Fotografías/ilustraciones.
* Diagramas.
* Fragmentos de código.
* Fichas históricas.

Ejemplo:

```text
CHAPTER 03

1940s

THE MACHINE
BECOMES
A COMPUTER

A new kind of machine
was about to change
the meaning of calculation.
```

La información debe presentarse de forma visual y progresiva.

---

# 11. 👨‍💻 Personajes históricos

Los personajes históricos seguirán siendo una parte fundamental.

Entre ellos:

* Ada Lovelace.
* Charles Babbage.
* Alan Turing.
* Konrad Zuse.
* Grace Hopper.
* John Backus.
* John McCarthy.
* Dennis Ritchie.
* Ken Thompson.
* Niklaus Wirth.
* Bjarne Stroustrup.
* James Gosling.
* Guido van Rossum.
* Yukihiro Matsumoto.
* Brendan Eich.
* Anders Hejlsberg.
* Graydon Hoare.
* Robert Griesemer.
* Rob Pike.
* y muchos más.

La lista procede del planteamiento histórico original y deberá ampliarse conforme avance la investigación.

### Regla

Cada personaje debe representar correctamente su contribución.

No convertir la historia en una competición artificial.

No afirmar que una única persona "inventó toda la programación".

---

# 12. 🧑‍🔬 Personajes como narrativa visual

Los personajes no serán NPCs tradicionales.

Podrán aparecer como:

* Retratos.
* Siluetas.
* Ilustraciones.
* Fotografías históricas.
* Documentos.
* Fragmentos de texto.
* Animaciones.
* Apariciones dentro de una escena.
* Citas.
* Fichas editoriales.

Ejemplo:

```text
          ADA LOVELACE

          1815 — 1852

     ─────────────────────

     Mathematics
     Analytical Engine
     Algorithm

     "Historia de su contribución..."
```

La representación deberá distinguir claramente:

**hecho histórico** vs. **recreación artística**.

---

# 13. 💻 Historia de los lenguajes

Los lenguajes de programación serán uno de los pilares del proyecto.

CodeChronicles contará con un **Language Registry** central.

Cada lenguaje podrá contener:

```text
Nombre
Año aproximado
Creadores / equipo
Contexto histórico
Problema que intentaba resolver
Influencias
Lenguajes posteriores influenciados
Paradigmas
Estado actual
Historia
Curiosidades
Ejemplos de código
Capítulo donde aparece
Fuentes
```

Esta estructura conserva el núcleo del Language Registry planteado originalmente.

---

# 14. 🌳 Árbol de influencias

Una de las interacciones más importantes será visualizar cómo los lenguajes influyeron unos sobre otros.

Ejemplo:

```text
FORTRAN
   │
   ├── ALGOL
   │     │
   │     └── Pascal
   │
   └── Lenguajes científicos


C
│
├── C++
├── Objective-C
├── Java
├── C#
├── Go
└── Rust
```

Las conexiones deberán basarse en influencias históricas reales.

Este árbol puede aparecer progresivamente mientras el usuario avanza por la historia.

---

# 15. 🧩 Interacciones educativas

Aunque CodeChronicles ya no será un videojuego, seguirá siendo interactivo.

Las interacciones pueden incluir:

### Código interactivo

Mostrar pequeños fragmentos de código históricos.

```text
FORTRAN

PROGRAM HELLO
PRINT *, "HELLO WORLD"
END
```

El usuario puede explorar:

* Qué significa.
* Por qué se utilizaba.
* Qué problema resolvía.
* Qué lenguajes influenció.

---

### Comparación

Mostrar cómo evolucionó un concepto.

```text
1950s

Código
   ↓
FORTRAN

      ↓

1980s

Código
   ↓
C

      ↓

1990s

Código
   ↓
Python
```

---

### Antes / Después

Permitir comparar diferentes generaciones tecnológicas.

```text
PUNCH CARD
     ↕
MODERN IDE
```

---

### Diagramas interactivos

El usuario puede explorar:

* Arquitecturas.
* Máquinas.
* Redes.
* Lenguajes.
* Paradigmas.
* Relaciones históricas.

---

# 16. 📜 Documentos y artefactos

Los artefactos históricos tendrán un papel importante.

Podrán aparecer:

* Manuscritos.
* Fotografías.
* Tarjetas perforadas.
* Diagramas.
* Fragmentos de código.
* Documentos técnicos.
* Manuales.
* Interfaces antiguas.
* Capturas históricas.
* Fotografías de computadoras.

Cada artefacto debe tener contexto.

No debe convertirse simplemente en una galería.

---

# 17. 🗺️ Navegación por capítulos

El usuario debe poder saber dónde se encuentra dentro de la historia.

Puede existir una navegación lateral:

```text
01 ─ PROLOGUE
02 ─ ALGORITHMS
03 ─ MACHINES
04 ─ COMPUTERS
05 ─ LANGUAGES
06 ─ SYSTEMS
07 ─ WEB
08 ─ MODERN
09 ─ AI
10 ─ FUTURE
```

El capítulo activo debe actualizarse automáticamente según el scroll.

La navegación debe permitir saltar directamente a una época.

---

# 18. 🔢 Sistema de capítulos

Cada capítulo debe tener identidad propia.

Ejemplo:

```text
CHAPTER 01
THE IDEA

Before computers,
there were algorithms.

────────────────

CHAPTER 02
THE MACHINE

The machine
learned to follow instructions.

────────────────

CHAPTER 03
THE COMPUTER

Calculation became
something programmable.
```

La estructura debe sentirse como un libro audiovisual.

---

# 19. 🌫️ Transiciones entre épocas

Las transiciones serán uno de los elementos diferenciales.

Ejemplo:

```text
TARJETA PERFORADA
        ↓
     movimiento
        ↓
     fragmentación
        ↓
     transformación
        ↓
     TEXTO
        ↓
     TERMINAL
        ↓
     CÓDIGO
```

Una máquina puede transformarse en otra.

Un documento puede convertirse en código.

Una red puede aparecer desde líneas de texto.

Un conjunto de caracteres puede convertirse en una representación visual de datos.

El objetivo:

> **mostrar visualmente la evolución, no solamente explicarla.**

---

# 20. 🎞️ Foreground cinematográfico

Se podrán utilizar capas visuales independientes:

```text
BACKGROUND
    ↓
ENTORNO 3D
    ↓
ELEMENTOS HISTÓRICOS
    ↓
ATMÓSFERA
    ↓
FOREGROUND
    ↓
TIPOGRAFÍA / CONTENIDO
```

Los elementos de foreground pueden incluir:

* Cables.
* Papeles.
* Partículas.
* Engranajes.
* Humo.
* Líneas.
* Fragmentos de código.
* Objetos históricos.

Las capas deben aparecer durante el capítulo activo y desaparecer progresivamente durante la transición.

---

# 21. 🎵 Sonido

El sonido puede complementar la narrativa.

Posibles elementos:

* Ambientes mecánicos.
* Relés.
* Teclas.
* Ventiladores.
* Máquinas.
* Terminales.
* Sonidos de almacenamiento.
* Ambientes electrónicos.
* Ruido de servidores.

El sonido debe ser:

* sutil,
* opcional,
* controlable,
* y nunca obligatorio para comprender el contenido.

---

# 22. 🌓 Iluminación y atmósfera

La iluminación deberá evolucionar con la historia.

Primeras épocas:

> tonos oscuros, metal, papel, cálidos mecánicos.

Computación:

> luz fría, paneles, cables, pantallas.

Internet:

> tonos tecnológicos y luminosos.

Era moderna:

> iluminación limpia y minimalista.

Futuro:

> estética abstracta y tecnológica.

La iluminación también puede utilizarse como transición temporal.

---

# 23. 🤖 IA dentro de CodeChronicles

La IA será una herramienta complementaria.

Podrá:

* Explicar conceptos.
* Responder preguntas.
* Simplificar explicaciones.
* Comparar lenguajes.
* Explicar fragmentos de código.
* Generar ejemplos educativos.
* Ayudar a comprender conceptos históricos.
* Proporcionar rutas de aprendizaje.
* Simular conversaciones educativas.

### Regla crítica

> **La IA no será la fuente absoluta de la historia.**

La información histórica importante debe proceder de fuentes verificables.

La IA debe distinguir claramente:

```text
HECHO HISTÓRICO
     ↓
FUENTE VERIFICADA


RECREACIÓN / SIMULACIÓN
     ↓
MARCAR COMO FICCIÓN
```

Esta regla conserva directamente uno de los principios fundamentales del proyecto original.

---

# 24. 📚 Sistema de fuentes

Cada acontecimiento histórico importante debe poder relacionarse con sus fuentes.

Las fuentes pueden almacenarse junto al contenido.

Ejemplo:

```json
{
  "event": "analytical-engine",
  "year": 1843,
  "sources": [
    {
      "title": "Fuente histórica",
      "url": "...",
      "type": "primary"
    }
  ]
}
```

El objetivo es evitar que la experiencia se convierta en una recreación histórica basada únicamente en IA.

---

# 25. 🔍 Descubrimiento

El concepto de descubrimiento del proyecto original se mantiene, pero deja de funcionar como una mecánica de videojuego.

Ahora será **descubrimiento editorial**.

Durante la experiencia podrán aparecer elementos que el usuario puede explorar:

```text
[ + ]
ADA LOVELACE
```

```text
[ + ]
ANALYTICAL ENGINE
```

```text
[ + ]
FORTRAN
```

```text
[ + ]
FIRST COMPILER
```

Al interactuar se abre información adicional.

---

# 26. 🧠 Capas de información

La experiencia debe utilizar diferentes niveles de profundidad.

### Nivel 1 — Cinemático

Una frase o concepto.

### Nivel 2 — Editorial

Una explicación breve.

### Nivel 3 — Profundización

Información histórica detallada.

### Nivel 4 — Interactivo

Código, diagramas o comparaciones.

### Nivel 5 — Fuentes

Referencias históricas.

Esto evita saturar visualmente al usuario.

---

# 27. 🧭 Timeline interactivo

La línea temporal debe permitir:

* Ver el año actual.
* Ver acontecimientos cercanos.
* Saltar a una época.
* Visualizar simultáneamente diferentes acontecimientos.
* Relacionar personas con lenguajes.
* Relacionar lenguajes con tecnologías.

Ejemplo:

```text
1800 ───── 1850 ───── 1900 ───── 1950 ───── 2000 ───── 2026
              │                    │                    │
           Babbage              FORTRAN              Python
           Lovelace             COBOL                JavaScript
                                C                    Rust
```

---

# 28. 🌐 Evolución de la interfaz

La propia interfaz puede evolucionar.

Al inicio:

> papel / documentos / diagramas.

Posteriormente:

> terminales / texto monoespaciado.

Después:

> interfaces gráficas.

Después:

> web.

Finalmente:

> interfaces contemporáneas y futuras.

La interfaz de CodeChronicles también contará la historia.

---

# 29. 📱 Responsive

La experiencia debe funcionar correctamente en:

* Desktop.
* Laptop.
* Tablet.
* Mobile.

Referencia mínima:

```text
390 × 844
```

En dispositivos móviles:

* Simplificar escenas 3D.
* Reducir partículas.
* Ajustar cámara.
* Mantener legibilidad.
* Mantener la narrativa.
* Mantener todas las secciones importantes.

La experiencia móvil no debe ser simplemente una versión rota de desktop.

---

# 30. ♿ Accesibilidad

Debe existir:

* Navegación semántica.
* Labels accesibles.
* Contraste suficiente.
* Soporte de teclado.
* Texto alternativo.
* Controles claros.
* Respeto por `prefers-reduced-motion`.

### Reduced Motion

Cuando el usuario solicite reducir movimiento:

```text
ANIMACIONES CINEMÁTICAS
        ↓
TRANSICIONES SIMPLIFICADAS
        ↓
CONTENIDO COMPLETO
```

La historia nunca debe depender exclusivamente de las animaciones.

---

# 31. 🖱️ Cursor personalizado

Puede utilizarse un cursor personalizado únicamente en dispositivos con puntero preciso.

Debe ser:

* pequeño,
* elegante,
* discreto.

No utilizar cursores gigantes o excesivamente animados.

En touch:

> utilizar el comportamiento nativo.

---

# 32. 💾 Persistencia

La persistencia deja de centrarse en XP, puntos y estado del jugador.

En su lugar podrá guardar:

```text
Usuario
│
├── capítulos visitados
├── capítulos completados
├── elementos descubiertos
├── lenguajes explorados
├── personajes explorados
├── artículos guardados
├── preferencias
└── configuración
```

Para el MVP:

```text
LocalStorage
o
IndexedDB
```

---

# 33. 🗄️ Futuro backend + Neon

En una fase posterior puede incorporarse PostgreSQL mediante **Neon**.

Objetivos:

* Cuentas.
* Sincronización.
* Progreso.
* Historial.
* Favoritos.
* Estadísticas.
* Contenido personalizado.

Arquitectura:

```text
FRONTEND
    ↓
API
    ↓
BACKEND
    ↓
POSTGRESQL / NEON
```

El backend no será obligatorio para el MVP.

---

# 34. 🔐 Seguridad

Nunca colocar en el frontend:

* API keys.
* Tokens privados.
* Credenciales.
* Secretos.
* Contraseñas.
* Credenciales de Neon.

Arquitectura:

```text
FRONTEND
    ↓
BACKEND / API
    ↓
SERVICIOS
```

---

# 35. 🏗️ Stack tecnológico y arquitectura real del software

La arquitectura de CodeChronicles está completamente implementada en producción sin frameworks pesados, garantizando máxima velocidad, tiempos de carga casi instantáneos y 60 FPS estables:

### Capa de Compilación y Tipado
* **Vite 5:** Bundler ultrarrápido con Hot Module Replacement (HMR) instantáneo y compilación de producción optimizada con Rollup.
* **TypeScript 5 (Strict Mode):** Tipado estricto en el 100% del código (`npx tsc --noEmit` con 0 errores).

### Capa 3D / WebGL (Three.js)
Ubicada en `src/experience/`:
* **`TimeMachineCore.ts` (Chrono-Engine):** Núcleo 3D cinemático compuesto por:
  - 3 Aros giroscópicos concéntricos con texturas generadas procedimentalmente en canvas (dial angular de cronómetro y secuencias binarias).
  - Vórtice temporal cónico con filamentos que reaccionan a la velocidad del scroll.
  - Singularidad central con luz puntual y halo reactivo.
* **`CameraRig.ts` & `ScrollDriver.ts`:** Controlador de scroll amortiguado (`damp`) que interpola las posiciones de cámara entre épocas.
* **`ParticleField.ts`:** Campo de polvo estelar cinemático con escalado adaptativo (180 partículas en móvil / 550 en desktop).
* **Atmósfera:** `FogHaze.ts`, `MoonGlow.ts`, `EraTint.ts`, `ScrollStreaks.ts` y `PortalDirector.ts`.

### Capa Editorial y Narrativa (Vanilla DOM)
Ubicada en `src/cinema/` y `src/content/`:
* **`SpatialPresenter.ts`:** Director de escena que supervisa el desplazamiento vertical, gestiona las clases activas de cada sección y revela los elementos con transiciones suaves, eliminando cualquier distorsión o tilt con el ratón.
* **`ChroniclesContent.ts`:** Generador del marcado editorial cinemático: héroe con chips de acceso, portales de época con estadísticas, galerías de tarjetas de cristal, terminal tipográfica Bernoulli, cronología y curriculum de lenguajes.

### Capa de Estilos y Diseño Modular (`src/styles/`)
* **`tokens.css`:** Paleta cromática histórica de alto contraste (Obsidian near-black `#05070a`, Bone white `#ffffff`, Amber gold `#c9a24a`, Vermilion red `#e0231c`).
* **`base.css`:** Reset, `#app::before` (scrim ambiental global) y filtro cinemático (`brightness(0.68)`) para el canvas.
* **`editorial.css`:** Tipografía display serif (`.display--xl`, `.display--lg`), cuerpo editorial de alto contraste y tarjetas de cristal ahumado (`.card`).
* **`cinema.css`:** Grillas editoriales y cinemáticas (`.gate-grid`, `.gate-stats`, `.cards-stagger`, `.chip`, `.les`, `.bar`).
* **`history.css`:** `.timeline-panel` y visualizaciones genealógicas de lenguajes.

### Capa de Datos Históricos (`src/data/`)
* Datos estructurados y tipados de capítulos (`chapters/`), personajes (`characters/`), lenguajes (`languages/`), eventos (`events/`) y máquinas (`machines/`).

### Regla
> **La tecnología debe servir a la experiencia y a la velocidad, no convertirse en un obstáculo.**

No se introducen frameworks innecesarios ni dependencias pesadas. La aplicación carga en menos de 1 segundo y funciona en cualquier navegador moderno.

---

# 36. 🌐 Compatibilidad de despliegue

Los assets deben utilizar rutas relativas.

La experiencia debe funcionar correctamente bajo un subpath de GitHub Pages.

Evitar:

* rutas absolutas innecesarias,
* assets externos críticos,
* fuentes remotas,
* dependencias externas innecesarias.

---

# 37. 🖼️ Assets

Los assets pueden incluir:

* GLTF / GLB.
* WebP.
* SVG.
* PNG.
* Texturas comprimidas.
* Ilustraciones.
* Fotografías históricas.
* Assets procedurales.
* Assets generados mediante IA.
* Recursos open source con licencia compatible.

Todo asset externo debe respetar su licencia.

---

# 38. ⚡ Rendimiento

CodeChronicles debe mantener una experiencia fluida.

Reglas:

* Lazy loading.
* Compresión.
* Optimización de modelos.
* Texturas comprimidas.
* Carga progresiva.
* Assets por capítulo.
* Evitar miles de objetos simultáneos.
* Reducir partículas en mobile.
* Reducir efectos cuando sea necesario.
* Liberar recursos que ya no sean necesarios.

El usuario debe percibir una experiencia cinematográfica, no una demostración técnica pesada.

---

# 39. 🧱 Organización de datos

El contenido debe estar separado de la lógica.

```text
/data
   /chapters
   /timeline
   /languages
   /characters
   /events
   /machines
   /artifacts
   /sources
   /quotes
   /code
```

Esto permitirá ampliar la historia sin modificar constantemente la lógica de la aplicación.

---

# 40. 🧩 Arquitectura conceptual

```text
src/
│
├── components/
│
├── experience/
│   ├── camera/
│   ├── scenes/
│   ├── transitions/
│   ├── atmosphere/
│   └── effects/
│
├── chapters/
│
├── timeline/
│
├── history/
│
├── languages/
│
├── characters/
│
├── artifacts/
│
├── interactions/
│
├── ai/
│
├── ui/
│
├── data/
│
└── App
```

La arquitectura debe ser modular.

---

# 41. 🎬 Arquitectura de una escena

Cada capítulo puede estructurarse conceptualmente como:

```text
CHAPTER
│
├── metadata
├── year
├── title
├── description
├── scene
├── camera path
├── lighting
├── atmosphere
├── foreground
├── historical elements
├── characters
├── interactions
└── sources
```

Esto permite que cada época tenga una composición visual diferente.

---

# 42. 📖 Ejemplo de capítulo

## Chapter 01 — Before Code

La experiencia comienza en un espacio oscuro.

Aparecen lentamente:

```text
1800s
```

Después:

```text
BEFORE
THE CODE
```

Una máquina mecánica aparece lentamente.

El usuario hace scroll.

La cámara avanza.

Aparece un documento.

Después una figura.

```text
ADA LOVELACE
```

Continúa el scroll.

El documento se transforma.

Aparece un algoritmo.

La cámara continúa.

La escena comienza a transformarse hacia la siguiente época.

---

# 43. 💻 Ejemplo de transición

```text
MANUSCRIPT
     ↓
HANDWRITTEN SYMBOLS
     ↓
DIAGRAM
     ↓
PUNCH CARD
     ↓
MACHINE
     ↓
ELECTRONIC SIGNAL
     ↓
CODE
```

El usuario no solamente lee:

> "la programación evolucionó".

**Lo ve suceder.**

---

# 44. 🧭 Navegación global

La interfaz puede incluir:

```text
CODECHRONICLES

01
02
03
04
05
...
```

Y mostrar:

```text
1940s
THE COMPUTER
```

La navegación debe permanecer discreta.

No debe ocupar la experiencia completa.

---

# 45. 🏆 Sin gamificación tradicional

CodeChronicles NO utilizará como elemento central:

* XP.
* Puntos.
* Niveles.
* Bosses.
* Misiones.
* Inventario.
* Vida.
* Combate.
* Personaje jugable.

El proyecto original utilizaba estos sistemas como parte de la progresión. En la nueva dirección se eliminan porque ya no corresponden al concepto editorial.

La motivación será:

> **curiosidad + descubrimiento + narrativa + conocimiento.**

---

# 46. 🔎 Descubrimiento como recompensa

En lugar de:

```text
+500 XP
```

el usuario obtiene:

```text
NEW DISCOVERY

THE FIRST COMPILER

Explore →
```

O:

```text
CONNECTION DISCOVERED

C → C++ → Java → C#
```

La recompensa es **comprender algo nuevo**.

---

# 47. 🌳 Mapa conceptual

El antiguo mapa físico puede transformarse en un **mapa de conocimiento**.

No representa ciudades.

Representa relaciones.

```text
MÁQUINAS
   │
   ↓
PROGRAMACIÓN
   │
   ├── LENGUAJES
   │      │
   │      ├── FORTRAN
   │      ├── COBOL
   │      ├── C
   │      └── ...
   │
   ├── SISTEMAS
   │
   ├── INTERNET
   │
   └── IA
```

Esto conserva el concepto de exploración original, pero lo adapta al nuevo formato.

---

# 48. 📚 Catálogo histórico

El catálogo deberá ser amplio y extensible.

Categorías:

* Históricos.
* Académicos.
* Sistemas.
* Empresariales.
* Científicos.
* Funcionales.
* Orientados a objetos.
* Scripting.
* Web.
* Móviles.
* Modernos.
* Propósito específico.
* Educativos.
* Experimentales.
* Esotéricos.

No afirmar:

> "todos los lenguajes existentes"

sin una definición verificable.

---

# 49. 🧪 Experimentos interactivos

Algunos capítulos podrán incluir pequeños experimentos.

Ejemplos:

### Máquina

Modificar entradas y observar resultados.

### Código

Modificar una línea.

### Algoritmo

Cambiar pasos.

### Red

Observar cómo viaja la información.

### Lenguaje

Comparar sintaxis.

Estos experimentos deben ser cortos y educativos.

---

# 50. 🧠 Principio educativo

CodeChronicles no enseñará únicamente:

> "Qué es Python."

Debe explicar:

> **Por qué Python apareció, qué problema intentaba resolver, qué influencias recibió y qué impacto tuvo.**

Lo mismo para cada lenguaje.

La historia debe explicar **causa → necesidad → innovación → influencia → consecuencia**.

---

# 51. 🌌 Ciudad final → Futuro

La antigua "Ciudad Final" se convierte en:

# **THE FUTURE OF CODE**

Temas:

* IA generativa.
* Programación asistida por IA.
* Computación cuántica.
* Automatización.
* Sistemas distribuidos.
* Interfaces naturales.
* Nuevos paradigmas.

Estos temas ya formaban parte de la visión original.

La experiencia debe terminar con una pregunta:

> **¿Qué será programar cuando las máquinas también puedan crear código?**

---

# 52. 🌌 Epílogo

Después de recorrer toda la historia:

```text
1843
     ↓
1900
     ↓
1940
     ↓
1950
     ↓
1970
     ↓
1990
     ↓
2000
     ↓
2026
     ↓
FUTURO
```

La cámara se aleja.

Todas las épocas aparecen conectadas.

El usuario comprende que la programación no es una tecnología aislada.

Es una evolución continua.

Texto final:

> **The history of programming is still being written.**

Y debajo:

> **The next chapter is ours.**

---

# 53. 🚫 Lo que CodeChronicles NO debe convertirse

No convertirlo en:

❌ Un videojuego.

❌ Un curso tradicional.

❌ Una documentación interactiva.

❌ Un dashboard.

❌ Una galería de imágenes.

❌ Una colección de quizzes.

❌ Una demo de Three.js.

❌ Una página llena de texto.

❌ Una experiencia visual sin contenido histórico.

❌ Una IA que invente acontecimientos.

❌ Una lista arbitraria de lenguajes.

❌ Una web tecnológica genérica.

❌ Una experiencia saturada de efectos.

---

# 54. 🎯 Principio de diseño

Cada elemento debe responder:

> ¿Esto mejora la narrativa?

> ¿Esto mejora la comprensión?

> ¿Esto ayuda a visualizar la historia?

> ¿Esto mejora la inmersión?

> ¿Esto facilita el descubrimiento?

> ¿Esto aporta contexto histórico?

Si la respuesta es no:

> **No debe formar parte de la experiencia.**

---

# 55. 🧪 MVP

El MVP ya no será una ciudad jugable.

Será un **primer capítulo cinematográfico completamente terminado**.

Debe incluir:

```text
1 experiencia inicial
│
├── Hero cinematográfico
│
├── Canvas / escena visual
│
├── Scroll-driven camera
│
├── 1 capítulo histórico completo
│
├── 3-5 momentos históricos
│
├── 1 personaje histórico
│
├── 2-3 tecnologías/máquinas
│
├── 3-5 conceptos/lenguajes relacionados
│
├── 1 línea temporal
│
├── Interacciones educativas
│
├── Navegación de capítulos
│
├── Fuentes
│
├── Responsive
│
├── Reduced motion
│
└── Optimización
```

### Regla

> **No construir toda la historia antes de validar una experiencia completa.**

---

# 56. 🚧 Desarrollo por fases

## FASE 0 — Investigación

Crear:

* Línea temporal.
* Catálogo inicial.
* Personajes.
* Máquinas.
* Acontecimientos.
* Fuentes.
* Referencias visuales.
* Dirección artística.

No construir todavía toda la experiencia.

---

## FASE 1 — Dirección visual

Definir:

* Paleta.
* Tipografías.
* Composición.
* Escala.
* Cámara.
* Estilo de escenas.
* Tratamiento de imágenes.
* Tratamiento de código.
* Animaciones.
* Transiciones.

---

## FASE 2 — Prototipo cinematográfico

Construir:

```text
Canvas
+
Cámara
+
Scroll
+
Una escena
+
Transición
+
Tipografía
```

Objetivo:

> comprobar que el usuario realmente siente que está atravesando una historia.

---

## FASE 3 — Primer capítulo

Crear completamente:

* Narrativa.
* Escena.
* Personaje.
* Artefactos.
* Timeline.
* Código.
* Interacciones.
* Fuentes.

---

## FASE 4 — Sistema de capítulos

Implementar:

* Navegación.
* Chapter rail.
* Estado activo.
* Transiciones.
* Scroll progress.
* Cámara por capítulo.

---

## FASE 5 — Sistema histórico

Implementar:

* Language Registry.
* Character Registry.
* Timeline.
* Events.
* Machines.
* Artifacts.
* Sources.
* Influences.

---

## FASE 6 — Interacciones

Implementar:

* Código interactivo.
* Diagramas.
* Comparaciones.
* Artefactos explorables.
* Relaciones entre lenguajes.

---

## FASE 7 — Persistencia

Agregar:

* Capítulos visitados.
* Elementos descubiertos.
* Lenguajes explorados.
* Preferencias.

Inicialmente:

```text
LocalStorage / IndexedDB
```

---

## FASE 8 — Backend + Neon

Solo cuando exista una necesidad real:

```text
Frontend
   ↓
API
   ↓
Backend
   ↓
Neon PostgreSQL
```

---

## FASE 9 — IA

Agregar:

* Asistente histórico.
* Explicaciones.
* Comparaciones.
* Ayuda con código.
* Preguntas y respuestas.
* Experiencias educativas personalizadas.

---

## FASE 10 — Optimización

Medir:

* FPS.
* Tiempo de carga.
* Memoria.
* Bundle.
* Assets.
* Rendimiento mobile.
* WebGL.
* Scroll.

---

## FASE 11 — Expansión

Agregar nuevos:

* Capítulos.
* Lenguajes.
* Personajes.
* Máquinas.
* Acontecimientos.
* Artefactos.
* Interacciones.
* Fuentes.

---

# 57. 🧭 Orden de trabajo recomendado

```text
INVESTIGACIÓN
      ↓
HISTORIA
      ↓
FUENTES
      ↓
DIRECCIÓN ARTÍSTICA
      ↓
DISEÑO DE CAPÍTULOS
      ↓
PROTOTIPO WEBGL
      ↓
CÁMARA
      ↓
SCROLL
      ↓
TRANSICIONES
      ↓
PRIMER CAPÍTULO
      ↓
TIMELINE
      ↓
INTERACCIONES
      ↓
SISTEMA HISTÓRICO
      ↓
VALIDACIÓN
      ↓
PERSISTENCIA
      ↓
BACKEND / NEON
      ↓
IA
      ↓
EXPANSIÓN
      ↓
OPTIMIZACIÓN
      ↓
BETA
      ↓
LANZAMIENTO
```

---

# 58. 🤖 Reglas para la IA desarrolladora

Antes de modificar el proyecto:

1. Leer `PLAN.md`.
2. Identificar la fase actual.
3. No implementar fases posteriores sin autorización.
4. No cambiar la arquitectura sin justificación.
5. No introducir dependencias innecesarias.
6. Mantener componentes pequeños.
7. Mantener el contenido histórico separado de la lógica.
8. No inventar acontecimientos.
9. No inventar fuentes.
10. No inventar APIs.
11. No eliminar funcionalidades existentes sin justificarlo.
12. Mantener rendimiento.
13. Probar cada cambio.
14. Verificar responsive.
15. Verificar consola.
16. Verificar errores de assets.
17. Verificar rutas.
18. Respetar reduced motion.
19. Mantener accesibilidad.
20. No convertir el proyecto nuevamente en un videojuego.

---

# 59. 🧪 Validación antes de cada lanzamiento

Verificar:

```text
✓ Desktop
✓ Laptop
✓ 390 × 844
✓ Scroll completo
✓ Navegación
✓ Transiciones
✓ Cámara
✓ Assets
✓ Imágenes
✓ Audio
✓ Console
✓ 404
✓ Responsive
✓ Reduced motion
✓ Accesibilidad
✓ Rendimiento
```

Debe probarse al menos una interacción completa desde:

```text
Hero
   ↓
Capítulo
   ↓
Transición
   ↓
Interacción
   ↓
Siguiente capítulo
```

---

# 60. 🌌 Visión final

CodeChronicles no será solamente una web que explica la historia de la programación.

Será una experiencia en la que:

> **el usuario atraviesa visualmente la evolución del código.**

Comenzará con ideas, algoritmos y máquinas.

Verá aparecer las primeras computadoras.

Observará cómo nacen los lenguajes.

Comprenderá por qué fueron creados.

Verá cómo unos lenguajes influenciaron a otros.

Observará el nacimiento de los sistemas operativos, Internet y la Web.

Llegará a la programación moderna.

Y finalmente llegará a la inteligencia artificial y al futuro.

Todo esto mediante:

> **scroll + narrativa + cámara + sonido + código + historia + WebGL + dirección artística.**

La experiencia completa debe sentirse como si alguien hubiera convertido:

**la historia de la programación**

en

**un libro de arte cinematográfico que puedes atravesar.**

---

# 61. 📌 Regla de oro

> **No hacer una página sobre la historia de la programación.**

> **Hacer una experiencia que haga sentir al usuario que está viajando por ella.**

El usuario no debería terminar pensando:

> "Leí sobre la historia de la programación."

Sino:

> **"Acabo de recorrer cómo nació y evolucionó la programación."**

---

# 62. 🚀 Estado de Avance del Proyecto y Roadmap

### Entregables en Producción (Implementados y Verificados)
```text
[x] Investigación histórica y catálogo de épocas
[x] Dirección visual editorial y cinemática propia de alta fidelidad
[x] Stack de alto rendimiento: Vite 5 + TypeScript (Strict Mode)
[x] Canvas 3D Three.js con Chrono-Engine (Aros Giros, Vórtice y Singularidad)
[x] Cámara cinemática scroll-driven amortiguada con CameraRig
[x] Scrim ambiental global (#app::before) y protección de contraste tipográfico
[x] Eliminación de distorsión/tilt de tarjetas con el mouse (fijadas a elevación sutil)
[x] Hero editorial con ventana flotante peek y 4 chips de acceso directo en cristal
[x] Portales de Capítulo (Chapter Gate) con .sec-head, .gate-grid y .gate-stats
[x] Galerías de Placas Históricas escalonadas en escenas de 100vh independientes
[x] Banco Arqueológico: Terminal tipográfica con código Bernoulli (1843) y botón de copiado
[x] Cronología Interactiva con panel de cristal ahumado opaco
[x] Roadmap Curricular de Lenguajes (.cur y .les) con barra de hover animada
[x] Laboratorio Comparativo de Paradigmas de Código
[x] Epílogo cinemático y botón de retorno al umbral
[x] Optimización masiva para dispositivos móviles (390×844) y desktop
[x] Verificación de código: 0 errores de TypeScript y build en 4.4s
```

### Próximos Pasos (Expansión Histórica)
```text
[ ] Expansión de nuevos bancos arqueológicos interactivos (ej. simulador de tarjetas perforadas ENIAC)
[ ] Árbol genealógico interactivo ampliado de lenguajes (SVG dinámico completo)
[ ] Sistema de sonido diegético ambiental (relés electromecánicos, teletipos, sintetizadores de los 80s)
[ ] Asistente histórico socrático contextual
```

---

# 🌌 CODECHRONICLES

## **The history of programming, experienced.**

> **Desde el primer algoritmo hasta el código que todavía no hemos escrito.**
