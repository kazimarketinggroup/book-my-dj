import Image from "next/image";
import type { DjProfile } from "@/lib/dj-data";
import Reveal from "@/components/ui/Reveal";

export default function DjGallery({ dj }: { dj: DjProfile }) {
  return (
    <section className="scroll-mt-20">
      <div className="mx-auto w-full max-w-[1600px] px-5 py-6 sm:px-8 lg:px-12 lg:py-8 2xl:px-16">
        <h2 className="sr-only">{dj.name} in action</h2>
        <ul className="no-scrollbar flex gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-4 sm:overflow-visible">
          {dj.gallery.map((shot, i) => (
            <Reveal key={shot.src} as="li" delay={i * 80}>
              <div className="relative aspect-4/5 w-56 shrink-0 overflow-hidden rounded-xl border border-hairline sm:w-auto">
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  sizes="(max-width: 640px) 14rem, 22vw"
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
