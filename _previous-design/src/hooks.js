import { useEffect, useLayoutEffect, useRef } from 'react';

export const clamp = (n, min = 0, max = 1) => Math.min(max, Math.max(min, n));

// Sticky positioning does the pinning. A single queued frame maps vertical scroll
// to each scene's progress, and reversing the scroll reverses the animation.
export function useScrollScene(scene, update) {
  const callback = useRef(update);
  useLayoutEffect(() => { callback.current = update; });
  useEffect(() => {
    let frame = 0;
    const paint = () => {
      frame = 0;
      const element = scene.current;
      if (!element) return;
      const bounds = element.getBoundingClientRect();
      callback.current(clamp(-bounds.top / Math.max(1, bounds.height - innerHeight)), {
        top: bounds.top, height: bounds.height, viewport: innerHeight,
        mobile: innerWidth <= 760,
        reduced: matchMedia('(prefers-reduced-motion: reduce)').matches,
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(paint); };
    const observer = new ResizeObserver(schedule);
    const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
    if (scene.current) observer.observe(scene.current);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    motionPreference.addEventListener('change', schedule);
    document.fonts.ready.then(schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      motionPreference.removeEventListener('change', schedule);
    };
  }, [scene]);
}

export function useDialog(dialog, open, onClose) {
  useEffect(() => {
    const element = dialog.current;
    if (!open || !element) return;
    const previous = document.activeElement;
    element.showModal();
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const cancel = (event) => { event.preventDefault(); onClose(); };
    element.addEventListener('cancel', cancel);
    return () => {
      element.close();
      document.body.style.overflow = originalOverflow;
      element.removeEventListener('cancel', cancel);
      previous?.focus({ preventScroll: true });
    };
  }, [dialog, open, onClose]);
}
