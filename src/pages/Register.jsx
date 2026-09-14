import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { LOCATIONS } from "../data/vehicles";

const initialForm = {
  fullName: "",
  email: "",
  mobile: "",
  password: "",
  confirmPassword: "",
  city: "",
  terms: false,
};

export default function Register() {
  const { register } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (!form.mobile.trim()) e.mobile = "Mobile number is required.";
    else if (!/^[6-9]\d{9}$/.test(form.mobile.replace(/\s/g, ""))) e.mobile = "Enter a valid 10-digit mobile number.";
    if (!form.password) e.password = "Password is required.";
    else if (form.password.length < 6) e.password = "Password must be at least 6 characters.";
    if (!form.confirmPassword) e.confirmPassword = "Please confirm your password.";
    else if (form.confirmPassword !== form.password) e.confirmPassword = "Passwords do not match.";
    if (!form.city) e.city = "Select your city.";
    if (!form.terms) e.terms = "You must accept the terms and conditions.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      register(form);
      setSubmitting(false);
      navigate("/dashboard");
    }, 500);
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12 sm:px-6">
      <div className="card-surface p-7">
        <h1 className="font-display text-2xl font-semibold text-ink">Create your account</h1>
        <p className="mt-1 text-sm text-asphalt">Save favorites, list vehicles, and message sellers.</p>

        <form onSubmit={handleSubmit} noValidate className="mt-6">
          <div className="mb-4">
            <label htmlFor="reg-name" className="form-label">Full Name</label>
            <input id="reg-name" className={`form-input ${errors.fullName ? "form-input-error" : ""}`} value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
            {errors.fullName && <p className="form-error-text">{errors.fullName}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="reg-email" className="form-label">Email</label>
            <input id="reg-email" type="email" className={`form-input ${errors.email ? "form-input-error" : ""}`} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            {errors.email && <p className="form-error-text">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="reg-mobile" className="form-label">Mobile Number</label>
            <input id="reg-mobile" type="tel" className={`form-input ${errors.mobile ? "form-input-error" : ""}`} value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} placeholder="10-digit mobile number" />
            {errors.mobile && <p className="form-error-text">{errors.mobile}</p>}
          </div>

          <div className="mb-4 grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="reg-pass" className="form-label">Password</label>
              <input id="reg-pass" type="password" className={`form-input ${errors.password ? "form-input-error" : ""}`} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
              {errors.password && <p className="form-error-text">{errors.password}</p>}
            </div>
            <div>
              <label htmlFor="reg-confirm" className="form-label">Confirm</label>
              <input id="reg-confirm" type="password" className={`form-input ${errors.confirmPassword ? "form-input-error" : ""}`} value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} />
              {errors.confirmPassword && <p className="form-error-text">{errors.confirmPassword}</p>}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="reg-city" className="form-label">City / Location</label>
            <select id="reg-city" className={`form-input ${errors.city ? "form-input-error" : ""}`} value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}>
              <option value="">Select a city</option>
              {LOCATIONS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {errors.city && <p className="form-error-text">{errors.city}</p>}
          </div>

          <div className="mb-6">
            <label className="flex items-start gap-2 text-sm text-ink/80">
              <input
                type="checkbox"
                checked={form.terms}
                onChange={(e) => setForm({ ...form, terms: e.target.checked })}
                className="mt-0.5 h-4 w-4 rounded border-asphalt/40 text-amber focus:ring-amber/40"
              />
              I agree to the Terms of Service and Privacy Policy
            </label>
            {errors.terms && <p className="form-error-text">{errors.terms}</p>}
          </div>

          <button type="submit" disabled={submitting} className="btn-primary w-full">
            {submitting ? "Creating account…" : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-asphalt">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-amber-dark hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
