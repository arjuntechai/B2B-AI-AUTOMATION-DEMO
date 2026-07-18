export default function Footer() {
  return (
    <footer className="border-t border-line px-6 py-10">
      <div className="mx-auto max-w-6xl flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-md border border-accent/40 text-accent text-[10px] font-semibold">
            M
          </span>
          <span className="text-heading text-sm font-medium tracking-wide">Meridian Systems</span>
        </div>
        <p className="text-muted text-xs sm:text-sm text-center">
          © 2025 Meridian Systems. All rights reserved.
        </p>
        <a
          href="mailto:hello@meridiansystems.io"
          className="underline-grow text-muted text-xs sm:text-sm transition-colors duration-200 hover:text-body"
        >
          hello@meridiansystems.io
        </a>
      </div>
    </footer>
  );
}
