export default function LoadingSpinner({ label = "Loading…", fullPage = false }) {
  const spinner = (
    <div className="flex flex-col items-center gap-3 py-16 text-asphalt">
      <span className="h-9 w-9 animate-spin rounded-full border-[3px] border-ink/15 border-t-amber" role="status" />
      <span className="text-sm">{label}</span>
    </div>
  );

  if (fullPage) {
    return <div className="flex min-h-[50vh] items-center justify-center">{spinner}</div>;
  }
  return spinner;
}
