import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/vehicles", label: "Buy Vehicle" },
  { to: "/sell", label: "Sell Vehicle" },
  { to: "/compare", label: "Compare" },
  { to: "/favorites", label: "Favorites" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout, favorites, compareList } = useApp();
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    `relative px-1 py-2 text-[15px] font-medium transition-colors ${
      isActive ? "text-amber" : "text-cream/85 hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-40 bg-ink shadow-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 shrink-0" onClick={() => setOpen(false)}>
          <svg width="30" height="30" viewBox="0 0 64 64" aria-hidden="true">
            <rect width="64" height="64" rx="14" fill="#B7410E" />
            <path d="M12 40 L17 26 Q19 22 24 22 H40 Q45 22 47 26 L52 40 Z" fill="#2B1810" />
            <circle cx="22" cy="42" r="6" fill="#B7410E" stroke="#2B1810" strokeWidth="2.5" />
            <circle cx="42" cy="42" r="6" fill="#B7410E" stroke="#2B1810" strokeWidth="2.5" />
          </svg>
          <span className="font-display text-xl font-semibold tracking-wide text-white">
            Re<span className="text-amber">Wheel</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === "/"}>
              {link.label}
              {link.to === "/favorites" && favorites.length > 0 && (
                <span className="ml-1 rounded-full bg-amber px-1.5 py-0.5 text-[11px] font-bold text-ink">
                  {favorites.length}
                </span>
              )}
              {link.to === "/compare" && compareList.length > 0 && (
                <span className="ml-1 rounded-full bg-amber px-1.5 py-0.5 text-[11px] font-bold text-ink">
                  {compareList.length}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/dashboard")}
                className="text-[15px] font-medium text-cream/90 hover:text-white"
              >
                Hi, {user.name}
              </button>
              <button onClick={logout} className="btn-ghost !text-cream/80 hover:!bg-white/10 hover:!text-white">
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn-ghost !text-cream/80 hover:!bg-white/10 hover:!text-white">
                Login
              </Link>
              <Link to="/register" className="btn-primary !py-2">
                Register
              </Link>
            </>
          )}
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-md text-white md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-ink md:hidden">
          <div className="flex flex-col gap-1 px-4 py-3">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2.5 text-[15px] font-medium ${
                    isActive ? "bg-white/10 text-amber" : "text-cream/85 hover:bg-white/5"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-white/10 pt-3">
              {user ? (
                <>
                  <Link to="/dashboard" onClick={() => setOpen(false)} className="btn-secondary w-full">
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className="btn-ghost w-full !text-cream/80"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setOpen(false)} className="btn-secondary w-full">
                    Login
                  </Link>
                  <Link to="/register" onClick={() => setOpen(false)} className="btn-primary w-full">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
