/**
 * Mulberry32 — deterministic PRNG safe to call during React render.
 * Returns a function that produces a new pseudo-random number [0, 1) on each call.
 */
export function seededRandom(seed: number) {
  return function next() {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
