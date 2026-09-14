import { useState } from "react";
import Breadcrumb from "../components/Breadcrumb";

const initialForm = { name: "", email: "", phone: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
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
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Contact" }]} />
      <h1 className="font-display text-3xl font-semibold text-ink">Contact us</h1>
      <p className="mt-1 text-asphalt">Have a question about buying, selling, or your account? Send us a message.</p>

      <div className="card-surface mt-6 p-6">
        {submitted ? (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-deal-light text-deal">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M4 12l6 6L20 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="mt-4 font-display text-lg font-semibold text-ink">Message sent!</h2>
            <p className="mt-1 text-sm text-asphalt">We'll get back to you at {form.email} within 1–2 business days.</p>
            <button onClick={() => { setForm(initialForm); setSubmitted(false); }} className="btn-secondary mt-5">
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label htmlFor="c-name" className="form-label">Name</label>
              <input id="c-name" className={`form-input ${errors.name ? "form-input-error" : ""}`} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              {errors.name && <p className="form-error-text">{errors.name}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="c-email" className="form-label">Email</label>
              <input id="c-email" type="email" className={`form-input ${errors.email ? "form-input-error" : ""}`} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              {errors.email && <p className="form-error-text">{errors.email}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="c-phone" className="form-label">Phone Number</label>
              <input id="c-phone" type="tel" className={`form-input ${errors.phone ? "form-input-error" : ""}`} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="10-digit mobile number" />
              {errors.phone && <p className="form-error-text">{errors.phone}</p>}
            </div>
            <div className="mb-5">
              <label htmlFor="c-message" className="form-label">Message</label>
              <textarea id="c-message" rows="5" className={`form-input ${errors.message ? "form-input-error" : ""}`} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              {errors.message && <p className="form-error-text">{errors.message}</p>}
            </div>
            <button type="submit" className="btn-primary w-full">Send Message</button>
          </form>
        )}
      </div>
    </div>
  );
}
