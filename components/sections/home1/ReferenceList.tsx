'use client'
import Link from 'next/link'
import { ReferenceListData } from '@/lib/types/reference-list'

interface ReferenceListProps {
  data: ReferenceListData;
}



export default function ReferenceList({ data }: ReferenceListProps) {
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
          {data.items.map((item, index) => (
            <div key={item.id} className="col-lg-3 col-md-6" data-aos="zoom-in" data-aos-duration={800 + (index * 100)}>
              <div className="brand-box" style={{ backgroundColor: '#A02BBD',  color:"white"}}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  {item.url ? (
                    <Link href={item.url} target="_blank" rel="noopener noreferrer">
                      <img src={item.image.src} alt={item.image.alt} />
                    </Link>
                  ) : (
                    <img src={item.image.src} alt={item.image.alt} />
                  )}
                  <span style={{ 
                    fontSize: '20px', 
                    fontWeight: 'bold', 
                    minWidth: 'fit-content',
                    color: 'white'
                  }}>
                    {item.shortName}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
