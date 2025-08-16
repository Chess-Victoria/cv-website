'use client'
import { useState } from 'react'
import { FAQData } from '@/lib/types/faq'

interface FAQListProps {
  data: {
    title: string;
    subtitle: string;
    faqs: FAQData[];
    availableTags: string[];
  };
}

export default function FAQList({ data }: FAQListProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  // Filter FAQs based on selected tag
  const filteredFAQs = selectedTag 
    ? data.faqs.filter(faq => faq.tags.includes(selectedTag))
    : data.faqs;

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const handleTagClick = (tag: string | null) => {
    setSelectedTag(tag);
    // Close all items when changing filter
    setOpenItems(new Set());
  };

  return (
    <div className="faq-section-area sp2">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 m-auto">
            <div className="faq-header heading2 space-margin60 text-center">
              <h5 data-aos="fade-left" data-aos-duration={800}>{data.subtitle}</h5>
              <div className="space16" />
              <h2 className="text-anime-style-3">{data.title}</h2>
            </div>
          </div>
        </div>

        {/* Tag Filter */}
        {data.availableTags.length > 0 && (
          <div className="row">
            <div className="col-lg-12">
              <div className="tag-filter text-center" style={{ marginBottom: '40px' }}>
                <div className="filter-buttons">
                  <button
                    onClick={() => handleTagClick(null)}
                    className={`filter-btn ${!selectedTag ? 'active' : ''}`}
                    style={{
                      padding: '8px 16px',
                      margin: '0 5px',
                      border: '2px solid #A02BBD',
                      borderRadius: '20px',
                      backgroundColor: !selectedTag ? '#A02BBD' : 'transparent',
                      color: !selectedTag ? 'white' : '#A02BBD',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    All Questions
                  </button>
                  {data.availableTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagClick(tag)}
                      className={`filter-btn ${selectedTag === tag ? 'active' : ''}`}
                      style={{
                        padding: '8px 16px',
                        margin: '0 5px',
                        border: '2px solid #A02BBD',
                        borderRadius: '20px',
                        backgroundColor: selectedTag === tag ? '#A02BBD' : 'transparent',
                        color: selectedTag === tag ? 'white' : '#A02BBD',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FAQ Items */}
        <div className="row">
          <div className="col-lg-8 m-auto">
            <div className="faq-accordion">
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map((faq, index) => (
                  <div key={faq.id} className="faq-item" data-aos="fade-up" data-aos-duration={800 + (index * 100)}>
                    <div 
                      className="faq-question"
                      onClick={() => toggleItem(faq.id)}
                      style={{
                        padding: '20px',
                        backgroundColor: '#f8f9fa',
                        border: '1px solid #e9ecef',
                        borderRadius: '8px',
                        marginBottom: '10px',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <h4 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
                        {faq.question}
                      </h4>
                      <span style={{ 
                        fontSize: '20px', 
                        fontWeight: 'bold',
                        color: '#A02BBD',
                        transition: 'transform 0.3s ease',
                        transform: openItems.has(faq.id) ? 'rotate(45deg)' : 'rotate(0deg)'
                      }}>
                        {openItems.has(faq.id) ? '−' : '+'}
                      </span>
                    </div>
                    
                    {openItems.has(faq.id) && (
                      <div 
                        className="faq-answer"
                        style={{
                          padding: '20px',
                          backgroundColor: 'white',
                          border: '1px solid #e9ecef',
                          borderTop: 'none',
                          borderRadius: '0 0 8px 8px',
                          marginBottom: '20px'
                        }}
                      >
                        <div style={{ lineHeight: '1.6' }}>
                          {faq.answer}
                        </div>
                        
                        {/* Tags */}
                        {faq.tags.length > 0 && (
                          <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #e9ecef' }}>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                              {faq.tags.map((tag) => (
                                <span
                                  key={tag}
                                  style={{
                                    padding: '4px 8px',
                                    backgroundColor: '#A02BBD',
                                    color: 'white',
                                    borderRadius: '12px',
                                    fontSize: '12px',
                                    fontWeight: '500'
                                  }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center" style={{ padding: '40px' }}>
                  <h4>No questions found</h4>
                  <p>No questions match the selected filter.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
