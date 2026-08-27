import Image from "next/image";
import type { EventDetail } from "@/lib/event-detail-data";
import Reveal from "@/components/ui/Reveal";

export default function DetailFlyers({ detail }: { detail: EventDetail }) {
  return (
    <section className="scroll-mt-20">
      <div className="mx-auto w-full max-w-[1600px] px-5 py-8 sm:px-8 lg:px-12 lg:py-12 2xl:px-16">
        <h2 className="sr-only">Recent event flyers</h2>
        <ul className="no-scrollbar flex gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-4 sm:overflow-visible">
          {detail.flyers.map((f, i) => (
            <Reveal key={f.src} as="li" delay={i * 80}>
              <div className="relative aspect-4/5 w-64 shrink-0 overflow-hidden rounded-xl border border-hairline sm:w-auto">
                <Image
                  src={f.src}
                  alt={f.alt}
                  fill
                  sizes="(max-width: 640px) 16rem, 22vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
