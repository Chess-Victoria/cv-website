import HeroBanner, { HeroBannerData } from '@/components/sections/home1/HeroBanner'

export default function HeroBannerExample() {
  // Example 1: Default hero banner
  const defaultHeroData: HeroBannerData = {
    tagline: {
      icon: "/assets/img/icons/sub-logo1.svg",
      text: "Lead Purpose, Innovate with Passion"
    },
    title: "Business Forward 2025 Strategies \nfor a New Era",
    description: "Welcome Innovate 2025 Shaping the Future of Business, \nwhere industry leaders, innovators, and visionaries come.",
    buttons: {
      primary: {
        text: "Reserve My Seat",
        url: "/event-schedule"
      },
      secondary: {
        text: "Learn More",
        url: "/about"
      }
    },
    eventInfo: {
      title: "THE INNOVATION SUMMIT",
      date: "January 15-16, 2025",
      location: "CITY CENTER CONVENTION CENTER, NEW YORK CITY",
      description: "Join us for an extraordinary two-day journey into the realm of innovation at The Innovation Summit."
    },
    backgroundImage: "/assets/img/bg/header-bg2.png",
    heroImage: "/assets/img/all-images/hero/hero-img1.png",
    showCountdown: true
  }

  // Example 2: Chess tournament hero banner
  const chessHeroData: HeroBannerData = {
    tagline: {
      icon: "/assets/img/icons/sub-logo1.svg",
      text: "Chess Victoria - Excellence in Every Move"
    },
    title: "Chess Victoria Championship 2025 \nWhere Champions Are Made",
    description: "Join the most prestigious chess tournament in Victoria, \nwhere strategy meets passion and legends are born.",
    buttons: {
      primary: {
        text: "Register Now",
        url: "/event-schedule"
      },
      secondary: {
        text: "View Schedule",
        url: "/about"
      }
    },
    eventInfo: {
      title: "VICTORIA CHESS CHAMPIONSHIP",
      date: "March 20-22, 2025",
      location: "MELBOURNE CONVENTION CENTER, VICTORIA",
      description: "Experience three days of intense competition featuring top players from across Victoria and beyond."
    },
    backgroundImage: "/assets/img/bg/header-bg2.png",
    heroImage: "/assets/img/all-images/hero/hero-img1.png",
    showCountdown: false
  }

  return (
    <div className="container">
      <h2>Hero Banner Examples</h2>
      
      <div style={{ marginBottom: '50px' }}>
        <h3>Example 1: Default Business Hero</h3>
        <HeroBanner data={defaultHeroData} />
      </div>
      
      <div style={{ marginBottom: '50px' }}>
        <h3>Example 2: Chess Tournament Hero</h3>
        <HeroBanner data={chessHeroData} />
      </div>
      
      <div style={{ 
        marginTop: '30px', 
        padding: '20px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px' 
      }}>
        <h4>HeroBannerData Interface:</h4>
        <pre style={{ 
          whiteSpace: 'pre-wrap', 
          wordBreak: 'break-word',
          fontSize: '14px'
        }}>
{`interface HeroBannerData {
  tagline: {
    icon: string;
    text: string;
  };
  title: string;
  description: string;
  buttons: {
    primary: {
      text: string;
      url: string;
    };
    secondary: {
      text: string;
      url: string;
    };
  };
  eventInfo: {
    title: string;
    date: string;
    location: string;
    description: string;
  };
  backgroundImage: string;
  heroImage: string;
  showCountdown?: boolean;
}`}
        </pre>
      </div>
    </div>
  )
}
