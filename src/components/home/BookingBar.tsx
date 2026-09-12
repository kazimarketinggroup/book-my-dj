const inputBase =
  "h-[62.44px] w-full rounded-[10px] border border-white/10 bg-white/20 px-4 font-sans text-[16.6px] text-white placeholder:text-white/80 outline-none transition-colors focus:border-brand-light focus:bg-white/25 focus:ring-1 focus:ring-brand-light";

export default function BookingBar({
  buttonVariant = "gradient",
}: {
  buttonVariant?: "gradient" | "white";
}) {
  return (
    <section id="book" className="scroll-mt-20 py-8 lg:py-12 bg-black">
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <div className="rounded-[20px] border border-white/10 bg-[rgba(36,36,36,0.5)] p-6 shadow-2xl backdrop-blur-md lg:p-8">
          <h2 className="font-display text-[30px] font-normal leading-[25px] text-white">
            Book Now
          </h2>

          <form
            className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-[repeat(4,minmax(0,1fr))_auto]"
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

            <div className="relative">
              <label htmlFor="event-type" className="sr-only">
                Event Type
              </label>
              <select
                id="event-type"
                name="eventType"
                defaultValue=""
                className={`${inputBase} appearance-none pr-10`}
              >
                <option value="" disabled className="bg-zinc-900 text-white">
                  Event Type
                </option>
                <option className="bg-zinc-900 text-white">Corporate Event</option>
                <option className="bg-zinc-900 text-white">PR Event</option>
                <option className="bg-zinc-900 text-white">Music Festival</option>
                <option className="bg-zinc-900 text-white">Wedding</option>
                <option className="bg-zinc-900 text-white">Private Party</option>
                <option className="bg-zinc-900 text-white">Other</option>
              </select>
              {/* Caret icon from Figma */}
              <div className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-white/70">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </div>
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
                className={`${inputBase} pr-10`}
              />
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                fill="currentColor"
                className="pointer-events-none absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 text-white/70"
              >
                <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
              </svg>
            </div>

            <div className="relative">
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
              className={`flex h-[62.44px] w-full min-w-[150.9px] items-center justify-center rounded-[10px] font-sans text-[17.75px] font-medium transition-opacity hover:opacity-90 sm:col-span-2 lg:col-span-1 ${
                buttonVariant === "white"
                  ? "bg-white text-black hover:bg-zinc-200 shadow-md"
                  : "bg-gradient-to-r from-[#910870] via-[#520577] to-[#24081E] text-white shadow-lg shadow-purple-950/40"
              }`}
            >
              Book My DJ
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
