import { HeroBannerData } from '@/components/sections/home1/HeroBanner'

// Hardcoded hero banner data
export const heroBannerData: HeroBannerData = {
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
