import CommitteeList from '@/components/sections/home1/CommitteeList'
import { CommitteeListData } from '@/lib/types/committee-list'

// Example data for demonstration
const exampleCommitteeListData: CommitteeListData = {
  title: "Chess Victoria Executive Committee",
  subtitle: "Meet Our Leadership",
  members: [
    {
      id: "president",
      name: "Dr. Peter Tsai",
      title: "President & International Arbiter",
      image: {
        src: "/assets/img/all-images/team/team-img1.png",
        alt: "Dr. Peter Tsai"
      },
      socialLinks: {
        linkedin: "https://linkedin.com/in/peter-tsai",
        email: "president@chessvictoria.org"
      },
      profileUrl: "/committee/president"
    },
    {
      id: "vice-president",
      name: "Sarah Johnson",
      title: "Vice President",
      image: {
        src: "/assets/img/all-images/team/team-img2.png",
        alt: "Sarah Johnson"
      },
      socialLinks: {
        facebook: "https://facebook.com/sarah.johnson",
        linkedin: "https://linkedin.com/in/sarah-johnson"
      },
      profileUrl: "/committee/vice-president"
    },
    {
      id: "treasurer",
      name: "Michael Chen",
      title: "Treasurer",
      image: {
        src: "/assets/img/all-images/team/team-img3.png",
        alt: "Michael Chen"
      },
      socialLinks: {
        linkedin: "https://linkedin.com/in/michael-chen",
        email: "treasurer@chessvictoria.org"
      },
      profileUrl: "/committee/treasurer"
    }
  ]
}

export default function CommitteeListExample() {
  return (
    <div>
      <h2>CommitteeList Component Example</h2>
      <p>This demonstrates the CommitteeList component with custom data:</p>
      <CommitteeList data={exampleCommitteeListData} />
    </div>
  )
}
