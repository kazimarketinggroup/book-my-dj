import Image from "next/image";
import type { EventDetail } from "@/lib/event-detail-data";
import Reveal from "@/components/ui/Reveal";

/** Eyebrow label above a heading; renders nothing when the label is empty. */
function Eyebrow({ text }: { text: string }) {
  if (!text) return null;
  return (
    <p className="text-[11px] tracking-[0.2em] text-muted uppercase">{text}</p>
  );
}

export default function DetailShowcase({ detail }: { detail: EventDetail }) {
  const { detail: left, video } = detail;

  return (
    <section className="scroll-mt-20">
      <div className="mx-auto w-full max-w-[1600px] px-5 py-8 sm:px-8 lg:px-12 lg:py-10 2xl:px-16">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Left: copy above a supporting shot */}
          <div>
            <Reveal>
              <Eyebrow text={left.eyebrow} />
              <h2 className="mt-2 font-display fluid-h2 font-semibold text-foreground">
                {left.title}
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
                {left.blurb}
              </p>
            </Reveal>

            <Reveal delay={100}>
              <div className="relative mt-6 aspect-16/10 w-full overflow-hidden rounded-2xl border border-hairline">
                <Image
                  src={left.image}
                  alt={left.alt}
                  fill
                  sizes="(max-width: 1024px) 92vw, 46vw"
                  className="object-cover object-top"
                />
              </div>
            </Reveal>
          </div>

          {/* Right: video still above its caption */}
          <Reveal delay={80}>
            <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl border border-hairline">
              <Image
                src={video.image}
                alt={video.alt}
                fill
                sizes="(max-width: 1024px) 92vw, 46vw"
                className="object-cover"
              />
            </div>
            <div className="mt-5">
              <Eyebrow text={video.eyebrow} />
              <h3 className="mt-2 font-display fluid-h2 font-semibold text-foreground">
                {video.title}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                {video.blurb}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
