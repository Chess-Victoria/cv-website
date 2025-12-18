'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ImageGalleryImageData } from '@/lib/types/image-gallery'

interface FooterGalleryProps {
  fallbackImages?: ImageGalleryImageData[]
}

export default function FooterGallery({ fallbackImages = [] }: FooterGalleryProps) {
  const [images, setImages] = useState<ImageGalleryImageData[]>(fallbackImages)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [hasFetched, setHasFetched] = useState(false)

  useEffect(() => {
    // Only fetch once and only if we don't have fallback images
    if (fallbackImages.length === 0 && !hasFetched) {
      const fetchGalleryImages = async () => {
        setLoading(true)
        setError(false)
        setHasFetched(true)
        
        try {
          const response = await fetch('/api/footer-gallery', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })

          if (!response.ok) {
            throw new Error('Failed to fetch gallery images')
          }

          const data = await response.json()
          
          if (data.images && data.images.length > 0) {
            setImages(data.images)
          }
        } catch (err) {
          console.error('Error fetching footer gallery:', err)
          setError(true)
          setImages([])
        } finally {
          setLoading(false)
        }
      }

      fetchGalleryImages()
    }
  }, [fallbackImages.length, hasFetched])

  // Show loading state
  if (loading && images.length === 0) {
    return (
      <div className="footer-social-box">
        {/* <h3>Our Recent Event Gallery</h3> */}
        <div className="space12" />
        <div className="row">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="col-lg-4 col-md-4 col-4">
              <div className="img1" style={{ 
                backgroundColor: '#f0f0f0', 
                height: '80px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <div style={{ fontSize: '12px', color: '#999' }}>Loading...</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Show error state
  if (error && images.length === 0) {
    return (
      <div className="footer-social-box">
        {/* <h3>Our Recent Event Gallery</h3> */}
        <div className="space12" />
        <div className="row">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="col-lg-4 col-md-4 col-4">
              <div className="img1" style={{ 
                backgroundColor: '#f0f0f0', 
                height: '80px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <div style={{ fontSize: '12px', color: '#999' }}>No image</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="footer-social-box">
      {/* <h3>Our Recent Event Gallery</h3> */}
      <div className="space12" />
      <div className="row">
        {images.map((image, index) => (
          <div key={index} className="col-lg-4 col-md-4 col-4">
            <div className="img1">
              <img 
                src={image.src} 
                alt={image.alt || `Gallery image ${index + 1}`}
                style={{ 
                  width: '100%', 
                  height: '80px', 
                  objectFit: 'cover' 
                }}
              />
              <div className="icons">
                <Link href="/memories">
                  <i className="fa-brands fa-instagram" />
                </Link>
              </div>
            </div>
          </div>
        ))}
        {/* Fill remaining slots if less than 6 images */}
        {Array.from({ length: Math.max(0, 6 - images.length) }).map((_, index) => (
          <div key={`empty-${index}`} className="col-lg-4 col-md-4 col-4">
            <div className="img1" style={{ 
              backgroundColor: '#f0f0f0', 
              height: '80px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <div style={{ fontSize: '12px', color: '#999' }}>No image</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
