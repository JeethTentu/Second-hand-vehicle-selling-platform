import { useState } from "react";

export default function SearchBar({ initial = {}, onSearch, variant = "toolbar" }) {
  const [q, setQ] = useState(initial.q || "");
  const [location, setLocation] = useState(initial.location || "");
  const [minPrice, setMinPrice] = useState(initial.minPrice || "");
  const [maxPrice, setMaxPrice] = useState(initial.maxPrice || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.({ q: q.trim(), location: location.trim(), minPrice, maxPrice });
  };

  const isHero = variant === "hero";

  return (
    <form
      onSubmit={handleSubmit}
      className={
        isHero
          ? "grid grid-cols-1 gap-3 rounded-xl bg-white p-4 shadow-card-hover sm:grid-cols-2 lg:grid-cols-[2fr_1.3fr_1fr_1fr_auto]"
          : "grid grid-cols-1 gap-3 rounded-xl border border-ink/10 bg-white p-4 shadow-card sm:grid-cols-2 lg:grid-cols-[2fr_1.3fr_1fr_1fr_auto]"
      }
      role="search"
      aria-label="Search vehicles"
    >
      <div>
        <label htmlFor="search-q" className="sr-only">
          Search by name, brand, or model
        </label>
        <input
          id="search-q"
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name, brand or model — e.g. Toyota Innova"
          className="form-input"
        />
      </div>
      <div>
        <label htmlFor="search-location" className="sr-only">
          Location
        </label>
        <input
          id="search-location"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location — e.g. Hyderabad"
          className="form-input"
        />
      </div>
      <div>
        <label htmlFor="search-min" className="sr-only">
          Minimum price
        </label>
        <input
          id="search-min"
          type="number"
          min="0"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          placeholder="Min price (₹)"
          className="form-input"
        />
      </div>
      <div>
        <label htmlFor="search-max" className="sr-only">
          Maximum price
        </label>
        <input
          id="search-max"
          type="number"
          min="0"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="Max price (₹)"
          className="form-input"
        />
      </div>
      <button type="submit" className="btn-primary w-full lg:w-auto">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
        </svg>
        Search
      </button>
    </form>
  );
}
