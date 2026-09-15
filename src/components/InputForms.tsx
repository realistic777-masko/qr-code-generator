import React, { useState } from 'react';
import { Eye, EyeOff, Link2, Sparkles, PhoneCall } from 'lucide-react';
import { QRState, QRType } from '../types';
import { CountryCodeSelect } from './CountryCodeSelect';

interface InputFormsProps {
  state: QRState;
  onChange: (updates: Partial<QRState>) => void;
  onClear: () => void;
}

export const InputForms: React.FC<InputFormsProps> = ({ state, onChange, onClear }) => {
  const [showWifiPassword, setShowWifiPassword] = useState(false);

  const applyExample = (type: QRType) => {
    switch (type) {
      case 'url':
        onChange({ url: 'https://github.com' });
        break;
      case 'text':
        onChange({ text: 'Hello! Thank you for scanning this QR code. Have a wonderful day!' });
        break;
      case 'phone':
        onChange({ phone: { countryCode: '+1', number: '800 555 0199' } });
        break;
      case 'email':
        onChange({
          email: {
            address: 'hello@example.com',
            subject: 'Inquiry from QR Code',
            body: 'Hi there! I scanned your QR code and wanted to connect.',
          },
        });
        break;
      case 'wifi':
        onChange({
          wifi: {
            ssid: 'Guest_WiFi_5G',
            password: 'SuperSecretPassword',
            encryption: 'WPA',
            hidden: false,
          },
        });
        break;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header bar of form with type badge and load example */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Enter Details
        </span>
        <button
          id="btn-load-example"
          type="button"
          onClick={() => applyExample(state.type)}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          Load example
        </button>
      </div>

      {/* URL INPUT */}
      {state.type === 'url' && (
        <div className="space-y-2">
          <label htmlFor="input-url" className="block text-sm font-semibold text-slate-800">
            Website URL
          </label>
          <div className="relative rounded-xl shadow-xs">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
              <Link2 className="h-4 w-4 text-slate-400" />
            </div>
            <input
              id="input-url"
              type="url"
              value={state.url}
              onChange={(e) => onChange({ url: e.target.value })}
              placeholder="https://example.com"
              className="block w-full rounded-xl border border-slate-300 pl-10 pr-4 py-3 text-slate-900 placeholder:text-slate-400 text-sm sm:text-base focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-hidden transition-colors"
              autoFocus
            />
          </div>
          <p className="text-xs text-slate-500">
            Tip: You can type <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700">example.com</code> or paste full links.
          </p>
        </div>
      )}

      {/* TEXT INPUT */}
      {state.type === 'text' && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="input-text" className="block text-sm font-semibold text-slate-800">
              Plain Text
            </label>
            <span className="text-xs text-slate-400">
              {state.text.length} characters
            </span>
          </div>
          <textarea
            id="input-text"
            rows={4}
            value={state.text}
            onChange={(e) => onChange({ text: e.target.value })}
            placeholder="Type or paste any notes, promo code, address, or message here..."
            className="block w-full rounded-xl border border-slate-300 p-3.5 text-slate-900 placeholder:text-slate-400 text-sm sm:text-base focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-hidden transition-colors resize-y min-h-[100px]"
            autoFocus
          />
          <p className="text-xs text-slate-500">
            QR codes can store up to several thousand characters of plain text.
          </p>
        </div>
      )}

      {/* PHONE INPUT */}
      {state.type === 'phone' && (
        <div className="space-y-3">
          <label htmlFor="input-phone" className="block text-sm font-semibold text-slate-800">
            Phone Number
          </label>
          <div className="flex rounded-xl shadow-xs">
            {/* Country Calling Code Selector */}
            <CountryCodeSelect
              selectedDialCode={state.phone.countryCode || '+1'}
              onSelect={(code) =>
                onChange({ phone: { ...state.phone, countryCode: code } })
              }
            />

            {/* National / Local Phone Number Input */}
            <input
              id="input-phone"
              type="tel"
              value={state.phone.number}
              onChange={(e) =>
                onChange({ phone: { ...state.phone, number: e.target.value } })
              }
              placeholder="e.g. 555 012 3456"
              className="block w-full rounded-r-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 text-sm sm:text-base focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-hidden transition-colors"
              autoFocus
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-slate-500">
            <span>Select any country code from the dropdown or search by name.</span>
            {state.phone.number.trim() && (
              <span className="inline-flex items-center gap-1 font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                <PhoneCall className="w-3 h-3 text-blue-600" />
                {state.phone.number.trim().startsWith('+')
                  ? state.phone.number.trim()
                  : `${state.phone.countryCode || '+1'} ${state.phone.number.trim().replace(/^0+/, '')}`}
              </span>
            )}
          </div>
        </div>
      )}

      {/* EMAIL INPUT */}
      {state.type === 'email' && (
        <div className="space-y-3">
          <div>
            <label htmlFor="input-email-addr" className="block text-sm font-semibold text-slate-800 mb-1">
              Recipient Email Address <span className="text-rose-500">*</span>
            </label>
            <input
              id="input-email-addr"
              type="email"
              value={state.email.address}
              onChange={(e) =>
                onChange({
                  email: { ...state.email, address: e.target.value },
                })
              }
              placeholder="contact@yourcompany.com"
              className="block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 placeholder:text-slate-400 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-hidden"
              autoFocus
            />
          </div>

          <div>
            <label htmlFor="input-email-subj" className="block text-sm font-medium text-slate-700 mb-1">
              Subject <span className="text-slate-400 text-xs">(Optional)</span>
            </label>
            <input
              id="input-email-subj"
              type="text"
              value={state.email.subject}
              onChange={(e) =>
                onChange({
                  email: { ...state.email, subject: e.target.value },
                })
              }
              placeholder="e.g. Feedback / Order Request"
              className="block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 placeholder:text-slate-400 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-hidden"
            />
          </div>

          <div>
            <label htmlFor="input-email-body" className="block text-sm font-medium text-slate-700 mb-1">
              Message Body <span className="text-slate-400 text-xs">(Optional)</span>
            </label>
            <textarea
              id="input-email-body"
              rows={2}
              value={state.email.body}
              onChange={(e) =>
                onChange({
                  email: { ...state.email, body: e.target.value },
                })
              }
              placeholder="Pre-populate email draft message..."
              className="block w-full rounded-xl border border-slate-300 p-3 text-slate-900 placeholder:text-slate-400 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-hidden resize-none"
            />
          </div>
        </div>
      )}

      {/* WI-FI INPUT */}
      {state.type === 'wifi' && (
        <div className="space-y-3">
          <div>
            <label htmlFor="input-wifi-ssid" className="block text-sm font-semibold text-slate-800 mb-1">
              Network Name (SSID) <span className="text-rose-500">*</span>
            </label>
            <input
              id="input-wifi-ssid"
              type="text"
              value={state.wifi.ssid}
              onChange={(e) =>
                onChange({
                  wifi: { ...state.wifi, ssid: e.target.value },
                })
              }
              placeholder="e.g. Home_Network_5G"
              className="block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 placeholder:text-slate-400 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-hidden"
              autoFocus
            />
          </div>

          <div>
            <label htmlFor="input-wifi-encryption" className="block text-sm font-semibold text-slate-800 mb-1">
              Security Encryption
            </label>
            <select
              id="input-wifi-encryption"
              value={state.wifi.encryption}
              onChange={(e) =>
                onChange({
                  wifi: {
                    ...state.wifi,
                    encryption: e.target.value as 'WPA' | 'WEP' | 'nopass',
                  },
                })
              }
              className="block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-hidden bg-white"
            >
              <option value="WPA">WPA / WPA2 / WPA3 (Standard / Recommended)</option>
              <option value="WEP">WEP (Legacy)</option>
              <option value="nopass">None (Open Network)</option>
            </select>
          </div>

          {state.wifi.encryption !== 'nopass' && (
            <div>
              <label htmlFor="input-wifi-password" className="block text-sm font-semibold text-slate-800 mb-1">
                Password
              </label>
              <div className="relative rounded-xl">
                <input
                  id="input-wifi-password"
                  type={showWifiPassword ? 'text' : 'password'}
                  value={state.wifi.password}
                  onChange={(e) =>
                    onChange({
                      wifi: { ...state.wifi, password: e.target.value },
                    })
                  }
                  placeholder="Wi-Fi Password"
                  className="block w-full rounded-xl border border-slate-300 px-4 py-2.5 pr-10 text-slate-900 placeholder:text-slate-400 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-hidden"
                />
                <button
                  type="button"
                  onClick={() => setShowWifiPassword(!showWifiPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                  title={showWifiPassword ? 'Hide password' : 'Show password'}
                >
                  {showWifiPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          )}

          <div className="pt-1">
            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
              <input
                id="input-wifi-hidden"
                type="checkbox"
                checked={state.wifi.hidden}
                onChange={(e) =>
                  onChange({
                    wifi: { ...state.wifi, hidden: e.target.checked },
                  })
                }
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-xs font-medium text-slate-700">
                Hidden Wi-Fi network
              </span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
