"use client";

import { useState } from "react";
import { consentOptions, eventTypeOptions } from "@/lib/contact-data";

const field =
  "field-motion h-11 w-full rounded-lg border border-hairline bg-surface-3 px-3 text-sm text-foreground placeholder:text-muted outline-none focus:border-brand-light focus:ring-1 focus:ring-brand-light";

const label = "block text-xs font-medium text-foreground";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <div className="rounded-2xl border border-hairline bg-surface p-5 sm:p-6">
      <h2 className="font-display fluid-h2 font-semibold text-foreground">
        Send Us Your Event Details
      </h2>

      <form
        className="mt-6 space-y-5"
        onSubmit={(e) => {
          // No backend yet - keep the entered values on screen and confirm.
          e.preventDefault();
          setSent(true);
        }}
      >
        <div>
          <label htmlFor="c-name" className={label}>
            Name
          </label>
          <input
            id="c-name"
            name="name"
            required
            placeholder="Enter username"
            className={`${field} mt-2`}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="c-phone" className={label}>
              Phone
            </label>
            <input
              id="c-phone"
              name="phone"
              type="tel"
              defaultValue="+44"
              className={`${field} mt-2`}
            />
          </div>
          <div>
            <label htmlFor="c-email" className={label}>
              Email
            </label>
            <input
              id="c-email"
              name="email"
              type="email"
              required
              placeholder="Your email"
              className={`${field} mt-2`}
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="c-date" className={label}>
              Event Date
            </label>
            <input
              id="c-date"
              name="eventDate"
              type="date"
              className={`${field} mt-2 scheme-dark`}
            />
          </div>
          <div>
            <label htmlFor="c-location" className={label}>
              Event Location
            </label>
            <input
              id="c-location"
              name="eventLocation"
              placeholder="Select"
              className={`${field} mt-2`}
            />
          </div>
        </div>

        <div>
          <label htmlFor="c-type" className={label}>
            Event Type
          </label>
          <select
            id="c-type"
            name="eventType"
            defaultValue=""
            className={`${field} mt-2 appearance-none bg-size-[1rem] bg-position-[right_0.75rem_center] bg-no-repeat pr-9`}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2371717a' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
            }}
          >
            <option value="" disabled>
              Select...
            </option>
            {eventTypeOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="c-message" className={label}>
            Tell Us About Your Event
          </label>
          <textarea
            id="c-message"
            name="message"
            rows={5}
            placeholder="Write here"
            className="field-motion mt-2 w-full rounded-lg border border-hairline bg-surface-3 px-3 py-2.5 text-sm text-foreground placeholder:text-muted outline-none focus:border-brand-light focus:ring-1 focus:ring-brand-light"
          />
        </div>

        <fieldset className="space-y-2.5">
          <legend className="sr-only">Preferences</legend>
          {consentOptions.map((opt) => (
            <label
              key={opt.name}
              className="flex items-start gap-3 text-sm text-foreground"
            >
              <input
                type="checkbox"
                name={opt.name}
                required={opt.required}
                className="mt-0.5 h-4 w-4 shrink-0 rounded-sm border border-hairline bg-surface-3 accent-brand"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </fieldset>

        <div className="flex flex-wrap items-center gap-4 pt-1">
          <button
            type="submit"
            className="btn-brand rounded-lg px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 active:translate-y-0"
          >
            Book My DJ
          </button>
          <p className="text-xs text-muted">
            We reply within 24 hours, sooner for urgent bookings
          </p>
        </div>

        {/* Confirmation slides in without shifting the layout when hidden */}
        <div
          role="status"
          aria-live="polite"
          className={`grid transition-[grid-template-rows] duration-400 ease-out ${
            sent ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <p
              className={`flex items-center gap-2 rounded-lg border border-brand-light/40 bg-brand/10 px-4 py-3 text-sm text-foreground transition-all duration-400 ${
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
                className="h-4 w-4 shrink-0 text-brand-light"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              Thanks, your details are with us. We&apos;ll be in touch shortly.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
