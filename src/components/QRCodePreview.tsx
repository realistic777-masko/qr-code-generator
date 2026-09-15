import React, { useEffect, useRef, useState } from 'react';
import {
  Download,
  Copy,
  Check,
  RotateCcw,
  Sliders,
  FileDown,
  Info,
  Layers,
  Palette,
  Share2,
} from 'lucide-react';
import { QRConfig, QRType } from '../types';
import {
  copyQRImageToClipboard,
  downloadQRCode,
  renderQRToCanvas,
} from '../utils/qrHelper';
import { SocialShareModal } from './SocialShareModal';

interface QRCodePreviewProps {
  payload: string;
  type: QRType;
  config: QRConfig;
  onConfigChange: (updates: Partial<QRConfig>) => void;
  onClear: () => void;
}

const SIZE_PRESETS = [
  { label: 'Standard (256px)', value: 256, desc: 'Digital & web use' },
  { label: 'Medium (512px)', value: 512, desc: 'General & presentation' },
  { label: 'High-Res (1024px)', value: 1024, desc: 'Print & posters' },
  { label: 'Ultra HD (2048px)', value: 2048, desc: 'Large banners' },
];

const COLOR_PRESETS = [
  { label: 'Classic Black', fg: '#000000', bg: '#ffffff' },
  { label: 'Royal Blue', fg: '#1d4ed8', bg: '#ffffff' },
  { label: 'Deep Slate', fg: '#0f172a', bg: '#ffffff' },
  { label: 'Midnight Blue', fg: '#1e3a8a', bg: '#ffffff' },
  { label: 'Forest Green', fg: '#14532d', bg: '#ffffff' },
];

