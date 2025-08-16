import ReferenceList from '@/components/sections/home1/ReferenceList'
import { ReferenceListData } from '@/lib/types/reference-list'
import { generateShortName } from '@/lib/utils/name-utils'

// Example 1: Official Sponsors
const officialSponsorsData: ReferenceListData = {
  title: "Our Official Sponsors",
  subtitle: "General Sponsors",
  items: [
    {
      id: "sponsor-1",
      name: "Chess Victoria",
      shortName: "CV",
      image: {
        src: "/assets/img/elements/brand-img1.png",
        alt: "Chess Victoria"
      },
      title: "Official Sponsor",
      url: "https://chessvictoria.org"
    },
    {
      id: "sponsor-2",
      name: "Melbourne Chess Club",
      shortName: "MCC",
      image: {
        src: "/assets/img/elements/brand-img2.png",
        alt: "Melbourne Chess Club"
      },
      title: "Premier Sponsor",
      url: "https://melbournechessclub.org"
    }
  ]
};

// Example 2: Tournament Sponsors
const tournamentSponsorsData: ReferenceListData = {
  title: "Tournament Sponsors",
  subtitle: "Championship Supporters",
  items: [
    {
      id: "tournament-1",
      name: "Australian Chess Federation",
      shortName: "ACF",
      image: {
        src: "/assets/img/elements/brand-img4.png",
        alt: "Australian Chess Federation"
      },
      title: "National Sponsor",
      url: "https://auschess.org.au"
    },
    {
      id: "tournament-2",
      name: "FIDE",
      shortName: "F",
      image: {
        src: "/assets/img/elements/brand-img7.png",
        alt: "FIDE"
      },
      title: "International Sponsor",
      url: "https://fide.com"
    }
  ]
};

// Example 3: Technology Partners
const techPartnersData: ReferenceListData = {
  title: "Technology Partners",
  subtitle: "Digital Chess Platforms",
  items: [
    {
      id: "tech-1",
      name: "Chess.com",
      shortName: "C",
      image: {
        src: "/assets/img/elements/brand-img5.png",
        alt: "Chess.com"
      },
      title: "Online Platform",
      url: "https://chess.com"
    },
    {
      id: "tech-2",
      name: "Lichess",
      shortName: "L",
      image: {
        src: "/assets/img/elements/brand-img6.png",
        alt: "Lichess"
      },
      title: "Free Chess Platform",
      url: "https://lichess.org"
    }
  ]
};

export default function SponsorsListExample() {
  return (
    <div>
      <h2>ReferenceList Component Examples (Sponsors)</h2>
      
      <div style={{ marginBottom: '50px' }}>
        <h3>Example 1: Official Sponsors</h3>
        <p>This demonstrates the ReferenceList component with official sponsor data:</p>
        <ReferenceList data={officialSponsorsData} />
      </div>

      <div style={{ marginBottom: '50px' }}>
        <h3>Example 2: Tournament Sponsors</h3>
        <p>This demonstrates the ReferenceList component with tournament sponsor data:</p>
        <ReferenceList data={tournamentSponsorsData} />
      </div>

      <div style={{ marginBottom: '50px' }}>
        <h3>Example 3: Technology Partners</h3>
        <p>This demonstrates the ReferenceList component with technology partner data:</p>
        <ReferenceList data={techPartnersData} />
      </div>
    </div>
  )
}
