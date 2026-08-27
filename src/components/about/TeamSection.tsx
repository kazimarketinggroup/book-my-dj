import Link from "next/link";
import Image from "next/image";
import { team } from "@/lib/about-data";

export default function TeamSection() {
  return (
    <section id="team" className="scroll-mt-20">
      <div className="mx-auto w-full max-w-[1600px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14 2xl:px-16">
        <h2 className="font-display fluid-h2 font-semibold text-foreground">
          The Team Behind The Decks
        </h2>

        <div className="mt-8 space-y-10 lg:space-y-12">
          {team.map((member, idx) => (
            <div
              key={member.name}
              className="grid gap-6 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,2fr)] lg:gap-10"
            >
              {/* Name + bio */}
              <div>
                <p className="flex flex-wrap items-baseline gap-x-2">
                  <span className="font-signature text-4xl text-foreground sm:text-5xl">
                    {member.signature}
                  </span>
                  <span className="text-[11px] text-muted">{member.handle}</span>
                </p>
                <p className="mt-1 text-xs text-muted">{member.role}</p>
                <p className="mt-4 max-w-60 text-sm leading-relaxed text-muted">
                  {member.bio}
                </p>
                <Link
                  href={member.href}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-light transition-colors hover:text-brand"
                >
                  Read More <span aria-hidden>&rarr;</span>
                </Link>
              </div>

              {/*
                Collage on a fixed 4-col / 2-row grid so nothing wraps:
                  main portrait  cols 1-2 (both rows)
                  shot 0         col 3  row 1     shot 1  col 4 (both rows)
                  shot 2         col 3  row 2
                The second member mirrors it left-to-right.
              */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:grid-rows-2 sm:gap-4 sm:h-80 lg:h-95">
                <figure
                  className={`relative col-span-2 aspect-4/3 overflow-hidden rounded-2xl border border-hairline sm:aspect-auto sm:row-span-2 ${
                    idx % 2 === 1 ? "sm:col-start-3" : "sm:col-start-1"
                  }`}
                >
                  <Image
                    src={member.main}
                    alt={member.mainAlt}
                    fill
                    sizes="(max-width: 640px) 92vw, 42vw"
                    className="object-cover"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black/85 to-transparent"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 p-4">
                    <p className="font-display text-base font-semibold text-white">
                      {member.name}
                    </p>
                    <p className="text-xs text-zinc-300">{member.role}</p>
                  </figcaption>
                </figure>

                {member.gallery.map((shot, i) => {
                  // Column/row for each supporting shot, mirrored for member 2.
                  const left = idx % 2 === 1;
                  const place =
                    i === 0
                      ? left
                        ? "sm:col-start-1 sm:row-start-1"
                        : "sm:col-start-3 sm:row-start-1"
                      : i === 1
                        ? left
                          ? "sm:col-start-2 sm:row-span-2 sm:row-start-1"
                          : "sm:col-start-4 sm:row-span-2 sm:row-start-1"
                        : left
                          ? "sm:col-start-1 sm:row-start-2"
                          : "sm:col-start-3 sm:row-start-2";
                  return (
                    <figure
                      key={shot.src}
                      className={`relative aspect-4/3 overflow-hidden rounded-2xl border border-hairline sm:aspect-auto ${place}`}
                    >
                      <Image
                        src={shot.src}
                        alt={shot.alt}
                        fill
                        sizes="(max-width: 640px) 45vw, 20vw"
                        className="object-cover"
                      />
                    </figure>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
