import Image from "next/image";
import Link from "next/link";
import { pastGigsHero, pastGigsQuote } from "@/lib/past-gigs-data";

export default function PastGigsIntro() {
  return (
    <section className="scroll-mt-20">
      {/* Matches the Contact page section rhythm. */}
      <div className="mx-auto w-full max-w-[1600px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14 2xl:px-16">
        <h1 className="max-w-2xl font-display fluid-hero font-semibold text-foreground">
          {pastGigsHero.title[0]}
          <br />
          {pastGigsHero.title[1]}
        </h1>

        <p className="mt-5 max-w-md fluid-body leading-relaxed text-muted">
          {pastGigsHero.blurb}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="rounded-lg bg-foreground px-7 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            Get Quote
          </Link>
          <Link
            href="/events"
            className="rounded-lg border border-hairline px-7 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface-2"
          >
            Our Events
          </Link>
        </div>

        {/* Testimonial band */}
        <figure className="mt-10 grid gap-0 overflow-hidden rounded-2xl border border-hairline bg-surface md:grid-cols-2">
          <div className="relative aspect-video w-full md:aspect-auto md:min-h-72">
            <Image
              src={pastGigsQuote.image}
              alt={pastGigsQuote.alt}
              fill
              sizes="(max-width: 768px) 92vw, 46vw"
              className="object-cover"
            />
          </div>
          <blockquote className="flex items-center p-6 sm:p-8">
            <p className="fluid-body leading-relaxed text-foreground">
              &ldquo;{pastGigsQuote.quote}&rdquo;
            </p>
          </blockquote>
        </figure>
      </div>
    </section>
  );
}
