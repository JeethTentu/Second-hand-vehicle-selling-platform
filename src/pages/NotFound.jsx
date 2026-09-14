import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-4 text-center sm:px-6">
      <p className="font-display text-7xl font-semibold text-ink/15">404</p>
      <h1 className="mt-2 font-display text-2xl font-semibold text-ink">Page not found</h1>
      <p className="mt-2 text-asphalt">
        The page you're looking for took a wrong turn. It may have been moved or no longer exists.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn-primary">Back to Home</Link>
        <Link to="/vehicles" className="btn-secondary">Browse Vehicles</Link>
      </div>
    </div>
  );
}
