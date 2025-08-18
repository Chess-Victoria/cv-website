"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import GalleryViewer from './GalleryViewer';

interface Props {
  images: Array<{ src: string; alt?: string }>;
  title?: string;
  referenceLink?: string;
}

export default function GalleryGridWithViewer({ images, title, referenceLink }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  return (
    <>
      <div className="row">
        {images.map((img, idx) => (
          <div className="col-lg-4 col-md-6" key={idx}>
            <div className="memory3-boxarea">
              <div className="img1" onClick={() => { setStartIndex(idx); setIsOpen(true); }} style={{ cursor: 'zoom-in' }}>
                <img src={img.src} alt={img.alt || `Gallery image ${idx + 1}`} />
              </div>
              <div className="content-area">
                <p>{title || 'Gallery'}</p>
                <div className="space12" />
                {referenceLink ? (
                  <Link href={referenceLink}>View {title}</Link>
                ) : null}
                <div className="plus">
                  <a href="#" onClick={(e) => { e.preventDefault(); setStartIndex(idx); setIsOpen(true); }}><i className="fa-solid fa-plus" /></a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isOpen && (
        <GalleryViewer images={images} startIndex={startIndex} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
}


