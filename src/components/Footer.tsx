import Link from "next/link";
import { footerColumns } from "@/lib/home-data";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-12 sm:px-10 lg:px-16 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,1fr)] lg:gap-8">
          {/* Brand Column (Group 83) */}
          <div>
            <p className="font-display text-[25px] font-semibold leading-[30px] text-white">
              Book My DJ
            </p>
            <p className="mt-4 max-w-[178px] font-sans text-[14px] leading-[25px] text-white">
              Professional DJs for every event, across the UK.
            </p>
          </div>

          {footerColumns.map((col, i) => (
            <div key={col.heading || `col-${i}`}>
              <p className="min-h-[1.25rem] font-display text-[14px] font-medium tracking-[1.2px] uppercase text-white">
                {col.heading}
              </p>
              <ul className="mt-4 space-y-1">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-sans text-[14px] leading-[28px] text-white/90 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-[12px] leading-[16px] text-[#9C9C9C]">
            &copy; {new Date().getFullYear()} Book My DJ. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy-policy"
              className="font-sans text-[12px] leading-[16px] text-[#9C9C9C] transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="font-sans text-[12px] leading-[16px] text-[#9C9C9C] transition-colors hover:text-white"
            >
              Terms &amp; Condition
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
