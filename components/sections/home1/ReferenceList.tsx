'use client'
import Link from 'next/link'
import { ReferenceListData } from '@/lib/types/reference-list'

interface ReferenceListProps {
  data: ReferenceListData;
  useTextLogo?: boolean;
}



export default function ReferenceList({ data, useTextLogo = false }: ReferenceListProps) {
  const getInitials = (text: string): string => {
    if (!text) return '?'
    const parts = text
      .trim()
      .split(/[\s\-_/]+/)
      .filter(Boolean)
    if (parts.length === 0) return '?'
    const initials = parts.map(p => p.charAt(0)).join('').toUpperCase()
    return initials.slice(0, 4)
  }

  return (
    <div className="brands1-section-area sp2">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 m-auto">
            <div className="brand-header heading2 space-margin60 text-center">
              <h5 data-aos="fade-left" data-aos-duration={800}>{data.subtitle}</h5>
              <div className="space16" />
              <h2 className="text-anime-style-3">{data.title}</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {data.items.map((item, index) => {
            const initials = getInitials(item.shortName || item.name)
            const logoNode = useTextLogo ? (
              <div
                className="text-logo-circle"
                aria-label={`Logo ${item.shortName || item.name}`}
                data-length={String(initials.length)}
              >
                {initials}
              </div>
            ) : (
              <img src={item.image.src} alt={item.image.alt} />
            )

            return (
              <div key={`reference-${item.id}-${index}`} className="col-lg-3 col-md-6" data-aos="zoom-in" data-aos-duration={800 + (index * 100)}>
                <div className="brand-box" style={{ backgroundColor: '#A02BBD',  color:"white"}}>
                  <div className="w-full" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {item.url ? (
                      <Link href={item.url} target="_blank" rel="noopener noreferrer">
                        {logoNode}
                      </Link>
                    ) : (
                      logoNode
                    )}
                    <span style={{ 
                      fontSize: '18px', 
                      fontWeight: 'bold', 
                      color: 'white'
                    }}>
                      {item.shortName}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
