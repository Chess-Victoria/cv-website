import ReferenceList from '@/components/sections/home1/ReferenceList'
import { ReferenceListData } from '@/lib/types/reference-list'
import { generateShortName } from '@/lib/utils/name-utils'

// Example 1: Committee Members
const committeeData: ReferenceListData = {
  title: "Chess Victoria Committee",
  subtitle: "Our Leadership Team",
  items: [
    {
      id: "president",
      name: "Dr. Peter Tsai",
      shortName: "PT",
      image: {
        src: "/assets/img/all-images/team/team-img1.png",
        alt: "Dr. Peter Tsai"
      },
      title: "President & International Arbiter",
      socialLinks: {
        linkedin: "https://linkedin.com/in/peter-tsai",
        email: "president@chessvictoria.org"
      },
      url: "/committee/president"
    },
    {
      id: "vice-president",
      name: "Sarah Johnson",
      shortName: "SJ",
      image: {
        src: "/assets/img/all-images/team/team-img2.png",
        alt: "Sarah Johnson"
      },
      title: "Vice President",
      socialLinks: {
        facebook: "https://facebook.com/sarah.johnson",
        linkedin: "https://linkedin.com/in/sarah-johnson"
      },
      url: "/committee/vice-president"
    }
  ]
};

// Example 2: Tournament Winners
const winnersData: ReferenceListData = {
  title: "Tournament Champions",
  subtitle: "Recent Winners",
  items: [
    {
      id: "champion-1",
      name: "Alex Chen",
      shortName: "AC",
      image: {
        src: "/assets/img/all-images/team/team-img3.png",
        alt: "Alex Chen"
      },
      title: "2024 Victorian Champion",
      description: "Scored 8.5/9 points",
      url: "/champions/alex-chen"
    },
    {
      id: "champion-2",
      name: "Maria Rodriguez",
      shortName: "MR",
      image: {
        src: "/assets/img/all-images/team/team-img1.png",
        alt: "Maria Rodriguez"
      },
      title: "2024 Junior Champion",
      description: "Undefeated with 7/7 points",
      url: "/champions/maria-rodriguez"
    }
  ]
};

// Example 3: Chess Clubs
const clubsData: ReferenceListData = {
  title: "Affiliated Chess Clubs",
  subtitle: "Our Network",
  items: [
    {
      id: "club-1",
      name: "Box Hill Chess Club",
      shortName: "BHCC",
      image: {
        src: "/assets/img/all-images/team/team-img2.png",
        alt: "Box Hill Chess Club"
      },
      title: "Premier Division Club",
      description: "Established 1950",
      url: "/clubs/box-hill"
    },
    {
      id: "club-2",
      name: "Melbourne Chess Club",
      shortName: "MCC",
      image: {
        src: "/assets/img/all-images/team/team-img3.png",
        alt: "Melbourne Chess Club"
      },
      title: "Historic Club",
      description: "Established 1866",
      url: "/clubs/melbourne"
    }
  ]
};

export default function ReferenceListExample() {
  return (
    <div>
      <h2>ReferenceList Component Examples</h2>
      
      <div style={{ marginBottom: '50px' }}>
        <h3>Example 1: Committee Members</h3>
        <p>This demonstrates the ReferenceList component with committee member data:</p>
        <ReferenceList data={committeeData} />
      </div>

      <div style={{ marginBottom: '50px' }}>
        <h3>Example 2: Tournament Winners</h3>
        <p>This demonstrates the ReferenceList component with tournament winner data:</p>
        <ReferenceList data={winnersData} />
      </div>

      <div style={{ marginBottom: '50px' }}>
        <h3>Example 3: Chess Clubs</h3>
        <p>This demonstrates the ReferenceList component with chess club data:</p>
        <ReferenceList data={clubsData} />
      </div>
    </div>
  )
}
