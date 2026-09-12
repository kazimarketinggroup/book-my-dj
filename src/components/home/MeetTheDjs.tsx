import Image from "next/image";
import Link from "next/link";
import { djs } from "@/lib/home-data";

export default function MeetTheDjs() {
  return (
    <section id="djs" className="scroll-mt-20 py-12 lg:py-16 bg-black">
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)] lg:gap-12">
          <div>
            <h2 className="font-display text-[32px] sm:text-[40px] font-normal leading-[46px] text-white">
              Meet the Djs
            </h2>
            <p className="mt-3 max-w-xs font-sans text-[16px] sm:text-[18px] leading-[25px] text-[#9C9C9C]">
              Handpicked talent, every genre covered, every event nailed.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {djs.map((dj) => (
              <Link key={dj.name} href={dj.href} className="block group">
                <figure
                  className="relative aspect-[456/331] w-full overflow-hidden rounded-[15px] border border-white/10 bg-[#121212] shadow-2xl"
                >
                  <Image
                    src={dj.image}
                    alt={dj.alt}
                    fill
                    sizes="(max-width: 640px) 90vw, 460px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Bottom gradient from Figma: linear-gradient(360deg, #000000 0%, rgba(0,0,0,0) 100%) */}
                  <div
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black via-black/60 to-transparent"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 p-6">
                    <p className="font-sans text-[22px] sm:text-[25px] font-normal leading-[25px] text-white">
                      {dj.name}
                    </p>
                    <p className="mt-1 font-sans text-[16px] sm:text-[18px] font-normal text-[#9C9C9C]">
                      {dj.role}
                    </p>
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
