import { useEffect } from 'react';

// One scheduled reflection update, shared by all glass surfaces.
export function useGlassEffects() {
  useEffect(() => {
    const preference = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    let frame = 0;
    let current = null;
    let pending = null;

    const clearSurface = () => {
      for (const property of ['--glass-x', '--glass-y', '--glass-active']) current?.style.removeProperty(property);
      current = null;
    };
    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      pending = null;
      clearSurface();
    };
    const paint = () => {
      frame = 0;
      if (!pending) return;
      const { element, x, y } = pending;
      if (element !== current) clearSurface();
      if (!element?.isConnected) return;
      current = element;
      const bounds = element.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      element.style.setProperty('--glass-x', `${(x - bounds.left) / bounds.width * 100}%`);
      element.style.setProperty('--glass-y', `${(y - bounds.top) / bounds.height * 100}%`);
      element.style.setProperty('--glass-active', '1');
    };
    const move = event => {
      if (!preference.matches || event.pointerType === 'touch') return;
      pending = { element: event.target?.closest?.('[data-glass]'), x: event.clientX, y: event.clientY };
      if (!frame) frame = requestAnimationFrame(paint);
    };
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', reset);
    window.addEventListener('blur', reset);
    preference.addEventListener('change', reset);
    return () => {
      reset();
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', reset);
      window.removeEventListener('blur', reset);
      preference.removeEventListener('change', reset);
    };
  }, []);
}
