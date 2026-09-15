export type QRType = 'url' | 'text' | 'phone' | 'email' | 'wifi';

export interface WifiData {
  ssid: string;
  password: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
  hidden: boolean;
}

export interface EmailData {
  address: string;
  subject: string;
  body: string;
}

export interface PhoneData {
  countryCode: string;
  number: string;
}

export interface QRState {
  type: QRType;
  url: string;
  text: string;
  phone: PhoneData;
  email: EmailData;
  wifi: WifiData;
}

export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface QRConfig {
  size: number;
  fgColor: string;
  bgColor: string;
  margin: number;
  errorCorrectionLevel: ErrorCorrectionLevel;
}
