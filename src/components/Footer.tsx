import React from 'react';
import { QrCode, Heart, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500">
      <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-blue-600 text-white">
            <QrCode className="w-3.5 h-3.5" />
          </div>
          <span className="font-semibold text-slate-800">Free QR Code Generator</span>
          <span>&copy; {new Date().getFullYear()}</span>
        </div>

        <div className="flex items-center gap-4 text-slate-600 font-medium">
          <span className="flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-emerald-600" /> Client-Side Only
          </span>
          <span>•</span>
          <span>Open Source</span>
          <span>•</span>
          <span>No Ads or Trackers</span>
        </div>
      </div>
    </footer>
  );
};
