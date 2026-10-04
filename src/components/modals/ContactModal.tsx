import React, { useState } from 'react';
import { X, Sparkles, Send, CheckCircle2, MapPin, Mail, Phone, Clock, ArrowRight } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'Private Allocation',
    region: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate luxury concierge request dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      inquiryType: 'Private Allocation',
      region: '',
      message: '',
    });
  };

  return (
    <div 
      data-lenis-prevent="true"
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 md:p-10 pointer-events-auto select-auto overflow-y-auto"
    >
      {/* Cinematic Blur Backdrop */}
      <div 
        className="fixed inset-0 bg-[#08171B]/80 backdrop-blur-2xl transition-opacity animate-in fade-in duration-500"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div 
        data-lenis-prevent="true"
        className="relative w-full max-w-4xl my-auto max-h-[88vh] overflow-y-auto overscroll-contain modal-scrollbar bg-gradient-to-b from-[#F8FEFD] to-[#EDFAF9] rounded-3xl p-6 sm:p-10 md:p-12 shadow-[0_25px_70px_rgba(16,42,48,0.35)] border border-[#CDEEEF] animate-in zoom-in-95 duration-400 fade-in slide-in-from-bottom-6 z-10"
      >
        
        {/* Ambient Gradient Glows inside card */}
        <div className="absolute -top-32 -right-32 w-72 h-72 bg-[#CDEEEF]/60 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-[#72BDCE]/30 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/80 border border-[#CDEEEF] text-[#58747A] hover:text-[#102A30] hover:bg-white transition-all shadow-sm cursor-pointer z-20 group"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {submitted ? (
          /* Confirmation State */
          <div className="relative z-10 flex flex-col items-center text-center py-12 px-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#E7F7F6] border border-[#287F91]/30 flex items-center justify-center mb-6 shadow-sm">
              <CheckCircle2 className="w-8 h-8 text-[#287F91]" />
            </div>
            
            <span className="text-xs tracking-[0.3em] font-bold text-[#287F91] uppercase mb-2">
              INQUIRY RECEIVED
            </span>
            <h3 className="font-black italic uppercase text-3xl md:text-4xl text-[#102A30] mb-4">
              Thank You, {formData.name || 'Valued Guest'}.
            </h3>
            <p className="text-[#58747A] text-sm md:text-base leading-relaxed mb-6 font-light">
              Your message regarding <span className="font-semibold text-[#102A30]">{formData.inquiryType}</span> has been transferred to our private concierge desk. An allocation specialist will reply within 24 business hours.
            </p>

            <div className="w-full bg-white/70 border border-[#CDEEEF] rounded-2xl p-4 mb-8 text-xs font-mono text-[#58747A] flex justify-between items-center">
              <span>REFERENCE DOSSIER:</span>
              <span className="font-bold text-[#102A30]">IONA-{Math.floor(100000 + Math.random() * 900000)}</span>
            </div>

            <button
              onClick={handleReset}
              className="px-8 py-3 bg-[#102A30] hover:bg-[#287F91] text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-colors shadow-md cursor-pointer"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          /* Form & Contact Information Grid */
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
            
            {/* Left Column: Brand & Editorial Contact Info */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full pr-0 lg:pr-6 border-b lg:border-b-0 lg:border-r border-[#CDEEEF]/60 pb-8 lg:pb-0">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E7F7F6] border border-[#CDEEEF] text-[#287F91] text-[10px] tracking-[0.25em] font-bold uppercase mb-4">
                  <Sparkles className="w-3 h-3" />
                  <span>CONCIERGE & ALLOCATIONS</span>
                </div>

                <h2 className="font-black italic uppercase text-4xl sm:text-5xl text-[#102A30] leading-[0.95] tracking-tight mb-4">
                  CONNECT<br />
                  WITH IONA.
                </h2>

                <p className="text-sm text-[#58747A] font-light leading-relaxed mb-8">
                  Whether securing private bottling reservations, culinary pairings for Michelin hospitality, or wholesale distributorships, our specialists are at your disposal.
                </p>
              </div>

              {/* Contact Details Cards */}
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-white/60 border border-[#CDEEEF]/50 flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#287F91] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#58747A]">Private Concierge</div>
                    <a href="mailto:concierge@iona-water.co" className="text-xs font-semibold text-[#102A30] hover:text-[#287F91] transition-colors">
                      concierge@iona-water.co
                    </a>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/60 border border-[#CDEEEF]/50 flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#287F91] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#58747A]">Sanctuaries & Bottling</div>
                    <div className="text-xs font-semibold text-[#102A30]">Alpine Springs · Zurich · Tokyo</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/60 border border-[#CDEEEF]/50 flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#287F91] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#58747A]">Client Relations Hours</div>
                    <div className="text-xs font-semibold text-[#102A30]">09:00 – 18:00 CET · Monday – Friday</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Luxury Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-7 flex flex-col gap-5">
              
              {/* Inquiry Type Pills */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#58747A] mb-2.5">
                  Nature of Inquiry
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Private Allocation',
                    'Hospitality & Dining',
                    'Stockist & Retail',
                    'Press & Partnerships',
                  ].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({ ...formData, inquiryType: type })}
                      className={`px-3 py-2.5 text-xs font-medium rounded-xl border text-left transition-all cursor-pointer ${
                        formData.inquiryType === type
                          ? 'bg-[#102A30] text-white border-[#102A30] shadow-sm'
                          : 'bg-white/60 text-[#102A30] border-[#CDEEEF] hover:bg-white'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#58747A] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Julian Thorne"
                    className="w-full bg-white/70 border border-[#CDEEEF] focus:border-[#287F91] focus:ring-1 focus:ring-[#287F91] rounded-xl px-4 py-3 text-xs text-[#102A30] outline-none transition-all placeholder:text-[#A0B8BC]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#58747A] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="julian@example.com"
                    className="w-full bg-white/70 border border-[#CDEEEF] focus:border-[#287F91] focus:ring-1 focus:ring-[#287F91] rounded-xl px-4 py-3 text-xs text-[#102A30] outline-none transition-all placeholder:text-[#A0B8BC]"
                  />
                </div>
              </div>

              {/* Location / Region */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#58747A] mb-1.5">
                  Location / City of Interest
                </label>
                <input
                  type="text"
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  placeholder="e.g. Geneva, Switzerland or London, UK"
                  className="w-full bg-white/70 border border-[#CDEEEF] focus:border-[#287F91] focus:ring-1 focus:ring-[#287F91] rounded-xl px-4 py-3 text-xs text-[#102A30] outline-none transition-all placeholder:text-[#A0B8BC]"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#58747A] mb-1.5">
                  Inquiry Details
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Please state bottle volumes, expected frequency, or specific custom packaging requests..."
                  className="w-full bg-white/70 border border-[#CDEEEF] focus:border-[#287F91] focus:ring-1 focus:ring-[#287F91] rounded-xl px-4 py-3 text-xs text-[#102A30] outline-none transition-all placeholder:text-[#A0B8BC] resize-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#102A30] to-[#1E4D57] hover:from-[#287F91] hover:to-[#102A30] text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>TRANSMITTING INQUIRY...</span>
                ) : (
                  <>
                    <span>SUBMIT INQUIRY TO CONCIERGE</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-[10px] text-center text-[#58747A] font-light">
                By submitting, you agree to our confidential communications standard. Your details remain strictly private.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
