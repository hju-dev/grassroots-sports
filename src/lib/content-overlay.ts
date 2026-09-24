import { cleanContentValue, isContentKey } from '@/lib/content-defs';

type Tree = { [k: string]: string | Tree };

const has = (o: object, k: string) => Object.prototype.hasOwnProperty.call(o, k);

// Returns a copy of the built-in messages with the owner's published edits laid
// over them. `overrides` maps a message path ("home.headline") to its text.
//
// Only paths the dashboard is allowed to edit are applied, and only where the
// built-in messages already have a string at that exact spot, so an edit can
// never add, replace or reach into anything else. Own-property checks (not `in`)
// keep prototype keys like "__proto__" and "constructor" out.
export function applyContentOverrides<T extends Tree>(base: T, overrides: Record<string, string>, locale: 'en' | 'th'): T {
  const result = structuredClone(base) as Tree;
  for (const path of Object.keys(overrides)) {
    if (!has(overrides, path)) continue;
    const value = overrides[path];
    if (typeof value !== 'string') continue;
    if (!isContentKey(`${locale}.${path}`)) continue;
    // Re-checked on the way out, not just on the way in: a value that fails
    // (for example one containing a curly bracket, which the translation system
    // reads as code) is ignored, so it can never break a page.
    const checked = cleanContentValue(`${locale}.${path}`, value);
    if (!checked.ok) continue;

    const parts = path.split('.');
    let node: Tree = result;
    let ok = true;
    for (let i = 0; i < parts.length - 1; i++) {
      const next = has(node, parts[i]) ? node[parts[i]] : undefined;
      if (typeof next !== 'object' || next === null) { ok = false; break; }
      node = next as Tree;
    }
    const leaf = parts[parts.length - 1];
    if (ok && has(node, leaf) && typeof node[leaf] === 'string') node[leaf] = checked.value;
  }
  return result as T;
}
