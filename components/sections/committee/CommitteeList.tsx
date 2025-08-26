import React from "react";
import { CommitteeListData } from "@/lib/types/committee";
import CommitteeMemberCard from "./CommitteeMemberCard";

interface CommitteeListProps {
  committee: CommitteeListData;
}

export default function CommitteeList({ committee }: CommitteeListProps) {
  if (!committee.members || committee.members.length === 0) {
    return null;
  }

  return (
    <div className="team-sperkers-section-area sp1">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 m-auto">
            <div className="heading2 text-center space-margin60">
              <h2>{committee.name}</h2>
              {committee.year && <p>Year: {committee.year}</p>}
            </div>
          </div>
        </div>
        <div className="row">
          {committee.members.map((member, index) => (
            <CommitteeMemberCard key={`committee-member-${member.id}-${index}`} member={member} />
          ))}
        </div>
      </div>
    </div>
  );
}
