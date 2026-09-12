import Image from "next/image";
import { rosterPanel, steps } from "@/lib/last-minute-data";

export default function RosterPanel() {
  return (
    <section id="how-it-works" className="scroll-mt-20 py-12 lg:py-16 bg-black">
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1290px] rounded-[15px] border-[3px] border-[rgba(218,218,218,0.1)] bg-[#141414] p-6 sm:p-8 lg:p-10 shadow-2xl">
          {/* Top 3-column layout */}
          <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr_1fr] lg:gap-8 items-stretch">
            {/* Column 1 - Heading + Party Dance Photo */}
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="font-display text-[28px] sm:text-[34px] lg:text-[40px] font-normal leading-tight text-white">
                  {rosterPanel.stepsHeading[0]}
                  <br />
                  {rosterPanel.stepsHeading[1]}
                </h2>
              </div>

              <div className="relative mt-6 aspect-[375/197] w-full overflow-hidden rounded-[15px] border border-white/10 shadow-lg">
                <Image
                  src={rosterPanel.stepsImage}
                  alt={rosterPanel.stepsImageAlt}
                  fill
                  sizes="(max-width: 1024px) 92vw, 375px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Column 2 - Numbered Steps with Vertical Dividers on Both Sides */}
            <div className="flex flex-col justify-center lg:border-x lg:border-white/20 lg:px-8">
              <ol className="space-y-6">
                {steps.map((step, i) => (
                  <li key={step.title} className="flex gap-3 items-start">
                    <span className="font-sans text-[16px] sm:text-[18px] font-normal text-white tabular-nums">
                      {i + 1}.
                    </span>
                    <div>
                      <h3 className="font-sans text-[16px] sm:text-[18px] font-medium text-white">
                        {step.title}
                      </h3>
                      <p className="mt-1 font-sans text-[14px] leading-[22px] text-[#ACA9B3]">
                        {step.blurb}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Column 3 - Tall DJ Portrait */}
            <div className="relative aspect-[375/500] w-full overflow-hidden rounded-[15px] border border-white/10 shadow-lg sm:aspect-auto sm:h-full min-h-[360px] lg:min-h-[480px]">
              <Image
                src={rosterPanel.image}
                alt={rosterPanel.imageAlt}
                fill
                sizes="(max-width: 1024px) 92vw, 375px"
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Bottom section: A Roster Built For This Exact Situation */}
          <div className="mt-10 pt-8 border-t border-white/10 lg:border-t-0 lg:mt-8 lg:max-w-[65%]">
            <h3 className="font-display text-[26px] sm:text-[32px] lg:text-[40px] font-normal leading-tight text-white">
              {rosterPanel.title}
            </h3>
            <p className="mt-3 font-sans text-[15px] sm:text-[17px] leading-[28px] text-white/90">
              {rosterPanel.blurb}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
