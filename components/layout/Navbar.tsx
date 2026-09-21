export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-black/20 backdrop-blur-xl">
      <div className="container-wp flex h-18 items-center justify-between">
        <a href="#top" aria-label="Watt Power home" className="text-sm font-semibold tracking-[0.16em]">
          WATT POWER
        </a>
        <nav className="hidden items-center gap-7 text-[11px] uppercase tracking-[0.14em] text-white/55 md:flex" aria-label="Primary navigation">
          <a className="transition hover:text-white" href="#system">System</a>
          <a className="transition hover:text-white" href="#app">App</a>
          <a className="transition hover:text-white" href="#control">Control</a>
        </nav>
        <a href="#contact" className="rounded-full border border-white/16 px-4 py-2 text-[10px] uppercase tracking-[0.14em] transition hover:border-white/35">
          Solar assessment
        </a>
      </div>
    </header>
  );
}
