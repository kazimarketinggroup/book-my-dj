"use client";

import { Suspense, useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  choiceSteps,
  consentOptions,
  dateStep,
  detailsStep,
  thanksStep,
  wizardIntro,
} from "@/lib/contact-data";
import {
  lookupUKPostcode,
  searchUKAddresses,
  type UKAddressSuggestion,
} from "@/lib/address-lookup";

const field =
  "field-motion h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-foreground placeholder:text-muted outline-none transition-all duration-200 focus:border-black focus:bg-white focus:ring-1 focus:ring-black";

const label = "block text-xs font-semibold text-foreground/90";

type Answers = Record<string, string>;

/**
 * Strict UK Postcode validation & formatting.
 * Validates against both full UK postcodes (e.g. SW1A 1AA, M1 1AE, B33 8TH)
 * and valid UK outward area codes (e.g. SW1A, SW1, M1, EC1, B33).
 * Blocks arbitrary numbers (e.g. 12345), random letters, and spam inputs.
 */
function validateAndFormatUKPostcode(raw: string): {
  isValid: boolean;
  formatted: string;
  error?: string;
} {
  const trimmed = raw.trim();
  if (!trimmed) {
    return {
      isValid: false,
      formatted: "",
      error: "Please enter your event postcode to continue.",
    };
  }

  // Remove internal spaces and uppercase for inspection
  const compact = trimmed.toUpperCase().replace(/\s+/g, "");

  // Standard UK Government Postcode Regex:
  // Full UK Postcode: Area (1-2 letters) + District (1-2 digits or digit+letter) + Inward (1 digit + 2 letters)
  const fullRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]?[0-9][A-Z]{2}$/;
  // Outward only (e.g., SW1A, W1, M1, B33, EC1A)
  const outwardRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]?$/;

  const isFull = fullRegex.test(compact);
  const isOutward = outwardRegex.test(compact);

  if (!isFull && !isOutward) {
    return {
      isValid: false,
      formatted: trimmed,
      error: "Please enter a valid UK postcode (e.g., SW1A 1AA, M1 1AE, or B1).",
    };
  }

  if (isFull) {
    const outward = compact.slice(0, -3);
    const inward = compact.slice(-3);
    return { isValid: true, formatted: `${outward} ${inward}` };
  }

  return { isValid: true, formatted: compact };
}



/** Format date string (YYYY-MM-DD) into readable British format */
function formatDisplayDate(dateStr: string): string {
  if (!dateStr) return "";
  try {
    const [y, m, d] = dateStr.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}



/** Standard 30-min start time options for the dropdown */
const TIME_DROPDOWN_OPTIONS = [
  { value: "Flexible", label: "Flexible / Not sure yet" },
  { value: "12:00", label: "12:00 PM (Midday)" },
  { value: "12:30", label: "12:30 PM" },
  { value: "13:00", label: "1:00 PM" },
  { value: "13:30", label: "1:30 PM" },
  { value: "14:00", label: "2:00 PM (Afternoon)" },
  { value: "14:30", label: "2:30 PM" },
  { value: "15:00", label: "3:00 PM" },
  { value: "15:30", label: "3:30 PM" },
  { value: "16:00", label: "4:00 PM" },
  { value: "16:30", label: "4:30 PM" },
  { value: "17:00", label: "5:00 PM (Early Evening)" },
  { value: "17:30", label: "5:30 PM" },
  { value: "18:00", label: "6:00 PM" },
  { value: "18:30", label: "6:30 PM" },
  { value: "19:00", label: "7:00 PM (Most Popular)" },
  { value: "19:30", label: "7:30 PM" },
  { value: "20:00", label: "8:00 PM" },
  { value: "20:30", label: "8:30 PM" },
  { value: "21:00", label: "9:00 PM (Late Party)" },
  { value: "21:30", label: "9:30 PM" },
  { value: "22:00", label: "10:00 PM" },
  { value: "22:30", label: "10:30 PM" },
  { value: "23:00", label: "11:00 PM" },
];



export default function BookingWizard() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-125 flex-col items-center justify-center rounded-[28px] border border-slate-200/90 bg-white p-6 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.08)] sm:min-h-161 sm:p-8">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-light border-t-transparent" />
        </div>
      }
    >
      <BookingWizardInner />
    </Suspense>
  );
}

