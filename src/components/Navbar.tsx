export default function Navbar({ currentPage, setPage }: { currentPage: string, setPage: (page: string) => void }) {
  const navLinks = [
    { id: 'home', label: 'Siłownia' },
    { id: 'spa', label: 'Spa' },
    { id: 'pricing', label: 'Cennik' },
    { id: 'blog', label: 'Blog' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/60 backdrop-blur-xl border-none bg-surface-container-low/40">
      <div className="flex justify-between items-center px-8 py-4 max-w-screen-2xl mx-auto w-full">
        <button onClick={() => setPage('home')} className="text-2xl font-black tracking-tighter text-primary font-headline">
          Akwen Wellness & Fitness
        </button>
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => setPage(link.id)}
              className={`font-headline font-bold tracking-tight text-sm uppercase transition-colors ${
                currentPage === link.id
                  ? 'text-primary border-b-2 border-primary pb-1'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
