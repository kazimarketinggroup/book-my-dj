import type { Metadata } from "next";
import Link from "next/link";
import BookingWizard from "@/components/contact/BookingWizard";
import Reveal from "@/components/ui/Reveal";
import { channels, contactIntro, hurry } from "@/lib/contact-data";

export const metadata: Metadata = {
  title: "Book My DJ — Book My DJ",
  description:
    "Start with your postcode and we will find DJs covering your area. Whether you're ready to book or just have a question, our team's on hand across the UK.",
};

export default function ContactPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/videos/BMDJ/Book My DJ.jpg"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
      >
        <source src="/videos/BMDJ/Book My DJ.mp4" type="video/mp4" />
      </video>
      {/* Overlay for text readability */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-white/80 backdrop-blur-[2px]" />

      {/* Hero Section — Booking Wizard Card */}
      <section className="relative z-10 scroll-mt-20">
        <div className="mx-auto w-full max-w-[1440px] px-6 pt-10 pb-6 sm:px-10 sm:pt-14 sm:pb-8 lg:px-16 lg:pt-16 lg:pb-10">
          <Reveal>
            <div className="mx-auto max-w-[820px]">
              <BookingWizard />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="relative z-10 scroll-mt-20">
        <div className="mx-auto w-full max-w-[1440px] px-6 py-10 sm:px-10 sm:py-14 lg:px-16 lg:py-16">
          <Reveal>
            <h2 className="font-display text-[30px] sm:text-[38px] lg:text-[44px] font-semibold leading-[1.2] text-foreground">
              {contactIntro.title}
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <p className="mt-4 max-w-lg font-sans text-[16px] sm:text-[18px] leading-[28px] text-muted">
              {contactIntro.blurb}
            </p>
          </Reveal>

          {/* Contact Channels Grid */}
          <dl className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-x-16 lg:gap-y-8">
            {channels.map((c, i) => (
              <Reveal key={c.title} delay={160 + i * 90}>
                <div>
                  <dt className="font-display text-[16px] sm:text-[18px] font-semibold text-foreground">
                    {c.title}
                  </dt>
                  <dd className="mt-1.5 font-sans text-[15px] sm:text-[16px] leading-[26px] text-muted">
                    {c.blurb}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>

          {/* Need A DJ In A Hurry */}
          <Reveal delay={120} className="mt-14">
            <h2 className="font-display text-[26px] sm:text-[32px] font-semibold text-foreground">
              {hurry.title}
            </h2>
            <p className="mt-4 font-sans text-[16px] leading-[26px] text-muted">{hurry.blurb}</p>
            <Link
              href={hurry.href}
              className="btn-brand mt-8 inline-block rounded-lg px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
            >
              {hurry.cta}
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
