import { X, ShieldCheck, Lock, Eye, FileText, Check } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      data-lenis-prevent="true"
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 md:p-10 pointer-events-auto select-auto overflow-y-auto"
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#08171B]/80 backdrop-blur-2xl transition-opacity animate-in fade-in duration-500"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div 
        data-lenis-prevent="true"
        className="relative w-full max-w-3xl my-auto max-h-[86vh] overflow-y-auto overscroll-contain modal-scrollbar bg-gradient-to-b from-[#F8FEFD] to-[#EDFAF9] rounded-3xl p-6 sm:p-10 md:p-12 shadow-[0_25px_70px_rgba(16,42,48,0.35)] border border-[#CDEEEF] animate-in zoom-in-95 duration-400 fade-in slide-in-from-bottom-6 z-10"
      >
        
        {/* Glow Effects */}
        <div className="absolute -top-32 -right-32 w-72 h-72 bg-[#CDEEEF]/60 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-[#72BDCE]/25 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/80 border border-[#CDEEEF] text-[#58747A] hover:text-[#102A30] hover:bg-white transition-all shadow-sm cursor-pointer z-20 group"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="mb-8 border-b border-[#CDEEEF]/60 pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E7F7F6] border border-[#CDEEEF] text-[#287F91] text-[10px] tracking-[0.25em] font-bold uppercase mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>DATA GOVERNANCE & SOVEREIGNTY</span>
            </div>

            <h2 className="font-black italic uppercase text-3xl sm:text-5xl text-[#102A30] leading-[0.95] tracking-tight mb-3">
              PRIVACY<br />
              POLICY.
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#58747A]">
              <span>EFFECTIVE DATE: OCTOBER 2026</span>
              <span>·</span>
              <span>COMPLIANCE: GLOBAL (GDPR / CCPA / SWISS FADP)</span>
            </div>
          </div>

          {/* Privacy Articles */}
          <div className="space-y-8 text-[#58747A] text-xs sm:text-sm font-light leading-relaxed">
            
            <section className="bg-white/50 p-6 rounded-2xl border border-[#CDEEEF]/60">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-6 h-6 rounded-full bg-[#102A30] text-white flex items-center justify-center font-mono text-xs font-bold">
                  01
                </span>
                <h3 className="font-bold text-[#102A30] uppercase tracking-wider text-sm">
                  Our Philosophy on Client Discretion
                </h3>
              </div>
              <p>
                At IONA Bottling Company, absolute discretion is as fundamental as the pristine purity of our water. We treat all client reservations, allocations, and correspondence as strictly confidential diplomatic-grade communications. We never monetize, rent, broker, or sell personal identifiers to data aggregators.
              </p>
            </section>

            <section className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#E7F7F6] text-[#287F91] border border-[#CDEEEF] flex items-center justify-center font-mono text-xs font-bold">
                  02
                </span>
                <h3 className="font-bold text-[#102A30] uppercase tracking-wider text-sm">
                  Information Collected
                </h3>
              </div>
              <p>
                When submitting inquiries or reservation requests through our digital channels, we collect only necessary logistical identifiers:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {[
                  'Full Name & Title',
                  'Verified Direct Email Address',
                  'Delivery Geography & Country Code',
                  'Hospitality or Institutional Credentials',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-white/40 border border-[#CDEEEF]/40 text-xs text-[#102A30]">
                    <Check className="w-3.5 h-3.5 text-[#287F91]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#E7F7F6] text-[#287F91] border border-[#CDEEEF] flex items-center justify-center font-mono text-xs font-bold">
                  03
                </span>
                <h3 className="font-bold text-[#102A30] uppercase tracking-wider text-sm">
                  Telemetry & 3D Interactive Performance
                </h3>
              </div>
              <p>
                Our 3D WebGL viewport uses local device hardware acceleration to render the high-fidelity bottle model and ambient lighting. No biometric data, webcam input, or external canvas telemetry is transmitted back to our servers during interactive manipulation.
              </p>
            </section>

            <section className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#E7F7F6] text-[#287F91] border border-[#CDEEEF] flex items-center justify-center font-mono text-xs font-bold">
                  04
                </span>
                <h3 className="font-bold text-[#102A30] uppercase tracking-wider text-sm">
                  Client Sovereignty & Erasure Rights
                </h3>
              </div>
              <p>
                In compliance with the General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA), you retain the right to request comprehensive digital dossier disclosure or complete permanent deletion of your reservation history at any moment by contacting our privacy compliance desk.
              </p>
            </section>

            <section className="p-4 rounded-xl bg-[#E7F7F6]/60 border border-[#CDEEEF] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <div className="font-bold text-[#102A30] text-xs uppercase tracking-wider">Data Protection Officer</div>
                <div className="text-[11px] text-[#58747A]">Direct inquiry for legal and regulatory compliance</div>
              </div>
              <a
                href="mailto:legal@iona-water.co"
                className="px-4 py-2 rounded-lg bg-[#102A30] text-white hover:bg-[#287F91] text-xs font-bold tracking-wider uppercase transition-colors shrink-0"
              >
                legal@iona-water.co
              </a>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
