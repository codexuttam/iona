import { Sparkles, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onOpenModal?: (type: 'contact' | 'privacy' | 'terms') => void;
}

export default function Footer({ onOpenModal }: FooterProps) {
  const handleScrollTo = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleModalClick = (e: React.MouseEvent, type: 'contact' | 'privacy' | 'terms') => {
    e.preventDefault();
    if (onOpenModal) {
      onOpenModal(type);
    }
  };

  return (
    <footer className="w-full bg-[#F7FCFC] border-t border-[#CDEEEF]/50 py-16 px-6 md:px-16 lg:px-24 relative z-20 select-none">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Top Tier: Pre-footer Banner with Ciao Energy inspired aesthetic */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-12 border-b border-[#CDEEEF]/40">
          <div>
            <div className="inline-flex items-center gap-2 text-xs tracking-[0.25em] font-bold text-[#287F91] uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE 4K PURITY STANDARD</span>
            </div>
            <h3 className="font-black italic uppercase text-2xl md:text-3xl text-[#102A30] tracking-tight">
              ELEVATE YOUR EVERYDAY HYDRATION.
            </h3>
          </div>

          <button
            onClick={(e) => handleModalClick(e, 'contact')}
            className="px-6 py-3.5 rounded-full bg-[#102A30] hover:bg-[#287F91] text-white text-xs font-bold uppercase tracking-widest transition-all shadow-sm hover:shadow-md flex items-center gap-2 cursor-pointer group"
          >
            <span>Request Private Allocation</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Middle Tier: Brand + Nav Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Brand Zone */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-2xl font-black italic uppercase tracking-tighter text-[#102A30]">
              IONA
            </span>
            <p className="text-[11px] text-[#58747A] tracking-wider uppercase font-medium">
              © {new Date().getFullYear()} IONA Bottling Company. All rights reserved.
            </p>
          </div>

          {/* Navigation links with unboxed dot separators */}
          <div className="flex flex-wrap justify-center items-center gap-5 text-xs tracking-wider uppercase font-bold text-[#58747A]">
            <button onClick={() => handleScrollTo('water')} className="hover:text-[#102A30] transition-colors cursor-pointer">About</button>
            <span className="text-[#CDEEEF]">·</span>
            <button onClick={() => handleScrollTo('alkaline')} className="hover:text-[#102A30] transition-colors cursor-pointer">The Water</button>
            <span className="text-[#CDEEEF]">·</span>
            <button onClick={() => handleScrollTo('process')} className="hover:text-[#102A30] transition-colors cursor-pointer">Process</button>
            <span className="text-[#CDEEEF]">·</span>
            <button onClick={() => handleScrollTo('product')} className="hover:text-[#102A30] transition-colors cursor-pointer">Product</button>
            <span className="text-[#CDEEEF]">·</span>
            <button 
              onClick={(e) => handleModalClick(e, 'contact')} 
              className="text-[#287F91] hover:text-[#102A30] font-black transition-colors cursor-pointer"
            >
              Contact
            </button>
          </div>

          {/* Social and legal terms links */}
          <div className="flex items-center gap-6 text-xs text-[#58747A] tracking-wider font-medium">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#102A30] transition-colors"
            >
              Instagram
            </a>
            <button 
              onClick={(e) => handleModalClick(e, 'privacy')} 
              className="hover:text-[#102A30] transition-colors cursor-pointer"
            >
              Privacy
            </button>
            <button 
              onClick={(e) => handleModalClick(e, 'terms')} 
              className="hover:text-[#102A30] transition-colors cursor-pointer"
            >
              Terms
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}
