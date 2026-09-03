export interface CodeSample {
  id: string;
  language: string;
  year: number;
  label: string;
  code: string;
  explanation: string;
  context: string;
}

export const codeSamples: CodeSample[] = [
  {
    id: 'fortran-hello',
    language: 'FORTRAN',
    year: 1957,
    label: 'Un programa en FORTRAN',
    code: 'PROGRAM HELLO\n      PRINT *, "HELLO WORLD"\n      END',
    explanation:
      'FORTRAN permitió escribir cómputo científico con expresiones cercanas a las matemáticas, traducidas automáticamente a código de máquina.',
    context:
      'El primer lenguaje de alto nivel ampliamente adoptado. "HELLO WORLD" moderno, con una sintaxis de columnas heredera de las tarjetas perforadas.',
  },
  {
    id: 'lisp-factorial',
    language: 'LISP',
    year: 1958,
    label: 'Recursión en LISP',
    code: '(defun factorial (n)\n  (if (<= n 1) 1\n      (* n (factorial (- n 1)))))',
    explanation:
      'LISP introdujo funciones de primera clase y la recursión como forma natural de expresión, revolucionando la programación simbólica.',
    context:
      'El lenguaje de la inteligencia artificial temprana, basado en S-expressions entre paréntesis.',
  },
  {
    id: 'cobol-hello',
    language: 'COBOL',
    year: 1959,
    label: 'COBOL y los negocios',
    code: '       IDENTIFICATION DIVISION.\n       PROGRAM-ID. HELLO.\n       PROCEDURE DIVISION.\n           DISPLAY "HELLO WORLD".\n           STOP RUN.',
    explanation:
      'COBOL fue diseñado para ser legible en inglés y procesar datos de negocio. Su estructura por divisiones refleja su objetivo empresarial.',
    context:
      'Cincuenta años después sigue operando en sistemas críticos de bancos y gobiernos.',
  },
  {
    id: 'c-hello',
    language: 'C',
    year: 1972,
    label: 'C, el lenguaje de los sistemas',
    code: '#include <stdio.h>\nint main(void) {\n  printf("HELLO WORLD\\n");\n  return 0;\n}',
    explanation:
      'C combinó la eficiencia del ensamblador con la portabilidad de un lenguaje de alto nivel, convirtiéndose en la base de los sistemas operativos.',
    context:
      'Escrito en Bell Labs para reescribir UNIX; influenció a casi todos los lenguajes posteriores.',
  },
  {
    id: 'python-hello',
    language: 'Python',
    year: 1991,
    label: 'La legibilidad de Python',
    code: 'print("HELLO WORLD")',
    explanation:
      'Python priorizó la legibilidad y la expresividad. Su simplicidad lo convirtió en uno de los lenguajes más accesibles y versátiles.',
    context:
      'Diseñado por Guido van Rossum con la filosofía del "Zen de Python": explícito, simple y legible.',
  },
];

export const getCodeSample = (id: string) => codeSamples.find((c) => c.id === id);