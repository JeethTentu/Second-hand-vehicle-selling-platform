import { useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import VehicleCard from "../components/VehicleCard";
import { useApp } from "../context/AppContext";
import { VEHICLE_TYPES, BRANDS } from "../data/vehicles";

const CATEGORY_ICONS = {
  Car: (
    <path d="M3 13l1.6-4.8A2 2 0 0 1 6.5 7h11a2 2 0 0 1 1.9 1.2L21 13M5 13h14a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1M5 13a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h1m0 0a2 2 0 1 0 4 0m6 0a2 2 0 1 0 4 0m-10 0h6" />
  ),
  Bike: (
    <>
      <circle cx="6" cy="17" r="3.2" />
      <circle cx="18" cy="17" r="3.2" />
      <path d="M6 17l3-8h5l3 5M9 9h4M13 6h4l2 4" />
    </>
  ),
  SUV: (
    <path d="M2 13l1.6-5.2A2 2 0 0 1 5.5 6.5h13a2 2 0 0 1 1.9 1.3L22 13M4 13h16a1 1 0 0 1 1 1v3.5a1 1 0 0 1-1 1h-1M4 13a1 1 0 0 0-1 1v3.5a1 1 0 0 0 1 1h1m0 0a2 2 0 1 0 4 0m6 0a2 2 0 1 0 4 0m-10 0h6" />
  ),
  Sedan: (
    <path d="M3 14l1.3-4.5A2 2 0 0 1 6.2 8h11.6a2 2 0 0 1 1.9 1.5L21 14M4 14h16a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1M4 14a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h1m0 0a2 2 0 1 0 4 0m6 0a2 2 0 1 0 4 0m-10 0h6" />
  ),
  Hatchback: (
    <path d="M3 14l2-5a2 2 0 0 1 1.9-1.3h6.2c.6 0 1.2.3 1.6.8l3 3.5M4 14h16a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1M4 14a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h1m0 0a2 2 0 1 0 4 0m6 0a2 2 0 1 0 4 0m-10 0h6" />
  ),
};

const WHY_CHOOSE_US = [
  {
    title: "Verified listings",
    text: "Every vehicle listing is checked for complete, consistent details before it goes live.",
    icon: (
      <path d="M9 12l2 2 4-4m5 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
    ),
  },
  {
    title: "Direct seller contact",
    text: "No middlemen. Message or call the seller directly and negotiate on your own terms.",
    icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  },
  {
    title: "Side-by-side comparison",
    text: "Shortlist up to three vehicles and compare specs, price, and mileage at a glance.",
    icon: <path d="M3 12h18M3 12l5-5M3 12l5 5M21 12l-5-5M21 12l-5 5" />,
  },
  {
    title: "Built for every screen",
    text: "Browse comfortably whether you're on a laptop at home or a phone at the dealership.",
    icon: (
      <>
        <rect x="7" y="2" width="10" height="20" rx="2" />
        <path d="M11 18h2" />
      </>
    ),
  },
];

const TESTIMONIALS = [
  {
    name: "Sanjay Mehta",
    location: "Hyderabad",
    quote:
      "Found a well-kept Creta within my budget in two days. The comparison tool made it easy to shortlist between three options.",
  },
  {
    name: "Ritika Chawla",
    location: "Pune",
    quote:
      "Listing my old Swift took ten minutes. I had genuine enquiries the same evening through the contact form.",
  },
  {
    name: "Manoj Pillai",
    location: "Chennai",
    quote:
      "The filters are detailed enough that I never had to scroll through vehicles outside my budget or fuel preference.",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const { vehicles } = useApp();

  const featured = useMemo(() => vehicles.filter((v) => v.condition === "Excellent").slice(0, 4), [vehicles]);
  const recent = useMemo(() => [...vehicles].sort((a, b) => b.id - a.id).slice(0, 4), [vehicles]);

  const handleSearch = (values) => {
    const params = new URLSearchParams();
    if (values.q) params.set("q", values.q);
    if (values.location) params.set("location", values.location);
    if (values.minPrice) params.set("minPrice", values.minPrice);
    if (values.maxPrice) params.set("maxPrice", values.maxPrice);
    navigate(`/vehicles?${params.toString()}`);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: "repeating-linear-gradient(135deg, #B7410E 0, #B7410E 2px, transparent 2px, transparent 26px)"
        }} aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8">
          <p className="section-eyebrow text-amber-light">Second-hand vehicle marketplace</p>
          <h1 className="mt-2 max-w-2xl font-display text-4xl font-semibold leading-[1.1] text-white sm:text-5xl">
            Find your next car or bike, sold by people who actually drove it
          </h1>
          <p className="mt-4 max-w-xl text-[15px] text-cream/70">
            Browse thousands of inspected, second-hand vehicles across India. Filter by budget, fuel type
            and location — then talk to the seller directly.
          </p>
          <div className="mt-8">
            <SearchBar variant="hero" onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Category selection */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-semibold text-ink">Shop by category</h2>
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {VEHICLE_TYPES.map((type) => (
            <Link
              key={type}
              to={`/vehicles?type=${encodeURIComponent(type)}`}
              className="card-surface flex flex-col items-center gap-3 px-4 py-6 text-center transition-shadow hover:shadow-card-hover"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber/15 text-amber-dark">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {CATEGORY_ICONS[type]}
                </svg>
              </span>
              <span className="font-medium text-ink">{type}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured vehicles */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-2xl font-semibold text-ink">Featured vehicles</h2>
            <Link to="/vehicles" className="text-sm font-semibold text-amber-dark hover:underline">
              View all →
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((v) => (
              <VehicleCard key={v.id} vehicle={v} />
            ))}
          </div>
        </div>
      </section>

      {/* Recently added */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl font-semibold text-ink">Recently added</h2>
          <Link to="/vehicles" className="text-sm font-semibold text-amber-dark hover:underline">
            View all →
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {recent.map((v) => (
            <VehicleCard key={v.id} vehicle={v} />
          ))}
        </div>
      </section>

      {/* Popular brands */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-semibold text-ink">Popular brands</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {BRANDS.map((brand) => (
              <Link
                key={brand}
                to={`/vehicles?q=${encodeURIComponent(brand)}`}
                className="chip transition-colors hover:border-amber hover:bg-amber/10"
              >
                {brand}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section id="why-choose-us" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-semibold text-ink">Why choose ReWheel</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CHOOSE_US.map((item) => (
            <div key={item.title} className="card-surface p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink text-amber">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {item.icon}
                </svg>
              </span>
              <h3 className="mt-3 font-display text-base font-semibold text-ink">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-asphalt">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-ink py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-semibold text-white">What buyers and sellers say</h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <blockquote key={t.name} className="rounded-xl bg-white/[0.06] p-5">
                <p className="text-[15px] leading-relaxed text-cream/90">"{t.quote}"</p>
                <footer className="mt-4 text-sm text-cream/60">
                  <span className="font-semibold text-white">{t.name}</span> · {t.location}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
