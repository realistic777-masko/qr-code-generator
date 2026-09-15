import QRCode from 'qrcode';
import { QRConfig, QRState, QRType } from '../types';

/**
 * Encodes the state into the exact payload string for the QR code
 */
export function getQRPayload(state: QRState): string {
  switch (state.type) {
    case 'url': {
      const trimmed = state.url.trim();
      if (!trimmed) return '';
      if (!/^https?:\/\//i.test(trimmed)) {
        return `https://${trimmed}`;
      }
      return trimmed;
    }
    case 'text':
      return state.text;

    case 'phone': {
      const rawNum = state.phone.number.trim().replace(/[\s()-]/g, '');
      if (!rawNum) return '';
      if (rawNum.startsWith('+')) {
        return `tel:${rawNum}`;
      }
      const code = state.phone.countryCode || '+1';
      // Strip leading zero often entered in domestic numbers (e.g. 07123 -> 7123)
      const sanitizedNumber = rawNum.replace(/^0+/, '');
      return `tel:${code}${sanitizedNumber}`;
    }

    case 'email': {
      const addr = state.email.address.trim();
      if (!addr) return '';
      const params = new URLSearchParams();
      if (state.email.subject.trim()) {
        params.append('subject', state.email.subject.trim());
      }
      if (state.email.body.trim()) {
        params.append('body', state.email.body.trim());
      }
      const qs = params.toString();
      return `mailto:${addr}${qs ? `?${qs}` : ''}`;
    }

    case 'wifi': {
      const ssid = state.wifi.ssid.replace(/([\\;,:"])/g, '\\$1');
      const pass = state.wifi.password.replace(/([\\;,:"])/g, '\\$1');
      const type = state.wifi.encryption;
      const hidden = state.wifi.hidden ? 'true' : 'false';

      if (!ssid) return '';

      if (type === 'nopass') {
        return `WIFI:S:${ssid};T:nopass;H:${hidden};;`;
      }
      return `WIFI:S:${ssid};T:${type};P:${pass};H:${hidden};;`;
    }

    default:
      return '';
  }
}

/**
 * Render QR code onto an HTML canvas element
 */
export async function renderQRToCanvas(
  canvas: HTMLCanvasElement,
  text: string,
  config: QRConfig
): Promise<void> {
  if (!text) {
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    return;
  }

  await QRCode.toCanvas(canvas, text, {
    width: config.size,
    margin: config.margin,
    color: {
      dark: config.fgColor,
      light: config.bgColor,
    },
    errorCorrectionLevel: config.errorCorrectionLevel,
  });
}

/**
 * Generate a high-resolution PNG data URL
 */
export async function generateQRDataUrl(
  text: string,
  config: QRConfig,
  targetSize?: number
): Promise<string> {
  return await QRCode.toDataURL(text, {
    width: targetSize || config.size,
    margin: config.margin,
    color: {
      dark: config.fgColor,
      light: config.bgColor,
    },
    errorCorrectionLevel: config.errorCorrectionLevel,
  });
}

/**
 * Generate SVG string for vector download
 */
export async function generateQRSvg(
  text: string,
  config: QRConfig
): Promise<string> {
  return await QRCode.toString(text, {
    type: 'svg',
    margin: config.margin,
    color: {
      dark: config.fgColor,
      light: config.bgColor,
    },
    errorCorrectionLevel: config.errorCorrectionLevel,
  });
}

/**
 * Download QR code to device as PNG or SVG
 */
export async function downloadQRCode(
  text: string,
  config: QRConfig,
  type: QRType,
  format: 'png' | 'svg' = 'png'
): Promise<void> {
  if (!text) return;

  const timestamp = new Date().toISOString().slice(0, 10);
  const filename = `qrcode-${type}-${timestamp}.${format}`;

  if (format === 'svg') {
    const svgString = await generateQRSvg(text, config);
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    triggerDownload(url, filename);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  } else {
    // Generate high resolution PNG matching selected size
    const dataUrl = await generateQRDataUrl(text, config, config.size);
    triggerDownload(dataUrl, filename);
  }
}

function triggerDownload(url: string, filename: string): void {
  const link = document.createElement('a');
  link.id = 'qr-download-anchor';
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Copy QR code image to clipboard
 */
export async function copyQRImageToClipboard(
  canvas: HTMLCanvasElement
): Promise<boolean> {
  try {
    if (!navigator.clipboard || typeof ClipboardItem === 'undefined') {
      return false;
    }

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, 'image/png')
    );

    if (!blob) return false;

    await navigator.clipboard.write([
      new ClipboardItem({
        'image/png': blob,
      }),
    ]);
    return true;
  } catch (err) {
    console.warn('Clipboard write image failed, trying fallback', err);
    return false;
  }
}
