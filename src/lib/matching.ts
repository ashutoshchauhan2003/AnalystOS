import { labs } from "@/content/labs";
import type { Job } from "@/data/jobs";
import type { Portfolio } from "@/data/portfolio";
import type { Submission } from "@/data/submissions";

export interface MatchResult {
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  recommendedLabs: {
    id: string;
    title: string;
    skill: string;
  }[];
}

function normalize(value: string) {
  return value.toLowerCase().trim();
}

export function calculateJobMatch({
  job,
  portfolio,
  submissions,
}: {
  job: Job;
  portfolio: Portfolio;
  submissions: Submission[];
}): MatchResult {
  const userSkillSet = new Set(portfolio.skills.map(normalize));
  const selectedSubmissionSet = new Set(portfolio.projects);
  const portfolioProjectSkills = submissions
    .filter((submission) => selectedSubmissionSet.has(submission.id))
    .map((submission) => labs.find((lab) => lab.id === submission.labId))
    .filter((lab): lab is NonNullable<typeof lab> => Boolean(lab))
    .flatMap((lab) => [lab.skill, ...lab.skills])
    .map(normalize);

  portfolioProjectSkills.forEach((skill) => userSkillSet.add(skill));

  const matchedSkills = job.requiredSkills.filter((skill) => userSkillSet.has(normalize(skill)));
  const missingSkills = job.requiredSkills.filter((skill) => !userSkillSet.has(normalize(skill)));
  const skillScore = job.requiredSkills.length
    ? Math.round((matchedSkills.length / job.requiredSkills.length) * 78)
    : 78;
  const projectScore = Math.min(portfolio.projects.length * 7, 22);
  const matchScore = Math.min(100, skillScore + projectScore);

  const recommendedLabs = labs
    .filter((lab) =>
      missingSkills.some((skill) => {
        const target = normalize(skill);
        return (
          normalize(lab.skill).includes(target) ||
          lab.skills.some((labSkill) => normalize(labSkill).includes(target))
        );
      }),
    )
    .slice(0, 3)
    .map((lab) => ({
      id: lab.id,
      title: lab.title,
      skill: lab.skill,
    }));

  return {
    matchScore,
    matchedSkills,
    missingSkills,
    recommendedLabs,
  };
}
