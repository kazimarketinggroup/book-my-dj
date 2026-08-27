import Image from "next/image";
import type { DjProfile } from "@/lib/dj-data";
import Reveal from "@/components/ui/Reveal";

export default function DjAbout({ dj }: { dj: DjProfile }) {
  return (
    <section id="about" className="scroll-mt-20">
      <div className="mx-auto w-full max-w-[1600px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14 2xl:px-16">
        <Reveal>
          <h2 className="font-display fluid-h2 font-semibold text-foreground">
            About
          </h2>
        </Reveal>

        <div className="mt-6 grid gap-5 lg:grid-cols-[1.35fr_1fr] lg:gap-6">
          <Reveal>
            <div className="h-full rounded-2xl border border-hairline bg-surface p-6 sm:p-7">
              {dj.about.paragraphs.map((para) => (
                <p
                  key={para.slice(0, 30)}
                  className="text-sm leading-relaxed text-muted not-first:mt-5"
                >
                  {para}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={90}>
            <div className="relative h-full min-h-56 w-full overflow-hidden rounded-2xl border border-hairline">
              <Image
                src={dj.about.image}
                alt={dj.about.alt}
                fill
                sizes="(max-width: 1024px) 92vw, 38vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
