import Link from "next/link";

export default function CtaBanner() {
  return (
    <section id="contact" className="scroll-mt-20 py-12 lg:py-16 bg-black">
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <div className="relative overflow-hidden rounded-[20px] border border-white/10 bg-[rgba(36,36,36,0.5)] px-6 py-12 text-center shadow-2xl backdrop-blur-md sm:px-12 lg:py-16">
          <h2 className="font-display text-[32px] sm:text-[40px] font-normal leading-[35px] text-white">
            Book Your DJ Today
          </h2>
          <p className="mx-auto mt-4 max-w-[470px] font-sans text-[16px] sm:text-[18px] leading-[30px] text-white">
            Join the events managers and planners across the UK who trust Book My
            Dj to deliver, every time.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex h-[40px] w-[171px] items-center justify-center rounded-[5px] bg-white font-display text-[16px] font-medium text-black transition-colors hover:bg-zinc-200 shadow-md"
          >
            Book My DJ
          </Link>
        </div>
      </div>
    </section>
  );
}
