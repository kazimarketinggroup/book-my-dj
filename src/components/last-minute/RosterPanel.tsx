import Image from "next/image";
import { rosterPanel, steps } from "@/lib/last-minute-data";

export default function RosterPanel() {
  return (
    <section id="how-it-works" className="scroll-mt-20">
      <div className="mx-auto w-full max-w-[1600px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14 2xl:px-16">
        <div className="rounded-2xl border border-hairline bg-surface p-5 sm:p-6 lg:p-7">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)_minmax(0,0.9fr)] lg:gap-0">
            {/* Column 1 - heading + party photo, with the roster copy below */}
            <div className="lg:pr-8">
              <h2 className="font-display text-2xl leading-tight font-semibold text-foreground sm:text-3xl">
                {rosterPanel.stepsHeading[0]}
                <br />
                {rosterPanel.stepsHeading[1]}
              </h2>

              <div className="relative mt-6 aspect-16/10 w-full overflow-hidden rounded-xl">
                <Image
                  src={rosterPanel.stepsImage}
                  alt={rosterPanel.stepsImageAlt}
                  fill
                  sizes="(max-width: 1024px) 92vw, 30vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Column 2 - numbered steps */}
            <ol className="space-y-6 lg:border-x lg:border-hairline lg:px-8">
              {steps.map((step, i) => (
                <li key={step.title} className="flex gap-3">
                  <span className="text-sm text-muted tabular-nums">
                    {i + 1}.
                  </span>
                  <div>
                    <h3 className="text-sm font-medium text-foreground sm:text-[15px]">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {step.blurb}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            {/* Column 3 - DJ portrait */}
            <div className="relative aspect-3/4 w-full overflow-hidden rounded-xl lg:ml-8 lg:aspect-auto lg:min-h-80">
              <Image
                src={rosterPanel.image}
                alt={rosterPanel.imageAlt}
                fill
                sizes="(max-width: 1024px) 92vw, 26vw"
                className="object-cover object-top"
              />
            </div>
          </div>

          {/* Roster copy spans the two left columns, matching the design */}
          <div className="mt-8 lg:max-w-[62%]">
            <h3 className="font-display fluid-h2 font-semibold text-foreground">
              {rosterPanel.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {rosterPanel.blurb}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
