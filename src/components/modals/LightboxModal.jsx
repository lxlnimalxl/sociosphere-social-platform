import React from 'react';
import { X, ZoomIn, Download } from 'lucide-react';

export default function LightboxModal({ image, isOpen, onClose }) {
  if (!isOpen || !image) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl max-h-[90vh] flex flex-col items-center justify-center animate-scale-up"
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition cursor-pointer"
        >
          <X size={22} />
        </button>

        <img
          src={image}
          alt="High resolution view"
          className="max-w-full max-h-[82vh] rounded-2xl object-contain shadow-2xl ring-1 ring-white/15"
        />
      </div>
    </div>
  );
}
