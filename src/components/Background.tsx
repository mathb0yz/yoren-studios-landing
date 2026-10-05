export default function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 bg-[#0b0b0d]">
      <div className="absolute left-1/2 top-[-220px] h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-white/[0.06] blur-[140px]" />
      <div className="absolute right-[-180px] top-1/3 h-[380px] w-[380px] rounded-full bg-zinc-500/[0.08] blur-[120px]" />
      <div className="absolute inset-0 opacity-[0.35]" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        maskImage: "radial-gradient(ellipse 80% 55% at 50% 0%, black, transparent 75%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 55% at 50% 0%, black, transparent 75%)"
      }} />
    </div>
  );
}
