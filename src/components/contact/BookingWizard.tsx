"use client";

import { useState } from "react";
import Link from "next/link";
import {
  choiceSteps,
  consentOptions,
  dateStep,
  detailsStep,
  thanksStep,
  wizardIntro,
} from "@/lib/contact-data";

const field =
  "field-motion h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-foreground placeholder:text-muted outline-none focus:border-brand-light focus:bg-white focus:ring-1 focus:ring-brand-light";

const label = "block text-xs font-medium text-foreground";

type Answers = Record<string, string>;

/**
 * Screens run: postcode intro, event type, date, the remaining choice steps,
 * contact details, then the confirmation panel. The date step is spliced in
 * after the event type to match the booking flow.
 */
export default function BookingWizard() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [postcode, setPostcode] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [eventTypeStep, ...restChoices] = choiceSteps;
  const screens = [
    { kind: "choice" as const, step: eventTypeStep },
    { kind: "date" as const },
    ...restChoices.map((s) => ({ kind: "choice" as const, step: s })),
    { kind: "details" as const },
    { kind: "thanks" as const },
  ];

  const current = step === 0 ? null : screens[step - 1];
  const back = () => setStep((s) => Math.max(0, s - 1));
  const next = () => setStep((s) => Math.min(screens.length, s + 1));

  const choose = (key: string, value: string) =>
    setAnswers((a) => ({ ...a, [key]: value }));

  const firstName = name.trim().split(/\s+/)[0] || "there";

  return (
    <div className="flex min-h-125 flex-col rounded-[28px] border border-slate-200/90 bg-white p-6 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.08)] sm:min-h-161 sm:p-8">
      {/* Postcode intro */}
      {step === 0 && (
        <div className="flex flex-1 flex-col items-center pt-10 text-center sm:pt-16">
          <h2 className="font-display fluid-hero font-semibold text-foreground">
            {wizardIntro.heading}
          </h2>
          <p className="mt-6 max-w-sm fluid-body leading-relaxed text-muted">
            {wizardIntro.blurb}
          </p>

          <label htmlFor="w-postcode" className="sr-only">
            {wizardIntro.placeholder}
          </label>
          <div className="relative mt-10 w-full max-w-md">
            <span
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-muted"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </span>
            <input
              id="w-postcode"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              placeholder={wizardIntro.placeholder}
              className={`${field} h-13 pl-10`}
            />
          </div>

          <div className="mt-6 flex w-full max-w-md items-center justify-between gap-4">
            <span className="flex items-center gap-2 text-sm text-muted">
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
              {wizardIntro.meta}
            </span>
            <button
              type="button"
              onClick={next}
              className="btn-brand rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 active:translate-y-0"
            >
              {wizardIntro.cta}
            </button>
          </div>
        </div>
      )}

      {/* Radio-group steps */}
      {current?.kind === "choice" && (
        <StepShell
          heading={current.step.heading}
          blurb={current.step.blurb}
          onBack={back}
          onNext={next}
        >
          <fieldset className="space-y-2">
            <legend className="sr-only">{current.step.heading}</legend>
            {current.step.options.map((opt) => {
              const selected = answers[current.step.name] === opt;
              return (
                <label
                  key={opt}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2.5 text-sm transition-colors ${
                    selected
                      ? "border-brand-light bg-brand/5 text-foreground font-semibold shadow-xs"
                      : "border-slate-200 bg-slate-50/70 text-foreground/80 hover:border-brand-light/50 hover:bg-slate-100/70"
                  }`}
                >
                  <input
                    type="radio"
                    name={current.step.name}
                    value={opt}
                    checked={selected}
                    onChange={() => choose(current.step.name, opt)}
                    className="h-4 w-4 shrink-0 accent-brand"
                  />
                  {opt}
                </label>
              );
            })}
          </fieldset>
        </StepShell>
      )}

      {/* Date, start time and duration */}
      {current?.kind === "date" && (
        <StepShell
          heading={dateStep.heading}
          blurb={dateStep.blurb}
          onBack={back}
          onNext={next}
        >
          <div className="space-y-3">
            <div>
              <label htmlFor="w-date" className={label}>
                {dateStep.labels.date}
              </label>
              <input
                id="w-date"
                type="date"
                value={answers.date ?? ""}
                onChange={(e) => choose("date", e.target.value)}
                className={`${field} mt-1.5`}
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="w-start" className={label}>
                  {dateStep.labels.start}
                </label>
                <input
                  id="w-start"
                  type="time"
                  value={answers.start ?? ""}
                  onChange={(e) => choose("start", e.target.value)}
                  className={`${field} mt-1.5`}
                />
              </div>
              <div>
                <label htmlFor="w-duration" className={label}>
                  {dateStep.labels.duration}
                </label>
                <input
                  id="w-duration"
                  type="number"
                  min="1"
                  value={answers.duration ?? dateStep.defaultDuration}
                  onChange={(e) => choose("duration", e.target.value)}
                  className={`${field} mt-1.5`}
                />
              </div>
            </div>
          </div>
        </StepShell>
      )}

      {/* Contact details */}
      {current?.kind === "details" && (
        <form
          className="flex flex-1 flex-col"
          onSubmit={(e) => {
            // No backend yet — advance to the confirmation panel.
            e.preventDefault();
            next();
          }}
        >
          <div className="flex-1 text-center">
            <h2 className="font-display fluid-h2 font-semibold text-foreground">
              {detailsStep.heading}
            </h2>
            <p className="mt-2 text-sm text-muted">{detailsStep.blurb}</p>

            <div className="mt-5 space-y-3 text-left">
              <div>
                <label htmlFor="w-name" className={label}>
                  Name
                </label>
                <input
                  id="w-name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter username"
                  className={`${field} mt-1.5`}
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="w-phone" className={label}>
                    Phone
                  </label>
                  <input
                    id="w-phone"
                    type="tel"
                    defaultValue="+44"
                    className={`${field} mt-1.5`}
                  />
                </div>
                <div>
                  <label htmlFor="w-email" className={label}>
                    Email
                  </label>
                  <input
                    id="w-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className={`${field} mt-1.5`}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="w-message" className={label}>
                  Tell Us About Your Event
                </label>
                <textarea
                  id="w-message"
                  rows={2}
                  placeholder="Write here"
                  className="field-motion mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-foreground placeholder:text-muted outline-none focus:border-brand-light focus:bg-white focus:ring-1 focus:ring-brand-light"
                />
              </div>

              <fieldset className="space-y-1.5">
                <legend className="sr-only">Preferences</legend>
                {consentOptions.map((opt) => (
                  <label
                    key={opt.name}
                    className="flex items-start gap-2.5 text-xs text-foreground"
                  >
                    <input
                      type="checkbox"
                      name={opt.name}
                      required={opt.required}
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded-sm border border-slate-300 bg-white accent-brand"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </fieldset>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <BackButton onClick={back} />
            <p className="max-w-40 text-right text-[11px] leading-snug text-muted">
              {detailsStep.reassurance}
            </p>
            <button
              type="submit"
              className="btn-brand rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 active:translate-y-0"
            >
              {detailsStep.cta}
            </button>
          </div>
        </form>
      )}

      {/* Confirmation */}
      {current?.kind === "thanks" && (
        <div
          role="status"
          aria-live="polite"
          className="flex flex-1 flex-col items-center justify-center text-center"
        >
          <h2 className="font-display fluid-h2 font-semibold text-foreground">
            {thanksStep.heading}, {firstName}
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
            Your brief is with the team. We will check availability around{" "}
            {postcode.trim() || "your area"} and email matched DJ quotes to{" "}
            {email.trim() || "you"} shortly.
          </p>
          <Link
            href={thanksStep.href}
            className="btn-brand mt-8 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
          >
            {thanksStep.cta}
          </Link>
        </div>
      )}
    </div>
  );
}

/** Shared heading, body and Back/Next footer for the question steps. */
function StepShell({
  heading,
  blurb,
  children,
  onBack,
  onNext,
}: {
  heading: string;
  blurb: string;
  children: React.ReactNode;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1 text-center">
        <h2 className="font-display fluid-h2 font-semibold text-foreground">
          {heading}
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted">
          {blurb}
        </p>
        <div className="mt-5 text-left">{children}</div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <BackButton onClick={onBack} />
        <button
          type="button"
          onClick={onNext}
          className="btn-brand rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 active:translate-y-0"
        >
          Next
        </button>
      </div>
    </div>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-sm text-muted transition-colors hover:text-foreground"
    >
      <span aria-hidden>&larr;</span> Back
    </button>
  );
}
