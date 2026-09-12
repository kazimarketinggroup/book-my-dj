import { benefits } from "@/lib/join-data";

export default function WhyJoin() {
  return (
    <section className="scroll-mt-20 py-12 lg:py-16 bg-black text-white">
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <h2 className="font-display text-[32px] sm:text-[40px] font-normal leading-tight text-white">
          Why DJs stay with us
        </h2>

        <ul className="mt-8 sm:mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <li
              key={benefit.title}
              className="rounded-[15px] border border-white/10 bg-[#141414] p-6 sm:p-7 transition-all hover:bg-[#181818] flex flex-col"
            >
              <span
                aria-hidden
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-zinc-300"
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

              <h3 className="mt-4 font-sans text-[18px] sm:text-[20px] font-medium text-white">
                {benefit.title}
              </h3>
              <p className="mt-2 font-sans text-[14px] sm:text-[15px] leading-[22px] text-zinc-400">
                {benefit.blurb}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
