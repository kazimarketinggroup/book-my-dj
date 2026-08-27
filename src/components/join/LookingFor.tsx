import Image from "next/image";
import { lookingFor } from "@/lib/join-data";

export default function LookingFor() {
  const [crowd, portrait] = lookingFor.images;

  return (
    <section className="mx-auto w-full max-w-[1600px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14 2xl:px-16">
      {/*
        Desktop: heading+crowd | criteria | portrait across the top, with the
        footnote running under the first two columns while the portrait keeps
        spanning both rows. Mobile just stacks in source order.
      */}
      <div className="grid gap-6 overflow-hidden rounded-2xl border border-hairline bg-surface p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.9fr)] lg:grid-rows-[auto_auto] lg:gap-x-0 lg:gap-y-8 lg:p-0">
        <div className="lg:col-start-1 lg:row-start-1 lg:border-r lg:border-hairline lg:p-6">
          <h2 className="max-w-50 font-display fluid-h2 font-semibold text-foreground">
            {lookingFor.title}
          </h2>
          <div className="relative mt-6 aspect-16/10 overflow-hidden rounded-xl">
            <Image
              src={crowd.src}
              alt={crowd.alt}
              fill
              sizes="(max-width: 1024px) 90vw, 26vw"
              className="object-cover"
            />
          </div>
        </div>

        <ul className="space-y-3 lg:col-start-2 lg:row-start-1 lg:self-center lg:p-6">
          {lookingFor.criteria.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
              <span
                aria-hidden
                className="mt-1.75 h-1.5 w-1.5 shrink-0 rounded-full bg-muted"
              />
              {item}
            </li>
          ))}
        </ul>

        <div className="relative min-h-70 overflow-hidden rounded-xl lg:col-start-3 lg:row-span-2 lg:row-start-1 lg:m-4 lg:min-h-0">
          <Image
            src={portrait.src}
            alt={portrait.alt}
            fill
            sizes="(max-width: 1024px) 90vw, 28vw"
            className="object-cover"
          />
        </div>

        <p className="text-base leading-relaxed text-foreground sm:text-lg lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:px-8 lg:pb-8">
          {lookingFor.footnote}
        </p>
      </div>
    </section>
  );
}
