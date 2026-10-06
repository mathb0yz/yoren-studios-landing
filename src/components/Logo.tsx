type LogoProps = { className?: string; withText?: boolean };

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className ?? "h-8 w-8"} role="img" aria-label="Yoren Studios">
      <rect x="2" y="2" width="44" height="44" rx="12" fill="#09090b" />
      <path
        d="M15 16 L24 27 L33 16"
        fill="none"
        stroke="#fafafa"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M24 27 V34" stroke="#a1a1aa" strokeWidth="3.4" strokeLinecap="round" />
    </svg>
  );
}

export default function Logo({ className, withText = true }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoMark className="h-8 w-8" />
      {withText && (
        <span className="font-display text-[17px] font-bold tracking-tight text-white">
          Yoren Studios
        </span>
      )}
    </span>
  );
}
