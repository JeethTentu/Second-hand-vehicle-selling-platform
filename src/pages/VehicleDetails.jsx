import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import VehicleGallery from "../components/VehicleGallery";
import SellerCard from "../components/SellerCard";
import Breadcrumb from "../components/Breadcrumb";
import EmptyState from "../components/EmptyState";
import { useApp } from "../context/AppContext";
import { formatPrice, formatKm } from "../utils/format";

const SPEC_ROWS = [
  ["Brand", (v) => v.brand],
  ["Model", (v) => v.model],
  ["Variant", (v) => v.variant],
  ["Manufacturing Year", (v) => v.year],
  ["Registration Year", (v) => v.registrationYear],
  ["Kilometers Driven", (v) => formatKm(v.kilometers)],
  ["Fuel Type", (v) => v.fuel],
  ["Transmission", (v) => v.transmission],
  ["Number of Owners", (v) => v.owners],
  ["Vehicle Condition", (v) => v.condition],
  ["Color", (v) => v.color],
  ["Location", (v) => v.location],
];

function ContactForm({ vehicle, onSuccess }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: `Hi, I'm interested in your ${vehicle.brand} ${vehicle.model}. Is it still available?` });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (!form.phone.trim()) e.phone = "Phone number is required.";
    else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ""))) e.phone = "Enter a valid 10-digit mobile number.";
    if (!form.message.trim()) e.message = "Message is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    onSuccess?.();
  };

  if (submitted) {
    return (
      <div className="py-6 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-deal-light text-deal">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M4 12l6 6L20 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="mt-4 font-display text-lg font-semibold text-ink">Message sent!</h3>
        <p className="mt-1 text-sm text-asphalt">
          {vehicle.seller.name.split(" ")[0]} will get back to you at {form.email} soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-3">
        <label className="form-label" htmlFor="cf-name">Name</label>
        <input id="cf-name" className={`form-input ${errors.name ? "form-input-error" : ""}`} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        {errors.name && <p className="form-error-text">{errors.name}</p>}
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="cf-email">Email</label>
        <input id="cf-email" type="email" className={`form-input ${errors.email ? "form-input-error" : ""}`} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        {errors.email && <p className="form-error-text">{errors.email}</p>}
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="cf-phone">Phone Number</label>
        <input id="cf-phone" type="tel" className={`form-input ${errors.phone ? "form-input-error" : ""}`} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="10-digit mobile number" />
        {errors.phone && <p className="form-error-text">{errors.phone}</p>}
      </div>
      <div className="mb-4">
        <label className="form-label" htmlFor="cf-message">Message</label>
        <textarea id="cf-message" rows="4" className={`form-input ${errors.message ? "form-input-error" : ""}`} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
        {errors.message && <p className="form-error-text">{errors.message}</p>}
      </div>
      <button type="submit" className="btn-primary w-full">Send Message</button>
    </form>
  );
}

export default function VehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { vehicles, isFavorite, toggleFavorite, addToCompare, isInCompare, showToast } = useApp();
  const [messageOpen, setMessageOpen] = useState(false);
  const [phoneRevealed, setPhoneRevealed] = useState(false);

  const vehicle = vehicles.find((v) => String(v.id) === id);

  if (!vehicle) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <EmptyState
          title="Vehicle Not Found"
          message="Sorry, the vehicle you are looking for is no longer available."
          actionLabel="Browse other vehicles"
          onAction={() => navigate("/vehicles")}
        />
      </div>
    );
  }

  const favorited = isFavorite(vehicle.id);
  const inCompare = isInCompare(vehicle.id);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: `${vehicle.brand} ${vehicle.model}`, url });
      } catch {
        /* user cancelled share sheet */
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        showToast("Link copied to clipboard", "success");
      } catch {
        showToast("Couldn't copy the link", "danger");
      }
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb
        items={[
          { label: "Home", to: "/" },
          { label: "Buy Vehicle", to: "/vehicles" },
          { label: `${vehicle.brand} ${vehicle.model}` },
        ]}
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <VehicleGallery vehicle={vehicle} />

          <div className="mt-8">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                  {vehicle.brand} {vehicle.model}
                </h1>
                <p className="mt-1 text-asphalt">
                  {vehicle.variant} · {vehicle.year}
                </p>
              </div>
              <p className="font-display text-3xl font-semibold text-ink">{formatPrice(vehicle.price)}</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button onClick={() => toggleFavorite(vehicle.id)} className={favorited ? "chip chip-active" : "chip"}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill={favorited ? "#A13A2A" : "none"} stroke={favorited ? "#A13A2A" : "currentColor"} strokeWidth="2">
                  <path d="M12 21s-7.5-4.6-10-9.3C.5 8 2.3 4.5 6 4.5c2.1 0 3.7 1.2 6 3.5 2.3-2.3 3.9-3.5 6-3.5 3.7 0 5.5 3.5 4 7.2C19.5 16.4 12 21 12 21z" />
                </svg>
                {favorited ? "Saved" : "Add to Favorites"}
              </button>
              <button onClick={() => addToCompare(vehicle.id)} disabled={inCompare} className={inCompare ? "chip chip-active" : "chip"}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12h18M3 12l5-5M3 12l5 5M21 12l-5-5M21 12l-5 5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {inCompare ? "In Comparison" : "Compare"}
              </button>
              <button onClick={handleShare} className="chip">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <path d="M8.6 10.5l6.8-3.8M8.6 13.5l6.8 3.8" />
                </svg>
                Share
              </button>
            </div>

            <div className="mt-8 card-surface p-5">
              <h2 className="font-display text-lg font-semibold text-ink">Vehicle Information</h2>
              <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                {SPEC_ROWS.map(([label, get]) => (
                  <div key={label} className="flex items-center justify-between border-b border-ink/5 pb-2 text-sm">
                    <dt className="text-asphalt">{label}</dt>
                    <dd className="font-medium text-ink">{get(vehicle)}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-6 card-surface p-5">
              <h2 className="font-display text-lg font-semibold text-ink">Description</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-ink/80">{vehicle.description}</p>
            </div>

            {vehicle.features?.length > 0 && (
              <div className="mt-6 card-surface p-5">
                <h2 className="font-display text-lg font-semibold text-ink">Features</h2>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {vehicle.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-ink/85">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5F7355" strokeWidth="2.5">
                        <path d="M4 12l6 6L20 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="lg:sticky lg:top-20">
            <SellerCard
              seller={vehicle.seller}
              onContact={() => setPhoneRevealed(true)}
              onMessage={() => setMessageOpen(true)}
            />
            {phoneRevealed && (
              <div className="card-surface mt-4 p-4 text-center">
                <p className="text-sm text-asphalt">Seller's contact number</p>
                <p className="mt-1 font-display text-xl font-semibold text-ink">+91 98{String(vehicle.id).padStart(3, "0")}45678</p>
                <p className="mt-1 text-xs text-asphalt">Demo number — this is a frontend-only project.</p>
              </div>
            )}
            <Link to="/vehicles" className="btn-ghost mt-4 w-full justify-center">
              ← Back to listings
            </Link>
          </div>
        </div>
      </div>

      <Modal show={messageOpen} onHide={() => setMessageOpen(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="font-display text-base">
            Message {vehicle.seller.name.split(" ")[0]}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ContactForm vehicle={vehicle} onSuccess={() => showToast("Message sent to the seller", "success")} />
        </Modal.Body>
      </Modal>
    </div>
  );
}
