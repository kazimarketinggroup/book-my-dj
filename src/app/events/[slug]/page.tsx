import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { eventRows } from "@/lib/events-data";
import { detailSlugs } from "@/lib/event-detail-data";
import EventIcon from "@/components/events/EventIcon";
import CtaBanner from "@/components/home/CtaBanner";

/** Slug is the last segment of each row's href. */
const slugOf = (href: string) => href.split("/").pop() ?? "";

/**
 * Some event types have their own hand-built page (see event-detail-data),
 * which takes precedence over this dynamic route — exclude those slugs so we
 * don't prerender a second, unreachable version of the same URL.
 */
const HAS_OWN_PAGE = new Set(detailSlugs);

export function generateStaticParams() {
  return eventRows
    .map((row) => slugOf(row.href))
    .filter((slug) => !HAS_OWN_PAGE.has(slug))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/events/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const row = eventRows.find((r) => slugOf(r.href) === slug);
  if (!row) return { title: "Event — Book My DJ" };
  return {
    title: `${row.title} — Book My DJ`,
    description: row.blurb,
  };
}

export default async function EventDetailPage({
  params,
}: PageProps<"/events/[slug]">) {
  const { slug } = await params;
  const row = eventRows.find((r) => slugOf(r.href) === slug);
  if (!row) notFound();

  const others = eventRows.filter((r) => r.title !== row.title);

  return (
    <>
      <section className="relative bg-background border-b border-hairline transition-colors duration-200">
        <div className="mx-auto w-full max-w-[1600px] px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20 2xl:px-16">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-xs font-medium text-muted transition-colors hover:text-foreground"
          >
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5"
            >
              <path d="M19 12H5M11 18l-6-6 6-6" />
            </svg>
            All Events
          </Link>

          <span className="mt-8 block text-foreground">
            <EventIcon name={row.icon} />
          </span>
          <p className="mt-4 text-[11px] tracking-[0.2em] text-muted">
            {row.no}
          </p>
          <h1 className="mt-2 max-w-2xl font-display fluid-hero font-semibold text-foreground">
            {row.title}
          </h1>
          <p className="mt-5 max-w-xl fluid-body leading-relaxed text-foreground/90">
            {row.headline}
          </p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
            {row.blurb}
          </p>

          <Link
            href="/#book"
            className="btn-brand mt-10 inline-block rounded-lg px-7 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Get Quote
          </Link>
        </div>
      </section>

      {/* Other event types */}
      <section className="scroll-mt-20">
        <div className="mx-auto w-full max-w-[1600px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14 2xl:px-16">
          <h2 className="font-display fluid-h2 font-semibold text-foreground">
            Other Events We Cover
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((other) => (
              <li key={other.title}>
                <Link
                  href={other.href}
                  className="block h-full rounded-2xl border border-hairline bg-surface p-6 transition-colors hover:border-foreground/25"
                >
                  <span className="text-foreground">
                    <EventIcon name={other.icon} />
                  </span>
                  <p className="mt-6 text-[11px] tracking-[0.2em] text-muted">
                    {other.no}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-medium text-foreground">
                    {other.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {other.headline}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
