// Strips control characters and caps length on untrusted form input before it's
// stored or echoed back in emails/admin views. React already escapes on render,
// this is the input-boundary half of that.
const CONTROL_CHAR_CODES = [
  ...Array.from({ length: 9 }, (_, i) => i),       // 0-8
  11,
  12,                                                // 11-12 (VT, FF)
  ...Array.from({ length: 18 }, (_, i) => i + 14), // 14-31
  127,                                               // DEL
];
const CONTROL_CHARS = new RegExp(
  `[${CONTROL_CHAR_CODES.map((code) => String.fromCharCode(code)).join('')}]`,
  'g'
);

export function sanitizeText(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return '';
  return value
    .replace(CONTROL_CHARS, '')
    .trim()
    .slice(0, maxLength);
}
