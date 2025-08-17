import Layout from "@/components/layout/Layout"
import { getFAQData } from "@/lib/utils/faq"

export default async function FAQPage() {
  const faqData = await getFAQData();

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <div>
        <div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg10.png)' }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-6 m-auto">
                <div className="heading1 text-center">
                  <h1>{faqData.title}</h1>
                  <div className="space20" />
                  <p>{faqData.subtitle}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

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