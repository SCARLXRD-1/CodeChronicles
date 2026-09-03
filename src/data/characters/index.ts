import type { CharacterEntry } from '../types';

export const characters: CharacterEntry[] = [
  {
    id: 'ada-lovelace',
    name: 'Ada Lovelace',
    years: '1815 — 1852',
    era: 'pre-code',
    profession: 'Matemática y escritora',
    contribution:
      'Primera programadora: escribió el primer algoritmo destinado a ser ejecutado por una máquina (la Máquina Analítica de Babbage).',
    description:
      'Hija del poeta Lord Byron, Ada combinó una educación matemática rigurosa con una visión imaginativa de las capacidades de las máquinas. Comprendió que la Máquina Analítica podía ir más allá del cálculo numérico y manipular símbolos.',
    quote:
      'La Máquina Analítica teje patrones algebraicos, igual que el telar de Jacquard teje flores y hojas.',
    quoteOriginal:
      'The Analytical Engine weaves algebraic patterns, just as the Jacquard loom weaves flowers and leaves.',
    related: ['analytical-engine', 'bernoulli-algorithm', 'charles-babbage'],
    representation: 'historical',
    sources: [
      {
        title: 'Notas de Ada Lovelace sobre la Máquina Analítica (1843)',
        type: 'primary',
      },
    ],
  },
  {
    id: 'charles-babbage',
    name: 'Charles Babbage',
    years: '1791 — 1871',
    era: 'pre-code',
    profession: 'Matemático e inventor',
    contribution: 'Diseñó la Máquina Diferencial y la Máquina Analítica, la primera computadora mecánica programable concebida.',
    description:
      'Babbage dedicó gran parte de su vida a diseñar máquinas de calcular. Su Máquina Analítica incluía una unidad de control, memoria y entrada/salida por tarjetas perforadas, anticipando la arquitectura de los computadores modernos.',
    quote:
      'Toda la aritmética quedó ahora al alcance del mecanismo.',
    quoteOriginal:
      'The whole of arithmetic now appeared within the grasp of mechanism.',
    related: ['analytical-engine', 'difference-engine', 'ada-lovelace'],
    representation: 'historical',
    sources: [
      {
        title: 'Babbage, Pasajes de la vida de un filósofo (1864)',
        type: 'book',
      },
    ],
  },
  {
    id: 'alan-turing',
    name: 'Alan Turing',
    years: '1912 — 1954',
    era: 'algorithms',
    profession: 'Matemático, lógico y criptógrafo',
    contribution:
      'Definió la Máquina de Turing (1936), fundamento teórico de la computación, y fue clave en el descifrado de Enigma durante la Segunda Guerra Mundial.',
    description:
      'Considerado el padre de la computación teórica, Turing estableció los límites de lo computable y propuso el concepto de inteligencia artificial y de aprendizaje de máquinas.',
    quote:
      'Solo podemos ver un poco más allá, pero vemos allí mucho que aún hay que hacer.',
    quoteOriginal:
      'We can only see a short distance ahead, but we can see plenty there that needs to be done.',
    related: ['turing-machine-concept', 'enigma', 'ai-history'],
    representation: 'historical',
    sources: [
      {
        title: 'Turing, Sobre los números computables (1936)',
        type: 'paper',
      },
    ],
  },
  {
    id: 'konrad-zuse',
    name: 'Konrad Zuse',
    years: '1910 — 1995',
    era: 'machines',
    profession: 'Ingeniero civil e inventor',
    contribution: 'Construyó la Z3 (1941), considerada la primera computadora digital programable y funcional.',
    description:
      'Zuse construyó varias máquinas calculadoras electromecánicas en Berlín. Trabajó en solitario y en relativo aislamiento, desarrollando un sistema completo de programación.',
    quote:
      'La idea de la manipulación de caracteres demostró ser la clave del desarrollo de la computación.',
    quoteOriginal:
      'The idea of character manipulation proved to be the key to the development of computing.',
    related: ['z3-machine'],
    representation: 'historical',
    sources: [
      {
        title: 'Deutsches Museum, Z3',
        type: 'archive',
      },
    ],
  },
  {
    id: 'grace-hopper',
    name: 'Grace Hopper',
    years: '1906 — 1992',
    era: 'first-languages',
    profession: 'Científica computacional y contraalmirante',
    contribution:
      'Desarrolló el primer compilador (A-0), creó FLOW-MATIC y popularizó COBOL y el concepto de lenguaje de alto nivel.',
    description:
      'Pionera de la programación de computadoras, Hopper defendió la idea de que los programadores debían escribir programas en lenguajes cercanos al humano y que la máquina los tradujera.',
    quote:
      'La frase más peligrosa del lenguaje es: "siempre lo hemos hecho así".',
    quoteOriginal:
      'The most dangerous phrase in the language is "We\'ve always done it this way".',
    related: ['cobol-language', 'flow-matic-language', 'univac-machine'],
    representation: 'historical',
    sources: [
      {
        title: 'Hopper, Programación automática (1955)',
        type: 'primary',
      },
    ],
  },
  {
    id: 'john-mccarthy',
    name: 'John McCarthy',
    years: '1927 — 2011',
    era: 'first-languages',
    profession: 'Científico computacional',
    contribution: 'Creó LISP, acuñó el término "inteligencia artificial" y sentó bases de la programación simbólica.',
    description:
      'McCarthy fue uno de los fundadores del campo de la IA. En 1958 creó el lenguaje LISP, aún influyente, y organizó el histórico taller de Dartmouth de 1956.',
    quote:
      'La programación es un milagro: no requiere más maquinaria que una computadora.',
    quoteOriginal:
      'Programming is a miracle: it requires no machinery other than a computer.',
    related: ['lisp-language', 'ai-history', 'lambda-calculus'],
    representation: 'historical',
    sources: [
      {
        title: 'McCarthy, Funciones recursivas de expresiones simbólicas (1960)',
        type: 'paper',
      },
    ],
  },
  {
    id: 'john-backus',
    name: 'John Backus',
    years: '1924 — 2007',
    era: 'first-languages',
    profession: 'Científico computacional',
    contribution: 'Lideró el equipo que creó FORTRAN, el primer lenguaje de alto nivel ampliamente adoptado.',
    description:
      'En IBM, Backus dirigió el desarrollo de FORTRAN (1957), demostrando que los compiladores podían generar código casi tan eficiente como el ensamblador escrito a mano.',
    quote:
      'No escribí programas para mi propio uso. Estaba diseñando un lenguaje para otras personas.',
    quoteOriginal:
      'I didn\'t write programs for my own use. I was designing a language for other people.',
    related: ['fortran-language'],
    representation: 'historical',
    sources: [
      {
        title: 'Backus, El sistema de codificación automática FORTRAN (1957)',
        type: 'primary',
      },
    ],
  },
  {
    id: 'ken-thompson',
    name: 'Ken Thompson',
    years: '1943 —',
    era: 'systems',
    profession: 'Científico computacional',
    contribution: 'Co-creó UNIX y el lenguaje B, precursor de C; también co-creó Go.',
    description:
      'Pionero de Bell Labs, Thompson desarrolló UNIX junto a Dennis Ritchie, y años después Go en Google.',
    quote:
      'Ante la duda, usa la fuerza bruta.',
    quoteOriginal:
      'When in doubt, use brute force.',
    related: ['unix-system', 'c-language', 'go-language'],
    representation: 'historical',
    sources: [
      {
        title: 'Ritchie y Thompson, El sistema UNIX de tiempo compartido (1974)',
        type: 'primary',
      },
    ],
  },
  {
    id: 'dennis-ritchie',
    name: 'Dennis Ritchie',
    years: '1941 — 2011',
    era: 'systems',
    profession: 'Científico computacional',
    contribution: 'Creó el lenguaje C y co-creó UNIX.',
    description:
      'En Bell Labs, Ritchie diseñó C y participó en el desarrollo de UNIX. C se convertiría en la base de la programación de sistemas y de casi todos los sistemas operativos modernos.',
    quote:
      'La única forma de aprender un lenguaje de programación nuevo es escribiendo programas en él.',
    quoteOriginal:
      'The only way to learn a new programming language is by writing programs in it.',
    related: ['c-language', 'unix-system'],
    representation: 'historical',
    sources: [
      {
        title: 'Ritchie, El desarrollo del lenguaje C (1993)',
        type: 'primary',
      },
    ],
  },
  {
    id: 'niklaus-wirth',
    name: 'Niklaus Wirth',
    years: '1934 — 2024',
    era: 'structured',
    profession: 'Científico computacional',
    contribution: 'Creó Pascal, Modula-2 y Oberon; influyó en el diseño de lenguajes estructurados y en la ingeniería de software.',
    description:
      'Wirth es conocido por su lema de simplicidad en el diseño de lenguajes y por su premio Turing por el desarrollo de una serie de lenguajes innovadores.',
    quote:
      'Siempre he visto la programación como una forma de expresar ideas, no solo como una forma de conseguir que una computadora haga cosas.',
    quoteOriginal:
      'I have always viewed programming as a way of expressing ideas, not simply as a way of getting a computer to do things.',
    related: ['pascal-language'],
    representation: 'historical',
    sources: [
      {
        title: 'Wirth, El lenguaje de programación Pascal (1971)',
        type: 'primary',
      },
    ],
  },
  {
    id: 'bjarne-stroustrup',
    name: 'Bjarne Stroustrup',
    years: '1950 —',
    era: 'oop',
    profession: 'Científico computacional',
    contribution: 'Creó el lenguaje C++, combinando C con programación orientada a objetos.',
    description:
      'Inició el desarrollo de "C with Classes" en Bell Labs en 1979, evolucionando luego a C++: un lenguaje de alto rendimiento con abstracciones de alto nivel.',
    quote:
      'Solo hay dos tipos de lenguajes: aquellos de los que la gente se queja y aquellos que nadie usa.',
    quoteOriginal:
      'There are only two kinds of languages: the ones people complain about and the ones nobody uses.',
    related: ['cpp-language', 'c-language'],
    representation: 'historical',
    sources: [
      {
        title: 'Stroustrup, El lenguaje de programación C++ (1985)',
        type: 'book',
      },
    ],
  },
  {
    id: 'james-gosling',
    name: 'James Gosling',
    years: '1955 —',
    era: 'modern',
    profession: 'Científico computacional',
    contribution: 'Creó el lenguaje Java en Sun Microsystems.',
    description:
      'La visión de Gosling era una plataforma portable y segura, que se materializó en Java y la JVM.',
    quote:
      'La frase más emocionante que se escucha en la ciencia, la que anuncia nuevos descubrimientos, no es "¡Eureka!", sino "Qué curioso..."',
    quoteOriginal:
      'The most exciting phrase to hear in science, the one that heralds new discoveries, is not "Eureka!", but "That\'s funny..."',
    related: ['java-language'],
    representation: 'historical',
    sources: [
      {
        title: 'Sun Microsystems, El lenguaje Java (1995)',
        type: 'primary',
      },
    ],
  },
  {
    id: 'guido-van-rossum',
    name: 'Guido van Rossum',
    years: '1956 —',
    era: 'modern',
    profession: 'Desarrollador de software',
    contribution: 'Creó el lenguaje Python.',
    description:
      'Benevolente dictador vitalicio (BDFL) durante décadas, Guido diseñó Python como un lenguaje legible y expresivo que hoy lidera la ciencia de datos y la IA.',
    quote:
      'El gozo del código es el gozo de pensar con claridad.',
    quoteOriginal:
      'The joy of code is the joy of thinking clearly.',
    related: ['python-language'],
    representation: 'historical',
    sources: [
      {
        title: 'van Rossum, Prólogo de Python',
        type: 'web',
        url: 'https://www.python.org/doc/essays/foreword/',
      },
    ],
  },
  {
    id: 'yukihiro-matsumoto',
    name: 'Yukihiro Matsumoto',
    years: '1965 —',
    era: 'modern',
    profession: 'Científico computacional',
    contribution: 'Creó el lenguaje Ruby.',
    description:
      '"Matz" diseñó Ruby priorizando la felicidad y productividad del programador, y su filosofía impulsó el desarrollo web con Rails.',
    quote:
      'Un lenguaje da forma al pensamiento. Quería un lenguaje cercano al pensamiento humano.',
    quoteOriginal:
      'A language is a shaper of thought. I wanted a language that was close to human thought.',
    related: ['ruby-language'],
    representation: 'historical',
    sources: [
      {
        title: 'Matsumoto, Anuncio de Ruby (1995)',
        type: 'primary',
      },
    ],
  },
  {
    id: 'brendan-eich',
    name: 'Brendan Eich',
    years: '1961 —',
    era: 'web',
    profession: 'Científico computacional',
    contribution: 'Creó JavaScript en solo 10 días para Netscape.',
    description:
      'Eich creó JavaScript en 1995, transformando la web: de páginas estáticas a aplicaciones interactivas universales.',
    quote:
      'Apunta siempre a JavaScript.',
    quoteOriginal:
      'Always bet on JS.',
    related: ['javascript-language'],
    representation: 'historical',
    sources: [
      {
        title: 'Brendan Eich, Historia de JavaScript',
        type: 'primary',
      },
    ],
  },
  {
    id: 'anders-hejlsberg',
    name: 'Anders Hejlsberg',
    years: '1960 —',
    era: 'modern',
    profession: 'Científico computacional',
    contribution: 'Creó Turbo Pascal, Delphi, C# y lidera TypeScript.',
    description:
      'Uno de los diseñadores de lenguajes más influyentes, autor de numerosos lenguajes comerciales y de Microsoft.',
    quote:
      'La sencillez no consiste en evitar la complejidad, sino en gestionarla.',
    quoteOriginal:
      'Simplicity is not about avoiding complexity, it is about managing it.',
    related: ['csharp-language', 'typescript-language'],
    representation: 'historical',
    sources: [
      {
        title: 'ECMA, Especificación del lenguaje C# (2000)',
        type: 'primary',
      },
    ],
  },
  {
    id: 'graydon-hoare',
    name: 'Graydon Hoare',
    years: '1978 —',
    era: 'systems',
    profession: 'Científico computacional',
    contribution: 'Creó el lenguaje Rust.',
    description:
      'Hoare inició Rust en Mozilla como un proyecto personal que se convirtió en un lenguaje de sistemas con seguridad de memoria sin garbage collector.',
    quote:
      'Me importa más la robustez que la ciencia espacial.',
    quoteOriginal:
      'I care more about robustness than rocket science.',
    related: ['rust-language'],
    representation: 'historical',
    sources: [
      {
        title: 'The Rust project, rust-lang.org',
        type: 'web',
        url: 'https://www.rust-lang.org/',
      },
    ],
  },
  {
    id: 'robert-griesemer',
    name: 'Robert Griesemer',
    years: '1964 —',
    era: 'modern',
    profession: 'Científico computacional',
    contribution: 'Co-creó Go en Google.',
    description:
      'Junto a Pike y Thompson, Griesemer diseñó Go para la programación de sistemas a escala de Google.',
    quote:
      'Queríamos que el lenguaje fuera adecuado para el tipo de programas que realmente escribimos.',
    quoteOriginal:
      'We wanted to make the language suitable for the kinds of programs we actually write.',
    related: ['go-language'],
    representation: 'historical',
    sources: [
      {
        title: 'The Go project, golang.org',
        type: 'web',
        url: 'https://go.dev/',
      },
    ],
  },
  {
    id: 'rob-pike',
    name: 'Rob Pike',
    years: '1956 —',
    era: 'modern',
    profession: 'Científico computacional',
    contribution: 'Co-creó Go y contribuyó al desarrollo de UNIX y Plan 9 en Bell Labs.',
    description:
      'Pike es coautor de Go y veterano de Bell Labs, donde trabajó en sistemas operativos, editor de texto Sam y los fundamentos de la concurrencia moderna.',
    quote:
      'La complejidad es el enemigo.',
    quoteOriginal:
      'Complexity is the enemy.',
    related: ['go-language', 'unix-system'],
    representation: 'historical',
    sources: [
      {
        title: 'The Go project, golang.org',
        type: 'web',
        url: 'https://go.dev/',
      },
    ],
  },
  {
    id: 'margaret-hamilton',
    name: 'Margaret Hamilton',
    years: '1936 —',
    era: 'computers',
    profession: 'Científica computacional e ingeniera de sistemas',
    contribution: 'Directora de ingeniería de software del MIT para el programa Apolo de la NASA; acuñó el término "ingeniería de software".',
    description:
      'Hamilton lideró el equipo que desarrolló el software de navegación de a bordo para el Apolo 11. Su arquitectura de priorización de tareas evitó que la misión abortara a minutos del alunizaje.',
    quote:
      'No había una segunda oportunidad. Teníamos que encontrar una forma de diseñar software que fuera tolerante a fallos.',
    quoteOriginal:
      'There was no second chance. We had to find a way and it had to work.',
    related: ['apollo-guidance', 'computers'],
    representation: 'historical',
    sources: [
      {
        title: 'NASA History Division, Margaret Hamilton and Apollo Software',
        type: 'archive',
      },
    ],
  },
  {
    id: 'john-von-neumann',
    name: 'John von Neumann',
    years: '1903 — 1957',
    era: 'computers',
    profession: 'Matemático y polímata',
    contribution: 'Propuso la arquitectura de programa almacenado (Arquitectura von Neumann) donde datos e instrucciones conviven en la misma memoria.',
    description:
      'En 1945 redactó el "First Draft of a Report on the EDVAC", formalizando la estructura de CPU, memoria, unidad de control y bus que define prácticamente todas las computadoras modernas.',
    quote:
      'En matemáticas uno no entiende las cosas. Uno simplemente se acostumbra a ellas.',
    quoteOriginal:
      'In mathematics you don’t understand things. You just get used to them.',
    related: ['eniac-machine', 'edvac-machine'],
    representation: 'historical',
    sources: [
      {
        title: 'von Neumann, First Draft of a Report on the EDVAC (1945)',
        type: 'primary',
      },
    ],
  },
  {
    id: 'claude-shannon',
    name: 'Claude Shannon',
    years: '1916 — 2001',
    era: 'machines',
    profession: 'Matemático e ingeniero eléctrico',
    contribution: 'Padre de la Teoría de la Información; demostró que los circuitos eléctricos de relés pueden resolver cualquier problema de álgebra booleana.',
    description:
      'Su tesis de maestría de 1937 en el MIT sentó las bases de todo el diseño de circuitos digitales, transformando la lógica filosófica en interruptores físicos de silicio y relés.',
    quote:
      'La información es la resolución de la incertidumbre.',
    quoteOriginal:
      'Information is the resolution of uncertainty.',
    related: ['machines', 'z3-machine'],
    representation: 'historical',
    sources: [
      {
        title: 'Shannon, A Symbolic Analysis of Relay and Switching Circuits (1938)',
        type: 'paper',
      },
    ],
  },
  {
    id: 'alan-kay',
    name: 'Alan Kay',
    years: '1940 —',
    era: 'oop',
    profession: 'Científico de la computación',
    contribution: 'Acuñó el término "Programación Orientada a Objetos", concibió el Dynabook y lideró el diseño de Smalltalk y la interfaz gráfica moderna en Xerox PARC.',
    description:
      'Kay visualizó las computadoras no como calculadoras masivas sino como medios dinámicos de aprendizaje y expresión humana, anticipando laptops, tablets e interfaces con ventanas e iconos.',
    quote:
      'La mejor manera de predecir el futuro es inventarlo.',
    quoteOriginal:
      'The best way to predict the future is to invent it.',
    related: ['smalltalk-language', 'xerox-alto'],
    representation: 'historical',
    sources: [
      {
        title: 'Kay, The Early History of Smalltalk (1993)',
        type: 'paper',
      },
    ],
  },
  {
    id: 'adele-goldberg',
    name: 'Adele Goldberg',
    years: '1945 —',
    era: 'oop',
    profession: 'Científica computacional',
    contribution: 'Co-diseñó Smalltalk-80 en Xerox PARC e impulsó el diseño de sistemas de interfaz gráfica y lenguajes orientados a objetos.',
    description:
      'Goldberg lideró el System Concepts Laboratory de Xerox PARC. Sus manuales de Smalltalk-80 (los "libros azules") fueron el texto fundacional que educó a toda una generación de creadores de software.',
    quote:
      'No solo estábamos construyendo un lenguaje; estábamos construyendo una forma totalmente nueva de interactuar con el conocimiento.',
    related: ['smalltalk-language', 'xerox-alto', 'alan-kay'],
    representation: 'historical',
    sources: [
      {
        title: 'Goldberg & Robson, Smalltalk-80: The Language and Its Implementation (1983)',
        type: 'book',
      },
    ],
  },
  {
    id: 'linus-torvalds',
    name: 'Linus Torvalds',
    years: '1969 —',
    era: 'systems',
    profession: 'Ingeniero de software',
    contribution: 'Creador del kernel Linux (1991) y del sistema de control de versiones distribuido Git (2005).',
    description:
      'Torvalds transformó la industria del software al publicar un clon libre de UNIX como proyecto personal de estudiante. Hoy Linux opera desde supercomputadores y nubes hasta miles de millones de teléfonos Android.',
    quote:
      'Hablar es gratis. Muéstrame el código.',
    quoteOriginal:
      'Talk is cheap. Show me the code.',
    related: ['c-language', 'unix-system', 'git-system'],
    representation: 'historical',
    sources: [
      {
        title: 'Torvalds & Diamond, Just for Fun (2001)',
        type: 'book',
      },
    ],
  },
  {
    id: 'tim-berners-lee',
    name: 'Tim Berners-Lee',
    years: '1955 —',
    era: 'web',
    profession: 'Científico de la computación',
    contribution: 'Inventor de la World Wide Web: especificó HTML, HTTP, URL y programó el primer navegador y servidor web.',
    description:
      'En 1989 propuso un sistema de hipertexto distribuido en el CERN para compartir información científica. Decidió que la tecnología de la Web fuera de dominio público y libre de regalías para toda la humanidad.',
    quote:
      'La web no es solo computadoras; se trata de conectar a las personas.',
    quoteOriginal:
      'The Web does not just connect machines, it connects people.',
    related: ['world-wide-web', 'javascript-language'],
    representation: 'historical',
    sources: [
      {
        title: 'Berners-Lee, Weaving the Web (1999)',
        type: 'book',
      },
    ],
  },
  {
    id: 'geoffrey-hinton',
    name: 'Geoffrey Hinton',
    years: '1947 —',
    era: 'ai',
    profession: 'Psicólogo cognitivo y científico de la computación',
    contribution: 'Pionero de las redes neuronales artificiales y el algoritmo de retropropagación (backpropagation); Premio Turing y Nobel de Física.',
    description:
      'Durante décadas persistió en el estudio del conexionismo cuando la IA clásica lo consideraba inviable. Su laboratorio en la Universidad de Toronto desató la revolución moderna del deep learning con AlexNet en 2012.',
    quote:
      'Si quieres saber cómo funciona la mente, construye una.',
    quoteOriginal:
      'If you want to know how the brain works, build one.',
    related: ['ai-history', 'open-ai-era'],
    representation: 'historical',
    sources: [
      {
        title: 'Rumelhart, Hinton & Williams, Learning representations by back-propagating errors (1986)',
        type: 'paper',
      },
    ],
  },
  {
    id: 'demis-hassabis',
    name: 'Demis Hassabis',
    years: '1976 —',
    era: 'ai',
    profession: 'Neurocientífico y emprendedor de IA',
    contribution: 'Co-fundador de DeepMind; creador de AlphaGo y AlphaFold; Premio Nobel de Química.',
    description:
      'Hassabis fusionó neurociencia y computación para resolver problemas científicos fundamentales. AlphaFold resolvió el problema del plegamiento de proteínas de 50 años, descifrando la estructura 3D de prácticamente todas las moléculas biológicas conocidas.',
    quote:
      'Utilicemos la inteligencia artificial como la herramienta definitiva para acelerar el descubrimiento científico.',
    related: ['ai-history'],
    representation: 'historical',
    sources: [
      {
        title: 'Jumper & Hassabis et al., Highly accurate protein structure prediction with AlphaFold (2021)',
        type: 'paper',
      },
    ],
  },
];

export const getCharacter = (id: string) => characters.find((c) => c.id === id);