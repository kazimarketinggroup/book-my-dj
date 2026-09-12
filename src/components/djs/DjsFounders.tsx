import Image from "next/image";
import Link from "next/link";
import { FOUNDERS } from "@/lib/djs-data";

export default function DjsFounders() {
  return (
    <section className="relative w-full bg-background text-foreground py-12 lg:py-16 transition-colors duration-200">
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <div className="grid items-center gap-8 lg:grid-cols-[301px_1fr] lg:gap-8 xl:gap-10">
          {/* Left Column: Heading & Blurb (vertically centered) */}
          <div>
            <h2 className="font-display text-[28px] sm:text-[36px] lg:text-[40px] font-normal leading-[1.2] sm:leading-[46px] text-foreground">
              The founders
            </h2>
            <p className="mt-2.5 sm:mt-3 font-sans text-[15px] sm:text-[18px] leading-[23px] sm:leading-[25px] text-muted max-w-[301px]">
              Handpicked talent, every genre covered, every event nailed.
            </p>
          </div>

          {/* Right Column: Two Founder Cards */}
          <div className="grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 max-w-[942px]">
            {FOUNDERS.map((founder) => (
              <Link
                key={founder.name}
                href={founder.href}
                className="group relative block aspect-[457/331] w-full overflow-hidden rounded-[15px] border border-hairline bg-card shadow-2xl transition-transform duration-300 hover:border-brand-light/40"
              >
                <Image
                  src={founder.image}
                  alt={founder.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 457px"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />

                {/* Bottom gradient from Figma: linear-gradient(360deg, #000000 0%, rgba(0, 0, 0, 0) 100%) */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-black via-black/70 to-transparent"
                />

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex flex-col justify-end">
                  <p className="font-sans text-[20px] sm:text-[25px] font-medium leading-[26px] sm:leading-[30px] text-white">
                    {founder.name}
                  </p>
                  <p className="font-sans text-[14px] sm:text-[17px] font-normal text-white/80">
                    {founder.role}
                  </p>
                  <span className="mt-1.5 sm:mt-2 inline-flex items-center font-sans text-[14px] sm:text-[17px] text-white transition-transform duration-300 group-hover:translate-x-1">
                    View Profile &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
