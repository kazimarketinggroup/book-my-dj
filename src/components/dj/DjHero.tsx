import Image from "next/image";
import Link from "next/link";
import type { DjProfile } from "@/lib/dj-data";

/** Wordmarks for the platform row under the hero. */
function SocialMark({ label }: { label: string }) {
  if (label === "SoundCloud") {
    return (
      <span className="inline-flex items-center gap-2">
        <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className="h-4 w-6">
          <path d="M1 14v3h1v-3H1Zm2-2v5h1v-5H3Zm2-1v6h1v-6H5Zm2-2v8h1V9H7Zm2-2v10h1V7H9Zm2 1v9h1V8h-1Zm2.5-2A4.5 4.5 0 0 0 13 17h6a3 3 0 0 0 0-6 4.5 4.5 0 0 0-5.5-5Z" />
        </svg>
        <span className="text-sm font-semibold tracking-wide">SOUNDCLOUD</span>
      </span>
    );
  }
  if (label === "Instagram") {
    return (
      <span className="font-display text-lg font-semibold italic">Instagram</span>
    );
  }
  return <span className="text-sm font-semibold tracking-wide">M—XCLOUD</span>;
}

export default function DjHero({ dj }: { dj: DjProfile }) {
  return (
    <section className="hero-screen relative isolate overflow-hidden">
      <Image
        src={dj.hero.image}
        alt={dj.hero.alt}
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-right-top"
      />
      {/* Left-weighted scrim so the copy stays readable over the photo */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-r from-black via-black/65 to-transparent"
      />

      <div className="mx-auto w-full max-w-[1600px] px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20 2xl:px-16">
        <p className="font-signature text-4xl text-white sm:text-5xl">
          {dj.signature}
        </p>

        <h1 className="mt-4 max-w-lg font-display fluid-hero-sm font-semibold text-white">
          {dj.headline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>

        <p className="mt-5 max-w-md text-sm leading-relaxed text-zinc-300">
          {dj.intro}
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="btn-brand rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
          >
            Book My DJ
          </Link>
          <Link
            href="/events"
            className="rounded-lg border border-white/25 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
          >
            Our Events
          </Link>
        </div>

        <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-white">
          {dj.socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-90 transition-opacity hover:opacity-100"
              >
                <SocialMark label={s.label} />
                <span className="sr-only">{dj.name} on {s.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
