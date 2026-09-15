import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, Search, Check, Globe } from 'lucide-react';
import { COUNTRY_CODES, CountryCode, POPULAR_COUNTRY_CODES } from '../data/countryCodes';

interface CountryCodeSelectProps {
  selectedDialCode: string;
  onSelect: (dialCode: string) => void;
}

export const CountryCodeSelect: React.FC<CountryCodeSelectProps> = ({
  selectedDialCode,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Find the active country (or fallback to the first match for that dial code)
  const currentCountry = useMemo(() => {
    return (
      COUNTRY_CODES.find((c) => c.dialCode === selectedDialCode) || {
        name: 'Custom',
        code: '',
        dialCode: selectedDialCode || '+1',
        flag: '🌐',
      }
    );
  }, [selectedDialCode]);

  // Filter countries according to query
  const filteredCountries = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return COUNTRY_CODES;

    // Support searching by "+1", "1", "united states", "us", etc.
    const cleanDialQuery = query.startsWith('+') ? query : `+${query}`;

    return COUNTRY_CODES.filter((item) => {
      const matchName = item.name.toLowerCase().includes(query);
      const matchIso = item.code.toLowerCase() === query;
      const matchDial =
        item.dialCode.toLowerCase().includes(query) ||
        item.dialCode === cleanDialQuery;
      return matchName || matchIso || matchDial;
    });
  }, [searchQuery]);

  // Popular countries subset
  const popularCountries = useMemo(() => {
    return COUNTRY_CODES.filter((c) => POPULAR_COUNTRY_CODES.includes(c.code));
  }, []);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Focus search input on open
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelectCountry = (country: CountryCode) => {
    onSelect(country.dialCode);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        id="btn-country-code-trigger"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 h-full px-3 py-3 border border-r-0 border-slate-300 bg-slate-50 hover:bg-slate-100 rounded-l-xl text-slate-800 text-sm font-semibold transition-colors cursor-pointer select-none focus:outline-hidden focus:ring-2 focus:ring-blue-600/20"
        title="Select Country Calling Code"
      >
        <span className="text-lg leading-none" role="img" aria-label={currentCountry.name}>
          {currentCountry.flag}
        </span>
        <span className="font-mono text-xs sm:text-sm text-slate-700 font-bold">
          {currentCountry.dialCode}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-500 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Popover Dropdown */}
      {isOpen && (
        <div
          id="country-code-dropdown"
          className="absolute z-50 left-0 top-full mt-1.5 w-72 sm:w-80 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100"
        >
          {/* Search Header */}
          <div className="p-2.5 border-b border-slate-100 bg-slate-50/70">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search country or code (+44, 91, UK)..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* Quick Popular shortcuts when not searching */}
          {!searchQuery && (
            <div className="px-2.5 py-2 border-b border-slate-100 bg-slate-50/40">
              <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 block mb-1.5">
                Popular Countries
              </span>
              <div className="flex flex-wrap gap-1">
                {popularCountries.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => handleSelectCountry(c)}
                    className={`inline-flex items-center gap-1 px-1.5 py-1 rounded-md text-xs transition-colors cursor-pointer ${
                      c.dialCode === selectedDialCode
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{c.flag}</span>
                    <span className="font-mono text-[11px]">{c.dialCode}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Full Scrollable List */}
          <div className="max-h-60 overflow-y-auto divide-y divide-slate-50 py-1">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => {
                const isSelected = country.dialCode === selectedDialCode;
                return (
                  <button
                    key={`${country.code}-${country.dialCode}`}
                    type="button"
                    onClick={() => handleSelectCountry(country)}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-blue-50 transition-colors text-xs cursor-pointer ${
                      isSelected ? 'bg-blue-50/80 font-medium' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <span className="text-base leading-none shrink-0" role="img">
                        {country.flag}
                      </span>
                      <span className="truncate text-slate-800">
                        {country.name}
                      </span>
                      <span className="text-[10px] text-slate-400 uppercase font-mono shrink-0">
                        ({country.code})
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="font-mono text-slate-600 font-semibold">
                        {country.dialCode}
                      </span>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      )}
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="p-4 text-center text-xs text-slate-500">
                No matching countries found for "{searchQuery}".
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
