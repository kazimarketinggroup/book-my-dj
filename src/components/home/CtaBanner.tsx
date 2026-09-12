import Link from "next/link";

export default function CtaBanner() {
  return (
    <section id="contact" className="scroll-mt-20 py-12 lg:py-16 bg-background transition-colors duration-200">
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <div className="relative overflow-hidden rounded-[20px] border border-slate-200/90 dark:border-hairline bg-white dark:bg-surface/90 px-6 py-12 text-center shadow-[0_20px_50px_-12px_rgba(15,23,42,0.08)] dark:shadow-xl backdrop-blur-md sm:px-12 lg:py-16">
          <h2 className="font-display text-[32px] sm:text-[40px] font-normal leading-[35px] text-foreground">
            Book Your DJ Today
          </h2>
          <p className="mx-auto mt-4 max-w-[470px] font-sans text-[16px] sm:text-[18px] leading-[30px] text-muted">
            Join the events managers and planners across the UK who trust Book My
            Dj to deliver, every time.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex h-[40px] w-[171px] items-center justify-center rounded-[5px] btn-brand font-display text-[16px] font-medium text-white transition-opacity hover:opacity-90 shadow-xl"
          >
            Book My DJ
          </Link>
        </div>
      </div>
    </section>
  );
}
