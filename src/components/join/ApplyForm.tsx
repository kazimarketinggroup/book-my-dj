"use client";

import { useState } from "react";
import { applySection } from "@/lib/join-data";

const field =
  "h-[44px] w-full rounded-lg border border-white/10 bg-[#1c1c1c] px-3.5 text-sm text-white placeholder:text-zinc-500 outline-none transition-colors focus:border-white/30 focus:ring-1 focus:ring-white/30";

const label = "block text-xs font-normal text-zinc-400";

export default function ApplyForm() {
  const [sent, setSent] = useState(false);

  return (
    <div className="rounded-[15px] border border-white/10 bg-[#121212] p-6 sm:p-8">
      <h3 className="font-display text-[22px] sm:text-[24px] font-normal text-white">
        {applySection.formHeading}
      </h3>

      <form
        className="mt-6 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
      >
        <div>
          <label htmlFor="j-name" className={label}>
            Name
          </label>
          <input
            id="j-name"
            name="name"
            required
            placeholder="Full Name"
            className={`${field} mt-1.5`}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="j-dj-name" className={label}>
              DJ name
            </label>
            <input
              id="j-dj-name"
              name="djName"
              placeholder="Dj"
              className={`${field} mt-1.5`}
            />
          </div>
          <div>
            <label htmlFor="j-email" className={label}>
              Email
            </label>
            <input
              id="j-email"
              name="email"
              type="email"
              required
              placeholder="Your email"
              className={`${field} mt-1.5`}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="j-phone" className={label}>
              Phone
            </label>
            <input
              id="j-phone"
              name="phone"
              type="tel"
              defaultValue="+44"
              className={`${field} mt-1.5`}
            />
          </div>
          <div>
            <label htmlFor="j-based" className={label}>
              Based in
            </label>
            <input
              id="j-based"
              name="basedIn"
              placeholder="Birmingham"
              className={`${field} mt-1.5`}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="j-years" className={label}>
              Years experience
            </label>
            <input
              id="j-years"
              name="yearsExperience"
              type="number"
              min="0"
              placeholder="3"
              className={`${field} mt-1.5`}
            />
          </div>
          <div>
            <label htmlFor="j-genres" className={label}>
              Genres you play
            </label>
            <input
              id="j-genres"
              name="genres"
              placeholder="R&B, house, Afrobeats"
              className={`${field} mt-1.5`}
            />
          </div>
        </div>

        <div>
          <label htmlFor="j-mix" className={label}>
            Mix / socials link
          </label>
          <input
            id="j-mix"
            name="mixLink"
            type="url"
            placeholder="https://soundcloud.com/..."
            className={`${field} mt-1.5`}
          />
        </div>

        <div>
          <label htmlFor="j-about" className={label}>
            Tell us about yourself
          </label>
          <textarea
            id="j-about"
            name="about"
            rows={3}
            placeholder="Write here"
            className="mt-1.5 w-full rounded-lg border border-white/10 bg-[#1c1c1c] px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-500 outline-none transition-colors focus:border-white/30 focus:ring-1 focus:ring-white/30"
          />
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            type="submit"
            className="inline-flex h-[40px] items-center justify-center rounded-[5px] bg-gradient-to-r from-[#24081E] via-[#520577] to-[#910870] px-6 font-display text-[15px] font-medium text-white shadow-md transition-opacity hover:opacity-90"
          >
            Send Application
          </button>
          <p className="text-xs text-zinc-400">{applySection.disclaimer}</p>
        </div>

        {/* Confirmation status */}
        <div
          role="status"
          aria-live="polite"
          className={`grid transition-[grid-template-rows] duration-400 ease-out ${
            sent ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <p
              className={`flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-sm text-white transition-all duration-400 ${
                sent ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              }`}
            >
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 shrink-0 text-white"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              Thanks, your application is in. We&apos;ll reply within five working days.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
