import type { Metadata } from "next";
import Link from "next/link";
import BookingWizard from "@/components/contact/BookingWizard";
import Reveal from "@/components/ui/Reveal";
import { channels, contactIntro, hurry } from "@/lib/contact-data";

export const metadata: Metadata = {
  title: "Contact — Book My DJ",
  description:
    "Whether you're ready to book or just have a question, our team's on hand across the UK.",
};

export default function ContactPage() {
  return (
    <section className="scroll-mt-20">
      <div className="mx-auto w-full max-w-[1600px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14 2xl:px-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left column — intro, contact channels, then the urgent-booking CTA */}
          <div>
            <Reveal>
              <h1 className="font-display fluid-hero font-semibold text-foreground">
                {contactIntro.title}
              </h1>
            </Reveal>

            <Reveal delay={80}>
              <p className="mt-5 max-w-md fluid-body leading-relaxed text-muted">
                {contactIntro.blurb}
              </p>
            </Reveal>

            {/* Reveal wraps the <div>, keeping dt/dd valid inside the <dl> */}
            <dl className="mt-10 space-y-6">
              {channels.map((c, i) => (
                <Reveal key={c.title} delay={160 + i * 90}>
                  <div>
                    <dt className="font-display text-base font-semibold text-foreground">
                      {c.title}
                    </dt>
                    <dd className="mt-1.5 fluid-body text-muted">{c.blurb}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>

            <Reveal delay={120} className="mt-14">
              <h2 className="font-display fluid-hero font-semibold text-foreground">
                {hurry.title}
              </h2>
              <p className="mt-5 fluid-body text-muted">{hurry.blurb}</p>
              <Link
                href={hurry.href}
                className="btn-brand mt-8 inline-block rounded-lg px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
              >
                {hurry.cta}
              </Link>
            </Reveal>
          </div>

          {/* Right column — booking wizard */}
          <Reveal delay={140}>
            <BookingWizard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
