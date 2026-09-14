import { Link } from "react-router-dom";

export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-5 text-sm text-asphalt">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true">/</span>}
            {item.to && i !== items.length - 1 ? (
              <Link to={item.to} className="hover:text-amber-dark hover:underline">
                {item.label}
              </Link>
            ) : (
              <span className={i === items.length - 1 ? "font-medium text-ink" : ""} aria-current={i === items.length - 1 ? "page" : undefined}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
