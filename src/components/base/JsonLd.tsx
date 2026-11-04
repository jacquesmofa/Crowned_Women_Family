import { useEffect } from 'react';

/**
 * Injects a JSON-LD block into <head> for the current page and removes it on
 * unmount. Use only for facts that are actually visible on the page.
 */
export default function JsonLd({ id, data }: { id: string; data: Record<string, unknown> }) {
  const json = JSON.stringify(data);
  useEffect(() => {
    let el = document.getElementById(`ld-${id}`) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement('script');
      el.type = 'application/ld+json';
      el.id = `ld-${id}`;
      document.head.appendChild(el);
    }
    el.textContent = json;
    return () => { el?.remove(); };
  }, [id, json]);
  return null;
}