import Image from "next/image";
import { story } from "@/lib/about-data";

export default function StorySection() {
  return (
    <section className="scroll-mt-20 py-12 lg:py-16 bg-background">
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <h2 className="font-display text-[32px] sm:text-[40px] font-normal leading-[46px] text-foreground">
          {story.title}
        </h2>

        <div className="mt-8 grid gap-6 lg:grid-cols-[524fr_726fr] lg:gap-8 items-stretch">
          {/* Video / DJ card */}
          <div className="relative aspect-[524/297] w-full overflow-hidden rounded-[18.6px] border border-hairline shadow-md">
            <Image
              src={story.video}
              alt={story.videoAlt}
              fill
              sizes="(max-width: 1024px) 92vw, 524px"
              className="object-cover"
            />
          </div>

          {/* Copy panel */}
          <div className="flex flex-col justify-center rounded-[18.6px] border border-hairline bg-surface p-6 sm:p-8 lg:p-10 shadow-sm">
            {story.paragraphs.map((p, index) => (
              <p
                key={index}
                className="font-sans text-[15px] sm:text-[17px] leading-[28px] text-muted not-first:mt-6"
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
