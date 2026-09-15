import React from 'react';
import { Globe, Type, Phone, Mail, Wifi } from 'lucide-react';
import { QRType } from '../types';

interface TypeSelectorProps {
  activeType: QRType;
  onChange: (type: QRType) => void;
}

interface TypeItem {
  id: QRType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const TYPES: TypeItem[] = [
  { id: 'url', label: 'URL / Link', icon: Globe, description: 'Website links' },
  { id: 'text', label: 'Text', icon: Type, description: 'Plain message' },
  { id: 'wifi', label: 'Wi-Fi', icon: Wifi, description: 'Direct network login' },
  { id: 'email', label: 'Email', icon: Mail, description: 'Send prefilled mail' },
  { id: 'phone', label: 'Phone', icon: Phone, description: 'Instant dialer' },
];

export const TypeSelector: React.FC<TypeSelectorProps> = ({ activeType, onChange }) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {TYPES.map((item) => {
          const Icon = item.icon;
          const isActive = activeType === item.id;
          return (
            <button
              key={item.id}
              id={`type-tab-${item.id}`}
              type="button"
              onClick={() => onChange(item.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap cursor-pointer select-none ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-600 ring-offset-2'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
