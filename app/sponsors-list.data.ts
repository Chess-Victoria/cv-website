import { ReferenceListData } from '@/lib/types/reference-list';
import { generateShortName } from '@/lib/utils/name-utils';

export const hardcodedSponsorsListData: ReferenceListData = {
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
    },
    {
      id: "sponsor-3",
      name: "Box Hill Chess Club",
      shortName: "BHCC",
      image: {
        src: "/assets/img/elements/brand-img3.png",
        alt: "Box Hill Chess Club"
      },
      title: "Community Sponsor",
      url: "https://boxhillchessclub.org"
    },
    {
      id: "sponsor-4",
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
      id: "sponsor-5",
      name: "Chess.com",
      shortName: "C",
      image: {
        src: "/assets/img/elements/brand-img5.png",
        alt: "Chess.com"
      },
      title: "Online Platform Sponsor",
      url: "https://chess.com"
    },
    {
      id: "sponsor-6",
      name: "Lichess",
      shortName: "L",
      image: {
        src: "/assets/img/elements/brand-img6.png",
        alt: "Lichess"
      },
      title: "Free Chess Platform",
      url: "https://lichess.org"
    },
    {
      id: "sponsor-7",
      name: "FIDE",
      shortName: "F",
      image: {
        src: "/assets/img/elements/brand-img7.png",
        alt: "FIDE"
      },
      title: "International Chess Federation",
      url: "https://fide.com"
    },
    {
      id: "sponsor-8",
      name: "Chess Victoria Junior",
      shortName: "CVJ",
      image: {
        src: "/assets/img/elements/brand-img8.png",
        alt: "Chess Victoria Junior"
      },
      title: "Junior Development Sponsor",
      url: "/junior-chess"
    }
  ]
};
