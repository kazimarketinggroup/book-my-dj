import Link from "next/link";
import Image from "next/image";
import { team } from "@/lib/about-data";

export default function TeamSection() {
  return (
    <section id="team" className="scroll-mt-20 py-12 lg:py-16 bg-background">
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <h2 className="font-display text-[32px] sm:text-[40px] font-normal leading-[46px] text-foreground">
          The Team Behind The Decks
        </h2>

        <div className="mt-10 space-y-12 sm:space-y-16">
          {team.map((member, idx) => (
            <div
              key={member.name}
              className="grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-10 xl:gap-14 items-center"
            >
              {/* Left Column: Name, Handle, Role, Bio & Read More */}
              <div className="flex flex-col justify-between max-w-[280px]">
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-2.5">
                    <span className="font-signature text-[50px] sm:text-[58px] lg:text-[64px] leading-none text-foreground">
                      {member.signature}
                    </span>
                    <span className="font-sans text-[13px] sm:text-[14px] text-muted">
                      {member.handle}
                    </span>
                  </div>
                  <p className="mt-1.5 font-sans text-[14px] sm:text-[15px] font-normal text-muted">
                    {member.role}
                  </p>
                  <p className="mt-4 font-sans text-[14px] sm:text-[15px] leading-[25px] text-foreground/90">
                    {member.bio}
                  </p>
                </div>
                <Link
                  href={member.href}
                  className="mt-6 inline-flex items-center gap-1.5 font-sans text-[16px] font-medium text-foreground transition-opacity hover:opacity-80"
                >
                  <span>Read More</span>
                  <span aria-hidden>&rarr;</span>
                </Link>
              </div>

              {/* Right Column: 3-column Photo Collage (No text overlay) */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-[457fr_213fr_213fr] sm:gap-4 sm:h-[300px] lg:h-[331px]">
                {/* Column 1: Main Large Card */}
                <div className="relative col-span-2 aspect-[457/331] w-full overflow-hidden rounded-[15px] border border-hairline bg-surface-2 shadow-sm sm:col-span-1 sm:aspect-auto sm:h-full">
                  <Image
                    src={member.main}
                    alt={member.mainAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, 460px"
                    className="object-cover"
                  />
                </div>

                {/* Column 2 (Middle) */}
                {idx === 0 ? (
                  /* Don: 2 stacked cards (Group 168 top, Group 169 bottom) */
                  <div className="col-span-1 flex flex-col gap-3 sm:gap-4 h-full">
                    <div className="relative flex-1 w-full aspect-[212/154] sm:aspect-auto overflow-hidden rounded-[15px] border border-hairline bg-surface-2 shadow-sm">
                      <Image
                        src={member.gallery[0].src}
                        alt={member.gallery[0].alt}
                        fill
                        sizes="(max-width: 640px) 50vw, 215px"
                        className="object-cover"
                      />
                    </div>
                    <div className="relative flex-1 w-full aspect-[212/154] sm:aspect-auto overflow-hidden rounded-[15px] border border-hairline bg-surface-2 shadow-sm">
                      <Image
                        src={member.gallery[1].src}
                        alt={member.gallery[1].alt}
                        fill
                        sizes="(max-width: 640px) 50vw, 215px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                ) : (
                  /* Luke: 1 tall portrait card (Rectangle 17 (1).png) */
                  <div className="relative col-span-1 aspect-[214/331] sm:aspect-auto w-full h-full overflow-hidden rounded-[15px] border border-hairline bg-surface-2 shadow-sm">
                    <Image
                      src={member.gallery[0].src}
                      alt={member.gallery[0].alt}
                      fill
                      sizes="(max-width: 640px) 50vw, 215px"
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Column 3 (Right) */}
                {idx === 0 ? (
                  /* Don: 1 tall portrait card (Group 170.png - mixing outdoors in vest) */
                  <div className="relative col-span-1 aspect-[212/331] sm:aspect-auto w-full h-full overflow-hidden rounded-[15px] border border-hairline bg-surface-2 shadow-sm">
                    <Image
                      src={member.gallery[2].src}
                      alt={member.gallery[2].alt}
                      fill
                      sizes="(max-width: 640px) 50vw, 215px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  /* Luke: 2 stacked cards (Group 171 top, Group 173 bottom) */
                  <div className="col-span-1 flex flex-col gap-3 sm:gap-4 h-full">
                    <div className="relative flex-1 w-full aspect-[214/154] sm:aspect-auto overflow-hidden rounded-[15px] border border-hairline bg-surface-2 shadow-sm">
                      <Image
                        src={member.gallery[1].src}
                        alt={member.gallery[1].alt}
                        fill
                        sizes="(max-width: 640px) 50vw, 215px"
                        className="object-cover"
                      />
                    </div>
                    <div className="relative flex-1 w-full aspect-[214/154] sm:aspect-auto overflow-hidden rounded-[15px] border border-hairline bg-surface-2 shadow-sm">
                      <Image
                        src={member.gallery[2].src}
                        alt={member.gallery[2].alt}
                        fill
                        sizes="(max-width: 640px) 50vw, 215px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
