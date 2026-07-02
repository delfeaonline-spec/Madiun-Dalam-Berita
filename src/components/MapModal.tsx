import React from 'react';
import { X, MapPin, ExternalLink, Navigation } from 'lucide-react';

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  address: string;
}

export default function MapModal({ isOpen, onClose, title, address }: MapModalProps) {
  if (!isOpen) return null;

  // Build the embed search URL
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address + ', Madiun')}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  
  // Build the official navigation/search URL
  const externalMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address + ', Madiun')}`;

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true" id="map-modal">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop overlay */}
        <div 
          className="fixed inset-0 transition-opacity bg-slate-900/70 backdrop-blur-sm" 
          onClick={onClose}
          id="map-modal-backdrop"
        ></div>

        {/* Center alignment spacer */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        {/* Modal panel */}
        <div className="inline-block relative z-10 align-bottom bg-white rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full w-full animate-fade-in border border-slate-100">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-start justify-between bg-slate-50">
            <div className="flex gap-3 items-center pr-4">
              <div className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0 border border-emerald-100/50">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base tracking-tight font-serif">Peta Lokasi</h3>
                <p className="text-xs text-slate-500 font-medium truncate max-w-[280px] sm:max-w-[420px] mt-0.5" title={title}>
                  {title}
                </p>
              </div>
            </div>
            
            <button 
              type="button"
              onClick={onClose}
              className="bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 p-2 rounded-full transition cursor-pointer"
              aria-label="Tutup Peta"
              id="map-modal-close-btn"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Map Container */}
          <div className="relative h-80 sm:h-96 w-full bg-slate-100 border-b border-slate-100">
            <iframe
              title={`Peta lokasi untuk ${title}`}
              src={embedUrl}
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Footer & Detail bar */}
          <div className="p-5 space-y-4 bg-slate-50">
            {/* Address detail badge */}
            <div className="flex items-start gap-2.5 p-3.5 bg-white rounded-2xl border border-slate-150 shadow-sm">
              <MapPin className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Alamat / Koordinat Sasaran</span>
                <p className="text-slate-800 text-xs font-semibold leading-relaxed">
                  {address}
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-white hover:bg-slate-100 text-slate-700 font-bold py-2.5 px-4 rounded-xl text-xs border border-slate-200 transition duration-150 text-center cursor-pointer"
                id="map-modal-back-btn"
              >
                Kembali ke Portal
              </button>
              
              <a
                href={externalMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-2.5 px-4 rounded-xl text-xs transition duration-150 text-center flex items-center justify-center gap-1.5 shadow-sm hover:shadow"
                id="map-modal-external-link"
              >
                <Navigation className="h-3.5 w-3.5 shrink-0" />
                <span>Petunjuk Arah & Navigasi</span>
                <ExternalLink className="h-3 w-3 opacity-80" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
