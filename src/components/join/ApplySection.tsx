import ApplyForm from "@/components/join/ApplyForm";
import { applySection } from "@/lib/join-data";

export default function ApplySection() {
  return (
    <section
      id="apply"
      className="scroll-mt-20 py-12 lg:py-16 bg-black text-white"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <div className="rounded-[20px] border border-white/10 bg-[#141414] p-8 sm:p-12 lg:p-14 shadow-2xl">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
            {/* Left Copy */}
            <div className="lg:pt-2">
              <h2 className="font-display text-[32px] sm:text-[40px] font-normal leading-tight text-white">
                {applySection.title}
              </h2>

              <p className="mt-6 max-w-sm font-sans text-[15px] sm:text-[16px] leading-[26px] text-zinc-300">
                {applySection.blurb}
              </p>
              <p className="mt-6 max-w-sm font-sans text-[14px] sm:text-[15px] leading-[24px] text-zinc-400">
                {applySection.emailNote}
              </p>

              <div className="mt-6">
                <a
                  href={`mailto:${applySection.email}`}
                  className="font-sans text-[16px] text-white hover:underline transition-colors"
                >
                  {applySection.email}
                </a>
              </div>
            </div>

            {/* Right Form Card */}
            <ApplyForm />
          </div>
        </div>
      </div>
    </section>
  );
}
