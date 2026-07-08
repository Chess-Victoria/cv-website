import Link from "next/link"
import CommitteeList from "./CommitteeList"
import { getCommitteePageData } from "@/lib/utils/committee"

interface CommitteesPageDataFetcherProps {
  basePath?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  ctaTitle?: string;
  ctaDescription?: string;
}

export default async function CommitteesPageDataFetcher({
  basePath,
  emptyTitle = "Committee Members",
  emptyDescription = "No committee data available at the moment.",
  ctaTitle = "Join Our Committee",
  ctaDescription = "Interested in contributing to Chess Victoria? Contact us to learn about committee opportunities."
}: CommitteesPageDataFetcherProps) {
  // Fetch committee data from Contentful
  const committeeLists = await getCommitteePageData();

  return (
    <>
      {/* Committee Lists */}
      <div className="committee-section-area sp10">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {committeeLists.length > 0 ? (
                committeeLists.map((committee) => (
                  <CommitteeList key={committee.id} committee={committee} basePath={basePath} />
                ))
              ) : (
                <div className="text-center">
                  <h2>{emptyTitle}</h2>
                  <p>{emptyDescription}</p>
                  <p>Please ensure committee data has been created and published in Contentful.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section-area sp10">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="cta-content text-center">
                <h2>{ctaTitle}</h2>
                <p>{ctaDescription}</p>
                <Link href="/contact" className="readmore">
                  Contact Us <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
