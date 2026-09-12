import { joinSteps } from "@/lib/join-data";

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 py-12 lg:py-16 bg-black text-white"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.8fr] lg:gap-16 items-start">
          <h2 className="font-display text-[32px] sm:text-[40px] font-normal leading-tight text-white">
            How it works
          </h2>

          <ol className="space-y-3.5">
            {joinSteps.map((step) => (
              <li
                key={step.title}
                className="rounded-[15px] border border-white/10 bg-gradient-to-r from-[rgba(82,5,119,0.15)] via-[#151515] to-[#151515] px-6 py-4.5 sm:px-7 sm:py-5 transition-all hover:border-white/20"
              >
                <h3 className="font-sans text-[17px] sm:text-[18px] font-medium text-white">
                  {step.title}
                </h3>
                <p className="mt-1 font-sans text-[13px] sm:text-[14px] leading-[22px] text-zinc-400">
                  {step.blurb}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
