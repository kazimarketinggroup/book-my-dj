import Reveal from "@/components/ui/Reveal";
import { benefits } from "@/lib/join-data";

export default function WhyJoin() {
  return (
    <section className="mx-auto w-full max-w-[1600px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14 2xl:px-16">
      <h2 className="font-display fluid-h2 font-semibold text-foreground">
        Why DJs stay with us
      </h2>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((benefit, i) => (
          <Reveal
            as="li"
            key={benefit.title}
            delay={i * 60}
            className="rounded-2xl border border-hairline bg-surface p-5"
          >
            <span
              aria-hidden
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-surface-3 text-brand-light"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>

            <h3 className="mt-4 font-display text-base font-semibold text-foreground">
              {benefit.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{benefit.blurb}</p>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
