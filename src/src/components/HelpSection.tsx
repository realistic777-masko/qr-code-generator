import React, { useState } from 'react';

export function HelpSection() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <section className="mt-10 mb-8 bg-white border border-slate-200 shadow-sm rounded-3xl p-5 sm:p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-4xl mb-3">📚</div>

        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Help & Guides
        </h2>

        <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
          Learn how to create different types of links and QR codes using
          our generator.
        </p>
      </div>

      <div className="space-y-3">

        {/* WhatsApp */}
        <div className="border border-slate-200 rounded-2xl overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('whatsapp')}
            className="w-full flex items-center justify-between p-4 text-left bg-slate-50 hover:bg-slate-100 transition"
          >
            <span className="flex items-center gap-3 font-semibold text-slate-900">
              <span className="text-2xl">💬</span>
              WhatsApp Link
            </span>

            <span className="text-xl">
              {openSection === 'whatsapp' ? '−' : '+'}
            </span>
          </button>

          {openSection === 'whatsapp' && (
            <div className="p-5 text-slate-700 space-y-4">
              <p>
                You can create a WhatsApp link that opens a chat directly
                with a phone number.
              </p>

              <div className="bg-slate-100 rounded-xl p-4">
                <p className="font-semibold mb-2">Step 1: Start with</p>
                <code className="text-blue-600 break-all">
                  https://wa.me/
                </code>
              </div>

              <div className="bg-slate-100 rounded-xl p-4">
                <p className="font-semibold mb-2">
                  Step 2: Add the country code
                </p>

                <p>
                  For Ghana, the country code is <strong>233</strong>.
                </p>

                <p className="mt-2">
                  Do not add the <strong>+</strong> sign.
                </p>
              </div>

              <div className="bg-slate-100 rounded-xl p-4">
                <p className="font-semibold mb-2">
                  Step 3: Add the phone number
                </p>

                <p>
                  Example phone number:
                  <strong> 5927862345</strong>
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="font-semibold text-blue-900 mb-2">
                  Your WhatsApp link:
                </p>

                <code className="text-blue-700 break-all">
                  https://wa.me/2335927862345
                </code>
              </div>

              <p className="text-sm text-slate-500">
                💡 Important: Don't include spaces, dashes, brackets, or the
                + sign in the phone number.
              </p>
            </div>
          )}
        </div>

        {/* Website */}
        <div className="border border-slate-200 rounded-2xl overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('website')}
            className="w-full flex items-center justify-between p-4 text-left bg-slate-50 hover:bg-slate-100 transition"
          >
            <span className="flex items-center gap-3 font-semibold text-slate-900">
              <span className="text-2xl">🌐</span>
              Website Link
            </span>

            <span className="text-xl">
              {openSection === 'website' ? '−' : '+'}
            </span>
          </button>

          {openSection === 'website' && (
            <div className="p-5 text-slate-700 space-y-4">
              <p>
                Create a QR code that opens a website when scanned.
              </p>

              <div className="bg-slate-100 rounded-xl p-4">
                <p className="font-semibold mb-2">Example:</p>

                <code className="text-blue-600 break-all">
                  https://example.com
                </code>
              </div>

              <p>
                Enter the complete website address, including
                <strong> https://</strong>, into the Website section of the
                generator.
              </p>
            </div>
          )}
        </div>

        {/* Email */}
        <div className="border border-slate-200 rounded-2xl overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('email')}
            className="w-full flex items-center justify-between p-4 text-left bg-slate-50 hover:bg-slate-100 transition"
          >
            <span className="flex items-center gap-3 font-semibold text-slate-900">
              <span className="text-2xl">📧</span>
              Email Link
            </span>

            <span className="text-xl">
              {openSection === 'email' ? '−' : '+'}
            </span>
          </button>

          {openSection === 'email' && (
            <div className="p-5 text-slate-700 space-y-4">
              <p>
                An email QR code can open the user's email application with
                the email address, subject, and message already prepared.
              </p>

              <div className="bg-slate-100 rounded-xl p-4">
                <p className="font-semibold mb-2">Example:</p>

                <p>
                  Email:
                  <strong> hello@example.com</strong>
                </p>

                <p>
                  Subject:
                  <strong> Hello</strong>
                </p>

                <p>
                  Message:
                  <strong> Thanks for contacting us!</strong>
                </p>
              </div>

              <p>
                Enter these details in the Email section and generate your
                QR code.
              </p>
            </div>
          )}
        </div>

        {/* Phone */}
        <div className="border border-slate-200 rounded-2xl overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('phone')}
            className="w-full flex items-center justify-between p-4 text-left bg-slate-50 hover:bg-slate-100 transition"
          >
            <span className="flex items-center gap-3 font-semibold text-slate-900">
              <span className="text-2xl">📞</span>
              Phone Call Link
            </span>

            <span className="text-xl">
              {openSection === 'phone' ? '−' : '+'}
            </span>
          </button>

          {openSection === 'phone' && (
            <div className="p-5 text-slate-700 space-y-4">
              <p>
                A phone QR code allows someone to scan the code and quickly
                start a phone call.
              </p>

              <div className="bg-slate-100 rounded-xl p-4">
                <p className="font-semibold mb-2">Example:</p>

                <p>
                  Country code:
                  <strong> +233</strong>
                </p>

                <p>
                  Phone number:
                  <strong> 5927862345</strong>
                </p>
              </div>

              <p>
                Enter your country code and phone number in the Phone section
                of the generator.
              </p>
            </div>
          )}
        </div>

        {/* Wi-Fi */}
        <div className="border border-slate-200 rounded-2xl overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('wifi')}
            className="w-full flex items-center justify-between p-4 text-left bg-slate-50 hover:bg-slate-100 transition"
          >
            <span className="flex items-center gap-3 font-semibold text-slate-900">
              <span className="text-2xl">📶</span>
              Wi-Fi QR Code
            </span>

            <span className="text-xl">
              {openSection === 'wifi' ? '−' : '+'}
            </span>
          </button>

          {openSection === 'wifi' && (
            <div className="p-5 text-slate-700 space-y-4">
              <p>
                A Wi-Fi QR code lets people connect to a Wi-Fi network by
                scanning the QR code instead of typing the password.
              </p>

              <div className="bg-slate-100 rounded-xl p-4">
                <p className="font-semibold mb-2">You need:</p>

                <ul className="list-disc list-inside space-y-1">
                  <li>Wi-Fi name (SSID)</li>
                  <li>Wi-Fi password</li>
                  <li>Security type</li>
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="font-semibold text-blue-900 mb-2">
                  Example:
                </p>

                <p>Wi-Fi name: MyHomeWiFi</p>
                <p>Password: MyPassword123</p>
                <p>Security: WPA</p>
              </div>

              <p>
                Enter your Wi-Fi information and generate the QR code. Anyone
                with a compatible phone can scan it to connect.
              </p>
            </div>
          )}
        </div>

      </div>

      {/* Bottom Tip */}
      <div className="mt-6 bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
        <p className="font-semibold text-slate-900">
          💡 Need help?
        </p>

        <p className="text-sm text-slate-600 mt-1">
          Tap any section above to see step-by-step instructions.
        </p>
      </div>
    </section>
  );
}
