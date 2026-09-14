"use client";

import { useState } from "react";
import Link from "next/link";
import { navLinks } from "@/lib/home-data";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-hairline bg-background/85 backdrop-blur-md transition-colors duration-200">
      <nav
        aria-label="Main"
        className="mx-auto flex h-20 w-full max-w-[1440px] items-center justify-between gap-4 px-6 sm:px-10 lg:px-16"
      >
        <Link
          href="/"
          className="font-display text-[25px] font-semibold leading-[30px] tracking-tight text-foreground"
        >
          Book My DJ
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-6 lg:flex xl:gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="font-display text-[16px] font-normal leading-[19px] text-foreground/80 transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-5 lg:flex">
          <Link
            href="/join-us"
            className="font-display text-[16px] font-semibold leading-[19px] text-foreground/90 transition-colors hover:text-foreground"
          >
            Join Us
          </Link>
          <Link
            href="/contact"
            className="flex h-10 w-[137px] items-center justify-center rounded-[5px] bg-black font-display text-[16px] font-medium text-white shadow-md transition-colors hover:bg-zinc-800 active:scale-[0.98]"
          >
            Book My DJ
          </Link>
        </div>

        {/* Mobile: hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-hairline text-foreground"
          >
            <span aria-hidden className="relative block h-4 w-5">
              <span
                className={`absolute left-0 block h-0.5 w-5 bg-current transition-transform duration-200 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute top-1.5 left-0 block h-0.5 w-5 bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-5 bg-current transition-transform duration-200 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-hairline bg-background lg:hidden"
      >
        <ul className="space-y-1 px-5 py-4 sm:px-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-2 py-2 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="flex flex-col gap-3 pt-3">
            <Link
              href="/join-us"
              onClick={() => setOpen(false)}
              className="rounded-md border border-hairline px-4 py-2.5 text-center text-sm text-foreground"
            >
              Join Us
            </Link>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="rounded-md btn-brand px-4 py-2.5 text-center text-sm font-semibold text-white"
            >
              Book My DJ
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
