"use client";
import React, { useEffect, useState, useCallback } from 'react';

interface GalleryViewerProps {
  images: Array<{ src: string; alt?: string }>;
  startIndex?: number;
  onClose: () => void;
}

export default function GalleryViewer({ images, startIndex = 0, onClose }: GalleryViewerProps) {
  const [index, setIndex] = useState(startIndex);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % images.length);
    if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length, onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  if (images.length === 0) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <button onClick={onClose} aria-label="Close" style={{ position: 'absolute', top: 16, right: 16, background: 'transparent', border: 'none', color: '#fff', fontSize: 28, cursor: 'pointer' }}>×</button>
      <button onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)} aria-label="Previous" style={{ position: 'absolute', left: 16, background: 'transparent', border: '1px solid #fff', color: '#fff', padding: '8px 12px', cursor: 'pointer' }}>{'<'}</button>
      <img src={images[index].src} alt={images[index].alt || `Image ${index + 1}`} style={{ maxWidth: '90%', maxHeight: '85%', objectFit: 'contain' }} />
      <button onClick={() => setIndex((i) => (i + 1) % images.length)} aria-label="Next" style={{ position: 'absolute', right: 16, background: 'transparent', border: '1px solid #fff', color: '#fff', padding: '8px 12px', cursor: 'pointer' }}>{'>'}</button>
      <div style={{ position: 'absolute', bottom: 16, color: '#fff' }}>{index + 1} / {images.length}</div>
    </div>
  );
}


