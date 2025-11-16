import React from "react";
import Link from "next/link";
import { CommitteeMemberData } from "@/lib/types/committee";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { getContactImage } from '@/lib/constants'

interface CommitteeMemberCardProps {
  member: CommitteeMemberData;
}

export default function CommitteeMemberCard({ member }: CommitteeMemberCardProps) {
  const imageUrl = member.avatarImage?.url || member.image?.url || member.person.image?.url || getContactImage();
  const imageAlt = member.avatarImage?.alt || member.image?.alt || member.person.image?.alt || member.person.name;

  return (
    <div className="col-lg-3 col-md-6">
      <div className="our-team-boxarea">
        <div className="team-widget-area">
          <img src="/assets/img/elements/elements25.png" alt="" className="elements21" />
          <img src="/assets/img/elements/elements26.png" alt="" className="elements22" />
          <div className="img1">
            <img src={imageUrl} alt={imageAlt} className="team-img4" />
            <div className="share">
              <Link href={`/committees/${member.slug}`}>
                <img src="/assets/img/icons/share1.svg" alt="" />
              </Link>
            </div>
            <ul>
              <li>
                <Link href={`/committees/${member.slug}`} className="icon1">
                  <i className="fa-solid fa-user" />
                </Link>
              </li>
              {member.person.email && (
                <li>
                  <Link href={`mailto:${member.person.email}`} className="icon2">
                    <i className="fa-solid fa-envelope" />
                  </Link>
                </li>
              )}
              {member.person.phone && (
                <li>
                  <Link href={`tel:${member.person.phone}`} className="icon3">
                    <i className="fa-solid fa-phone" />
                  </Link>
                </li>
              )}
              <li>
                <Link href={`/committees/${member.slug}`} className="icon4">
                  <i className="fa-solid fa-info" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="space28" />
        <div className="content-area">
          <h3>
            <Link href={`/committees/${member.slug}`}>
              {member.person.name}
            </Link>
          </h3>
          <div className="space16" />
          <p className="role">{member.role}</p>
          {member.person.jobTitle && (
            <p className="job-title">{member.person.jobTitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}
