import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import VehicleCard from "../components/VehicleCard";
import FilterSidebar from "../components/FilterSidebar";
import Pagination from "../components/Pagination";
import EmptyState from "../components/EmptyState";
import Breadcrumb from "../components/Breadcrumb";
import { useApp } from "../context/AppContext";
import { PRICE_RANGES } from "../data/vehicles";

const PAGE_SIZE = 9;

const SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest vehicles" },
  { value: "oldest", label: "Oldest vehicles" },
  { value: "km-asc", label: "Lowest kilometers" },
  { value: "km-desc", label: "Highest kilometers" },
];

const emptyFilters = { types: [], priceRanges: [], fuels: [], transmissions: [], years: [], location: "" };

export default function Vehicles() {
  const { vehicles } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState({
    q: searchParams.get("q") || "",
    location: searchParams.get("location") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
  });
  const [filters, setFilters] = useState({
    ...emptyFilters,
    types: searchParams.get("type") ? [searchParams.get("type")] : [],
    location: searchParams.get("location") || "",
  });
  const [sort, setSort] = useState("relevance");
  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    setPage(1);
  }, [search, filters, sort]);

  const filtered = useMemo(() => {
    let result = vehicles.filter((v) => {
      if (search.q) {
        const needle = search.q.toLowerCase();
        const haystack = `${v.brand} ${v.model} ${v.variant}`.toLowerCase();
        if (!haystack.includes(needle)) return false;
      }
      if (search.location && !v.location.toLowerCase().includes(search.location.toLowerCase())) return false;
      if (search.minPrice && v.price < Number(search.minPrice)) return false;
      if (search.maxPrice && v.price > Number(search.maxPrice)) return false;

      if (filters.types.length && !filters.types.includes(v.type)) return false;
      if (filters.fuels.length && !filters.fuels.includes(v.fuel)) return false;
      if (filters.transmissions.length && !filters.transmissions.includes(v.transmission)) return false;
      if (filters.location && !v.location.toLowerCase().includes(filters.location.toLowerCase())) return false;

      if (filters.years.length) {
        const matchesYear = filters.years.some((y) => (y === "Older" ? v.year < 2022 : v.year === y));
        if (!matchesYear) return false;
      }

      if (filters.priceRanges.length) {
        const matchesRange = filters.priceRanges.some((label) => {
          const range = PRICE_RANGES.find((r) => r.label === label);
          return range && v.price >= range.min && v.price < range.max;
        });
        if (!matchesRange) return false;
      }

      return true;
    });

    switch (sort) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result = [...result].sort((a, b) => b.year - a.year);
        break;
      case "oldest":
        result = [...result].sort((a, b) => a.year - b.year);
        break;
      case "km-asc":
        result = [...result].sort((a, b) => a.kilometers - b.kilometers);
        break;
      case "km-desc":
        result = [...result].sort((a, b) => b.kilometers - a.kilometers);
        break;
      default:
        break;
    }
    return result;
  }, [vehicles, search, filters, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearch = (values) => {
    setSearch(values);
    const params = new URLSearchParams();
    if (values.q) params.set("q", values.q);
    if (values.location) params.set("location", values.location);
    if (values.minPrice) params.set("minPrice", values.minPrice);
    if (values.maxPrice) params.set("maxPrice", values.maxPrice);
    setSearchParams(params, { replace: true });
  };

  const clearFilters = () => setFilters(emptyFilters);

  const activeFilterCount =
    filters.types.length + filters.priceRanges.length + filters.fuels.length + filters.transmissions.length + filters.years.length + (filters.location ? 1 : 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Buy Vehicle" }]} />

      <h1 className="font-display text-3xl font-semibold text-ink">Browse vehicles</h1>
      <p className="mt-1 text-asphalt">Search and filter to find the right vehicle for your budget.</p>

      <div className="mt-6">
        <SearchBar initial={search} onSearch={handleSearch} />
      </div>

      <div className="mt-6 flex flex-col gap-6 lg:flex-row">
        <FilterSidebar
          filters={filters}
          onChange={setFilters}
          onClear={clearFilters}
          resultCount={filtered.length}
          mobileOpen={mobileFiltersOpen}
          onMobileClose={() => setMobileFiltersOpen(false)}
        />

        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="btn-secondary lg:hidden"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M7 12h10M10 18h4" strokeLinecap="round" />
              </svg>
              Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </button>

            <p className="hidden text-sm text-asphalt lg:block">
              Showing <span className="font-semibold text-ink">{pageItems.length}</span> of{" "}
              <span className="font-semibold text-ink">{filtered.length}</span> vehicles
            </p>

            <label className="ml-auto flex items-center gap-2 text-sm text-asphalt">
              Sort by
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="form-input !w-auto !py-2">
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {pageItems.length === 0 ? (
            <div className="mt-6">
              <EmptyState
                title="No vehicles found"
                message="Try changing your search filters."
                actionLabel="Clear all filters"
                onAction={() => {
                  clearFilters();
                  handleSearch({ q: "", location: "", minPrice: "", maxPrice: "" });
                }}
              />
            </div>
          ) : (
            <>
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {pageItems.map((v) => (
                  <VehicleCard key={v.id} vehicle={v} />
                ))}
              </div>
              <Pagination page={page} totalPages={totalPages} onChange={setPage} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
