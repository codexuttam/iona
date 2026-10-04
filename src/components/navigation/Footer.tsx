export default function Footer() {
  const handleScrollTo = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-[#F7FCFC] border-t border-[#CDEEEF]/30 py-12 px-6 md:px-16 lg:px-24 relative z-20 select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Brand Zone */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-xl font-black italic uppercase tracking-tighter text-[#102A30]">
            IONA
          </span>
          <p className="text-[10px] text-[#58747A] tracking-wider uppercase font-medium">
            © {new Date().getFullYear()} IONA Bottling Company. All rights reserved.
          </p>
        </div>

        {/* Navigation links with unboxed dot separators */}
        <div className="flex flex-wrap justify-center items-center gap-4 text-xs tracking-wider uppercase font-bold text-[#58747A]">
          <button onClick={() => handleScrollTo('water')} className="hover:text-[#102A30] transition-colors cursor-pointer">About</button>
          <span>·</span>
          <button onClick={() => handleScrollTo('alkaline')} className="hover:text-[#102A30] transition-colors cursor-pointer">The Water</button>
          <span>·</span>
          <button onClick={() => handleScrollTo('process')} className="hover:text-[#102A30] transition-colors cursor-pointer">Process</button>
          <span>·</span>
          <button onClick={() => handleScrollTo('product')} className="hover:text-[#102A30] transition-colors cursor-pointer">Product</button>
          <span>·</span>
          <a href="mailto:hello@iona-water.co" className="hover:text-[#102A30] transition-colors cursor-pointer">Contact</a>
        </div>

        {/* Social and legal terms links */}
        <div className="flex items-center gap-6 text-xs text-[#58747A] tracking-wider">
          <a href="#instagram" className="hover:text-[#102A30] transition-colors">Instagram</a>
          <a href="#privacy" className="hover:text-[#102A30] transition-colors">Privacy</a>
          <a href="#terms" className="hover:text-[#102A30] transition-colors">Terms</a>
        </div>

      </div>
    </footer>
  );
}
