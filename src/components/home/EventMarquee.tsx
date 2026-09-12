import { eventCategories } from "@/lib/home-data";

const items = eventCategories.map((e) => e.title);

function Diamond() {
  return (
    <span
      aria-hidden
      className="mx-6 inline-block text-[14px] leading-none text-[#FE396C] sm:mx-8 lg:mx-10 select-none"
    >
      ◆
    </span>
  );
}

/**
 * Exact Figma spec:
 * - Height: 54px
 * - Border color: rgba(42, 39, 49, 0.7)
 * - Text: Inter, 14px, uppercase, letter-spacing 3.92px, color #ACA9B3
 * - Diamond: ◆ color #FE396C
 */
export default function EventMarquee() {
  return (
    <div className="relative flex h-[54px] w-full items-center overflow-hidden border-y border-[rgba(42,39,49,0.7)] bg-black/50 backdrop-blur-xs">
      <div className="flex w-max animate-[marquee_38s_linear_infinite] motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center"
          >
            {items.map((label) => (
              <div key={label} className="flex shrink-0 items-center">
                <span className="text-[14px] font-normal tracking-[3.92px] whitespace-nowrap text-[#ACA9B3] uppercase">
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


