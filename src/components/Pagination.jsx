export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  const radius = 1;
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= page - radius && i <= page + radius)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "…") {
      pages.push("…");
    }
  }

  const go = (p) => {
    if (p < 1 || p > totalPages || p === page) return;
    onChange(p);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="mt-8 flex items-center justify-center gap-1.5" aria-label="Pagination">
      <button
        onClick={() => go(page - 1)}
        disabled={page === 1}
        className="flex h-9 w-9 items-center justify-center rounded-md border border-ink/15 text-ink/70 hover:bg-ink/5 disabled:opacity-40"
        aria-label="Previous page"
      >
        ‹
      </button>
      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`e${i}`} className="px-2 text-asphalt">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => go(p)}
            aria-current={p === page ? "page" : undefined}
            className={`flex h-9 min-w-9 items-center justify-center rounded-md px-2 text-sm font-medium transition-colors ${
              p === page ? "bg-ink text-white" : "border border-ink/15 text-ink/70 hover:bg-ink/5"
            }`}
          >
            {p}
          </button>
        )
      )}
      <button
        onClick={() => go(page + 1)}
        disabled={page === totalPages}
        className="flex h-9 w-9 items-center justify-center rounded-md border border-ink/15 text-ink/70 hover:bg-ink/5 disabled:opacity-40"
        aria-label="Next page"
      >
        ›
      </button>
    </nav>
  );
}
