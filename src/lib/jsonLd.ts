// JSON.stringify() doesn't escape '<', so a value containing a literal
// "</script>" would close the script tag early when injected via
// dangerouslySetInnerHTML — a well-known XSS vector for this exact pattern.
// Escaping to < is inert inside a JSON string but can't ever close a
// tag when parsed back out as HTML.
export function toSafeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
