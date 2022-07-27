import { PrismProps } from '@mantine/prism';

type CodeDisplayExample = {
  language: PrismProps['language'];
  code: string;
};

const codeDisplayExamples: CodeDisplayExample[] = [
  {
    language: 'scss',
    code: `$c-blue-50: #eff6ff;
$c-blue-100: #dbeafe;
$c-blue-200: #bfdbfe;
$c-blue-300: #93c5fd;
$c-blue-400: #60a5fa;
$c-blue-500: #3b82f6;
$c-blue-600: #2563eb;
$c-blue-700: #1d4ed8;
$c-blue-800: #1e40af;
$c-blue-900: #1e3a8a;`,
  },
  {
    language: 'css',
    code: `html {
  --spacing-0: 0px;
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-5: 20px;
  --spacing-6: 24px;
  --spacing-7: 28px;
  --spacing-8: 32px;
  --spacing-9: 36px;
  --spacing-10: 40px;
  --spacing-11: 44px;
  --spacing-12: 48px;
  --spacing-13: 52px;
  --spacing-14: 56px;
  --spacing-15: 60px;
  --spacing-16: 64px;
  --spacing-17: 68px;
  --spacing-18: 72px;
  --spacing-19: 76px;
  --spacing-20: 80px;
  --spacing-21: 84px;
  --spacing-22: 88px;
  --spacing-23: 92px;
  --spacing-24: 96px;
}`,
  },
  {
    language: 'javascript',
    code: `const spacing_0 = 0;
const spacing_1 = 4;
const spacing_2 = 8;
const spacing_3 = 16;
const spacing_4 = 32;
const spacing_5 = 64;
const spacing_6 = 128;`,
  },
  {
    language: 'css',
    code: `:root {
  --space-tiny: 0.5rem;
  --space-small: 1rem;
  --space-base: 1.5rem;
  --space-large: 3rem;
  --space-x-large: 4rem;
}`,
  },
  {
    language: 'javascript',
    code: `{
  0: "0rem",
  0.5: "0.125rem",
  1: "0.25rem",
  1.5: "0.375rem",
  2: "0.5rem",
  2.5: "0.625rem",
  3: "0.75rem",
  3.5: "0.875rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  7: "1.75rem",
  8: "2rem",
  9: "2.25rem",
  10: "2.5rem",
  11: "2.75rem",
  12: "3rem",
  14: "3.5rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  28: "7rem",
  32: "8rem",
  36: "9rem",
  40: "10rem",
  44: "11rem",
  48: "12rem",
  52: "13rem",
  56: "14rem",
  60: "15rem",
  64: "16rem",
  72: "18rem",
  80: "20rem",
  96: "24rem",
}`,
  },
  {
    language: 'javascript',
    code: `[
  "hsl(214, 100%, 97%)",
  "hsl(214, 95%, 93%)",
  "hsl(213, 97%, 87%)",
  "hsl(212, 96%, 78%)",
  "hsl(213, 94%, 68%)",
  "hsl(217, 91%, 60%)",
  "hsl(221, 83%, 53%)",
  "hsl(224, 76%, 48%)",
  "hsl(226, 71%, 40%)",
  "hsl(224, 64%, 33%)",
]`,
  },
];

export default codeDisplayExamples;
