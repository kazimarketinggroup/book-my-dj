import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import CtaBanner from "@/components/home/CtaBanner";

export const metadata: Metadata = {
  title: "Areas We Cover — Book My DJ",
  description:
    "Our DJ roster is spread across the UK, so we can reach venues well outside the major cities.",
};

const regions: { name: string; places: string[] }[] = [
  {
    name: "London & South East",
    places: ["London", "Brighton", "Reading", "Oxford", "Kent", "Surrey"],
  },
  {
    name: "South West",
    places: ["Bristol", "Bath", "Exeter", "Plymouth", "Bournemouth"],
  },
  {
    name: "Midlands",
    places: ["Birmingham", "Nottingham", "Leicester", "Coventry", "Derby"],
  },
  {
    name: "North West",
    places: ["Manchester", "Liverpool", "Chester", "Preston", "Lancaster"],
  },
  {
    name: "North East & Yorkshire",
    places: ["Leeds", "Sheffield", "York", "Newcastle", "Hull"],
  },
  {
    name: "Scotland & Wales",
    places: ["Glasgow", "Edinburgh", "Aberdeen", "Cardiff", "Swansea"],
  },
];

export default function AreasWeCoverPage() {
  return (
    <>
      <section className="scroll-mt-20">
        <div className="mx-auto w-full max-w-[1600px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14 2xl:px-16">
          <Reveal>
            <h1 className="max-w-2xl font-display fluid-hero font-semibold text-foreground">
              Wherever The Venue, We Can Get There
            </h1>
          </Reveal>

          <Reveal delay={80}>
            <p className="mt-6 max-w-lg fluid-body leading-relaxed text-muted">
              Our roster is spread across the country rather than clustered in a
              few cities, so we can usually reach venues well outside the major
              hubs without a long-haul travel fee on your quote.
            </p>
          </Reveal>

          <Reveal delay={140}>
            <Link
              href="/contact"
              className="btn-brand mt-8 inline-block rounded-lg px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
            >
              Check Your Postcode
            </Link>
          </Reveal>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {regions.map((r, i) => (
              <Reveal key={r.name} as="li" delay={i * 70}>
                <div className="h-full rounded-2xl border border-hairline bg-surface p-6 transition-colors hover:border-foreground/25">
                  <h2 className="font-display text-base font-semibold text-foreground">
                    {r.name}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {r.places.join(" · ")}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={120}>
            <p className="mt-10 text-sm text-muted">
              Not listed? We still likely cover it —{" "}
              <Link
                href="/contact"
                className="text-foreground underline underline-offset-4 transition-colors hover:text-brand-light"
              >
                send us the postcode
              </Link>{" "}
              and we&apos;ll confirm.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
