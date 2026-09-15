import React from 'react';
import { QrCode, ShieldCheck, Zap } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="pt-8 pb-6 text-center max-w-3xl mx-auto px-4">
      {/* Brand Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-4 shadow-xs">
        <QrCode className="w-3.5 h-3.5 text-blue-600" />
        <span>Free Online Utility</span>
        <span className="w-1 h-1 rounded-full bg-blue-400"></span>
        <span className="inline-flex items-center gap-1 text-slate-600">
          <ShieldCheck className="w-3 h-3 text-emerald-600" /> 100% Private
        </span>
      </div>

      {/* Main Title */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
        Free QR Code Generator
      </h1>

      {/* Subtitle */}
      <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-xl mx-auto font-normal leading-relaxed">
        Create and download your QR code instantly.
      </p>
    </header>
  );
};