function BookingWizardInner() {
  const searchParams = useSearchParams();
  const djParam = searchParams.get("dj") || "";

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({
    duration: dateStep.defaultDuration || "4",
    start: "19:00",
  });
  const [postcode, setPostcode] = useState("");
  const [venueAddress, setVenueAddress] = useState("");
  const [areaLocation, setAreaLocation] = useState("");
  const [postcodeError, setPostcodeError] = useState("");
  const [stepError, setStepError] = useState("");

  // Automated 100% Free Address Lookup State
  const [isLookingUpPostcode, setIsLookingUpPostcode] = useState(false);
  const [isPostcodeVerified, setIsPostcodeVerified] = useState(false);
  const [addressSuggestions, setAddressSuggestions] = useState<UKAddressSuggestion[]>([]);
  const [isSearchingAddress, setIsSearchingAddress] = useState(false);
  const [showAddressDropdown, setShowAddressDropdown] = useState(false);
  const addressDropdownRef = useRef<HTMLDivElement>(null);
  const searchDebounceRef = useRef<NodeJS.Timeout | null>(null);

  // Close address dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        addressDropdownRef.current &&
        !addressDropdownRef.current.contains(event.target as Node)
      ) {
        setShowAddressDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Contact details
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+44 ");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState<{
    privacy: boolean;
    updates: boolean;
    urgent: boolean;
  }>({
    privacy: false,
    updates: false,
    urgent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Get minimum selectable date (today in UK local)
  const todayString = useMemo(() => new Date().toISOString().split("T")[0], []);



  // Check if current postcode input has valid UK format
  const isPostcodeValidFormat = useMemo(() => {
    if (!postcode.trim()) return false;
    return validateAndFormatUKPostcode(postcode).isValid;
  }, [postcode]);

  const [eventTypeStep, ...restChoices] = choiceSteps;
  const screens = [
    { kind: "choice" as const, step: eventTypeStep },
    { kind: "date" as const },
    ...restChoices.map((s) => ({ kind: "choice" as const, step: s })),
    { kind: "details" as const },
    { kind: "thanks" as const },
  ];

  const current = step === 0 ? null : screens[step - 1];

  const back = () => {
    setStepError("");
    setStep((s) => Math.max(0, s - 1));
  };

  const next = () => {
    setStepError("");
    setStep((s) => Math.min(screens.length, s + 1));
  };

  const choose = (key: string, value: string) => {
    setStepError("");
    setAnswers((a) => ({ ...a, [key]: value }));
  };

  // Step 0: Free UK Postcode lookup & verification
  const verifyAndLookupPostcode = async (rawCode: string): Promise<boolean> => {
    const check = validateAndFormatUKPostcode(rawCode);
    if (!check.isValid) {
      setPostcodeError(check.error || "Please enter a valid UK postcode.");
      return false;
    }
    setPostcodeError("");
    setPostcode(check.formatted);

    setIsLookingUpPostcode(true);
    try {
      const res = await lookupUKPostcode(check.formatted);
      if (res.success && res.formattedLocation) {
        setAreaLocation(res.formattedLocation);
        setIsPostcodeVerified(true);
      }
      return true;
    } catch {
      return true;
    } finally {
      setIsLookingUpPostcode(false);
    }
  };

  const handleStartPostcode = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const check = validateAndFormatUKPostcode(postcode);
    if (!check.isValid) {
      setPostcodeError(check.error || "Please enter a valid UK postcode.");
      return;
    }
    setPostcodeError("");
    setPostcode(check.formatted);

    // If postcode has not been checked/verified yet, verify it now and reveal venue box
    if (!isPostcodeVerified) {
      setIsLookingUpPostcode(true);
      try {
        const res = await lookupUKPostcode(check.formatted);
        if (res.success && res.formattedLocation) {
          setAreaLocation(res.formattedLocation);
        }
        setIsPostcodeVerified(true);
      } catch {
        setIsPostcodeVerified(true);
      } finally {
        setIsLookingUpPostcode(false);
      }
      return;
    }

    next();
  };

  // Automatic background lookup as user types valid UK postcode
  useEffect(() => {
    const trimmed = postcode.trim();
    if (!trimmed) {
      setAreaLocation("");
      setIsPostcodeVerified(false);
      return;
    }

    const check = validateAndFormatUKPostcode(trimmed);
    if (check.isValid && !isPostcodeVerified) {
      const timer = setTimeout(async () => {
        setIsLookingUpPostcode(true);
        try {
          const res = await lookupUKPostcode(check.formatted);
          if (res.success && res.formattedLocation) {
            setAreaLocation(res.formattedLocation);
            setIsPostcodeVerified(true);
          }
        } catch {
          // Fallback
        } finally {
          setIsLookingUpPostcode(false);
        }
      }, 350);

      return () => clearTimeout(timer);
    }
  }, [postcode, isPostcodeVerified]);

  // Venue / Street Address search with debounce
  const handleVenueChange = (val: string) => {
    setVenueAddress(val);
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);

    if (val.trim().length >= 2) {
      setIsSearchingAddress(true);
      searchDebounceRef.current = setTimeout(async () => {
        const results = await searchUKAddresses(val, areaLocation || postcode);
        setAddressSuggestions(results);
        setShowAddressDropdown(results.length > 0);
        setIsSearchingAddress(false);
      }, 350);
    } else {
      setAddressSuggestions([]);
      setShowAddressDropdown(false);
      setIsSearchingAddress(false);
    }
  };

  const selectAddress = (suggestion: UKAddressSuggestion) => {
    setVenueAddress(suggestion.displayName);
    setShowAddressDropdown(false);
  };

  // Choice step validator
  const handleChoiceNext = (key: string) => {
    if (!answers[key]) {
      setStepError("Please select an option to continue.");
      return;
    }
    setStepError("");
    next();
  };

  // Date step validator
  const handleDateNext = () => {
    if (!answers.date) {
      setStepError("Please select the date of your event before continuing.");
      return;
    }
    setStepError("");
    next();
  };



  // Handle final submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!name.trim()) {
      setSubmitError("Please provide your name.");
      return;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setSubmitError("Please provide a valid email address.");
      return;
    }
    if (!phone.trim() || phone.trim() === "+44" || phone.trim().length < 8) {
      setSubmitError("Please provide a valid UK contact phone number.");
      return;
    }
    if (!consent.privacy) {
      setSubmitError("Please check the box to agree to our Privacy Policy.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        postcode: postcode.trim(),
        venueAddress: venueAddress.trim() || undefined,
        areaLocation: areaLocation.trim() || undefined,
        eventType: answers.eventType || "Event",
        date: answers.date || "",
        start: answers.start || "19:00",
        duration: answers.duration || "4",
        guests: answers.guests || "",
        supplies: answers.supplies || "",
        timeline: answers.timeline || "",
        role: answers.role || "",
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        message: message.trim(),
        urgent: consent.urgent,
        updates: consent.updates,
        requestedDj: djParam || undefined,
      };

      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Submission failed. Please try again.");
      }

      // Advance to confirmation screen
      setStep(screens.length);
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error
          ? err.message
          : "Could not send booking brief. Please try again or reach out directly.";
      setSubmitError(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setStep(0);
    setAnswers({ duration: dateStep.defaultDuration || "4", start: "19:00" });
    setPostcode("");
    setVenueAddress("");
    setAreaLocation("");
    setIsPostcodeVerified(false);
    setShowAddressDropdown(false);
    setAddressSuggestions([]);
    setName("");
    setPhone("+44 ");
    setEmail("");
    setMessage("");
    setConsent({ privacy: false, updates: false, urgent: false });
    setStepError("");
    setSubmitError("");
    setPostcodeError("");
  };

  const firstName = name.trim().split(/\s+/)[0] || "there";

  return (
    <div className="flex min-h-125 flex-col rounded-[28px] border border-slate-200/90 bg-white p-6 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.08)] sm:min-h-161 sm:p-8">
      {/* Postcode & Automated Location intro (Step 0) */}
      {step === 0 && (
        <form
          onSubmit={handleStartPostcode}
          className="flex flex-1 flex-col items-center pt-10 text-center sm:pt-16"
        >
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
            <input
              id="w-postcode"
              type="text"
              autoComplete="postal-code"
              value={postcode}
              onChange={(e) => {
                setPostcode(e.target.value.toUpperCase());
                if (postcodeError) setPostcodeError("");
                if (isPostcodeVerified) {
                  setIsPostcodeVerified(false);
                }
              }}
              placeholder={wizardIntro.placeholder}
              maxLength={10}
              className={`${field} h-13 px-4 pr-11 text-base uppercase tracking-wider font-medium placeholder:normal-case placeholder:tracking-normal ${
                postcodeError
                  ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-red-400"
                  : isPostcodeVerified
                  ? "border-emerald-500 bg-emerald-50/10 focus:border-emerald-600 focus:ring-emerald-500"
                  : ""
              }`}
            />

            {/* Validation indicator */}
            <div className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2">
              {isLookingUpPostcode ? (
                <svg className="h-4 w-4 animate-spin text-black" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : isPostcodeVerified ? (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 animate-in zoom-in-50">
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              ) : null}
            </div>
          </div>

          {postcodeError ? (
            <p className="mt-2.5 flex items-center justify-center gap-1.5 text-xs font-medium text-red-600 animate-in fade-in">
              <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{postcodeError}</span>
            </p>
          ) : isPostcodeVerified && areaLocation ? (
            <p className="mt-2.5 text-xs font-medium text-emerald-700 animate-in fade-in">
              ✓ Covering {areaLocation}
            </p>
          ) : (
            <p className="mt-2 text-[11px] text-muted">
              Enter full UK postcode (e.g. SW1A 1AA, M1 1AE) or outward code (e.g. SW1, B1)
            </p>
          )}

          {/* When address/postcode is checked, show the venue box */}
          {isPostcodeVerified && (
            <div className="mt-5 w-full max-w-md text-left animate-in fade-in slide-in-from-top-2 duration-300">
              <label
                htmlFor="w-venue-step0"
                className="block text-xs font-semibold text-slate-800"
              >
                Venue Name or Street Address{" "}
                <span className="font-normal text-muted">(Optional)</span>
              </label>
              <div className="relative mt-1.5" ref={addressDropdownRef}>
                <input
                  id="w-venue-step0"
                  type="text"
                  value={venueAddress}
                  onChange={(e) => handleVenueChange(e.target.value)}
                  onFocus={() => {
                    if (addressSuggestions.length > 0) setShowAddressDropdown(true);
                  }}
                  placeholder={
                    areaLocation
                      ? `e.g. Venue, hotel or street in ${areaLocation}`
                      : "e.g. The Dorchester, 14 Baker Street, or Private Venue"
                  }
                  className={`${field} h-12 px-3.5 text-sm`}
                />
                {isSearchingAddress && (
                  <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2">
                    <svg
                      className="h-4 w-4 animate-spin text-muted"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                  </div>
                )}
                {showAddressDropdown && addressSuggestions.length > 0 && (
                  <ul className="absolute z-30 mt-1 max-h-52 w-full overflow-auto rounded-xl border border-slate-200 bg-white p-1 text-xs shadow-xl ring-1 ring-black/5 animate-in fade-in">
                    {addressSuggestions.map((item, idx) => (
                      <li
                        key={idx}
                        onClick={() => selectAddress(item)}
                        className="flex cursor-pointer items-start gap-2 rounded-lg px-3 py-2 text-slate-800 transition-colors hover:bg-slate-100 hover:text-black"
                      >
                        <span className="mt-0.5 text-slate-400">•</span>
                        <span className="leading-snug">{item.displayName}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <p className="mt-1.5 text-[11px] text-muted">
                Search nearby venues or enter your venue name if confirmed.
              </p>
            </div>
          )}

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
              type="submit"
              className="btn-brand rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 active:translate-y-0"
            >
              {wizardIntro.cta}
            </button>
          </div>
        </form>
      )}

      {/* Choice steps (Clean cards without native radio dots) */}
      {current?.kind === "choice" && (
        <StepShell
          heading={current.step.heading}
          blurb={current.step.blurb}
          error={stepError}
          onBack={back}
          onNext={() => handleChoiceNext(current.step.name)}
        >
          <fieldset className="space-y-2">
            <legend className="sr-only">{current.step.heading}</legend>
            {current.step.options.map((opt) => {
              const selected = answers[current.step.name] === opt;
              return (
                <label
                  key={opt}
                  onClick={() => choose(current.step.name, opt)}
                  className={`group flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3 text-sm transition-all duration-200 ${
                    selected
                      ? "border-black bg-slate-900 text-white font-medium shadow-sm ring-1 ring-black"
                      : "border-slate-200 bg-slate-50/70 text-foreground/85 hover:border-slate-400 hover:bg-white"
                  }`}
                >
                  <span className="select-none">{opt}</span>

                  {/* Clean custom indicator instead of annoying radio dot */}
                  <div
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
                      selected
                        ? "border-white bg-white text-black"
                        : "border-slate-300 bg-transparent group-hover:border-slate-400"
                    }`}
                  >
                    {selected && (
                      <svg
                        className="h-3 w-3 stroke-current"
                        viewBox="0 0 24 24"
                        fill="none"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
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
          error={stepError}
          onBack={back}
          onNext={handleDateNext}
        >
          <div className="space-y-4">
            {/* 1. Date of Event */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="w-date" className={label}>
                  {dateStep.labels.date} <span className="text-red-500">*</span>
                </label>
                {answers.date && (
                  <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    {formatDisplayDate(answers.date)}
                  </span>
                )}
              </div>
              <div className="relative mt-1.5">
                <input
                  id="w-date"
                  type="date"
                  min={todayString}
                  value={answers.date ?? ""}
                  onChange={(e) => choose("date", e.target.value)}
                  className={`${field} h-12 text-sm font-medium ${
                    stepError && !answers.date
                      ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-red-400"
                      : ""
                  }`}
                />
              </div>
            </div>

            {/* 2. Start Time & Duration (Clean 2-Column Grid) */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="w-start-select" className={label}>
                  {dateStep.labels.start}
                </label>
                <div className="relative mt-1.5">
                  <select
                    id="w-start-select"
                    value={answers.start ?? "19:00"}
                    onChange={(e) => choose("start", e.target.value)}
                    className={`${field} h-12 appearance-none pr-10 text-sm font-medium`}
                  >
                    {TIME_DROPDOWN_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-muted">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor">
                      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="w-duration-select" className={label}>
                  {dateStep.labels.duration}
                </label>
                <div className="relative mt-1.5">
                  <select
                    id="w-duration-select"
                    value={answers.duration ?? "4"}
                    onChange={(e) => choose("duration", e.target.value)}
                    className={`${field} h-12 appearance-none pr-10 text-sm font-medium`}
                  >
                    <option value="4">4 Hours (Standard)</option>
                    <option value="3">3 Hours (Short Set)</option>
                    <option value="5">5 Hours (Full Evening)</option>
                    <option value="6">6 Hours (Extended Night)</option>
                    <option value="7">7 Hours</option>
                    <option value="8">8 Hours (All Night / Full Day)</option>
                    <option value="2">2 Hours</option>
                  </select>
                  <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-muted">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor">
                      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </StepShell>
      )}

      {/* Contact details */}
      {current?.kind === "details" && (
        <form className="flex flex-1 flex-col" onSubmit={handleSubmit}>
          <div className="flex-1 text-center">
            <h2 className="font-display fluid-h2 font-semibold text-foreground">
              {detailsStep.heading}
            </h2>
            <p className="mt-2 text-sm text-muted">{detailsStep.blurb}</p>

            {djParam && (
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-light" />
                Requested DJ: <strong className="text-foreground">{djParam}</strong>
              </div>
            )}

            <div className="mt-5 space-y-3 text-left">
              <div>
                <label htmlFor="w-name" className={label}>
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="w-name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className={`${field} mt-1.5`}
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="w-phone" className={label}>
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="w-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+44 7123 456789"
                    className={`${field} mt-1.5`}
                  />
                </div>
                <div>
                  <label htmlFor="w-email" className={label}>
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="w-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@example.com"
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
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Music preferences, special requests, venue details..."
                  className="field-motion mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-foreground placeholder:text-muted outline-none transition-all duration-200 focus:border-black focus:bg-white focus:ring-1 focus:ring-black"
                />
              </div>

              <fieldset className="space-y-2 pt-1">
                <legend className="sr-only">Preferences</legend>
                {consentOptions.map((opt) => (
                  <label
                    key={opt.name}
                    className="flex cursor-pointer items-start gap-2.5 text-xs text-foreground/90 select-none"
                  >
                    <input
                      type="checkbox"
                      name={opt.name}
                      checked={consent[opt.name as keyof typeof consent]}
                      onChange={(e) =>
                        setConsent((prev) => ({
                          ...prev,
                          [opt.name]: e.target.checked,
                        }))
                      }
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border border-slate-300 bg-white text-black accent-black"
                    />
                    <span>
                      {opt.label}{" "}
                      {opt.required && <span className="text-red-500 font-bold">*</span>}
                    </span>
                  </label>
                ))}
              </fieldset>

              {submitError && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-2.5 text-xs text-red-600 animate-in fade-in">
                  {submitError}
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <BackButton onClick={back} />
            <p className="max-w-40 text-right text-[11px] leading-snug text-muted">
              {detailsStep.reassurance}
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-brand flex items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 active:translate-y-0 disabled:opacity-60 disabled:pointer-events-none"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="h-4 w-4 animate-spin text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Sending Brief...</span>
                </>
              ) : (
                detailsStep.cta
              )}
            </button>
          </div>
        </form>
      )}

      {/* Confirmation (Step thanks) */}
      {current?.kind === "thanks" && (
        <div
          role="status"
          aria-live="polite"
          className="flex flex-1 flex-col items-center justify-center text-center"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h2 className="font-display fluid-h2 font-semibold text-foreground">
            {thanksStep.heading}, {firstName}
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
            Your brief is with the team. We will check availability around{" "}
            <span className="font-semibold text-foreground">
              {postcode.trim() || "your area"}
            </span>{" "}
            and email matched DJ quotes to{" "}
            <span className="font-semibold text-foreground">
              {email.trim() || "you"}
            </span>{" "}
            shortly.
          </p>

          {/* Quick summary card of the booking */}
          <div className="mt-5 w-full max-w-sm rounded-xl border border-slate-100 bg-slate-50/80 p-4 text-left text-xs text-muted">
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-2 font-medium text-foreground">
              <span>Event Summary</span>
              {consent.urgent && (
                <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-semibold text-red-700">
                  Urgent
                </span>
              )}
            </div>
            <dl className="mt-2.5 space-y-1.5">
              {answers.eventType && (
                <div className="flex justify-between">
                  <dt>Event:</dt>
                  <dd className="font-medium text-foreground">{answers.eventType}</dd>
                </div>
              )}
              {answers.date && (
                <div className="flex justify-between">
                  <dt>Date:</dt>
                  <dd className="font-medium text-foreground">
                    {formatDisplayDate(answers.date)}{" "}
                    {answers.start ? `(${answers.start})` : ""}
                  </dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt>Location:</dt>
                <dd className="font-medium text-foreground text-right">
                  {postcode}{areaLocation ? ` (${areaLocation})` : ""}
                </dd>
              </div>
              {venueAddress && (
                <div className="flex justify-between">
                  <dt>Venue / Address:</dt>
                  <dd className="max-w-44 truncate font-medium text-foreground text-right" title={venueAddress}>
                    {venueAddress}
                  </dd>
                </div>
              )}
              {answers.duration && (
                <div className="flex justify-between">
                  <dt>Duration:</dt>
                  <dd className="font-medium text-foreground">{answers.duration} Hours</dd>
                </div>
              )}
              {djParam && (
                <div className="flex justify-between">
                  <dt>Requested DJ:</dt>
                  <dd className="font-medium text-foreground">{djParam}</dd>
                </div>
              )}
            </dl>
          </div>

          <div className="mt-6 flex flex-col items-center gap-3">
            <Link
              href={thanksStep.href}
              className="btn-brand rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
            >
              {thanksStep.cta}
            </Link>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-muted transition-colors hover:text-foreground underline underline-offset-2"
            >
              Submit another enquiry
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/** Shared heading, body and Back/Next footer for the question steps. */
function StepShell({
  heading,
  blurb,
  error,
  children,
  onBack,
  onNext,
}: {
  heading: string;
  blurb: string;
  error?: string;
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

        {error && (
          <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs font-medium text-red-600 animate-in fade-in">
            <svg
              className="h-3.5 w-3.5 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{error}</span>
          </p>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
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
      className="inline-flex items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-foreground"
    >
      <span aria-hidden>&larr;</span> Back
    </button>
  );
}
