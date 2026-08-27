import { assuranceHeading, assurances } from "@/lib/events-data";
import Reveal from "@/components/ui/Reveal";

export default function Assurances() {
  return (
    <section className="scroll-mt-20">
      <div className="mx-auto w-full max-w-[1600px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14 2xl:px-16">
        <Reveal>
          <h2 className="font-display fluid-h2 font-semibold text-foreground">
            {assuranceHeading[0]}
            <br className="hidden sm:block" /> {assuranceHeading[1]}
          </h2>
        </Reveal>

        <ul className="mt-8 grid gap-4 md:grid-cols-3 lg:gap-5">
          {assurances.map((a, i) => (
            <Reveal key={a.title} as="li" delay={i * 90}>
              <div className="h-full rounded-2xl border border-hairline bg-surface p-6 sm:p-7">
                <h3 className="font-display text-base font-semibold text-foreground">
                  {a.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {a.blurb}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
