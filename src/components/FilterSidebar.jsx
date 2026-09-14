import Offcanvas from "react-bootstrap/Offcanvas";
import { VEHICLE_TYPES, FUEL_TYPES, TRANSMISSIONS, YEARS, PRICE_RANGES } from "../data/vehicles";

function CheckRow({ checked, onChange, label }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 py-1.5 text-[14.5px] text-ink/85">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-asphalt/40 text-amber focus:ring-amber/40"
      />
      {label}
    </label>
  );
}

function FilterGroup({ title, children }) {
  return (
    <div className="border-b border-ink/10 py-4 first:pt-0">
      <h3 className="mb-1 font-display text-[15px] font-semibold text-ink">{title}</h3>
      {children}
    </div>
  );
}

function toggleInArray(arr, value) {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
}

export function FilterPanel({ filters, onChange, onClear, resultCount }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm text-asphalt">
          <span className="font-semibold text-ink">{resultCount}</span> vehicles found
        </p>
        <button onClick={onClear} className="text-sm font-medium text-amber-dark hover:underline">
          Clear all
        </button>
      </div>

      <FilterGroup title="Vehicle Type">
        {VEHICLE_TYPES.map((t) => (
          <CheckRow
            key={t}
            label={t}
            checked={filters.types.includes(t)}
            onChange={() => onChange({ ...filters, types: toggleInArray(filters.types, t) })}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Price Range">
        {PRICE_RANGES.map((r) => (
          <CheckRow
            key={r.label}
            label={r.label}
            checked={filters.priceRanges.includes(r.label)}
            onChange={() => onChange({ ...filters, priceRanges: toggleInArray(filters.priceRanges, r.label) })}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Fuel Type">
        {FUEL_TYPES.map((f) => (
          <CheckRow
            key={f}
            label={f}
            checked={filters.fuels.includes(f)}
            onChange={() => onChange({ ...filters, fuels: toggleInArray(filters.fuels, f) })}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Transmission">
        {TRANSMISSIONS.map((t) => (
          <CheckRow
            key={t}
            label={t}
            checked={filters.transmissions.includes(t)}
            onChange={() => onChange({ ...filters, transmissions: toggleInArray(filters.transmissions, t) })}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Year">
        {YEARS.map((y) => (
          <CheckRow
            key={y}
            label={String(y)}
            checked={filters.years.includes(y)}
            onChange={() => onChange({ ...filters, years: toggleInArray(filters.years, y) })}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Location">
        <input
          type="text"
          value={filters.location}
          onChange={(e) => onChange({ ...filters, location: e.target.value })}
          placeholder="Enter city"
          className="form-input"
        />
      </FilterGroup>
    </div>
  );
}

export default function FilterSidebar({ filters, onChange, onClear, resultCount, mobileOpen, onMobileClose }) {
  return (
    <>
      <aside className="hidden w-72 shrink-0 lg:block">
        <div className="card-surface sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto p-5">
          <FilterPanel filters={filters} onChange={onChange} onClear={onClear} resultCount={resultCount} />
        </div>
      </aside>

      <Offcanvas show={mobileOpen} onHide={onMobileClose} placement="start" className="!w-[85vw] !max-w-sm">
        <Offcanvas.Header closeButton className="border-b border-ink/10">
          <Offcanvas.Title className="font-display text-lg">Filters</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="px-4">
          <FilterPanel filters={filters} onChange={onChange} onClear={onClear} resultCount={resultCount} />
          <button onClick={onMobileClose} className="btn-primary mt-4 w-full">
            Show {resultCount} results
          </button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
