'use client'
import Link from "next/link"
import { useState } from "react"
import { FAQData } from "@/lib/types/faq"
import PageHeadContent from '@/components/elements/PageHeadContent'
import CTAWithCountdown from "../home1/CTAWithCountdown"

interface FAQPageClientProps {
  data: {
    title: string;
    subtitle: string;
    faqs: FAQData[];
    availableTags: string[];
  };
}

export default function FAQPageClient({ data }: FAQPageClientProps) {
  const [isTab, setIsTab] = useState(1)
  const [isAccordion, setIsAccordion] = useState<number | null>(1)

  const handleTab = (i: number) => {
    setIsTab(i)
  }

  const handleAccordion = (key: number) => {
    setIsAccordion(prevState => prevState === key ? null : key)
  }

  // Group FAQs by tags for tab display
  const getFAQsByTag = (tag: string | null) => {
    if (!tag) return data.faqs;
    return data.faqs.filter(faq => faq.tags.includes(tag));
  }

  // Get unique tags for tabs (limit to 4 for the tab structure)
  const tabTags = data.availableTags.slice(0, 4); // We'll have "All" + 4 tag tabs

  // Split FAQs into two columns
  const splitFAQsIntoColumns = (faqs: FAQData[]) => {
    const midPoint = Math.ceil(faqs.length / 2);
    return {
      leftColumn: faqs.slice(0, midPoint),
      rightColumn: faqs.slice(midPoint)
    };
  }

  const renderAccordionItem = (faq: FAQData, index: number) => (
    <div key={faq.id} className="accordion-item">
      <h2 className="accordion-header" onClick={() => handleAccordion(index + 1)}>
        <button 
          className={isAccordion === (index + 1) ? "accordion-button" : "accordion-button collapsed"} 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target={`#collapse${index + 1}`} 
          aria-expanded={isAccordion === (index + 1)} 
          aria-controls={`collapse${index + 1}`}
        >
          {faq.question}
        </button>
      </h2>
      <div 
        id={`collapse${index + 1}`} 
        className={isAccordion === (index + 1) ? "accordion-collapse collapse show" : "accordion-collapse collapse"} 
        data-bs-parent="#accordionExample"
      >
        <div className="accordion-body">
          <div>{faq.answer}</div>
          {faq.tags.length > 0 && (
            <div style={{ marginTop: '10px' }}>
              {faq.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: '2px 8px',
                    backgroundColor: '#A02BBD',
                    color: 'white',
                    borderRadius: '12px',
                    fontSize: '11px',
                    marginRight: '5px',
                    display: 'inline-block',
                    marginBottom: '5px'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderTabContent = (tag: string | null, tabIndex: number) => {
    const faqsForTag = getFAQsByTag(tag);
    const { leftColumn, rightColumn } = splitFAQsIntoColumns(faqsForTag);

    return (
      <div className={isTab === tabIndex ? "tab-pane fade show active" : "tab-pane fade"} 
           id={`pills-${tabIndex === 1 ? 'home' : `tab${tabIndex}`}`} 
           role="tabpanel" 
           aria-labelledby={`pills-${tabIndex === 1 ? 'home' : `tab${tabIndex}`}-tab`} 
           tabIndex={0}>
        <div className="faq-section-area">
          <div className="row">
            <div className="col-lg-6">
              <div className="accordian-area">
                <div className="accordion" id={`accordionExample${tabIndex}`}>
                  {leftColumn.map((faq, index) => renderAccordionItem(faq, index))}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="accordian-area">
                <div className="accordion" id={`accordionExample${tabIndex + 1}`}>
                  {rightColumn.map((faq, index) => renderAccordionItem(faq, leftColumn.length + index))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <PageHeadContent
        title="Frequently Asked Questions"
        backgroundImage="/assets/img/bg/header-bg15.png"
        subtitle={data.subtitle}
        breadcrumbs={[
          { name: "Home", link: "/" },
          { name: "Frequently Asked Questions", link: "/faq" }
        ]}
      />

      {/*===== FAQ AREA STARTS =======*/}
      <div className="faq-inner-section-area sp1">
        <div className="container">
          
          <div className="row">
            <div className="col-lg-11">
              <div className="faq-widget-area">
                <div className="faq-tab-navigation">
                  <ul className="nav nav-pills accordion-item" id="pills-tab" role="tablist">
                    <li className="nav-item" onClick={() => handleTab(1)}>
                      <button className={isTab == 1 ? "nav-link active" : "nav-link"} id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">All</button>
                    </li>
                    {tabTags.map((tag, index) => (
                      <li key={tag} className="nav-item" onClick={() => handleTab(index + 2)}>
                        <button className={isTab == (index + 2) ? "nav-link active" : "nav-link"} id={`pills-${tag}-tab`} data-bs-toggle="pill" data-bs-target={`#pills-${tag}`} type="button" role="tab" aria-controls={`pills-${tag}`} aria-selected="false">{tag}</button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space48" />
                <div className="tab-content" id="pills-tabContent">
                  {renderTabContent(null, 1)} {/* All questions */}
                  {tabTags.map((tag, index) => renderTabContent(tag, index + 2))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*===== FAQ AREA ENDS =======*/}

      {/*===== CTA AREA STARTS =======*/}
      <CTAWithCountdown
						buttonLabel="Contact Us"
						buttonHref="/contact"
						useFeaturedEvent
					/>
    </div>
  )
}
