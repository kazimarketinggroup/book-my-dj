import { WORKED_BRANDS } from "@/lib/djs-data";

export default function DjsBrands() {
  return (
    <section className="relative w-full bg-black py-12 lg:py-16">
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <div className="rounded-[24px] sm:rounded-[32px] border border-[#2A2731] bg-[#14111A] p-6 sm:p-10 lg:p-14">
          <h2 className="font-sans text-[26px] sm:text-[34px] md:text-[40px] font-normal leading-tight text-[#F9F8FB]">
            Events &amp; brands we&apos;ve worked with
          </h2>

          <div className="mt-8 sm:mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {WORKED_BRANDS.map((brand) => (
              <div
                key={brand}
                className="flex min-h-[46px] items-center rounded-[28px] border border-[rgba(42,39,49,0.7)] bg-[#211D27] px-4 py-3 font-sans text-[13px] sm:text-[14px] leading-[20px] text-[#F9F8FB] transition-colors hover:border-white/30"
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
