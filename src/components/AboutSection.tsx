import React from 'react';
import { ShieldCheck, Zap, Lock, Sparkles, CheckCircle2, HelpCircle } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section className="max-w-4xl mx-auto px-4 py-12 border-t border-slate-200 mt-12">
      {/* Three Pillar Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-900 mb-1">100% Private & Safe</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            All QR codes are calculated locally in your browser. No personal data, links, or Wi-Fi passwords ever leave your device or reach any server.
          </p>
        </div>

        <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
            <Zap className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-900 mb-1">Instant & Permanent</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            These are static QR codes. They never expire, have no scan limits, and require no account, subscription, or login.
          </p>
        </div>

        <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-900 mb-1">High-Resolution Vector</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Download crisp PNG images up to 2048px or scalable SVG vectors ready for business cards, restaurant menus, flyers, and billboards.
          </p>
        </div>
      </div>

      {/* About Description */}
      <div className="space-y-6 text-slate-700 leading-relaxed">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-3">
            About Free QR Code Generator
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
            Our tool was built to provide a fast, privacy-respecting, and completely free way for individuals and businesses to generate QR codes without annoying paywalls, forced sign-ups, or redirect links.
          </p>

          <h3 className="text-base font-semibold text-slate-900 mb-2">Supported Formats:</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-600 mb-6">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span><strong>Websites & URLs:</strong> Links directly to your site or portfolio.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span><strong>Wi-Fi Networks:</strong> Guests scan to connect automatically.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span><strong>Plain Text:</strong> Notes, coupon codes, and messages.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span><strong>Phone Numbers:</strong> Opens device dialer with one tap.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span><strong>Email:</strong> Composes pre-filled drafts to your inbox.</span>
            </li>
          </ul>

          {/* FAQ Accordion or Clean Q&A */}
          <h3 className="text-base font-semibold text-slate-900 mb-3 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-slate-500" />
            Frequently Asked Questions
          </h3>

          <div className="space-y-3">
            <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50/50">
              <h4 className="text-sm font-semibold text-slate-900 mb-1">
                Do these QR codes ever expire?
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                No! The QR codes generated here are static codes. The data is encoded directly into the pattern, meaning they will work indefinitely as long as your destination URL or information remains valid.
              </p>
            </div>

            <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50/50">
              <h4 className="text-sm font-semibold text-slate-900 mb-1">
                Can I use these QR codes for commercial projects?
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                Yes, absolutely. All generated QR codes are 100% royalty-free and can be freely printed on commercial packaging, marketing brochures, shop windows, and business cards.
              </p>
            </div>

            <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50/50">
              <h4 className="text-sm font-semibold text-slate-900 mb-1">
                What size should I download for printing?
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                For standard business cards, 512px PNG is sufficient. For posters, flyers, or banners, choose 1024px, 2048px, or download the SVG vector format which scales infinitely without losing sharpness.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
