import React, { useState } from 'react';
import {
  X,
  Share2,
  Copy,
  Check,
  Send,
  ExternalLink,
  Smartphone,
  QrCode,
  ImageDown
} from 'lucide-react';
import { QRType, QRConfig } from '../types';
import { generateQRDataUrl } from '../utils/qrHelper';

interface SocialShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  payload: string;
  type: QRType;
  config: QRConfig;
  canvasElement: HTMLCanvasElement | null;
}

export const SocialShareModal: React.FC<SocialShareModalProps> = ({
  isOpen,
  onClose,
  payload,
  type,
  config,
  canvasElement,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);
  const [isNativeSharing, setIsNativeSharing] = useState(false);

  if (!isOpen || !payload) return null;

  // Format message text for sharing
  const getShareTitle = () => {
    switch (type) {
      case 'url':
        return 'Check out this website QR Code';
      case 'wifi':
        return 'Scan to connect to Wi-Fi';
      case 'phone':
        return 'Scan to call phone number';
      case 'email':
        return 'Scan to send email';
      default:
        return 'Scan this QR Code';
    }
  };

  const getShareUrl = () => {
    // If it's a URL, share the target URL or current page with hash
    if (type === 'url' && /^https?:\/\//i.test(payload)) {
      return payload;
    }
    return window.location.href;
  };

  const getShareText = () => {
    if (type === 'url') {
      return `Scan or open this QR code link: ${payload}`;
    }
    if (type === 'wifi') {
      return `Connect to Wi-Fi using this QR code: ${payload}`;
    }
    return `Here is my QR code content: ${payload}`;
  };

  const shareTitle = getShareTitle();
  const shareUrl = getShareUrl();
  const shareText = getShareText();

  // Social platform share links
  const socialPlatforms = [
    {
      name: 'WhatsApp',
      color: 'bg-[#25D366] hover:bg-[#20bd5a] text-white',
      textColor: 'text-[#25D366]',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.301-.15-1.782-.88-2.058-.98-.276-.1-.476-.15-.677.15-.2.301-.776.98-.953 1.18-.175.2-.35.226-.651.076-.3-.15-1.27-.468-2.42-1.493-.894-.798-1.498-1.784-1.674-2.085-.175-.3-.019-.462.132-.612.135-.135.301-.35.451-.525.15-.176.2-.301.301-.502.1-.2.05-.375-.025-.525-.075-.15-.677-1.632-.927-2.235-.243-.587-.49-.508-.673-.518-.174-.01-.375-.01-.576-.01-.2 0-.526.075-.802.375-.275.3-1.053 1.028-1.053 2.508 0 1.48 1.078 2.91 1.228 3.111.15.2 2.122 3.24 5.14 4.544.718.31 1.278.496 1.716.634.721.23 1.378.198 1.898.12.58-.088 1.782-.728 2.032-1.431.25-.703.25-1.305.176-1.43-.075-.127-.275-.202-.576-.352z" />
          <path d="M12.04 2c-5.523 0-10 4.477-10 10 0 1.765.458 3.488 1.328 5.01L2 22l5.127-1.345c1.472.803 3.13 1.225 4.913 1.225 5.523 0 10-4.477 10-10s-4.477-10-10-10zm0 18.273c-1.573 0-3.11-.423-4.453-1.222l-.319-.19-3.308.868.883-3.224-.208-.331c-.88-1.399-1.345-3.023-1.345-4.674 0-4.568 3.712-8.28 8.28-8.28 4.568 0 8.28 3.712 8.28 8.28 0 4.568-3.712 8.28-8.28 8.28z" />
        </svg>
      ),
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareTitle}: ${shareUrl}\n${shareText}`)}`,
    },
    {
      name: 'Facebook',
      color: 'bg-[#1877F2] hover:bg-[#166fe5] text-white',
      textColor: 'text-[#1877F2]',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
    },
    {
      name: 'X (Twitter)',
      color: 'bg-black hover:bg-neutral-800 text-white',
      textColor: 'text-black',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'Telegram',
      color: 'bg-[#26A5E4] hover:bg-[#2094ce] text-white',
      textColor: 'text-[#26A5E4]',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      ),
      url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
    },
    {
      name: 'LinkedIn',
      color: 'bg-[#0A66C2] hover:bg-[#084e96] text-white',
      textColor: 'text-[#0A66C2]',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'Reddit',
      color: 'bg-[#FF4500] hover:bg-[#e03d00] text-white',
      textColor: 'text-[#FF4500]',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .616-.324 1.157-.807 1.468.046.27.07.545.07.824 0 2.92-3.23 5.289-7.215 5.289s-7.215-2.37-7.215-5.289c0-.28.025-.554.07-.824a1.748 1.748 0 0 1-.807-1.468c0-.968.786-1.754 1.754-1.754.478 0 .9.182 1.208.491 1.194-.856 2.85-1.419 4.674-1.488l.965-4.526 3.197.674a1.247 1.247 0 0 1 1.097-.643z" />
        </svg>
      ),
      url: `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`,
    },
  ];

  // Mobile Web Share (Native sheet) with file support
  const handleNativeShare = async () => {
    if (!navigator.share) return;
    setIsNativeSharing(true);

    try {
      if (canvasElement && navigator.canShare) {
        // Try sharing the actual QR image as a file
        const blob = await new Promise<Blob | null>((resolve) =>
          canvasElement.toBlob(resolve, 'image/png')
        );

        if (blob) {
          const file = new File([blob], `qrcode-${type}.png`, { type: 'image/png' });
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: shareTitle,
              text: shareText,
              files: [file],
            });
            setIsNativeSharing(false);
            return;
          }
        }
      }

      // Fallback native share with link/text
      await navigator.share({
        title: shareTitle,
        text: shareText,
        url: shareUrl,
      });
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        console.error('Native share failed:', err);
      }
    } finally {
      setIsNativeSharing(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  const handleCopyImage = async () => {
    if (!canvasElement) return;
    try {
      const blob = await new Promise<Blob | null>((resolve) =>
        canvasElement.toBlob(resolve, 'image/png')
      );
      if (blob && navigator.clipboard && typeof ClipboardItem !== 'undefined') {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
        ]);
        setCopiedImage(true);
        setTimeout(() => setCopiedImage(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy image', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Share QR Code</h3>
              <p className="text-xs text-slate-500">Post directly to social media or send to friends</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 overflow-y-auto">
          {/* Quick Native Device Share Button (if available on mobile / supported browsers) */}
          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <div>
              <button
                type="button"
                id="btn-native-share-device"
                onClick={handleNativeShare}
                disabled={isNativeSharing}
                className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-sm hover:from-blue-700 hover:to-indigo-700 transition-all cursor-pointer"
              >
                <Smartphone className="w-4 h-4" />
                <span>Share via Phone / Device Menu</span>
              </button>
              <p className="text-[11px] text-center text-slate-400 mt-1.5">
                Opens native WhatsApp, Instagram, Messenger, AirDrop, or Bluetooth
              </p>
            </div>
          )}

          {/* Social Media Grid */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2.5">
              Direct Social Media Platforms
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-3 gap-2.5">
              {socialPlatforms.map((platform) => (
                <a
                  key={platform.name}
                  id={`share-btn-${platform.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl border border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-100/80 transition-all group cursor-pointer text-center`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1.5 shadow-xs transition-transform group-hover:scale-105 ${platform.color}`}
                  >
                    {platform.icon}
                  </div>
                  <span className="text-xs font-semibold text-slate-800">
                    {platform.name}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Copy Link & Copy Image Actions */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
              Copy & Clipboard
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleCopyLink}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Copy Text/Link</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleCopyImage}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
              >
                {copiedImage ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Image Copied!</span>
                  </>
                ) : (
                  <>
                    <ImageDown className="w-3.5 h-3.5 text-slate-500" />
                    <span>Copy QR Image</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Free & no watermark</span>
          <button
            type="button"
            onClick={onClose}
            className="font-semibold text-blue-600 hover:underline cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
