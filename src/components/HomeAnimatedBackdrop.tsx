export default function HomeAnimatedBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="home-mesh absolute inset-0" />
      <div className="home-grid absolute inset-0 opacity-40" />

      <div className="home-orb home-orb-1 animate-float-orb" />
      <div className="home-orb home-orb-2 animate-float-orb-reverse" />
      <div className="home-orb home-orb-3 animate-float-orb-slow" />

      <div className="absolute left-1/4 top-1/3 h-px w-1/3 animate-shimmer-line bg-gradient-to-r from-transparent via-accent-500/40 to-transparent" />
      <div
        className="absolute bottom-1/4 right-1/4 h-px w-1/4 animate-shimmer-line bg-gradient-to-r from-transparent via-brand-400/30 to-transparent"
        style={{ animationDelay: "1.4s" }}
      />
    </div>
  );
}
