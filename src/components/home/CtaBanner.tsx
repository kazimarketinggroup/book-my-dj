import Link from "next/link";

export default function CtaBanner() {
  return (
    <section id="contact" className="scroll-mt-20">
      <div className="mx-auto w-full max-w-[1600px] px-5 pb-14 sm:px-8 lg:px-12 lg:pb-20 2xl:px-16">
        <div className="relative isolate overflow-hidden rounded-[26px] border border-hairline bg-surface px-6 py-10 text-center shadow-[0_18px_40px_rgba(0,0,0,0.22)] sm:px-10 lg:py-14">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(145,8,112,0.22),transparent_70%)]"
          />
          <h2 className="font-display text-[clamp(2rem,2vw+1rem,3.2rem)] font-semibold text-foreground">
            Book Your DJ Today
          </h2>
          <p className="mx-auto mt-4 max-w-md fluid-body leading-relaxed text-muted">
            Join the events managers and planners across the UK who trust Book My
            Dj to deliver, every time.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-md bg-white px-7 py-3 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
          >
            Get Quote
          </Link>
        </div>
      </div>
    </section>
  );
}
