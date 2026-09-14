import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { getVehicleMainImage } from "../utils/placeholderImage";
import { formatPrice, formatKm } from "../utils/format";

export default function VehicleCard({ vehicle }) {
  const { isFavorite, toggleFavorite, addToCompare, isInCompare } = useApp();
  const favorited = isFavorite(vehicle.id);
  const inCompare = isInCompare(vehicle.id);

  return (
    <div className="card-surface group flex flex-col overflow-hidden transition-shadow hover:shadow-card-hover">
      <div className="relative">
        <Link to={`/vehicles/${vehicle.id}`} className="block aspect-[4/3] overflow-hidden bg-ink/5">
          <img
            src={getVehicleMainImage(vehicle)}
            alt={`${vehicle.brand} ${vehicle.model}`}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </Link>
        <button
          onClick={() => toggleFavorite(vehicle.id)}
          aria-pressed={favorited}
          aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-md transition-transform hover:scale-105"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={favorited ? "#A13A2A" : "none"}
            stroke={favorited ? "#A13A2A" : "#2B1810"}
            strokeWidth="2"
          >
            <path d="M12 21s-7.5-4.6-10-9.3C.5 8 2.3 4.5 6 4.5c2.1 0 3.7 1.2 6 3.5 2.3-2.3 3.9-3.5 6-3.5 3.7 0 5.5 3.5 4 7.2C19.5 16.4 12 21 12 21z" />
          </svg>
        </button>
        {vehicle.isUserListing && (
          <span className="absolute left-3 top-3 rounded-full bg-deal px-2.5 py-1 text-[11px] font-semibold text-white">
            Your listing
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display text-lg font-semibold leading-tight text-ink">
              {vehicle.brand} {vehicle.model}
            </h3>
            <p className="text-sm text-asphalt">
              {vehicle.variant} · {vehicle.year}
            </p>
          </div>
        </div>

        <p className="mt-2 font-display text-xl font-semibold text-ink">{formatPrice(vehicle.price)}</p>

        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[13px] text-asphalt">
          <span>{formatKm(vehicle.kilometers)}</span>
          <span aria-hidden="true">·</span>
          <span>{vehicle.fuel}</span>
          <span aria-hidden="true">·</span>
          <span>{vehicle.transmission}</span>
        </div>
        <p className="mt-1 flex items-center gap-1 text-[13px] text-asphalt">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
          {vehicle.location}
        </p>

        <div className="mt-4 flex items-center gap-2 border-t border-ink/10 pt-3">
          <Link to={`/vehicles/${vehicle.id}`} className="btn-primary flex-1 !py-2 text-sm">
            View Details
          </Link>
          <button
            onClick={() => addToCompare(vehicle.id)}
            disabled={inCompare}
            title={inCompare ? "Already in comparison" : "Add to compare"}
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md border text-sm transition-colors ${
              inCompare
                ? "border-amber bg-amber/10 text-amber-dark"
                : "border-ink/15 text-ink/70 hover:border-ink/30 hover:bg-ink/5"
            }`}
            aria-label={inCompare ? "Already in comparison" : "Add to comparison"}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 12l5-5M3 12l5 5M21 12l-5-5M21 12l-5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
