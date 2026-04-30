# AnalystOS

AnalystOS is a free-core job-ready analytics lab where learners practise real analyst tasks, build portfolio-ready proof, and become discoverable to recruiters.

The current product is launch-demo ready: the full learner journey is implemented across diagnostics, learning paths, labs, SQL workspace, submissions, review, portfolio publishing, job matching, and recruiter discovery. Supabase persistence is integrated with graceful local fallback when environment variables are missing.

## Current Live Product Status

Implemented:

- Premium marketing homepage and product positioning.
- Role diagnostic for Data Analyst, Business Analyst, and Data Scientist paths.
- Learning path catalog and dynamic path detail pages.
- Lab catalog and dynamic lab detail pages.
- Protected learner dashboard.
- SQL challenge workspace with `/api/query` mock engine.
- Submission save/submit flow backed by Supabase when configured.
- Review queue and rubric scoring.
- Portfolio builder and recruiter-facing public portfolio at `/u/demo-user`.
- Job matching board, dynamic job detail pages, and recruiter marketplace.
- Supabase client, schema, auth integration, and local fallback behavior.

Still intentionally limited:

- The query engine is a mock SQL validator over demo data.
- Reviews, jobs, and public portfolios use seeded/local fallback data unless Supabase is configured and populated.
- Supabase Row Level Security policies should be added before real users or private data.
- File uploads, payments, recruiter accounts, reviewer assignment, and email notifications are not implemented yet.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Supabase Auth and Supabase database client
- CodeMirror SQL editor
- Local fallback data for demo resilience

## Route Audit

Launch-critical routes:

- `/` - marketing homepage
- `/diagnostic` - role diagnostic
- `/paths` - role path catalog
- `/paths/[pathId]` - path detail
- `/labs` - lab catalog
- `/labs/[labId]` - lab detail
- `/lab` - protected SQL challenge workspace
- `/submissions` - protected submissions list
- `/submissions/[submissionId]` - protected submission detail
- `/review` - protected review queue
- `/review/[submissionId]` - protected review workspace
- `/portfolio` - protected portfolio builder
- `/jobs` - job matching board
- `/jobs/[jobId]` - job detail
- `/recruiters` - recruiter marketplace
- `/u/demo-user` - public portfolio
- `/u/demo-analyst` - legacy redirect to `/u/demo-user`
- `/sign-in` - Supabase sign-in with fallback demo session
- `/sign-up` - Supabase sign-up with fallback demo session

Supporting routes:

- `/roadmap`
- `/employers`
- `/candidates/[candidateId]`
- `/case-studies/churn-retention-simulation`
- `/robots.txt`
- `/sitemap.xml`

API routes:

- `/api/query`
- `/api/projects`
- `/api/user-progress`

## Local Development

Install dependencies:

```bash
npm install
```

Create an environment file:

```bash
cp .env.example .env.local
```

Run the app:

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

## Environment Variables

Required for Supabase persistence:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Recommended for deployment metadata:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

If Supabase variables are missing, AnalystOS still builds and runs using local fallback data. Protected routes are allowed in fallback mode so reviewers can inspect the launch demo without a backend.

## Supabase Setup

1. Create a Supabase project.
2. Open the Supabase SQL editor.
3. Run `src/lib/supabase/schema.sql`.
4. Add these variables in `.env.local` and in Vercel:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-public-anon-key
```

5. Restart the dev server.
6. Sign up through `/sign-up`.
7. Verify the flows:
   - Save draft in `/lab`
   - Submit work in `/lab`
   - View `/submissions`
   - Review submitted work in `/review`
   - Publish in `/portfolio`
   - Open `/u/demo-user`

Before production users, add Supabase Row Level Security policies for profiles, submissions, portfolios, jobs, and user progress. The included schema is a launch-demo baseline, not a complete authorization model.

## Vercel Deployment Guide

1. Push the repository to GitHub, GitLab, or Bitbucket.
2. Import the project into Vercel.
3. Framework preset: `Next.js`.
4. Build command: `npm run build`.
5. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL`
6. Deploy.
7. Smoke test the launch-critical routes listed above.

## Scripts

- `npm run dev` - start local development
- `npm run lint` - run Next.js ESLint checks
- `npm run build` - create production build
- `npm run start` - run the production server locally
- `npm audit` - dependency audit

## Dependency Audit Note

Latest launch audit result:

- 5 vulnerabilities total
- 4 high severity
- 1 moderate severity

Remaining advisories are tied to `next`, `eslint-config-next`, `glob`, and nested `postcss`. `npm audit` recommends `npm audit fix --force`, but that would upgrade to Next 16 / eslint-config-next 16 and introduce breaking changes. This project intentionally did not run `npm audit fix --force` during launch polish.

Recommended follow-up:

- Plan a controlled Next.js upgrade branch.
- Re-run lint, build, route smoke tests, and visual QA after the framework upgrade.
- Review whether the app uses any vulnerable Next.js features in the deployed configuration, especially image optimization and rewrites.

## Known Limitations

- The SQL engine is still a mock API, not a real database query runner.
- Public recruiter data is prototype/demo oriented.
- Supabase RLS is not included in this baseline schema.
- No file uploads for notebooks, dashboards, or artifacts yet.
- No payment or billing system.
- No production email flows.
- No recruiter shortlist persistence.

## Next Roadmap

Near term:

- Add Supabase RLS policies and role-based permissions.
- Seed Supabase with labs, jobs, and demo portfolio data.
- Add reviewer assignment and review status history.
- Persist learner progress and path completion from real activity.

Next:

- Add file/artifact uploads.
- Add recruiter shortlist and candidate comparison.
- Add portfolio publishing controls by slug.
- Add email notifications for review completion.

Later:

- Add billing for premium reviews or organization workspaces.
- Add employer dashboards.
- Add analytics for lab completion, review quality, and hiring outcomes.

## Launch Checklist

- Route inventory complete.
- `.env.example` added.
- Supabase schema documented.
- Local fallback behavior documented.
- Vercel deployment steps documented.
- `npm audit` run and documented.
- `npm run lint` must pass before release.
- `npm run build` must pass before release.
