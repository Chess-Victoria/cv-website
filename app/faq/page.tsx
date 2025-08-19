import Layout from "@/components/layout/Layout"
import { getFAQData } from "@/lib/utils/faq"
import PageHeadContent from '@/components/elements/PageHeadContent'

export default async function FAQPage() {
  const faqData = await getFAQData();

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <div>
        <PageHeadContent
          title={faqData.title}
          backgroundImage="/assets/img/bg/header-bg10.png"
          subtitle={faqData.subtitle}
        />

        {/* FAQ Content */}
        <div className="faq-section-area sp10">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                {faqData.faqs.length > 0 ? (
                  <div className="faq-content">
                    {faqData.faqs.map((faq) => (
                      <div key={faq.id} className="faq-item">
                        <h3>{faq.question}</h3>
                        <div className="faq-answer">
                          <p>{faq.answer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center">
                    <p>No FAQ content available at the moment.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}