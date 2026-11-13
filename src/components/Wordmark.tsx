/** "bekzod" followed by a teal tile, a nod to the JavaScript logo. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-end gap-1 font-display font-semibold tracking-[-0.02em] ${className}`}
    >
      bekzod
      <span className="inline-flex h-[1.9em] w-[1.9em] items-end justify-end rounded-[0.3em] bg-turq pb-[0.2em] pr-[0.22em] text-[0.68em] tracking-normal leading-none text-ink">
        js
      </span>
    </span>
  );
}
