import React, { useMemo, useState } from 'react';
import { Header } from './components/Header';
import { TypeSelector } from './components/TypeSelector';
import { InputForms } from './components/InputForms';
import { QRCodePreview } from './components/QRCodePreview';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { QRConfig, QRState, QRType } from './types';
import { getQRPayload } from './utils/qrHelper';
import { HelpSection } from ' ./components/HelpSection';

const INITIAL_STATE: QRState = {
  type: 'url',
  url: 'https://example.com',
  text: '',
  phone: { countryCode: '+1', number: '' },
  email: { address: '', subject: '', body: '' },
  wifi: { ssid: '', password: '', encryption: 'WPA', hidden: false },
};

const INITIAL_CONFIG: QRConfig = {
  size: 512,
  fgColor: '#000000',
  bgColor: '#ffffff',
  margin: 2,
  errorCorrectionLevel: 'M',
};

export default function App() {
  const [qrState, setQrState] = useState<QRState>(INITIAL_STATE);
  const [config, setConfig] = useState<QRConfig>(INITIAL_CONFIG);

  const activePayload = useMemo(() => {
    return getQRPayload(qrState);
  }, [qrState]);

  const handleTypeChange = (type: QRType) => {
    setQrState((prev) => ({ ...prev, type }));
  };

  const handleStateUpdate = (updates: Partial<QRState>) => {
    setQrState((prev) => ({ ...prev, ...updates }));
  };

  const handleConfigUpdate = (updates: Partial<QRConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  }; 
  
    const handleShare = async () => {
  const shareData = {
    title: 'Free QR Code Generator',
    text: 'Create a free QR code instantly!',
    url: window.location.href,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (error) {
      console.log('Share cancelled');
    }
  } else {
    await navigator.clipboard.writeText(window.location.href);
    alert('Site link copied! You can now share it.');
  }
};
 const handleClear = () => {
    setQrState((prev) => ({
      ...prev,
      url: '',
      text: '',
      phone: { countryCode: prev.phone.countryCode || '+1', number: '' },
      email: { address: '', subject: '', body: '' },
      wifi: { ssid: '', password: '', encryption: 'WPA', hidden: false },
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans antialiased">
      {/* Top Header */}
      <Header />

      {/* Main Generator Tool Card - Centered */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-5 sm:p-8 lg:p-10 transition-all">
          {/* Step 1: Select Type */}
          <div className="mb-6">
            <TypeSelector
              activeType={qrState.type}
              onChange={handleTypeChange}
            />
          </div>

          {/* Step 2: Content Input & QR Preview Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start pt-2">
            {/* Left / Input Section (7 cols) */}
            <div className="lg:col-span-7 bg-slate-50/70 border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-4">
              <InputForms
                state={qrState}
                onChange={handleStateUpdate}
                onClear={handleClear}
              />
            </div>

            {/* Right / Preview & Export Section (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
              <div className="w-full flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Live Preview
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Instant Sync
                </span>
              </div>

              <QRCodePreview
                payload={activePayload}
                type={qrState.type}
                config={config}
                onConfigChange={handleConfigUpdate}
                onClear={handleClear}
              />
            </div>
          </div>
        </div>
        {/* Help & Guides */}
        <HelpSection />

        {/* SEO & Educational About Section */}
        <button 
          onClick={handleShare}
          classname="mx-auto mb-6 rounded-x1 bg-blue-600 px-6 font-semibold text-white shadow hover:bg-blue-700"
        >
          📤 share this site
        </button>
        
        <AboutSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
