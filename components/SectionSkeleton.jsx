export default function SectionSkeleton({ id, label = "Loading section" }) {
  return (
    <section id={id} className="section-skeleton px-5 py-28 sm:px-6 lg:px-8" aria-busy="true" aria-live="polite">
      <div className="mx-auto max-w-7xl" role="status" aria-label={label}>
        <span className="skeleton-line skeleton-line-short" />
        <span className="skeleton-line skeleton-line-title" />
        <span className="skeleton-line skeleton-line-copy" />
        <span className="sr-only">{label}</span>
      </div>
    </section>
  );
}
