import Image from "next/image";
import Link from "next/link";
import { djs } from "@/lib/home-data";

export default function MeetTheDjs() {
  return (
    <section id="about" className="scroll-mt-20">
      <div className="mx-auto w-full max-w-[1600px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14 2xl:px-16">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,2fr)] lg:gap-10">
          <div>
            <h2 className="font-display fluid-h2 font-semibold text-foreground">
              Meet the Djs
            </h2>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              Handpicked talent, every genre covered, every event nailed.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
            {djs.map((dj) => (
              <Link key={dj.name} href={dj.href} className="block">
              <figure
                className="group relative aspect-[4/3] overflow-hidden rounded-[22px] border border-white/8 bg-[#11151d] shadow-[0_18px_32px_rgba(0,0,0,0.18)]"
              >
                <Image
                  src={dj.image}
                  alt={dj.alt}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1280px) 40vw, 30vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black/90 to-transparent"
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-4">
                  <p className="font-display text-lg font-semibold text-white">
                    {dj.name}
                  </p>
                  <p className="text-sm text-zinc-300">{dj.role}</p>
                </figcaption>
              </figure>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
