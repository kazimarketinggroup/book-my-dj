import Image from "next/image";
import Link from "next/link";
import { aboutHero, stats } from "@/lib/about-data";

export default function AboutHero() {
  return (
    <section className="hero-screen hero-screen-stack relative isolate">
      <div className="relative flex flex-1 items-center overflow-hidden">
        <Image
          src={aboutHero.image}
          alt={aboutHero.alt}
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover object-center"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-black/55" />

        <div className="mx-auto w-full max-w-[1600px] px-5 py-14 text-center sm:px-8 sm:py-16 lg:px-12 lg:py-20 2xl:px-16">
          <h1 className="mx-auto max-w-2xl font-display fluid-hero font-semibold text-white">
            {aboutHero.title}
          </h1>
          <p className="mx-auto mt-5 max-w-xl fluid-body leading-relaxed text-zinc-300">
            {aboutHero.blurb}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/#book"
              className="btn-brand rounded-lg px-7 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Get Quote
            </Link>
            <Link
              href="/#events"
              className="rounded-lg border border-white/25 bg-white/5 px-7 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
            >
              Our Events
            </Link>
          </div>
        </div>
      </div>

      {/* Stats strip — overlaps the hero image bottom edge */}
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12 2xl:px-16">
        <dl className="-mt-12 grid grid-cols-2 gap-y-8 rounded-xl border border-white/10 bg-black/70 px-6 py-6 backdrop-blur-md sm:-mt-14 lg:grid-cols-4 lg:px-10">
          {stats.map((s) => (
            <div key={s.label} className="text-center lg:text-left">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-display text-2xl font-bold text-white sm:text-3xl">
                  {s.value}
                </span>
                <span className="mt-1 block text-[11px] tracking-[0.14em] text-zinc-400 uppercase">
                  {s.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
