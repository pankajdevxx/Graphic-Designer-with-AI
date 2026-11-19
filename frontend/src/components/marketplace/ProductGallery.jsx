import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * ProductGallery Component
 * Multi-image gallery with thumbnail selector and lightbox zoom.
 */
export const ProductGallery = ({ images = [], title = 'Product Preview' }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const displayImages = images.length > 0
    ? images
    : ['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80'];

  const currentImage = displayImages[selectedIndex] || displayImages[0];

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % displayImages.length);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  return (
    <div className="space-y-4">
      {/* Main Image Viewer */}
      <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-[#0d0620] border border-white/10 group shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage}
            src={currentImage}
            alt={`${title} - Preview ${selectedIndex + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        {/* Zoom Lightbox Trigger */}
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-black/90 hover:scale-105 transition-all opacity-0 group-hover:opacity-100"
          title="Enlarge preview"
        >
          <Maximize2 size={16} />
        </button>

        {/* Carousel Arrow Controls if multiple images */}
        {displayImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {/* Counter Pill */}
        {displayImages.length > 1 && (
          <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono text-white">
            {selectedIndex + 1} / {displayImages.length}
          </div>
        )}
      </div>

      {/* Thumbnails Row */}
      {displayImages.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
          {displayImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`relative aspect-[4/3] rounded-xl overflow-hidden border transition-all ${
                selectedIndex === idx
                  ? 'border-purple-400 ring-2 ring-purple-500/50 scale-102'
                  : 'border-white/10 opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxOpen(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-2xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-5xl w-full max-h-[90vh] z-10 flex items-center justify-center"
            >
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="absolute -top-12 right-0 p-2 text-slate-300 hover:text-white"
              >
                <X size={24} />
              </button>
              <img
                src={currentImage}
                alt="Enlarged design preview"
                className="max-h-[85vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-white/15"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductGallery;
