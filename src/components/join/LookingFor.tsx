import Image from "next/image";
import { lookingFor } from "@/lib/join-data";

export default function LookingFor() {
  const [crowd, portrait] = lookingFor.images;

  return (
    <section className="scroll-mt-20 py-12 lg:py-16 bg-background text-foreground">
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <div className="rounded-[15px] border border-hairline bg-surface p-6 sm:p-8 lg:p-10 shadow-sm">
          {/* Top 3-part layout */}
          <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr_1.05fr] items-stretch">
            {/* Column 1 - Heading + Crowd Photo */}
            <div className="flex flex-col justify-between">
              <h2 className="font-display text-[30px] sm:text-[36px] lg:text-[40px] font-normal leading-[1.2] text-foreground">
                Who we&apos;re looking
                <br />
                for
              </h2>

              <div className="relative mt-6 aspect-[375/210] w-full overflow-hidden rounded-[15px] border border-hairline shadow-sm">
                <Image
                  src={crowd.src}
                  alt={crowd.alt}
                  fill
                  sizes="(max-width: 1024px) 90vw, 360px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Column 2 - Criteria Bullet Points */}
            <div className="flex flex-col justify-center">
              <ul className="space-y-4">
                {lookingFor.criteria.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 font-sans text-[15px] sm:text-[16px] leading-[24px] text-foreground/90"
                  >
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-light"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 - Tall DJ Mixing Photo */}
            <div className="relative aspect-[375/480] w-full overflow-hidden rounded-[15px] border border-hairline shadow-sm sm:aspect-auto sm:h-full min-h-[380px] lg:min-h-[460px]">
              <Image
                src={portrait.src}
                alt={portrait.alt}
                fill
                sizes="(max-width: 1024px) 90vw, 360px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Bottom Footnote */}
          <p className="mt-8 pt-6 border-t border-hairline font-sans text-[15px] sm:text-[17px] leading-[26px] text-muted">
            {lookingFor.footnote}
          </p>
        </div>
      </div>
    </section>
  );
}