export const QRCodePreview: React.FC<QRCodePreviewProps> = ({
  payload,
  type,
  config,
  onConfigChange,
  onClear,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [copied, setCopied] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState<'png' | 'svg'>('png');
  const [isDownloading, setIsDownloading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Live render QR whenever payload or config updates
  useEffect(() => {
    if (canvasRef.current) {
      renderQRToCanvas(canvasRef.current, payload, config).catch((err) => {
        console.error('Failed to render QR Code:', err);
      });
    }
  }, [payload, config]);

  const handleDownload = async () => {
    if (!payload || isDownloading) return;
    setIsDownloading(true);
    try {
      await downloadQRCode(payload, config, type, downloadFormat);
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopy = async () => {
    if (!canvasRef.current || !payload) return;
    const ok = await copyQRImageToClipboard(canvasRef.current);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      // Fallback copy raw text
      try {
        await navigator.clipboard.writeText(payload);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Copy fallback failed', err);
      }
    }
  };

  const hasPayload = Boolean(payload.trim());

  return (
    <div className="flex flex-col items-center w-full">
      {/* QR Canvas Box */}
      <div className="relative w-full max-w-[320px] sm:max-w-[340px] aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-4 transition-all duration-200">
        {hasPayload ? (
          <div className="relative p-2 bg-white rounded-xl shadow-xs border border-slate-100 flex items-center justify-center">
            <canvas
              ref={canvasRef}
              id="qr-code-canvas"
              className="max-w-[260px] sm:max-w-[280px] max-h-[260px] sm:max-h-[280px] w-full h-full object-contain rounded"
            />
          </div>
        ) : (
          <div className="text-center px-4 py-8">
            <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <Layers className="w-8 h-8 stroke-[1.5]" />
            </div>
            <p className="text-sm font-semibold text-slate-700">QR Code Preview</p>
            <p className="text-xs text-slate-500 mt-1 max-w-[200px] mx-auto">
              Enter content above to generate your QR code automatically.
            </p>
          </div>
        )}

        {/* Live scanning payload hint badge */}
        {hasPayload && (
          <div className="mt-2 text-center max-w-[280px]">
            <span className="inline-block text-[11px] text-slate-500 truncate max-w-full font-mono bg-slate-100 px-2 py-0.5 rounded">
              {payload}
            </span>
          </div>
        )}
      </div>

      {/* QR Size Selector & Settings Toggle */}
      <div className="w-full max-w-[340px] mt-4 space-y-3">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="select-qr-size"
              className="text-xs font-semibold text-slate-700 flex items-center gap-1"
            >
              Export Resolution / Size
            </label>
            <span className="text-[11px] font-mono text-blue-600 font-semibold bg-blue-50 px-1.5 py-0.5 rounded">
              {config.size} × {config.size} px
            </span>
          </div>
          <select
            id="select-qr-size"
            value={config.size}
            onChange={(e) => onConfigChange({ size: Number(e.target.value) })}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs sm:text-sm font-medium text-slate-800 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-hidden"
          >
            {SIZE_PRESETS.map((preset) => (
              <option key={preset.value} value={preset.value}>
                {preset.label} — {preset.desc}
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons (Download, Copy, Clear) */}
        <div className="space-y-2 pt-1">
          {/* Main Download Button */}
          <div className="flex rounded-xl shadow-xs">
            <button
              id="btn-download-qr"
              type="button"
              disabled={!hasPayload || isDownloading}
              onClick={handleDownload}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-l-xl font-bold text-sm tracking-tight transition-all cursor-pointer select-none ${
                hasPayload && !isDownloading
                  ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.99] shadow-sm'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>
                {isDownloading ? 'Preparing...' : `Download QR Code (${downloadFormat.toUpperCase()})`}
              </span>
            </button>

            {/* Format toggle (PNG vs SVG) */}
            <div className="flex border-l border-blue-500 bg-blue-600 rounded-r-xl overflow-hidden">
              <button
                type="button"
                id="btn-format-png"
                disabled={!hasPayload}
                onClick={() => setDownloadFormat('png')}
                className={`px-2.5 py-3 text-xs font-bold transition-colors cursor-pointer ${
                  downloadFormat === 'png'
                    ? 'bg-blue-800 text-white'
                    : 'bg-blue-600 text-blue-100 hover:bg-blue-700'
                }`}
                title="Download as PNG (Raster image)"
              >
                PNG
              </button>
              <button
                type="button"
                id="btn-format-svg"
                disabled={!hasPayload}
                onClick={() => setDownloadFormat('svg')}
                className={`px-2.5 py-3 text-xs font-bold transition-colors cursor-pointer ${
                  downloadFormat === 'svg'
                    ? 'bg-blue-800 text-white'
                    : 'bg-blue-600 text-blue-100 hover:bg-blue-700'
                }`}
                title="Download as SVG (Vector graphic)"
              >
                SVG
              </button>
            </div>
          </div>

          {/* Secondary Action Buttons: Share, Copy, Clear */}
          <div className="grid grid-cols-3 gap-2">
            <button
              id="btn-share-qr"
              type="button"
              disabled={!hasPayload}
              onClick={() => setIsShareModalOpen(true)}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer select-none ${
                hasPayload
                  ? 'border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 active:bg-blue-200 shadow-2xs'
                  : 'border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed'
              }`}
              title="Share to WhatsApp, Facebook, and more"
            >
              <Share2 className="w-4 h-4 text-blue-600" />
              <span>Share</span>
            </button>

            <button
              id="btn-copy-qr"
              type="button"
              disabled={!hasPayload}
              onClick={handleCopy}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer select-none ${
                hasPayload
                  ? copied
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-50 active:bg-slate-100'
                  : 'border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-600" />
                  <span>Copy</span>
                </>
              )}
            </button>

            <button
              id="btn-clear-qr"
              type="button"
              onClick={onClear}
              className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-700 text-xs sm:text-sm font-semibold transition-all cursor-pointer select-none"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>

          {/* Quick 1-Click Social Sharing Bar */}
          {hasPayload && (
            <div className="pt-1.5 flex items-center justify-between gap-1 text-xs">
              <span className="text-[11px] font-semibold text-slate-500">Quick share:</span>
              <div className="flex items-center gap-1.5">
                {/* 1-Tap WhatsApp */}
                <a
                  id="btn-quick-whatsapp"
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out this QR Code: ${payload}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-medium text-[11px] transition-colors cursor-pointer"
                  title="Send via WhatsApp"
                >
                  <svg className="w-3.5 h-3.5 fill-current text-emerald-600" viewBox="0 0 24 24">
                    <path d="M12.04 2c-5.523 0-10 4.477-10 10 0 1.765.458 3.488 1.328 5.01L2 22l5.127-1.345c1.472.803 3.13 1.225 4.913 1.225 5.523 0 10-4.477 10-10s-4.477-10-10-10zm0 18.273c-1.573 0-3.11-.423-4.453-1.222l-.319-.19-3.308.868.883-3.224-.208-.331c-.88-1.399-1.345-3.023-1.345-4.674 0-4.568 3.712-8.28 8.28-8.28 4.568 0 8.28 3.712 8.28 8.28 0 4.568-3.712 8.28-8.28 8.28z" />
                  </svg>
                  <span>WhatsApp</span>
                </a>

                {/* 1-Tap Facebook */}
                <a
                  id="btn-quick-facebook"
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(type === 'url' && /^https?:\/\//i.test(payload) ? payload : window.location.href)}&quote=${encodeURIComponent(`QR Code: ${payload}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-medium text-[11px] transition-colors cursor-pointer"
                  title="Share to Facebook"
                >
                  <svg className="w-3.5 h-3.5 fill-current text-blue-600" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>Facebook</span>
                </a>

                {/* All Platforms Modal trigger */}
                <button
                  type="button"
                  onClick={() => setIsShareModalOpen(true)}
                  className="inline-flex items-center gap-0.5 px-2 py-1 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium text-[11px] transition-colors cursor-pointer"
                  title="More social platforms"
                >
                  <span>More...</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Customization Options Expandable */}
        <div className="pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setShowSettings(!showSettings)}
            className="w-full flex items-center justify-between text-xs font-semibold text-slate-600 hover:text-slate-900 py-1 cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-blue-600" />
              Advanced QR Styling & Error Correction
            </span>
            <span className="text-[11px] text-blue-600 underline">
              {showSettings ? 'Hide' : 'Customize'}
            </span>
          </button>

          {showSettings && (
            <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              {/* Color Presets */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                  <Palette className="w-3 h-3 text-slate-500" />
                  Color Scheme
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {COLOR_PRESETS.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() =>
                        onConfigChange({ fgColor: preset.fg, bgColor: preset.bg })
                      }
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer flex items-center gap-1.5 ${
                        config.fgColor === preset.fg
                          ? 'border-blue-600 bg-white text-blue-900 shadow-xs font-semibold'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-slate-300"
                        style={{ backgroundColor: preset.fg }}
                      />
                      <span>{preset.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Error Correction */}
              <div>
                <label
                  htmlFor="select-ec-level"
                  className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1"
                >
                  <Info className="w-3 h-3 text-slate-500" />
                  Error Correction Level
                </label>
                <select
                  id="select-ec-level"
                  value={config.errorCorrectionLevel}
                  onChange={(e) =>
                    onConfigChange({
                      errorCorrectionLevel: e.target.value as QRConfig['errorCorrectionLevel'],
                    })
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-800 focus:border-blue-600 focus:outline-hidden"
                >
                  <option value="M">Medium (15% redundancy - Standard)</option>
                  <option value="L">Low (7% redundancy - Cleaner for small codes)</option>
                  <option value="Q">Quartile (25% redundancy - Great for print)</option>
                  <option value="H">High (30% redundancy - Best for physical wear)</option>
                </select>
                <p className="text-[10px] text-slate-500 mt-1">
                  Higher redundancy allows the QR code to be scanned even if partially scratched or smudged.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Social Media Share Modal */}
      <SocialShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        payload={payload}
        type={type}
        config={config}
        canvasElement={canvasRef.current}
      />
    </div>
  );
};
