import { assuranceHeading, assurances } from "@/lib/events-data";
import Reveal from "@/components/ui/Reveal";

export default function Assurances() {
  return (
    <section className="scroll-mt-20 py-12 lg:py-16 bg-black">
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <Reveal>
          <h2 className="font-display text-[28px] sm:text-[34px] lg:text-[40px] font-normal leading-tight sm:leading-[46px] text-white">
            {assuranceHeading[0]}
            <br className="hidden sm:block" /> {assuranceHeading[1]}
          </h2>
        </Reveal>

        <ul className="mt-8 grid gap-4 md:grid-cols-3 lg:gap-6">
          {assurances.map((a, i) => (
            <Reveal key={a.title} as="li" delay={i * 90}>
              <div className="h-full rounded-[15px] border border-white/10 bg-[#121212] p-6 sm:p-7 shadow-xl">
                <h3 className="font-display text-[18px] sm:text-[20px] font-medium text-white">
                  {a.title}
                </h3>
                <p className="mt-3 font-sans text-[14px] sm:text-[15px] leading-[24px] text-[#ACA9B3]">
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
