import Image from "next/image";
import { story } from "@/lib/about-data";
import Waveform from "@/components/ui/Waveform";

export default function StorySection() {
  return (
    <section className="scroll-mt-20">
      <div className="mx-auto w-full max-w-[1600px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14 2xl:px-16">
        <h2 className="font-display fluid-h2 font-semibold text-foreground">
          {story.title}
        </h2>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_1.15fr] lg:gap-6">
          {/* Video card */}
          <figure className="relative aspect-video overflow-hidden rounded-2xl border border-hairline">
            <Image
              src={story.video}
              alt={story.videoAlt}
              fill
              sizes="(max-width: 1024px) 92vw, 45vw"
              className="object-cover"
            />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-3 p-4">
              <span className="flex items-center gap-3 rounded-full bg-black/60 px-3 py-2 backdrop-blur-md">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black">
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-3 w-3 translate-x-px"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                <Waveform className="h-4 w-24 text-white/80 sm:w-32" bars={28} />
                <span className="text-xs text-zinc-200 tabular-nums">0:16</span>
              </span>
            </figcaption>
          </figure>

          {/* Copy panel */}
          <div className="rounded-2xl border border-hairline bg-surface p-5 sm:p-6">
            {story.paragraphs.map((p) => (
              <p
                key={p.slice(0, 24)}
                className="text-sm leading-relaxed text-muted not-first:mt-4 sm:text-[15px]"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
