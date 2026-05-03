import { cn } from "../utils/cn";

export function SectionShell({ id, eyebrow, title, copy, className, children }) {
  return (
    <section
      id={id}
      className={cn(
        "content-auto relative flex min-h-screen items-center overflow-hidden px-5 py-24 sm:px-8 lg:px-12",
        className
      )}
    >
      <div className="mx-auto w-full max-w-7xl">
        {(eyebrow || title || copy) && (
          <div className="mb-14 max-w-3xl">
            {eyebrow ? (
              <p className="mb-4 text-xs uppercase tracking-[0.45em] text-white/45">{eyebrow}</p>
            ) : null}
            {title ? (
              <h2 className="font-display text-4xl leading-none text-white sm:text-5xl lg:text-7xl">
                {title}
              </h2>
            ) : null}
            {copy ? <p className="mt-6 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">{copy}</p> : null}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
