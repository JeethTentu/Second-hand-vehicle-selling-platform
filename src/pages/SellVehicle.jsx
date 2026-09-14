import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Breadcrumb from "../components/Breadcrumb";
import { useApp } from "../context/AppContext";
import { VEHICLE_TYPES, FUEL_TYPES, TRANSMISSIONS, LOCATIONS } from "../data/vehicles";
import { getVehicleMainImage } from "../utils/placeholderImage";
import { formatPrice } from "../utils/format";

const DRAFT_KEY = "sellVehicleDraft";

const initialForm = {
  type: "",
  brand: "",
  model: "",
  variant: "",
  year: "",
  registrationYear: "",
  fuel: "",
  transmission: "",
  kilometers: "",
  owners: "1",
  color: "",
  price: "",
  state: "",
  city: "",
  pincode: "",
  description: "",
  sellerName: "",
  sellerPhone: "",
  sellerEmail: "",
};

function Field({ label, error, children }) {
  return (
    <div>
      <label className="form-label">{label}</label>
      {children}
      {error && <p className="form-error-text">{error}</p>}
    </div>
  );
}

function Section({ title, subtitle, children }) {
  return (
    <div className="card-surface p-6">
      <h2 className="font-display text-lg font-semibold text-ink">{title}</h2>
      {subtitle && <p className="mt-0.5 text-sm text-asphalt">{subtitle}</p>}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
    </div>
  );
}

