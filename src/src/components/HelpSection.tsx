import React from 'react';

export function HelpSection() {
  return (
    <section className="mt-10 bg-white border border-slate-200 rounded-3xl shadow-sm p-6 sm:p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          📚 Help & How To Guides
        </h2>
        <p className="mt-2 text-slate-600">
          Learn how to create the different types of QR codes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* WhatsApp */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
          <h3 className="text-lg font-bold text-green-800">
            💬 How to create a WhatsApp link
          </h3>

          <p className="mt-2 text-slate-700">
            Start with <strong>https://wa.me/</strong>, then add your
            country code followed by the phone number.
          </p>

          <p className="mt-3 font-semibold">Example — Ghana 🇬🇭</p>

          <div className="mt-2 bg-white rounded-lg p-3 font-mono text-sm break-all">
            https://wa.me/2335927862345
          </div>

          <p className="mt-3 text-sm text-slate-600">
            233 = Ghana country code. Do not add the + sign, spaces or
            hyphens.
          </p>
        </div>

        {/* Website */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
          <h3 className="text-lg font-bold text-blue-800">
            🌐 How to create a Website QR Code
          </h3>

          <p className="mt-2 text-slate-700">
            Enter the complete website address, including
            <strong> https://</strong>.
          </p>

          <div className="mt-3 bg-white rounded-lg p-3 font-mono text-sm break-all">
            https://example.com
          </div>

          <p className="mt-3 text-sm text-slate-600">
            Anyone who scans the QR code can open the website.
          </p>
        </div>

        {/* Phone */}
        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5">
          <h3 className="text-lg font-bold text-purple-800">
            📞 How to create a Phone QR Code
          </h3>

          <p className="mt-2 text-slate-700">
            Enter the phone number you want people to call.
          </p>

          <div className="mt-3 bg-white rounded-lg p-3 font-mono text-sm">
            +233 59 278 2345
          </div>

          <p className="mt-3 text-sm text-slate-600">
            Scanning the QR code can open the phone dialer with the
            number ready to call.
          </p>
        </div>

        {/* Email */}
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5">
          <h3 className="text-lg font-bold text-orange-800">
            📧 How to create an Email QR Code
          </h3>

          <p className="mt-2 text-slate-700">
            Enter the email address. You can also add a subject and
            message.
          </p>

          <div className="mt-3 bg-white rounded-lg p-3 font-mono text-sm break-all">
            example@email.com
          </div>

          <p className="mt-3 text-sm text-slate-600">
            When scanned, it can open the user's email app with the
            information prepared.
          </p>
        </div>

        {/* Wi-Fi */}
        <div className="bg-cyan-50 border border-cyan-200 rounded-2xl p-5">
          <h3 className="text-lg font-bold text-cyan-800">
            📶 How to create a Wi-Fi QR Code
          </h3>

          <p className="mt-2 text-slate-700">
            Enter your Wi-Fi network name (SSID), password and security
            type.
          </p>

          <div className="mt-3 bg-white rounded-lg p-3 text-sm">
            <p><strong>Wi-Fi name:</strong> MyHomeWiFi</p>
            <p><strong>Password:</strong> MyPassword123</p>
            <p><strong>Security:</strong> WPA</p>
          </div>

          <p className="mt-3 text-sm text-slate-600">
            Guests can scan the QR code to connect to the Wi-Fi without
            manually typing the password.
          </p>
        </div>

        {/* Text */}
        <div className="bg-pink-50 border border-pink-200 rounded-2xl p-5">
          <h3 className="text-lg font-bold text-pink-800">
            📝 How to create a Text QR Code
          </h3>

          <p className="mt-2 text-slate-700">
            Enter any message, instructions, address or other text you
            want people to see after scanning.
          </p>

          <div className="mt-3 bg-white rounded-lg p-3 text-sm">
            Welcome to our business! Thank you for visiting us.
          </div>
        </div>

      </div>

      <div className="mt-8 bg-slate-50 border border-slate-200 rounded-2xl p-5">
        <h3 className="font-bold text-slate-900">
          💡 Quick Tip
        </h3>
        <p className="mt-2 text-slate-600">
          Always test your QR code with your phone before sharing or
          printing it. This helps make sure the information and link work
          correctly.
        </p>
      </div>
    </section>
  );
}
