'use client';

import React from "react";
import Link from "next/link";
import { ClubListItem } from "@/lib/types/club-page";

interface PromotedClubsProps {
  clubs: ClubListItem[];
}

export default function PromotedClubs({ clubs }: PromotedClubsProps) {
  if (!clubs || clubs.length === 0) {
    return null;
  }

  return React.createElement("div", { className: "choose-section-area sp2" },
    React.createElement("div", { className: "container" },
      React.createElement("div", { className: "row" },
        React.createElement("div", { className: "col-lg-4 m-auto" },
          React.createElement("div", { className: "heading2 text-center space-margin60" },
            React.createElement("h2", null, "Top Clubs"),
            React.createElement("p", null, "Featured chess clubs in Victoria")
          )
        )
      ),
      React.createElement("div", { className: "row" },
        clubs.map((club) =>
          React.createElement("div", { key: club.id, className: "col-lg-4 col-md-6" },
            React.createElement("div", { className: "choose-widget-boxarea" },
              React.createElement("div", { className: "icons" },
                React.createElement("img", { src: "/assets/img/icons/choose-icons1.svg", alt: "" })
              ),
              React.createElement("div", { className: "space24" }),
              React.createElement("div", { className: "content-area" },
                React.createElement(Link, { 
                  href: `/chess-clubs/${club.slug}`,
                  style: { color: '#A02BBD', textDecoration: 'none', fontWeight: 'bold' }
                }, club.name),
                React.createElement("div", { className: "space16" }),
                React.createElement("p", null, 
                  club.location?.address || 'Location not specified'
                ),
                club.contact && React.createElement("div", { className: "space16" }),
                club.contact && React.createElement("div", null,
                  React.createElement("strong", null, "Contact: "),
                  club.contact.name,
                  club.contact.email && React.createElement("div", null, "Email: ", club.contact.email),
                  club.contact.phone && React.createElement("div", null, "Phone: ", club.contact.phone)
                ),
                React.createElement("div", { className: "space24" }),
                React.createElement(Link, { href: `/chess-clubs/${club.slug}`, className: "readmore" },
                  "Read More ",
                  React.createElement("i", { className: "fa-solid fa-arrow-right" })
                )
              )
            )
          )
        )
      )
    )
  );
}
