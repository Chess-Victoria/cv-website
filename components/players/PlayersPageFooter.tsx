import Link from "next/link"

interface PlayersPageFooterProps {
  categorySlug: string;
  isActivePage?: boolean;
}

export default function PlayersPageFooter({ 
  categorySlug, 
  isActivePage = false 
}: PlayersPageFooterProps) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-10 m-auto">
          <div className="text-center mt-3 mb-5">
            <p className="mb-0">
              Not in the list?{' '}
              <a href="/players/search" className="text-primary text-decoration-underline">
                You can search all Victorian players here
              </a>.
            </p>
            {!isActivePage && (
              <p className="mt-2 mb-0">
                See standings by Active players:{' '}
                <Link href={`/about/players/${categorySlug}/active`} className="text-primary text-decoration-underline">
                  Go to Active page
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
