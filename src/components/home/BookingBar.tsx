const inputBase =
  "h-11 w-full rounded-xl border border-hairline bg-surface-3 px-3 text-sm text-foreground placeholder:text-muted outline-none transition-colors focus:border-brand-light focus:ring-1 focus:ring-brand-light";

export default function BookingBar() {
  return (
    <section id="book" className="scroll-mt-20">
      <div className="mx-auto w-full max-w-[1600px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14 2xl:px-16">
        <div className="rounded-[24px] border border-hairline bg-surface p-5 shadow-[0_18px_40px_rgba(0,0,0,0.25)] sm:p-6 lg:p-7">
          <h2 className="font-display text-[clamp(1.8rem,1.4vw+1rem,2.6rem)] font-semibold text-foreground">
            Book Now
          </h2>

          <form
            className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-[repeat(4,minmax(0,1fr))_auto] lg:gap-4"
            action="#"
          >
            <div>
              <label htmlFor="name" className="sr-only">
                Your Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your Name"
                className={inputBase}
              />
            </div>

            <div>
              <label htmlFor="event-type" className="sr-only">
                Event Type
              </label>
              <select
                id="event-type"
                name="eventType"
                defaultValue=""
                className={`${inputBase} appearance-none bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat pr-9`}
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2371717a' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
                }}
              >
                <option value="" disabled>
                  Event Type
                </option>
                <option>Corporate Event</option>
                <option>PR Event</option>
                <option>Music Festival</option>
                <option>Wedding</option>
                <option>Private Party</option>
                <option>Other</option>
              </select>
            </div>

            <div className="relative">
              <label htmlFor="location" className="sr-only">
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                placeholder="Location"
                className={`${inputBase} pr-9`}
              />
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                fill="currentColor"
                className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-zinc-500"
              >
                <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
              </svg>
            </div>

            <div>
              <label htmlFor="event-date" className="sr-only">
                Event Date
              </label>
              <input
                id="event-date"
                name="eventDate"
                type="date"
                placeholder="Event Date"
                className={`${inputBase} [color-scheme:dark]`}
              />
            </div>

            <button
              type="submit"
              className="h-11 rounded-md btn-brand px-6 text-sm font-semibold text-foreground shadow-lg shadow-brand/25 transition-opacity hover:opacity-90 sm:col-span-2 lg:col-span-1"
            >
              Book My DJ
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
