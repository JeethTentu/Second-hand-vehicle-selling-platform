import { useNavigate } from "react-router-dom";
import VehicleCard from "../components/VehicleCard";
import EmptyState from "../components/EmptyState";
import Breadcrumb from "../components/Breadcrumb";
import { useApp } from "../context/AppContext";

export default function Favorites() {
  const { vehicles, favorites } = useApp();
  const navigate = useNavigate();
  const favoriteVehicles = vehicles.filter((v) => favorites.includes(v.id));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Favorites" }]} />
      <h1 className="font-display text-3xl font-semibold text-ink">Your favorites</h1>
      <p className="mt-1 text-asphalt">
        {favoriteVehicles.length > 0
          ? `${favoriteVehicles.length} vehicle${favoriteVehicles.length > 1 ? "s" : ""} saved for later.`
          : "Vehicles you save will show up here."}
      </p>

      {favoriteVehicles.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="No favorites yet"
            message="Tap the heart icon on any vehicle to save it here for quick access later."
            actionLabel="Browse vehicles"
            onAction={() => navigate("/vehicles")}
            icon={
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M12 21s-7.5-4.6-10-9.3C.5 8 2.3 4.5 6 4.5c2.1 0 3.7 1.2 6 3.5 2.3-2.3 3.9-3.5 6-3.5 3.7 0 5.5 3.5 4 7.2C19.5 16.4 12 21 12 21z" />
              </svg>
            }
          />
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {favoriteVehicles.map((v) => (
            <VehicleCard key={v.id} vehicle={v} />
          ))}
        </div>
      )}
    </div>
  );
}
