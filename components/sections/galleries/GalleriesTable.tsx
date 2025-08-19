import React from "react";
import Link from "next/link";
import { ImageGalleryData } from "@/lib/types/image-gallery";

interface GalleriesTableProps {
  galleries: ImageGalleryData[];
}

export default function GalleriesTable({ galleries }: GalleriesTableProps) {
  if (!galleries || galleries.length === 0) {
    return (
      <div className="schedule-section-area sp10">
        <div className="container">
          <div className="row">
            <div className="col-lg-11 m-auto">
              <div className="text-center">
                <p>No galleries available at the moment.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="schedule-section-area sp10">
      <div className="container">
        <div className="row">
          <div className="col-lg-11 m-auto">
            {/* Header Section */}
            <div className="row mb-4">
              <div className="col-lg-12">
                <div className="heading2 text-center space-margin60">
                  <h2>All Photo Galleries</h2>
                  <p>Browse our collection of chess event photos and memories</p>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="row mb-3">
              <div className="col-lg-12">
                <div className="text-center">
                  <p>Showing all {galleries.length} galleries</p>
                </div>
              </div>
            </div>

            {/* Galleries Table */}
            <div className="schedule">
              <table>
                <thead>
                  <tr>
                    <th>Gallery Name</th>
                    <th>Description</th>
                    <th>Images</th>
                    <th>Reference</th>
                  </tr>
                </thead>
                <tbody>
                  {galleries.map((gallery) => (
                    <tr key={gallery.id}>
                      <td>
                        <Link href={`/galleries/${gallery.slug}`} style={{ color: '#A02BBD', textDecoration: 'none', fontWeight: 'bold' }}>
                          {gallery.title}
                        </Link>
                      </td>
                      <td>
                        {gallery.descriptionHtml ? (
                          <div dangerouslySetInnerHTML={{ __html: gallery.descriptionHtml }} />
                        ) : (
                          'No description available'
                        )}
                      </td>
                      <td>
                        {gallery.images.length} image{gallery.images.length !== 1 ? 's' : ''}
                      </td>
                      <td>
                        {gallery.referenceLink ? (
                          <a 
                            href={gallery.referenceLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-muted"
                            style={{ fontSize: '12px' }}
                          >
                            View Reference
                          </a>
                        ) : (
                          'No reference link'
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}
