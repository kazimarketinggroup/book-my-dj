import { testimonial } from "@/lib/last-minute-data";

export default function Testimonial() {
  return (
    <section className="scroll-mt-20 py-12 lg:py-16 bg-background">
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <figure className="relative isolate mx-auto max-w-[1291px] overflow-hidden rounded-[20px] border border-hairline bg-surface px-6 py-14 text-center sm:px-12 lg:py-20 shadow-sm text-foreground">
          {/* Faint concentric vinyl rings */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 [background-image:repeating-radial-gradient(circle_at_50%_45%,currentColor_0_1px,transparent_1px_16px)] opacity-[0.06]"
          />

          {/* Elegant quotation mark icon */}
          <div className="flex justify-center">
            <svg
              viewBox="0 0 58 46"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-auto sm:h-12 text-brand-light"
              aria-hidden="true"
            >
              <path
                d="M13.2 0C5.9 0 0 5.9 0 13.2C0 20.5 5.9 26.4 13.2 26.4C13.8 26.4 14.4 26.3 15 26.2C13.8 33.1 8.8 38.6 2.1 41.2C1 41.6 0.4 42.8 0.8 43.9C1.2 45 2.4 45.6 3.5 45.2C13.8 41.2 20.8 31.6 20.8 19.8V13.2C20.8 5.9 14.9 0 13.2 0ZM43.2 0C35.9 0 30 5.9 30 13.2C30 20.5 35.9 26.4 43.2 26.4C43.8 26.4 44.4 26.3 45 26.2C43.8 33.1 38.8 38.6 32.1 41.2C31 41.6 30.4 42.8 30.8 43.9C31.2 45 32.4 45.6 33.5 45.2C43.8 41.2 50.8 31.6 50.8 19.8V13.2C50.8 5.9 44.9 0 43.2 0Z"
                fill="currentColor"
              />
            </svg>
          </div>

          <blockquote className="mx-auto mt-8 max-w-[890px]">
            <p className="font-display text-[22px] sm:text-[26px] lg:text-[30px] font-normal leading-[34px] sm:leading-[42px] lg:leading-[45px] text-foreground">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
          </blockquote>

          <figcaption className="mt-8">
            <span className="block font-display text-[18px] sm:text-[20px] font-normal text-foreground">
              {testimonial.name}
            </span>
            <span className="mt-1 block font-display text-[15px] sm:text-[16px] text-muted">
              {testimonial.meta}
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
