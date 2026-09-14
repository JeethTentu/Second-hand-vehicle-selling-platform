import { Link } from "react-router-dom";

const COLUMNS = [
  {
    title: "Explore",
    links: [
      { label: "Buy a vehicle", to: "/vehicles" },
      { label: "Sell your vehicle", to: "/sell" },
      { label: "Compare vehicles", to: "/compare" },
      { label: "Favorites", to: "/favorites" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Login", to: "/login" },
      { label: "Create account", to: "/register" },
      { label: "Dashboard", to: "/dashboard" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Contact us", to: "/contact" },
      { label: "How it works", to: "/#why-choose-us" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink-dark text-cream/80">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <svg width="28" height="28" viewBox="0 0 64 64" aria-hidden="true">
                <rect width="64" height="64" rx="14" fill="#B7410E" />
                <path d="M12 40 L17 26 Q19 22 24 22 H40 Q45 22 47 26 L52 40 Z" fill="#2B1810" />
                <circle cx="22" cy="42" r="6" fill="#B7410E" stroke="#2B1810" strokeWidth="2.5" />
                <circle cx="42" cy="42" r="6" fill="#B7410E" stroke="#2B1810" strokeWidth="2.5" />
              </svg>
              <span className="font-display text-lg font-semibold text-white">
                Re<span className="text-amber">Wheel</span>
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream/60">
              A trusted marketplace for buying and selling second-hand cars and bikes across India.
              Search, compare, and connect with sellers directly.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-white/90">
                {col.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-cream/60 transition-colors hover:text-amber">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-cream/50 sm:flex-row">
          <p>© {new Date().getFullYear()} ReWheel. Demo project — no real transactions take place.</p>
          <p>Built for a frontend portfolio · Mock data only</p>
        </div>
      </div>
    </footer>
  );
}
