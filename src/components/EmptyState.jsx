export default function EmptyState({ title, message, actionLabel, onAction, icon }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-ink/15 bg-white px-6 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ink/5 text-ink/40">
        {icon || (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
          </svg>
        )}
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold text-ink">{title}</h3>
      {message && <p className="mt-1.5 max-w-sm text-sm text-asphalt">{message}</p>}
      {actionLabel && (
        <button onClick={onAction} className="btn-primary mt-5">
          {actionLabel}
        </button>
      )}
    </div>
  );
}
