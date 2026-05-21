/**
 * ParticlesBackground
 * Lightweight ambient background.
 *
 * Decisions for performance:
 *  - Server component (no JS to ship).
 *  - All layers are STATIC: no animations, no particles, no observers.
 *  - Aurora and grain were moved to globals.css media queries.
 *  - Composed from a handful of cheap radial blobs + a vignette.
 *  - Sits on top of `body` background (which already paints atmospheric
 *    gradients). Total cost: a few painted layers, repainted only on resize.
 */
export default function ParticlesBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* Soft accent blobs — all static */}
      <div className="absolute -left-40 top-32 h-72 w-72 rounded-full bg-pride-yellow/10 blur-3xl sm:h-96 sm:w-96" />
      <div className="absolute -right-32 top-10 h-[24rem] w-[24rem] rounded-full bg-pride-purple/20 blur-3xl sm:h-[32rem] sm:w-[32rem]" />
      <div className="absolute -bottom-44 left-[24%] hidden h-[28rem] w-[28rem] rounded-full bg-pride-cyan/10 blur-3xl sm:block" />
      <div className="absolute right-[18%] top-[55%] hidden h-72 w-72 rounded-full bg-pride-pink/10 blur-3xl sm:block" />

      {/* Vignette — cheap composite */}
      <div className="vignette" />
    </div>
  );
}
