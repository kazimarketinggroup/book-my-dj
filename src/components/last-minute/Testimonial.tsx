import { testimonial } from "@/lib/last-minute-data";

export default function Testimonial() {
  return (
    <section className="scroll-mt-20">
      <div className="mx-auto w-full max-w-[1600px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14 2xl:px-16">
        <figure className="relative isolate overflow-hidden rounded-2xl border border-hairline bg-surface px-6 py-14 text-center sm:px-10 lg:py-20">
          {/* Faint concentric rings, as in the design */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 opacity-[0.06] [background-image:repeating-radial-gradient(circle_at_50%_45%,currentColor_0_1px,transparent_1px_14px)] text-foreground"
          />

          <span
            aria-hidden
            className="font-display text-5xl leading-none font-bold text-foreground"
          >
            &ldquo;
          </span>

          <blockquote className="mx-auto mt-6 max-w-2xl">
            <p className="font-display text-lg leading-relaxed font-medium text-foreground sm:text-xl lg:text-2xl">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
          </blockquote>

          <figcaption className="mt-8 fluid-body text-foreground">
            <span className="block">{testimonial.name}</span>
            <span className="mt-1 block text-muted">{testimonial.meta}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