export default function SellVehicle() {
  const { addListing, showToast, user } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [images, setImages] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const draft = localStorage.getItem(DRAFT_KEY);
    if (draft) {
      try {
        setForm({ ...initialForm, ...JSON.parse(draft) });
      } catch {
        /* ignore malformed draft */
      }
    }
    if (user) {
      setForm((f) => ({ ...f, sellerName: f.sellerName || user.name, sellerEmail: f.sellerEmail || user.email }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files || []).slice(0, 6);
    setImages(files.map((f) => ({ name: f.name, url: URL.createObjectURL(f) })));
  };

  const validate = () => {
    const e = {};
    const required = {
      type: "Vehicle type is required.",
      brand: "Brand is required.",
      model: "Model is required.",
      year: "Manufacturing year is required.",
      registrationYear: "Registration year is required.",
      fuel: "Fuel type is required.",
      transmission: "Transmission is required.",
      kilometers: "Kilometers driven is required.",
      color: "Color is required.",
      price: "Expected selling price is required.",
      state: "State is required.",
      city: "City is required.",
      description: "A description helps buyers understand the vehicle.",
      sellerName: "Seller name is required.",
      sellerPhone: "Phone number is required.",
      sellerEmail: "Email address is required.",
    };
    Object.entries(required).forEach(([key, message]) => {
      if (!String(form[key]).trim()) e[key] = message;
    });
    if (form.year && (Number(form.year) < 1980 || Number(form.year) > 2026)) e.year = "Enter a realistic manufacturing year.";
    if (form.price && (isNaN(Number(form.price)) || Number(form.price) <= 0)) e.price = "Enter a valid price.";
    if (form.kilometers && (isNaN(Number(form.kilometers)) || Number(form.kilometers) < 0)) e.kilometers = "Enter a valid kilometer reading.";
    if (form.pincode && !/^\d{6}$/.test(form.pincode)) e.pincode = "Enter a valid 6-digit pincode.";
    if (form.sellerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.sellerEmail)) e.sellerEmail = "Enter a valid email address.";
    if (form.sellerPhone && !/^[6-9]\d{9}$/.test(form.sellerPhone.replace(/\s/g, ""))) e.sellerPhone = "Enter a valid 10-digit mobile number.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSaveDraft = () => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
    showToast("Draft saved on this device", "success");
  };

  const handlePreview = () => {
    if (!validate()) {
      showToast("Fill in the required fields to preview your listing", "warning");
      return;
    }
    setPreviewOpen(true);
  };

  const buildListing = () => ({
    type: form.type,
    brand: form.brand,
    model: form.model,
    variant: form.variant || "Base",
    year: Number(form.year),
    registrationYear: Number(form.registrationYear),
    price: Number(form.price),
    fuel: form.fuel,
    transmission: form.transmission,
    kilometers: Number(form.kilometers),
    owners: Number(form.owners),
    condition: "Good",
    color: form.color,
    location: form.city,
    description: form.description,
    features: [],
    seller: { name: form.sellerName, location: `${form.city}, ${form.state}`, verified: false },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      showToast("Please fix the highlighted fields", "danger");
      return;
    }
    const listing = addListing(buildListing());
    localStorage.removeItem(DRAFT_KEY);
    navigate(`/vehicles/${listing.id}`);
  };

  const previewVehicle = { ...buildListing(), id: 0 };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Sell Vehicle" }]} />
      <h1 className="font-display text-3xl font-semibold text-ink">Sell your vehicle</h1>
      <p className="mt-1 text-asphalt">Fill in accurate details to help buyers find your listing.</p>

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-6">
        <Section title="Vehicle Information">
          <Field label="Vehicle Type" error={errors.type}>
            <select className={`form-input ${errors.type ? "form-input-error" : ""}`} value={form.type} onChange={set("type")}>
              <option value="">Select type</option>
              {VEHICLE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Brand" error={errors.brand}>
            <input className={`form-input ${errors.brand ? "form-input-error" : ""}`} value={form.brand} onChange={set("brand")} placeholder="e.g. Toyota" />
          </Field>
          <Field label="Model" error={errors.model}>
            <input className={`form-input ${errors.model ? "form-input-error" : ""}`} value={form.model} onChange={set("model")} placeholder="e.g. Innova Crysta" />
          </Field>
          <Field label="Variant" error={errors.variant}>
            <input className="form-input" value={form.variant} onChange={set("variant")} placeholder="e.g. VX Diesel AT" />
          </Field>
          <Field label="Manufacturing Year" error={errors.year}>
            <input type="number" className={`form-input ${errors.year ? "form-input-error" : ""}`} value={form.year} onChange={set("year")} placeholder="2021" />
          </Field>
          <Field label="Registration Year" error={errors.registrationYear}>
            <input type="number" className={`form-input ${errors.registrationYear ? "form-input-error" : ""}`} value={form.registrationYear} onChange={set("registrationYear")} placeholder="2021" />
          </Field>
          <Field label="Fuel Type" error={errors.fuel}>
            <select className={`form-input ${errors.fuel ? "form-input-error" : ""}`} value={form.fuel} onChange={set("fuel")}>
              <option value="">Select fuel type</option>
              {FUEL_TYPES.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </Field>
          <Field label="Transmission" error={errors.transmission}>
            <select className={`form-input ${errors.transmission ? "form-input-error" : ""}`} value={form.transmission} onChange={set("transmission")}>
              <option value="">Select transmission</option>
              {TRANSMISSIONS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Kilometers Driven" error={errors.kilometers}>
            <input type="number" className={`form-input ${errors.kilometers ? "form-input-error" : ""}`} value={form.kilometers} onChange={set("kilometers")} placeholder="42000" />
          </Field>
          <Field label="Number of Owners" error={errors.owners}>
            <select className="form-input" value={form.owners} onChange={set("owners")}>
              {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}{n > 1 ? " owners" : " owner"}</option>)}
            </select>
          </Field>
          <Field label="Color" error={errors.color}>
            <input className={`form-input ${errors.color ? "form-input-error" : ""}`} value={form.color} onChange={set("color")} placeholder="e.g. White" />
          </Field>
        </Section>

        <Section title="Pricing">
          <Field label="Expected Selling Price (₹)" error={errors.price}>
            <input type="number" className={`form-input ${errors.price ? "form-input-error" : ""}`} value={form.price} onChange={set("price")} placeholder="850000" />
          </Field>
        </Section>

        <Section title="Location">
          <Field label="State" error={errors.state}>
            <input className={`form-input ${errors.state ? "form-input-error" : ""}`} value={form.state} onChange={set("state")} placeholder="e.g. Telangana" />
          </Field>
          <Field label="City" error={errors.city}>
            <select className={`form-input ${errors.city ? "form-input-error" : ""}`} value={form.city} onChange={set("city")}>
              <option value="">Select city</option>
              {LOCATIONS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Area / Pincode" error={errors.pincode}>
            <input className={`form-input ${errors.pincode ? "form-input-error" : ""}`} value={form.pincode} onChange={set("pincode")} placeholder="500034" />
          </Field>
        </Section>

        <div className="card-surface p-6">
          <h2 className="font-display text-lg font-semibold text-ink">Vehicle Images</h2>
          <p className="mt-0.5 text-sm text-asphalt">Add up to 6 photos. This demo previews them locally; listings display a generated placeholder.</p>
          <div className="mt-4">
            <button type="button" onClick={() => fileInputRef.current?.click()} className="btn-secondary">
              Choose images
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleImageSelect} />
          </div>
          {images.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6">
              {images.map((img, i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-lg bg-ink/5">
                  <img src={img.url} alt={img.name} className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card-surface p-6">
          <h2 className="font-display text-lg font-semibold text-ink">Description</h2>
          <div className="mt-4">
            <textarea
              rows="5"
              className={`form-input ${errors.description ? "form-input-error" : ""}`}
              value={form.description}
              onChange={set("description")}
              placeholder="Describe the vehicle's condition, service history, and any modifications…"
            />
            {errors.description && <p className="form-error-text">{errors.description}</p>}
          </div>
        </div>

        <Section title="Contact Information">
          <Field label="Seller Name" error={errors.sellerName}>
            <input className={`form-input ${errors.sellerName ? "form-input-error" : ""}`} value={form.sellerName} onChange={set("sellerName")} />
          </Field>
          <Field label="Phone Number" error={errors.sellerPhone}>
            <input className={`form-input ${errors.sellerPhone ? "form-input-error" : ""}`} value={form.sellerPhone} onChange={set("sellerPhone")} placeholder="10-digit mobile number" />
          </Field>
          <Field label="Email Address" error={errors.sellerEmail}>
            <input type="email" className={`form-input ${errors.sellerEmail ? "form-input-error" : ""}`} value={form.sellerEmail} onChange={set("sellerEmail")} />
          </Field>
        </Section>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button type="button" onClick={handleSaveDraft} className="btn-ghost">
            Save Draft
          </button>
          <button type="button" onClick={handlePreview} className="btn-secondary">
            Preview Listing
          </button>
          <button type="submit" className="btn-primary">
            Submit Listing
          </button>
        </div>
      </form>

      <Modal show={previewOpen} onHide={() => setPreviewOpen(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="font-display text-base">Listing Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="overflow-hidden rounded-xl border border-ink/10">
            <div className="aspect-[16/9] bg-ink/5">
              <img src={getVehicleMainImage(previewVehicle)} alt="Preview" className="h-full w-full object-cover" />
            </div>
            <div className="p-4">
              <h3 className="font-display text-xl font-semibold text-ink">
                {previewVehicle.brand} {previewVehicle.model}
              </h3>
              <p className="text-sm text-asphalt">{previewVehicle.variant} · {previewVehicle.year}</p>
              <p className="mt-2 font-display text-lg font-semibold text-ink">{formatPrice(previewVehicle.price || 0)}</p>
              <p className="mt-2 text-sm text-ink/80">{previewVehicle.description}</p>
            </div>
          </div>
          <button
            onClick={() => {
              setPreviewOpen(false);
              handleSubmit({ preventDefault: () => {} });
            }}
            className="btn-primary mt-4 w-full"
          >
            Looks good — Submit Listing
          </button>
        </Modal.Body>
      </Modal>
    </div>
  );
}
