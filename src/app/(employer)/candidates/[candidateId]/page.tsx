import type { Metadata } from "next";
import { CandidateProfilePage } from "@/components/employer-directory/candidate-profile-page";
import { employerCandidates } from "@/content/employer-directory";

type CandidatePageProps = {
  params: {
    candidateId: string;
  };
};

export function generateStaticParams() {
  return employerCandidates.map((candidate) => ({
    candidateId: candidate.id,
  }));
}

export function generateMetadata({ params }: CandidatePageProps): Metadata {
  const candidate = employerCandidates.find((item) => item.id === params.candidateId);

  if (!candidate) {
    return {
      title: "Candidate Profile",
    };
  }

  return {
    title: `${candidate.name} | Candidate Profile`,
    description: `${candidate.name} is a ${candidate.title} with proof-of-skill in ${candidate.skills.slice(0, 3).join(", ")}.`,
    alternates: {
      canonical: candidate.profileHref,
    },
  };
}

export default function CandidatePage({ params }: CandidatePageProps) {
  return <CandidateProfilePage candidateId={params.candidateId} />;
}
