import Reveal from "@/components/ui/Reveal";
import { joinSteps } from "@/lib/join-data";

/** Brand tint strengthens as you move down the list. */
const tints = [
  "from-brand/22 to-transparent",
  "from-brand/16 to-transparent",
  "from-brand/12 to-transparent",
  "from-brand/26 to-transparent",
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="mx-auto w-full max-w-[1600px] scroll-mt-20 px-5 py-10 sm:px-8 lg:px-12 lg:py-14 2xl:px-16"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)] lg:gap-12">
        <h2 className="font-display fluid-h2 font-semibold text-foreground">
          How it works
        </h2>

        <ol className="space-y-4">
          {joinSteps.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={i * 80}
              className={`rounded-2xl border border-hairline bg-linear-to-l ${tints[i % tints.length]} p-4 sm:p-5`}
            >
              <h3 className="font-display text-sm font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.blurb}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
