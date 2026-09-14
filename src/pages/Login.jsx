import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Login() {
  const { login } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ identifier: "", password: "", remember: false });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.identifier.trim()) e.identifier = "Email or mobile number is required.";
    if (!form.password) e.password = "Password is required.";
    else if (form.password.length < 6) e.password = "Password must be at least 6 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      login(form);
      setSubmitting(false);
      const redirectTo = location.state?.from || "/dashboard";
      navigate(redirectTo);
    }, 500);
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12 sm:px-6">
      <div className="card-surface p-7">
        <h1 className="font-display text-2xl font-semibold text-ink">Log in to ReWheel</h1>
        <p className="mt-1 text-sm text-asphalt">Access your favorites, listings, and comparisons.</p>

        <form onSubmit={handleSubmit} noValidate className="mt-6">
          <div className="mb-4">
            <label htmlFor="login-id" className="form-label">Email or Mobile Number</label>
            <input
              id="login-id"
              type="text"
              className={`form-input ${errors.identifier ? "form-input-error" : ""}`}
              value={form.identifier}
              onChange={(e) => setForm({ ...form, identifier: e.target.value })}
              placeholder="you@example.com or 9876543210"
            />
            {errors.identifier && <p className="form-error-text">{errors.identifier}</p>}
          </div>

          <div className="mb-2">
            <label htmlFor="login-pass" className="form-label">Password</label>
            <input
              id="login-pass"
              type="password"
              className={`form-input ${errors.password ? "form-input-error" : ""}`}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
            />
            {errors.password && <p className="form-error-text">{errors.password}</p>}
          </div>

          <div className="mb-6 flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-ink/80">
              <input
                type="checkbox"
                checked={form.remember}
                onChange={(e) => setForm({ ...form, remember: e.target.checked })}
                className="h-4 w-4 rounded border-asphalt/40 text-amber focus:ring-amber/40"
              />
              Remember me
            </label>
            <button type="button" onClick={() => alert("Password reset isn't wired up in this demo.")} className="text-sm font-medium text-amber-dark hover:underline">
              Forgot password?
            </button>
          </div>

          <button type="submit" disabled={submitting} className="btn-primary w-full">
            {submitting ? "Logging in…" : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-asphalt">
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-amber-dark hover:underline">
            Create account
          </Link>
        </p>
        <p className="mt-3 text-center text-xs text-asphalt/70">
          Demo only — any email/mobile and a 6+ character password will work.
        </p>
      </div>
    </div>
  );
}
