import type { LanguageEntry } from '../types';

export const languages: LanguageEntry[] = [
  {
    id: 'fortran-language',
    name: 'FORTRAN',
    year: 1957,
    creators: ['John Backus', 'IBM'],
    era: 'first-languages',
    chapterId: 'ch-04-languages',
    problemSolved:
      'Permitir escribir programas de cómputo científico y numérico en un nivel cercano a las expresiones matemáticas, sin programar en lenguaje ensamblador.',
    historicalContext:
      'En los años 50 programar implicaba escribir instrucciones de máquina o ensamblador. FORTRAN (Formula Translation) fue el primer lenguaje de alto nivel ampliamente adoptado, cambiando radicalmente la productividad de los programadores.',
    influences: ['ensamblador', 'expresión matemática'],
    influenced: ['ALGOL', 'BASIC', 'PL/I'],
    paradigms: ['imperativo', 'procedimental', 'científico-numérico'],
    currentStatus:
      'En uso activo en computación de alto rendimiento (HPC) y simulación científica, con versiones modernas como Fortran 2018.',
    history:
      'Desarrollado entre 1954 y 1957 en IBM bajo la dirección de John Backus. Su compilador optimizaba el código generado para competir con el ensamblador a mano.',
    curiosities: [
      'Su nombre proviene de "FORmula TRANslating system".',
      'Fue criticado al inicio por "no poder usarse para programación real", y luego se convirtió en el estándar de facto de la ciencia computacional.',
      'La primera demostración pública de su compilador fue en 1957.',
    ],
    codeSample:
      'PROGRAM HELLO\n  PRINT *, "HELLO WORLD"\nEND',
    sources: [
      {
        title: 'Backus, El sistema de codificación automática FORTRAN (1957)',
        type: 'primary',
      },
      {
        title: 'Historia de FORTRAN y FORTRAN II, Software Preservation Group',
        type: 'archive',
      },
    ],
  },
  {
    id: 'lisp-language',
    name: 'LISP',
    year: 1958,
    creators: ['John McCarthy'],
    era: 'first-languages',
    chapterId: 'ch-04-languages',
    problemSolved:
      'Procesar símbolos y listas para la investigación en inteligencia artificial, de forma simbólica y recursiva.',
    historicalContext:
      'Creado para el trabajo en IA del MIT, LISP introdujo conceptos revolucionarios como la gestión automática de memoria y las funciones de primera clase.',
    influences: ['cálculo lambda', 'recursión'],
    influenced: ['Scheme', 'Clojure', 'JavaScript (funciones)', 'Python (algunas ideas)'],
    paradigms: ['funcional', 'simbólico', 'dinámico'],
    currentStatus:
      'Sigue vivo con dialectos modernos (Clojure, Racket, Common Lisp) y una influencia enorme en lenguajes funcionales.',
    history:
      'McCarthy lo publicó en 1960 con "Recursive Functions of Symbolic Expressions and Their Computation by Machine".',
    curiosities: [
      'Usa una sintaxis de paréntesis basada en S-expressions.',
      'Fue el lenguaje de referencia de la IA durante décadas.',
      'John McCarthy es también uno de los pioneros de la memoria virtual y del tiempo compartido.',
    ],
    codeSample:
      '(defun factorial (n)\n  (if (<= n 1) 1\n      (* n (factorial (- n 1)))))',
    sources: [
      {
        title: 'McCarthy, Funciones recursivas de expresiones simbólicas (1960)',
        type: 'paper',
      },
    ],
  },
  {
    id: 'cobol-language',
    name: 'COBOL',
    year: 1959,
    creators: ['CODASYL', 'Grace Hopper (influencia)'],
    era: 'enterprise',
    chapterId: 'ch-04-languages',
    problemSolved:
      'Procesamiento de datos empresariales y de negocio en un lenguaje legible, similar al inglés, común entre sistemas.',
    historicalContext:
      'Creado por el comité CODASYL ante la proliferación de lenguajes incompatibles para negocios. FLOW-MATIC de Grace Hopper fue una influencia clave.',
    influences: ['FLOW-MATIC', 'ingles empresarial'],
    influenced: ['PL/I', 'ABAP'],
    paradigms: ['imperativo', 'orientado a datos', 'empresarial'],
    currentStatus:
      'A pesar de su edad, sigue presente en sistemas financieros, bancarios y gubernamentales críticos.',
    history:
      'COBOL significa "COmmon Business-Oriented Language". Fue diseñado para ser legible y autodocumentado.',
    curiosities: [
      'Se estima que miles de millones de líneas de COBOL aún operan en producción.',
      'Su sintaxis verbosa fue intencional: debía leerse como prosa.',
    ],
    codeSample:
      '       IDENTIFICATION DIVISION.\n       PROGRAM-ID. HELLO.\n       PROCEDURE DIVISION.\n           DISPLAY "HELLO WORLD".\n           STOP RUN.',
    sources: [
      {
        title: 'CODASYL, Especificación de COBOL (1959)',
        type: 'primary',
      },
    ],
  },
  {
    id: 'algol-language',
    name: 'ALGOL',
    year: 1958,
    creators: ['International committee (Backus, Naur, et al.)'],
    era: 'first-languages',
    chapterId: 'ch-04-languages',
    problemSolved:
      'Definir un lenguaje algorítmico formal para la publicación y el intercambio de algoritmos entre científicos.',
    historicalContext:
      'ALGOL introdujo conceptos fundamentales (bloques, variables con ámbito, recursividad, notación BNF) que influenciaron casi todos los lenguajes imperativos posteriores.',
    influences: ['FORTRAN', 'lógica formal'],
    influenced: ['Pascal', 'C', 'Java', 'Python', 'muchos otros'],
    paradigms: ['imperativo', 'estructurado', 'algorítmico'],
    currentStatus:
      'Ya no se usa en producción, pero es la base conceptual de los lenguajes modernos.',
    history:
      'El "Revised Report on the Algorithmic Language ALGOL 60" (1960) es uno de los documentos más influyentes de la historia de la programación.',
    curiosities: [
      'Definió el Backus-Naur Form (BNF) para describir gramáticas.',
      'Fue el lenguaje en el que Dijkstra, Hoare y otros publicaron algoritmos influyentes.',
    ],
    codeSample:
      'begin\n  integer i;\n  for i := 1 step 1 until 10 do\n    print(i)\nend',
    sources: [
      {
        title: 'Naur et al., Informe revisado sobre ALGOL 60 (1960)',
        type: 'primary',
      },
    ],
  },
  {
    id: 'c-language',
    name: 'C',
    year: 1972,
    creators: ['Dennis Ritchie'],
    era: 'c',
    chapterId: 'ch-05-systems',
    problemSolved:
      'Escribir sistemas operativos y software de bajo nivel con la eficiencia del ensamblador y la portabilidad de un lenguaje de alto nivel.',
    historicalContext:
      'C surgió en Bell Labs para reescribir UNIX. Su combinación de control sobre memoria, portabilidad y simplicidad lo convirtió en la base de la programación de sistemas.',
    influences: ['B', 'BCPL', 'ALGOL'],
    influenced: ['C++', 'Objective-C', 'Java', 'C#', 'Go', 'Rust', 'JavaScript', 'Python (C)'],
    paradigms: ['imperativo', 'procedimental', 'de sistemas'],
    currentStatus:
      'Sigue entre los lenguajes más usados, especialmente en sistemas embebidos, kernels y bases de datos.',
    history:
      'Desarrollado entre 1969 y 1973. El libro "The C Programming Language" de Kernighan y Ritchie (1978) lo popularizó.',
    curiosities: [
      'C y UNIX evolucionaron juntos.',
      'Es el lenguaje base de la mayoría de sistemas operativos modernos, incluidos Linux y Windows.',
    ],
    codeSample:
      '#include <stdio.h>\nint main(void) {\n  printf("HELLO WORLD\\n");\n  return 0;\n}',
    sources: [
      {
        title: 'Ritchie, El desarrollo del lenguaje C (1993)',
        type: 'primary',
      },
    ],
  },
  {
    id: 'pascal-language',
    name: 'Pascal',
    year: 1970,
    creators: ['Niklaus Wirth'],
    era: 'structured',
    chapterId: 'ch-05-systems',
    problemSolved:
      'Enseñar programación estructurada con un lenguaje claro, tipado y disciplinado.',
    historicalContext:
      'Pascal se creó como lenguaje educativo, pero su claridad estructural influyó en el diseño de lenguajes y en la enseñanza durante décadas.',
    influences: ['ALGOL'],
    influenced: ['Delphi', 'Ada', 'Modula-2'],
    paradigms: ['imperativo', 'estructurado', 'tipado'],
    currentStatus:
      'Principalmente histórico y educativo; su descendiente Delphi tuvo uso comercial.',
    history:
      'Publicado en 1970 y muy usado en la enseñanza universitaria durante los años 80 y 90.',
    curiosities: [
      'Wirth también diseñó Modula-2 y Oberon.',
      'Se usó como base de muchas aplicaciones de escritorio vía Delphi.',
    ],
    codeSample:
      'program Hello;\nbegin\n  writeln(\'HELLO WORLD\');\nend.',
    sources: [
      {
        title: 'Wirth, El lenguaje de programación Pascal (1971)',
        type: 'primary',
      },
    ],
  },
  {
    id: 'smalltalk-language',
    name: 'Smalltalk',
    year: 1972,
    creators: ['Alan Kay', 'Xerox PARC'],
    era: 'oop',
    chapterId: 'ch-06-oop',
    problemSolved:
      'Demostrar un modelo de programación puro orientado a objetos, donde todo es un objeto que se comunica mediante mensajes.',
    historicalContext:
      'Smalltalk en Xerox PARC combinó POO con entornos integrados e interfaces gráficas, siendo una inspiración enorme para la industria.',
    influences: ['Simula', 'ideas de Kay'],
    influenced: ['Objective-C', 'Java', 'Ruby', 'Python', 'diseño de GUIs modernas'],
    paradigms: ['orientado a objetos', 'dinámico', 'reflexivo'],
    currentStatus:
      'Los dialectos Smalltalk siguen existiendo; su filosofía influyó profundamente en la POO moderna.',
    history:
      'Desarrollado a lo largo de los años 70 en Xerox PARC, donde también se inventaron la GUI, el ratón y las ventanas.',
    curiosities: [
      'Alan Kay acuñó la frase "The best way to predict the future is to invent it".',
      'Smalltalk incluyó el primer entorno de desarrollo integrado completo.',
    ],
    codeSample:
      'Transcript show: \'HELLO WORLD\'.',
    sources: [
      {
        title: 'Kay, La historia temprana de Smalltalk (1993)',
        type: 'primary',
      },
    ],
  },
  {
    id: 'cpp-language',
    name: 'C++',
    year: 1985,
    creators: ['Bjarne Stroustrup'],
    era: 'oop',
    chapterId: 'ch-06-oop',
    problemSolved:
      'Añadir abstracciones de alto nivel y programación orientada a objetos manteniendo la eficiencia y compatibilidad con C.',
    historicalContext:
      'C++ extendió C con clases, plantillas y sobrecarga, combinando alto rendimiento con abstracción. Se volvió esencial en juegos, sistemas y aplicaciones de alto rendimiento.',
    influences: ['C', 'Simula', 'ALGOL'],
    influenced: ['Java', 'C#', 'D', 'Rust'],
    paradigms: ['multiparadigma', 'orientado a objetos', 'genérico', 'de sistemas'],
    currentStatus:
      'En uso muy extendido en sistemas, videojuegos, finanzas de alta frecuencia y aplicaciones de rendimiento crítico.',
    history:
      'Stroustrup comenzó a desarrollarlo en 1979 en Bell Labs; la primera edición del libro-The C++ Programming Language- fue en 1985.',
    curiosities: [
      'Inicialmente se llamó "C with Classes".',
      'El nombre C++ juega con el operador de incremento de C.',
    ],
    codeSample:
      '#include <iostream>\nint main() {\n  std::cout << "HELLO WORLD" << std::endl;\n  return 0;\n}',
    sources: [
      {
        title: 'Stroustrup, El lenguaje de programación C++ (1985)',
        type: 'book',
      },
    ],
  },
  {
    id: 'python-language',
    name: 'Python',
    year: 1991,
    creators: ['Guido van Rossum'],
    era: 'modern',
    chapterId: 'ch-07-modern',
    problemSolved:
      'Crear un lenguaje legible, expresivo y multiparadigma que priorizara la claridad y la productividad del programador.',
    historicalContext:
      'Python nació de la necesidad de un lenguaje que se leyera casi como inglés, combinando estructura clara con potencia. Hoy es uno de los más populares del mundo, líder en ciencia de datos e IA.',
    influences: ['ABC', 'C', 'Modula-3', 'Smalltalk'],
    influenced: ['Ruby (indirectamente)', 'Go (ideas)', 'muchos nuevos'],
    paradigms: ['multiparadigma', 'orientado a objetos', 'funcional', 'dinámico'],
    currentStatus:
      'Uno de los lenguajes más populares, ampliamente usado en web, ciencia, datos, automatización e IA.',
    history:
      'Desarrollado por Guido van Rossum desde finales de los 80, publicado en 1991, con una filosofía de código legible (the Zen of Python).',
    curiosities: [
      'El nombre proviene de Monty Python.',
      'Su filosofía de diseño favorece la legibilidad sobre la concisión.',
    ],
    codeSample:
      'print("HELLO WORLD")',
    sources: [
      {
        title: 'van Rossum, Prólogo de Python e historia del diseño',
        type: 'web',
        url: 'https://www.python.org/doc/essays/foreword/',
      },
    ],
  },
  {
    id: 'java-language',
    name: 'Java',
    year: 1995,
    creators: ['James Gosling'],
    era: 'modern',
    chapterId: 'ch-07-modern',
    problemSolved:
      'Crear un lenguaje portable y seguro que pudiera ejecutarse en cualquier plataforma a través de una máquina virtual.',
    historicalContext:
      'Java se diseñó en Sun Microsystems para dispositivos embebidos y luego explotó con la web, popularizando el lema "write once, run anywhere" y la JVM.',
    influences: ['C++', 'Smalltalk', 'Objective-C'],
    influenced: ['C#', 'Kotlin', 'Scala', 'Android'],
    paradigms: ['orientado a objetos', 'imperativo', 'fuertemente tipado'],
    currentStatus:
      'Enormemente usado en empresas, Android, backend y big data.',
    history:
      'Publicado en 1995 por Sun Microsystems; actualmente gestionado por Oracle.',
    curiosities: [
      'Inicialmente se llamó Oak.',
      'Su portabilidad se logró con la Máquina Virtual de Java (JVM).',
    ],
    codeSample:
      'public class Hello {\n  public static void main(String[] args) {\n    System.out.println("HELLO WORLD");\n  }\n}',
    sources: [
      {
        title: 'Sun Microsystems, El lenguaje Java (1995)',
        type: 'primary',
      },
    ],
  },
  {
    id: 'javascript-language',
    name: 'JavaScript',
    year: 1995,
    creators: ['Brendan Eich'],
    era: 'web',
    chapterId: 'ch-08-web',
    problemSolved:
      'Aportar interactividad a las páginas web en el navegador, como complemento a Java y como lenguaje de scripting del lado del cliente.',
    historicalContext:
      'Creado en solo 10 días para Netscape, JavaScript se ha convertido en el lenguaje universal de la web, ejecutándose en todo navegador.',
    influences: ['Self', 'Java (sintaxis)', 'Scheme (funciones)'],
    influenced: ['TypeScript', 'Node.js y el ecosistema web completo'],
    paradigms: ['multiparadigma', 'orientado a objetos', 'funcional', 'dinámico'],
    currentStatus:
      'El lenguaje más usado de la web; base de Node.js y de casi todo el desarrollo frontend.',
    history:
      'Creado por Brendan Eich en 1995 en Netscape; estandarizado como ECMAScript.',
    curiosities: [
      'A pesar del nombre, no está relacionado con Java más que en la sintaxis.',
      'Fue desarrollado en solo diez días.',
    ],
    codeSample:
      'console.log("HELLO WORLD");',
    sources: [
      {
        title: 'Brendan Eich, Historia de JavaScript',
        type: 'primary',
      },
    ],
  },
  {
    id: 'typescript-language',
    name: 'TypeScript',
    year: 2012,
    creators: ['Anders Hejlsberg', 'Microsoft'],
    era: 'web',
    chapterId: 'ch-08-web',
    problemSolved:
      'Añadir tipado estático y herramientas de desarrollo robustas a JavaScript a gran escala.',
    historicalContext:
      'TypeScript es un superconjunto de JavaScript que añade tipos opcionales, mejorando la mantenibilidad de aplicaciones web grandes.',
    influences: ['JavaScript', 'C#', 'Java'],
    influenced: ['JavaScript moderno', 'herramientas de tipos en JS'],
    paradigms: ['multiparadigma', 'tipado estático', 'orientado a objetos', 'funcional'],
    currentStatus:
      'Extremadamente popular en el desarrollo web moderno y en gran parte del ecosistema JS.',
    history:
      'Lanzado por Microsoft en 2012 bajo la dirección de Anders Hejlsberg.',
    curiosities: [
      'Es el mismo desarrollador detrás de Turbo Pascal y C#.',
      'Compila a JavaScript puro.',
    ],
    codeSample:
      'const message: string = "HELLO WORLD";\nconsole.log(message);',
    sources: [
      {
        title: 'Microsoft, Anuncio de TypeScript (2012)',
        type: 'primary',
      },
    ],
  },
  {
    id: 'ruby-language',
    name: 'Ruby',
    year: 1995,
    creators: ['Yukihiro Matsumoto'],
    era: 'modern',
    chapterId: 'ch-07-modern',
    problemSolved:
      'Crear un lenguaje orientado a objetos, dinámico y expresivo que priorizara la productividad y la satisfacción del programador.',
    historicalContext:
      'Ruby, creado por "Matz", impulsó la productividad con su filosofía de diseño centrada en las personas, y se popularizó junto al framework Ruby on Rails.',
    influences: ['Smalltalk', 'Perl', 'LISP'],
    influenced: ['Ruby on Rails', 'popularizó DSLs en la web'],
    paradigms: ['orientado a objetos', 'dinámico', 'funcional', 'reflexivo'],
    currentStatus:
      'En uso activo, sobre todo en el desarrollo web con Rails.',
    history:
      'Desarrollado por Yukihiro Matsumoto y publicado en 1995.',
    curiosities: [
      'Matsumoto lo diseñó para "hacer felices a los programadores".',
      'Ruby es un lenguaje donde "todo es un objeto".',
    ],
    codeSample:
      'puts "HELLO WORLD"',
    sources: [
      {
        title: 'Matsumoto, Ruby announcement (1995)',
        type: 'primary',
      },
    ],
  },
  {
    id: 'csharp-language',
    name: 'C#',
    year: 2000,
    creators: ['Anders Hejlsberg', 'Microsoft'],
    era: 'modern',
    chapterId: 'ch-07-modern',
    problemSolved:
      'Diseñar un lenguaje moderno, tipado y orientado a objetos para la plataforma .NET de Microsoft.',
    historicalContext:
      'C# fue la respuesta de Microsoft a Java, integrando sintaxis similar con innovaciones y profundo apoyo del framework .NET.',
    influences: ['Java', 'C++', 'Delphi'],
    influenced: ['Kotlin', 'Swift', 'desarrollo .NET moderno'],
    paradigms: ['orientado a objetos', 'multiparadigma', 'tipado estático'],
    currentStatus:
      'Esencial en el ecosistema Microsoft y en multiplataforma gracias a .NET Core.',
    history:
      'Diseñado por Anders Hejlsberg en Microsoft y lanzado en el año 2000.',
    curiosities: [
      'Es el lenguaje principal de la plataforma .NET.',
      'Hejlsberg también creó Turbo Pascal y Delphi.',
    ],
    codeSample:
      'using System;\nclass Hello {\n  static void Main() {\n    Console.WriteLine("HELLO WORLD");\n  }\n}',
    sources: [
      {
        title: 'ECMA, Especificación del lenguaje C# (2000)',
        type: 'primary',
      },
    ],
  },
  {
    id: 'go-language',
    name: 'Go',
    year: 2009,
    creators: ['Robert Griesemer', 'Rob Pike', 'Ken Thompson'],
    era: 'modern',
    chapterId: 'ch-09-systems',
    problemSolved:
      'Crear un lenguaje compilado, simple y eficiente para construir sistemas y servicios concurrentes a gran escala.',
    historicalContext:
      'Go nació en Google para afrontar la complejidad de los servidores modernos, combinando la simplicidad del código legible con la concurrencia mediante goroutines.',
    influences: ['C', 'Pascal', 'Newsqueak'],
    influenced: ['modernos lenguajes de sistemas', 'nube y microservicios'],
    paradigms: ['compilado', 'concurrente', 'imperativo', 'tipado'],
    currentStatus:
      'Muy popular en infraestructura, nube, DevOps y microservicios.',
    history:
      'Anunciado por Google en 2009, creado por Griesemer, Pike y Thompson.',
    curiosities: [
      'Su logotipo y nombre hacen referencia a un "go" (movimiento).',
      'Fue diseñado para ser rápido de compilar y fácil de aprender.',
    ],
    codeSample:
      'package main\nimport "fmt"\nfunc main() {\n  fmt.Println("HELLO WORLD")\n}',
    sources: [
      {
        title: 'The Go project, golang.org',
        type: 'web',
        url: 'https://go.dev/',
      },
    ],
  },
  {
    id: 'rust-language',
    name: 'Rust',
    year: 2010,
    creators: ['Graydon Hoare'],
    era: 'systems',
    chapterId: 'ch-09-systems',
    problemSolved:
      'Proveer un lenguaje de sistemas seguro en memoria, sin recolector de basura, con concurrencia segura.',
    historicalContext:
      'Rust, desarrollado inicialmente en Mozilla, ofrece el rendimiento de C con garantías de seguridad de memoria, evitando bugs clásicos sin GC.',
    influences: ['C', 'C++', 'ML', 'Haskell'],
    influenced: ['lenguajes de sistemas modernos', 'adopción en el kernel de Linux'],
    paradigms: ['de sistemas', 'funcional', 'imperativo', 'seguridad de memoria'],
    currentStatus:
      'Creciente adopción en sistemas, navegadores, herramientas CLI y, recientemente, en el kernel de Linux.',
    history:
      'Creado por Graydon Hoare en 2010, y posteriormente patrocinado por Mozilla; hoy es independiente.',
    curiosities: [
      'Fue el lenguaje más querido en encuestas de Stack Overflow durante años.',
      'Su sistema de ownership permite seguridad sin recolector de basura.',
    ],
    codeSample:
      'fn main() {\n  println!("HELLO WORLD");\n}',
    sources: [
      {
        title: 'The Rust project, rust-lang.org',
        type: 'web',
        url: 'https://www.rust-lang.org/',
      },
    ],
  },
  {
    id: 'sql-language',
    name: 'SQL',
    year: 1974,
    creators: ['Donald D. Chamberlin', 'Raymond F. Boyce', 'IBM'],
    era: 'systems',
    chapterId: 'ch-05-systems',
    problemSolved:
      'Consultar y manipular datos relacionales mediante un lenguaje declarativo cercano al álgebra relacional de Codd.',
    historicalContext:
      'Desarrollado en IBM San Jose Research Laboratory como SEQUEL para el sistema experimental System R. Estandarizó cómo la humanidad almacena y recupera información estructurada.',
    influences: ['Modelo relacional de Codd', 'Álgebra relacional'],
    influenced: ['PostgreSQL', 'MySQL', 'SQLite', 'Oracle', 'GraphQL'],
    paradigms: ['declarativo', 'relacional'],
    currentStatus:
      'El lenguaje universal e indiscutible de bases de datos relacionales en todo el planeta.',
    history:
      'Estandarizado por ANSI en 1986 e ISO en 1987, sigue siendo el motor de almacenamiento de prácticamente cualquier aplicación web y bancaria.',
    curiosities: [
      'Originalmente se llamaba SEQUEL (Structured English QUEry Language), pero se acortó a SQL por problemas de marca registrada.',
      'A diferencia de lenguajes imperativos, en SQL solo describes qué datos quieres, no cómo buscarlos en el disco.',
    ],
    codeSample:
      'SELECT message FROM chronicles WHERE era = "origin";',
    sources: [
      {
        title: 'Chamberlin & Boyce, SEQUEL: A Structured English Query Language (1974)',
        type: 'paper',
      },
    ],
  },
  {
    id: 'perl-language',
    name: 'Perl',
    year: 1987,
    creators: ['Larry Wall'],
    era: 'modern',
    chapterId: 'ch-07-modern',
    problemSolved:
      'Manipulación de texto y generación de informes de sistemas sin el dolor de C ni las limitaciones de los scripts de shell.',
    historicalContext:
      'Apodado "la cinta aislante de Internet", Perl fue el motor que impulsó las primeras aplicaciones dinámicas de la web en los años 90 a través de scripts CGI.',
    influences: ['C', 'sed', 'awk', 'sh'],
    influenced: ['Python', 'Ruby', 'PHP', 'JavaScript (Regex)'],
    paradigms: ['imperativo', 'funcional', 'orientado a objetos', 'scripting'],
    currentStatus:
      'Mantenido y activo en administración de sistemas y procesamiento bioinformático.',
    history:
      'Larry Wall lo diseñó con la filosofía TIMTOWTDI ("There Is More Than One Way To Do It"), celebrando la flexibilidad sintáctica.',
    curiosities: [
      'Fue el primer lenguaje en popularizar las expresiones regulares avanzadas (PCRE), hoy estándar en casi todo el software.',
    ],
    codeSample:
      'print "HELLO WORLD\\n";',
    sources: [
      {
        title: 'Wall, Christiansen & Schwartz, Programming Perl (1991)',
        type: 'book',
      },
    ],
  },
  {
    id: 'php-language',
    name: 'PHP',
    year: 1995,
    creators: ['Rasmus Lerdorf'],
    era: 'web',
    chapterId: 'ch-08-web',
    problemSolved:
      'Incrustar lógica dinámica directamente dentro de documentos HTML para crear páginas web interactivas.',
    historicalContext:
      'Nacido como "Personal Home Page Tools", PHP democratizó la creación de la web dinámica para millones de programadores, sustentando Wikipedia, WordPress y Facebook.',
    influences: ['C', 'Perl'],
    influenced: ['Desarrollo web masivo', 'Hack (Meta)'],
    paradigms: ['imperativo', 'orientado a objetos', 'scripting'],
    currentStatus:
      'Alimenta más del 70% de los sitios web con backend conocido en Internet.',
    history:
      'Evolucionó de un conjunto de binarios CGI a un motor de alto rendimiento con compilador JIT en PHP 8.',
    curiosities: [
      'Originalmente no estaba pensado como lenguaje de programación formal, sino como una utilidad personal de Rasmus.',
    ],
    codeSample:
      '<?php echo "HELLO WORLD"; ?>',
    sources: [
      {
        title: 'PHP Documentation Group, History of PHP',
        type: 'web',
        url: 'https://www.php.net/manual/en/history.php.php',
      },
    ],
  },
  {
    id: 'mojo-language',
    name: 'Mojo',
    year: 2023,
    creators: ['Chris Lattner', 'Modular'],
    era: 'ai',
    chapterId: 'ch-10-ai',
    problemSolved:
      'Combinar la usabilidad y sintaxis accesible de Python con el rendimiento de hardware directo y control de memoria de C/C++ y Rust para cargas de IA.',
    historicalContext:
      'Diseñado por Chris Lattner (creador de LLVM, Clang y Swift) para unificar la investigación y el despliegue de modelos de machine learning sobre aceleradores heterogéneos.',
    influences: ['Python', 'Rust', 'Swift', 'MLIR'],
    influenced: ['Compilación de IA moderna'],
    paradigms: ['multiparadigma', 'sistemas', 'computación paralela y tensorial'],
    currentStatus:
      'En desarrollo activo y adopción en la infraestructura de computación para modelos fundacionales.',
    history:
      'Presentado en mayo de 2023, promete hasta 68,000x de aceleración frente a Python estándar aprovechando paralelismo vectorial de CPU y GPU.',
    curiosities: [
      'Admite la extensión de archivo ".🔥" además de ".mojo".',
    ],
    codeSample:
      'fn main():\n    print("HELLO CHRONICLES")',
    sources: [
      {
        title: 'Modular, Mojo — A new programming language for AI developers (2023)',
        type: 'web',
        url: 'https://www.modular.com/mojo',
      },
    ],
  },
  {
    id: 'qsharp-language',
    name: 'Q#',
    year: 2017,
    creators: ['Microsoft Quantum Team'],
    era: 'future',
    chapterId: 'ch-11-future',
    problemSolved:
      'Expresar algoritmos cuánticos basados en qubits, superposición y entrelazamiento cuántico acoplados a procesadores clásicos.',
    historicalContext:
      'Desarrollado para programar computadoras cuánticas de escala intermedia y tolerantes a fallos, abstrayendo las puertas lógicas cuánticas (Hadamard, CNOT) en estructuras de software.',
    influences: ['C#', 'F#', 'Mecánica cuántica'],
    influenced: ['Lenguajes para computación cuántica'],
    paradigms: ['cuántico', 'funcional', 'declarativo'],
    currentStatus:
      'En desarrollo activo dentro del Azure Quantum Development Kit (código abierto).',
    history:
      'Diseñado para ejecutar algoritmos como Shor y Grover sobre hardware superconductor y de iones atrapados.',
    curiosities: [
      'A diferencia de los bits clásicos (0 o 1), una variable cuántica (Qubit) puede encontrarse en superposición de ambos estados hasta que una operación de medida colapsa su valor.',
    ],
    codeSample:
      'operation HelloQuantum() : Unit {\n    Message("HELLO QUANTUM WORLD");\n}',
    sources: [
      {
        title: 'Svore et al., Q#: A Language for Quantum Computing (Microsoft Research, 2018)',
        type: 'paper',
      },
    ],
  },
];

export const getLanguage = (id: string) => languages.find((l) => l.id === id);
