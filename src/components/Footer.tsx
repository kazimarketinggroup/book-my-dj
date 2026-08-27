import Link from "next/link";
import { footerColumns } from "@/lib/home-data";

export default function Footer() {
  return (
    <footer className="border-t border-hairline bg-surface">
      <div className="mx-auto w-full max-w-[1600px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14 2xl:px-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_repeat(4,minmax(0,1fr))] lg:gap-8">
          <div>
            <p className="font-display text-lg font-bold text-foreground">
              Book My DJ
            </p>
            <p className="mt-4 max-w-[16rem] text-sm leading-relaxed text-muted">
              Professional DJs for every event, across the UK.
            </p>
          </div>

          {footerColumns.map((col, i) => (
            <div key={col.heading || `col-${i}`}>
              {/* Third column continues the Events list, so its heading is intentionally blank */}
              <p className="min-h-[1.25rem] text-xs font-semibold tracking-[0.12em] text-muted uppercase">
                {col.heading}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Book My DJ. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy-policy"
              className="text-xs text-muted transition-colors hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-muted transition-colors hover:text-foreground"
            >
              Terms &amp; Condition
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
