import { WORKED_BRANDS } from "@/lib/djs-data";

export default function DjsBrands() {
  return (
    <section className="relative w-full bg-background text-foreground py-12 lg:py-16 transition-colors duration-200">
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <div className="rounded-[24px] sm:rounded-[32px] border border-hairline bg-surface p-6 sm:p-10 lg:p-14 shadow-lg">
          <h2 className="font-sans text-[26px] sm:text-[34px] md:text-[40px] font-normal leading-tight text-foreground">
            Events &amp; brands we&apos;ve worked with
          </h2>

          <div className="mt-8 sm:mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {WORKED_BRANDS.map((brand) => (
              <div
                key={brand}
                className="flex min-h-[46px] items-center rounded-[28px] border border-hairline bg-surface-2 px-4 py-3 font-sans text-[13px] sm:text-[14px] leading-[20px] text-foreground transition-colors hover:border-brand-light/40 hover:bg-surface-3"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
