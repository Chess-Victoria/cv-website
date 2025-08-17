import React from "react";
import Link from "next/link";
import { CommitteeMemberData } from "@/lib/types/committee";

interface CommitteeMemberCardProps {
  member: CommitteeMemberData;
}

export default function CommitteeMemberCard({ member }: CommitteeMemberCardProps) {
  const imageUrl = member.image?.url || member.person.image?.url || '/assets/img/default/no-photo.png';
  const imageAlt = member.image?.alt || member.person.image?.alt || member.person.name;

  return (
    <div className="col-lg-3 col-md-6">
      <div className="our-team-boxarea">
        <div className="team-widget-area">
          <img src="/assets/img/elements/elements25.png" alt="" className="elements21" />
          <img src="/assets/img/elements/elements26.png" alt="" className="elements22" />
          <div className="img1">
            <img src={imageUrl} alt={imageAlt} className="team-img4" />
            <div className="share">
              <Link href="/#"><img src="/assets/img/icons/share1.svg" alt="" /></Link>
            </div>
            <ul>
              <li>
                <Link href="/#" className="icon1"><i className="fa-brands fa-facebook-f" /></Link>
              </li>
              <li>
                <Link href="/#" className="icon2"><i className="fa-brands fa-linkedin-in" /></Link>
              </li>
              <li>
                <Link href="/#" className="icon3"><i className="fa-brands fa-instagram" /></Link>
              </li>
              <li>
                <Link href="/#" className="icon4"><i className="fa-brands fa-pinterest-p" /></Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="space28" />
        <div className="content-area">
          <Link href="/speakers-single">{member.person.name}</Link>
          <div className="space16" />
          <p>{member.role}</p>
          {member.person.jobTitle && (
            <p style={{ fontSize: '14px', color: '#666' }}>{member.person.jobTitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}
