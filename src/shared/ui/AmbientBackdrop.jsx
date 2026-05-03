export function AmbientBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="aurora left-[-8rem] top-[8rem] h-72 w-72 bg-rose-300/35" />
      <div className="aurora right-[-6rem] top-[28rem] h-80 w-80 bg-amber-200/20" />
      <div className="aurora bottom-[-6rem] left-1/3 h-96 w-96 bg-fuchsia-400/18" />
      <div className="story-grid absolute inset-0 opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(6,5,10,0.1)_45%,rgba(6,5,10,0.82)_100%)]" />
    </div>
  );
}
