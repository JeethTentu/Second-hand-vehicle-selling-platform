export default function SellerCard({ seller, onContact, onMessage }) {
  const initials = seller.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="card-surface p-5">
      <h3 className="font-display text-base font-semibold text-ink">Seller Information</h3>
      <div className="mt-3 flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink font-display text-lg font-semibold text-amber">
          {initials}
        </div>
        <div>
          <p className="flex items-center gap-1.5 font-medium text-ink">
            {seller.name}
            {seller.verified && (
              <span
                title="Verified seller"
                className="flex h-4 w-4 items-center justify-center rounded-full bg-deal text-white"
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                  <path d="M4 12l6 6L20 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            )}
          </p>
          <p className="text-sm text-asphalt">{seller.location}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <button onClick={onContact} className="btn-primary w-full">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 3a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.2-1.3a2 2 0 0 1 2.1-.5c1 .3 2 .5 3 .7a2 2 0 0 1 1.7 2z" />
          </svg>
          Show Contact Number
        </button>
        <button onClick={onMessage} className="btn-secondary w-full">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Message Seller
        </button>
      </div>
    </div>
  );
}
