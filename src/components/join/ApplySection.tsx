import ApplyForm from "@/components/join/ApplyForm";
import { applySection } from "@/lib/join-data";

export default function ApplySection() {
  return (
    <section
      id="apply"
      className="mx-auto w-full max-w-[1600px] scroll-mt-20 px-5 py-10 sm:px-8 lg:px-12 lg:py-14 2xl:px-16"
    >
      <div className="grid items-center gap-8 rounded-2xl border border-hairline bg-surface p-5 sm:p-6 lg:grid-cols-2 lg:gap-10 lg:p-8">
        <div>
          <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
            {applySection.title}
          </h2>

          <p className="mt-5 max-w-xs fluid-body leading-relaxed text-muted">
            {applySection.blurb}
          </p>
          <p className="mt-5 max-w-xs fluid-body leading-relaxed text-muted">
            {applySection.emailNote}
          </p>

          <a
            href={`mailto:${applySection.email}`}
            className="mt-5 inline-block text-sm text-foreground underline-offset-4 transition-colors hover:text-brand-light hover:underline"
          >
            {applySection.email}
          </a>
        </div>

        <ApplyForm />
      </div>
    </section>
  );
}
