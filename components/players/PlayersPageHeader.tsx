import Link from "next/link"

interface Category {
  id: string;
  name: string;
  description: string;
}

interface PlayersPageHeaderProps {
  category: Category;
  categorySlug: string;
  isActivePage?: boolean;
}

export default function PlayersPageHeader({ 
  category, 
  categorySlug, 
  isActivePage = false 
}: PlayersPageHeaderProps) {
  return (
    <div className="heading2 text-center space-margin60">
      <h2>
        Top Victorian Players - {category.name}
        {isActivePage && ' (Active)'}
      </h2>
      <p>
        {isActivePage 
          ? 'Showing only players listed as Active by ACF.'
          : category.description
        }
      </p>
      <div className="alert alert-info mt-3" role="alert">
        <i className="fa-solid fa-info-circle me-2"></i>
        <strong>
          {isActivePage ? 'Active status:' : 'Data Source:'}
        </strong>{' '}
        {isActivePage 
          ? 'Based on ACF "Players Active" list. Ratings are updated periodically.'
          : 'This data is based on official ACF (Australian Chess Federation) ratings. Ratings are updated periodically and reflect the most recent official standings.'
        }
      </div>
      {isActivePage && (
        <div className="mt-2">
          <Link href={`/about/players/${categorySlug}`} className="text-decoration-none">
            <i className="fa-solid fa-arrow-left me-1"></i> Back to {category.name}
          </Link>
        </div>
      )}
    </div>
  );
}
