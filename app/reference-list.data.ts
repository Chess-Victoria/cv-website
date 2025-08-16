import { ReferenceListData } from '@/lib/types/reference-list';
import { generateShortName } from '@/lib/utils/name-utils';

export const hardcodedReferenceListData: ReferenceListData = {
  title: "Chess Victoria Committee",
  subtitle: "Our Leadership Team",
  items: [
    {
      id: "member-1",
      name: "Dr. Peter Tsai",
      shortName: "PT",
      image: {
        src: "/assets/img/all-images/team/team-img1.png",
        alt: "Dr. Peter Tsai"
      },
      title: "President",
      socialLinks: {
        linkedin: "https://linkedin.com/in/peter-tsai",
        email: "chess@t-s-a-i.com"
      },
      url: "/committee/peter-tsai"
    },
    {
      id: "member-2",
      name: "Sarah Johnson",
      shortName: "SJ",
      image: {
        src: "/assets/img/all-images/team/team-img2.png",
        alt: "Sarah Johnson"
      },
      title: "Vice President",
      socialLinks: {
        facebook: "https://facebook.com/sarah.johnson",
        linkedin: "https://linkedin.com/in/sarah-johnson",
        instagram: "https://instagram.com/sarah.johnson"
      },
      url: "/committee/sarah-johnson"
    },
    {
      id: "member-3",
      name: "Michael Chen",
      shortName: "MC",
      image: {
        src: "/assets/img/all-images/team/team-img3.png",
        alt: "Michael Chen"
      },
      title: "Treasurer",
      socialLinks: {
        linkedin: "https://linkedin.com/in/michael-chen",
        youtube: "https://youtube.com/@michaelchen"
      },
      url: "/committee/michael-chen"
    },
    {
      id: "member-4",
      name: "Emma Wilson",
      shortName: "EW",
      image: {
        src: "/assets/img/all-images/team/team-img1.png",
        alt: "Emma Wilson"
      },
      title: "Secretary",
      socialLinks: {
        facebook: "https://facebook.com/emma.wilson",
        instagram: "https://instagram.com/emma.wilson"
      },
      url: "/committee/emma-wilson"
    },
    {
      id: "member-5",
      name: "David Brown",
      shortName: "DB",
      image: {
        src: "/assets/img/all-images/team/team-img2.png",
        alt: "David Brown"
      },
      title: "Tournament Director",
      socialLinks: {
        linkedin: "https://linkedin.com/in/david-brown",
        youtube: "https://youtube.com/@davidbrown"
      },
      url: "/committee/david-brown"
    },
    {
      id: "member-6",
      name: "Lisa Zhang",
      shortName: "LZ",
      image: {
        src: "/assets/img/all-images/team/team-img3.png",
        alt: "Lisa Zhang"
      },
      title: "Junior Coordinator",
      socialLinks: {
        facebook: "https://facebook.com/lisa.zhang",
        linkedin: "https://linkedin.com/in/lisa-zhang",
        instagram: "https://instagram.com/lisa.zhang"
      },
      url: "/committee/lisa-zhang"
    }
  ]
};
