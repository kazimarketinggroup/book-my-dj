import { eventCategories } from "@/lib/home-data";

const items = eventCategories.map((e) => e.title);

function Diamond() {
  return (
    <span
      aria-hidden
      className="mx-6 inline-block h-2 w-2 shrink-0 rotate-45 bg-brand sm:mx-8 lg:mx-10"
    />
  );
}

/**
 * Infinite marquee. The track holds two identical copies of the list and slides
 * exactly -50%, so the second copy lands where the first began — a seamless loop.
 */
export default function EventMarquee() {
  return (
    <div className="relative overflow-hidden border-y border-hairline bg-background/60 py-4">
      <div className="flex w-max animate-[marquee_38s_linear_infinite] motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center"
          >
            {items.map((label) => (
              <div key={label} className="flex shrink-0 items-center">
                <span className="text-xs font-medium tracking-[0.22em] whitespace-nowrap text-zinc-300 uppercase sm:text-sm">
                  {label}
                </span>
                <Diamond />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
