import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import VehicleCard from "../components/VehicleCard";
import EmptyState from "../components/EmptyState";
import { useApp } from "../context/AppContext";

const TABS = ["Profile", "My Listings", "Favorites", "Compared Vehicles", "Enquiries"];

const MOCK_ENQUIRIES = [
  { id: 1, from: "Ananya Das", vehicle: "Toyota Innova Crysta", message: "Is the price negotiable? Can I see it this weekend?", time: "2 days ago" },
  { id: 2, from: "Rahul Bhatt", vehicle: "Hyundai Creta", message: "Does it come with the original service book?", time: "5 days ago" },
];

function ProfileTab({ user, onSave }) {
  const [form, setForm] = useState({ name: user.name, email: user.email, mobile: user.mobile || "", city: user.city || "" });
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    onSave(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <form onSubmit={handleSave} className="card-surface max-w-lg p-6">
      <h2 className="font-display text-lg font-semibold text-ink">Edit Profile</h2>
      <div className="mt-4 space-y-4">
        <div>
          <label className="form-label" htmlFor="p-name">Full Name</label>
          <input id="p-name" className="form-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div>
          <label className="form-label" htmlFor="p-email">Email</label>
          <input id="p-email" type="email" className="form-input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
        <div>
          <label className="form-label" htmlFor="p-mobile">Mobile Number</label>
          <input id="p-mobile" className="form-input" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} />
        </div>
        <div>
          <label className="form-label" htmlFor="p-city">City</label>
          <input id="p-city" className="form-input" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
        </div>
      </div>
      <button type="submit" className="btn-primary mt-5">
        {saved ? "Saved ✓" : "Save Changes"}
      </button>
    </form>
  );
}

export default function Dashboard() {
  const { user, logout, sellerListings, favorites, vehicles, compareList, showToast } = useApp();
  const [tab, setTab] = useState("Profile");
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center sm:px-6">
        <EmptyState
          title="You're not logged in"
          message="Log in to view your profile, listings, favorites, and comparisons."
          actionLabel="Go to Login"
          onAction={() => navigate("/login")}
        />
      </div>
    );
  }

  const favoriteVehicles = vehicles.filter((v) => favorites.includes(v.id));
  const comparedVehicles = vehicles.filter((v) => compareList.includes(v.id));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Dashboard" }]} />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink">Welcome, {user.name}</h1>
          <p className="mt-1 text-asphalt">{user.email}</p>
        </div>
        <button onClick={() => { logout(); navigate("/"); }} className="btn-danger-outline">
          Logout
        </button>
      </div>

      <div className="mt-6 flex gap-1 overflow-x-auto border-b border-ink/10">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`shrink-0 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
              tab === t ? "border-amber text-ink" : "border-transparent text-asphalt hover:text-ink"
            }`}
          >
            {t}
            {t === "My Listings" && sellerListings.length > 0 && ` (${sellerListings.length})`}
            {t === "Favorites" && favoriteVehicles.length > 0 && ` (${favoriteVehicles.length})`}
            {t === "Compared Vehicles" && comparedVehicles.length > 0 && ` (${comparedVehicles.length})`}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === "Profile" && <ProfileTab user={user} onSave={() => showToast("Profile updated", "success")} />}

        {tab === "My Listings" &&
          (sellerListings.length === 0 ? (
            <EmptyState title="No listings yet" message="Vehicles you list for sale will appear here." actionLabel="Sell a vehicle" onAction={() => navigate("/sell")} />
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {sellerListings.map((v) => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          ))}

        {tab === "Favorites" &&
          (favoriteVehicles.length === 0 ? (
            <EmptyState title="No favorites yet" message="Vehicles you save will appear here." actionLabel="Browse vehicles" onAction={() => navigate("/vehicles")} />
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {favoriteVehicles.map((v) => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          ))}

        {tab === "Compared Vehicles" &&
          (comparedVehicles.length === 0 ? (
            <EmptyState title="No vehicles in comparison" message="Add vehicles to compare from any listing." actionLabel="Go to Compare" onAction={() => navigate("/compare")} />
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {comparedVehicles.map((v) => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          ))}

        {tab === "Enquiries" && (
          <div className="space-y-3">
            {MOCK_ENQUIRIES.map((eq) => (
              <div key={eq.id} className="card-surface flex items-start justify-between gap-4 p-4">
                <div>
                  <p className="font-medium text-ink">
                    {eq.from} <span className="text-asphalt">on</span> {eq.vehicle}
                  </p>
                  <p className="mt-1 text-sm text-ink/75">{eq.message}</p>
                </div>
                <span className="shrink-0 text-xs text-asphalt">{eq.time}</span>
              </div>
            ))}
            <p className="text-xs text-asphalt/70">Sample data — real enquiries would arrive via the contact form on your listings.</p>
          </div>
        )}
      </div>
    </div>
  );
}
