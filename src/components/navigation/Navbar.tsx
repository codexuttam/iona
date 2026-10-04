import { useState } from 'react';
import { Menu as MenuIcon, X } from 'lucide-react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScrollTo = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 px-6 md:px-12 py-5 flex items-center justify-between border-b border-[#CDEEEF]/10 bg-[#F8FEFD]/60 backdrop-blur-md">
        
        {/* Zone 1: Brand Wordmark (Single text element, heavy italic) */}
        <button 
          onClick={() => handleScrollTo('hero')}
          className="text-2xl font-black italic uppercase tracking-tighter text-[#102A30] hover:text-[#287F91] transition-colors cursor-pointer select-none"
        >
          IONA
        </button>

        {/* Zone 2: Streamlined Nav Links (Desktop-only) */}
        <nav className="hidden md:flex items-center gap-8 text-xs tracking-[0.2em] font-bold text-[#58747A] uppercase select-none">
          <button onClick={() => handleScrollTo('water')} className="hover:text-[#102A30] transition-colors cursor-pointer relative py-1 group">
            Water
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#287F91] transition-all group-hover:w-full" />
          </button>
          <button onClick={() => handleScrollTo('alkaline')} className="hover:text-[#102A30] transition-colors cursor-pointer relative py-1 group">
            Alkaline
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#287F91] transition-all group-hover:w-full" />
          </button>
          <button onClick={() => handleScrollTo('process')} className="hover:text-[#102A30] transition-colors cursor-pointer relative py-1 group">
            Process
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#287F91] transition-all group-hover:w-full" />
          </button>
          <button onClick={() => handleScrollTo('product')} className="hover:text-[#102A30] transition-colors cursor-pointer relative py-1 group">
            Bottle
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#287F91] transition-all group-hover:w-full" />
          </button>
        </nav>

        {/* Zone 3: Primary Action Button & Mobile Burger Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleScrollTo('final')}
            className="hidden sm:inline-block px-5 py-2.5 bg-white/60 hover:bg-[#CDEEEF]/50 text-xs tracking-widest font-bold text-[#102A30] border border-[#CDEEEF]/60 rounded-full transition-all duration-300 backdrop-blur-sm shadow-sm cursor-pointer whitespace-nowrap"
          >
            EXPLORE IONA
          </button>

          {/* Burger Menu for mobile screens */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-[#102A30] hover:bg-[#CDEEEF]/30 rounded-full transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-[#F8FEFD]/95 z-30 flex flex-col justify-center items-center md:hidden px-8">
          <nav className="flex flex-col gap-8 text-2xl font-black italic uppercase tracking-wider text-center text-[#102A30] mb-12">
            <button onClick={() => handleScrollTo('hero')} className="hover:text-[#287F91] transition-colors">Home</button>
            <button onClick={() => handleScrollTo('water')} className="hover:text-[#287F91] transition-colors">Water</button>
            <button onClick={() => handleScrollTo('alkaline')} className="hover:text-[#287F91] transition-colors">Alkaline</button>
            <button onClick={() => handleScrollTo('process')} className="hover:text-[#287F91] transition-colors">Process</button>
            <button onClick={() => handleScrollTo('product')} className="hover:text-[#287F91] transition-colors">Bottle</button>
          </nav>
          <button
            onClick={() => handleScrollTo('final')}
            className="px-8 py-3.5 bg-[#102A30] text-white tracking-widest font-bold text-sm rounded-full w-full"
          >
            EXPLORE IONA
          </button>
        </div>
      )}
    </>
  );
}
