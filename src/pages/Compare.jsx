import { useNavigate, Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import EmptyState from "../components/EmptyState";
import { useApp } from "../context/AppContext";
import { getVehicleMainImage } from "../utils/placeholderImage";
import { formatPrice, formatKm } from "../utils/format";

const ROWS = [
  ["Brand", (v) => v.brand],
  ["Model", (v) => v.model],
  ["Variant", (v) => v.variant],
  ["Year", (v) => v.year],
  ["Price", (v) => formatPrice(v.price)],
  ["Fuel", (v) => v.fuel],
  ["Transmission", (v) => v.transmission],
  ["KM Driven", (v) => formatKm(v.kilometers)],
  ["Owners", (v) => v.owners],
  ["Condition", (v) => v.condition],
  ["Color", (v) => v.color],
  ["Location", (v) => v.location],
];

export default function Compare() {
  const { vehicles, compareList, removeFromCompare, addToCompare, clearCompare, maxCompare } = useApp();
  const navigate = useNavigate();
  const selected = compareList.map((id) => vehicles.find((v) => v.id === id)).filter(Boolean);
  const available = vehicles.filter((v) => !compareList.includes(v.id));
  const slotsLeft = maxCompare - selected.length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Compare Vehicles" }]} />

      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink">Compare vehicles</h1>
          <p className="mt-1 text-asphalt">Pick up to {maxCompare} vehicles to view specs side by side.</p>
        </div>
        {selected.length > 0 && (
          <button onClick={clearCompare} className="btn-ghost">
            Clear all
          </button>
        )}
      </div>

      {selected.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="Your comparison list is empty"
            message="Add vehicles to comparison from the listing page or a vehicle's details page."
            actionLabel="Browse vehicles"
            onAction={() => navigate("/vehicles")}
            icon={
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M3 12h18M3 12l5-5M3 12l5 5M21 12l-5-5M21 12l-5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
          />
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto pb-2">
          <table className="w-full min-w-[640px] border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="w-40 rounded-tl-xl bg-ink/5 px-4 py-3 text-left text-sm font-semibold text-ink/60">
                  Feature
                </th>
                {selected.map((v) => (
                  <th key={v.id} className="w-64 bg-white px-4 py-4 text-left align-top">
                    <div className="card-surface overflow-hidden">
                      <div className="relative aspect-[4/3]">
                        <img src={getVehicleMainImage(v)} alt={`${v.brand} ${v.model}`} className="h-full w-full object-cover" />
                        <button
                          onClick={() => removeFromCompare(v.id)}
                          aria-label={`Remove ${v.brand} ${v.model} from comparison`}
                          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-ink shadow"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="p-3">
                        <p className="font-display text-base font-semibold text-ink">
                          {v.brand} {v.model}
                        </p>
                        <Link to={`/vehicles/${v.id}`} className="mt-1 inline-block text-xs font-semibold text-amber-dark hover:underline">
                          View details →
                        </Link>
                      </div>
                    </div>
                  </th>
                ))}
                {slotsLeft > 0 && (
                  <th className="w-64 bg-white px-4 py-4 align-top">
                    <div className="flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-ink/20 p-4 text-center">
                      <p className="text-sm font-medium text-ink/70">Add a vehicle</p>
                      <select
                        onChange={(e) => e.target.value && addToCompare(Number(e.target.value))}
                        defaultValue=""
                        className="form-input !py-1.5 text-sm"
                      >
                        <option value="" disabled>
                          Choose vehicle…
                        </option>
                        {available.map((v) => (
                          <option key={v.id} value={v.id}>
                            {v.brand} {v.model} ({v.year})
                          </option>
                        ))}
                      </select>
                    </div>
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([label, get], i) => (
                <tr key={label}>
                  <td className={`bg-ink/5 px-4 py-3 text-sm font-medium text-ink/70 ${i === ROWS.length - 1 ? "rounded-bl-xl" : ""}`}>
                    {label}
                  </td>
                  {selected.map((v) => (
                    <td key={v.id} className="border-b border-ink/8 px-4 py-3 text-sm font-medium text-ink">
                      {get(v)}
                    </td>
                  ))}
                  {slotsLeft > 0 && <td className="px-4 py-3" />}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
