import { joinSteps } from "@/lib/join-data";

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 py-12 lg:py-16 bg-background text-foreground"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.8fr] lg:gap-16 items-start">
          <h2 className="font-display text-[32px] sm:text-[40px] font-normal leading-tight text-foreground">
            How it works
          </h2>

          <ol className="space-y-3.5">
            {joinSteps.map((step) => (
              <li
                key={step.title}
                className="rounded-[15px] border border-hairline bg-surface-2 px-6 py-4.5 sm:px-7 sm:py-5 transition-all hover:border-foreground/20"
              >
                <h3 className="font-sans text-[17px] sm:text-[18px] font-medium text-foreground">
                  {step.title}
                </h3>
                <p className="mt-1 font-sans text-[13px] sm:text-[14px] leading-[22px] text-muted">
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
