export type LegalSection = { heading: string; body: string[] };

/** Shared shell for the plain-text legal pages. */
export default function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <section className="scroll-mt-20">
      <div className="mx-auto w-full max-w-[900px] px-5 py-12 sm:px-8 lg:py-20">
        <h1 className="font-display fluid-hero font-semibold text-foreground">
          {title}
        </h1>
        <p className="mt-3 text-xs tracking-[0.14em] text-muted uppercase">
          Last updated {updated}
        </p>
        <p className="mt-6 fluid-body leading-relaxed text-muted">
          {intro}
        </p>

        <div className="mt-8 space-y-6">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-display text-lg font-semibold text-foreground sm:text-xl">
                {s.heading}
              </h2>
              {s.body.map((p) => (
                <p
                  key={p.slice(0, 30)}
                  className="mt-3 text-sm leading-relaxed text-muted"
                >
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
