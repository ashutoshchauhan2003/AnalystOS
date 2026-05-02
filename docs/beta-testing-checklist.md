# AnalystOS Beta Testing Checklist

Use this checklist before sharing AnalystOS with beta users, recruiters, faculty, or hiring mentors.

Live demo: https://analyst-os-roan.vercel.app/

## Homepage

- [ ] Page loads without visual breakage.
- [ ] Hero clearly explains AnalystOS.
- [ ] India-focused positioning is visible.
- [ ] Founder credibility line is visible.
- [ ] Product proof flow is visible: Diagnostic -> Lab -> Review -> Portfolio.
- [ ] Join beta / Share feedback CTA is visible.
- [ ] Primary CTAs route correctly.
- [ ] Mobile layout remains readable.

## Sign Up

- [ ] `/sign-up` loads.
- [ ] Copy tells first-time users to create a new account.
- [ ] User can enter name, email, and password.
- [ ] Supabase auth succeeds when env variables are configured.
- [ ] Fallback demo behavior works when Supabase is unavailable.
- [ ] Try demo flow without account routes to `/diagnostic`.
- [ ] Errors are readable and not raw technical dumps.

## Diagnostic

- [ ] `/diagnostic` loads.
- [ ] User can answer all questions.
- [ ] Result card appears at the end.
- [ ] Recommended role path appears.
- [ ] Weak skills and suggested labs appear.
- [ ] Start Recommended Path CTA routes correctly.
- [ ] Mobile layout is usable.

## Labs

- [ ] `/labs` loads.
- [ ] Search by title works.
- [ ] Role filter works.
- [ ] Skill filter works.
- [ ] Difficulty filter works.
- [ ] Lab cards show title, role, skill, difficulty, estimated time, and expected output.
- [ ] Start Lab CTA routes to lab detail or workspace correctly.

## Lab Submit

- [ ] `/lab` loads.
- [ ] Challenge selector works.
- [ ] SQL editor remains usable.
- [ ] Run query shows result table or validation feedback.
- [ ] Insight notes textarea works.
- [ ] Recommendation textarea works.
- [ ] Save Draft persists or gracefully falls back.
- [ ] Submit Work shows confirmation.
- [ ] View Submission CTA routes correctly.

## Submissions

- [ ] `/submissions` loads.
- [ ] Draft/submitted/reviewed status cards show correctly.
- [ ] Submission details page opens.
- [ ] SQL answer, insight note, recommendation, score, and feedback render correctly.
- [ ] Draft submissions show Edit Submission.
- [ ] Reviewed submissions show Add to Portfolio.

## Review

- [ ] `/review` loads.
- [ ] Submitted work appears in the review queue.
- [ ] Review detail page opens.
- [ ] Rubric sliders work.
- [ ] Feedback textarea works.
- [ ] Submit Review updates status to reviewed.
- [ ] Reviewed submission is visible in submissions and portfolio builder.

## Portfolio Publish

- [ ] `/portfolio` loads.
- [ ] Profile section is editable.
- [ ] Skill chips can be selected/deselected.
- [ ] Reviewed projects appear.
- [ ] Projects can be added to portfolio.
- [ ] Live preview updates.
- [ ] Publish Portfolio toggles published state.
- [ ] Public link opens `/u/demo-user`.
- [ ] Public portfolio shows hero, skills, projects, about, and Contact / Hire CTA.

## Jobs

- [ ] `/jobs` loads.
- [ ] Search by job title works.
- [ ] Role filter works.
- [ ] Skill filter works.
- [ ] Location filter works.
- [ ] Job cards show match score.
- [ ] Missing skills list appears.
- [ ] Recommended labs appear.
- [ ] View Details opens job detail page.
- [ ] Job detail page shows description, skills, expectations, salary range, and Apply CTA.

## Recruiters Page

- [ ] `/recruiters` loads.
- [ ] Published/demo portfolio card appears.
- [ ] Card shows name, role, skills, and top project.
- [ ] View Profile opens `/u/demo-user`.
- [ ] Recruiter-facing copy is clear.
- [ ] Mobile layout remains readable.

## Final Smoke Test

- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.
- [ ] Test live URL after deployment.
- [ ] Confirm Supabase env variables are configured in Vercel.
- [ ] Confirm local fallback copy is not confusing on the live build.
- [ ] Collect first beta feedback and record issues for next iteration.
