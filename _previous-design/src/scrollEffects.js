const clamp01 = value => Math.max(0, Math.min(1, value));
const smoothstep = value => value * value * (3 - 2 * value);
export const HIGHLIGHT_FLIP_SPAN = 0.72;

// A flip spans each existing slide boundary. Between flips the card rests flat.
// Every face has a fixed half-turn offset, so changing the visible pair never
// resets the rotor or flashes the previous image when scrolling in reverse.
export function getHighlightFlip(progress, count) {
  if (count <= 1) return { from: 0, to: 0, active: 0, rotation: 0, lift: 0, shade: 0 };
  const position = clamp01(progress) * count;
  const start = 1 - HIGHLIGHT_FLIP_SPAN / 2;
  const from = Math.max(0, Math.min(count - 2, Math.floor(position - start)));
  const fraction = clamp01((position - from - start) / HIGHLIGHT_FLIP_SPAN);
  const turn = smoothstep(fraction);
  const edge = Math.sin(Math.PI * turn);
  return {
    from,
    to: from + 1,
    active: fraction >= 0.5 - 1e-8 ? from + 1 : from,
    rotation: -180 * (from + turn),
    lift: -12 * edge,
    shade: edge * 0.2,
  };
}

function mixColor(start, end, progress) {
  return `rgb(${start.map((channel, index) => Math.round(channel + (end[index] - channel) * progress)).join(' ')})`;
}

export function getEducationTheme(top, viewport, reduced = false) {
  const progress = reduced ? 1 : smoothstep(clamp01((viewport * 0.85 - top) / Math.max(1, viewport * 0.7)));
  const contrastSwitch = 0.438;
  const light = progress >= contrastSwitch;
  const separation = (2 * progress - 1) ** 2;
  // Switch text contrast near mid-gray, rather than interpolating light text
  // through the background color and making the copy disappear mid-scroll.
  const textProgress = light ? (progress - contrastSwitch) / (1 - contrastSwitch) : progress / contrastSwitch;
  return {
    progress,
    light,
    colors: {
      '--education-bg': mixColor([8, 10, 14], [255, 255, 255], progress),
      '--education-surface': mixColor([8 + 6 * separation, 10 + 8 * separation, 14 + 12 * separation], [255 - 10 * separation, 255 - 8 * separation, 255 - 4 * separation], progress),
      '--education-ink': light ? mixColor([0, 0, 0], [29, 29, 31], textProgress) : 'rgb(255 255 255)',
      '--education-muted': light ? mixColor([0, 0, 0], [92, 99, 112], textProgress) : mixColor([165, 175, 190], [255, 255, 255], textProgress),
      '--education-accent': light ? mixColor([0, 0, 0], [0, 102, 204], textProgress) : mixColor([135, 186, 255], [255, 255, 255], textProgress),
      '--education-border': mixColor([38, 48, 64], [219, 226, 238], progress),
    },
  };
}
