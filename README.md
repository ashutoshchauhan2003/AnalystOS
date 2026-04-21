# Analyst 3D

Premium analyst learning platform built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, and a lightweight hybrid React Three Fiber dashboard experience.

## What is included

- Marketing homepage
- Hybrid 3D learner dashboard at `/dashboard`
- Analyst lab workspace at `/lab`
- Public portfolio case study at `/case-studies/churn-retention-simulation`
- Employer discovery directory at `/employers`

## Local development

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open `http://localhost:3000`

## Scripts

- `npm run dev` - start the local dev server
- `npm run lint` - run Next.js ESLint checks
- `npm run build` - create a production build
- `npm run start` - run the production server locally

## Environment

The project does not require any secret environment variables to build.

Optional:

- `NEXT_PUBLIC_SITE_URL`
  - Use this in production so canonical URLs, sitemap entries, Open Graph metadata, and robots metadata point at the correct deployed domain.
  - Example:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Deployment on Vercel

1. Push the repo to GitHub, GitLab, or Bitbucket.
2. Import the repository into Vercel.
3. Framework preset: `Next.js`
4. Build command: `npm run build`
5. Output setting: default Next.js output
6. Add environment variable:
   - `NEXT_PUBLIC_SITE_URL=https://your-domain.com`
7. Deploy.
8. After deploy, verify:
   - `/`
   - `/dashboard`
   - `/lab`
   - `/case-studies/churn-retention-simulation`
   - `/employers`
   - `/robots.txt`
   - `/sitemap.xml`

## Production checklist

- Confirm `NEXT_PUBLIC_SITE_URL` matches the final production domain.
- Replace placeholder social/share asset in `public/og-cover.svg` if a branded marketing image is desired.
- Replace `public/favicon.svg` if a final brand icon is available.
- Review copy and candidate/case-study placeholder content before launch.
- Verify no learner/private routes should be publicly accessible in your final product model.
- Re-run:

```bash
npm run lint
npm run build
```

## Current production notes

- Public SEO metadata is configured for the homepage, employer directory, and portfolio case study.
- Learner-facing routes currently use `noindex` metadata.
- The hybrid dashboard remains performance-conscious and uses a lightweight 3D chamber rather than a heavy real-time scene.
- Some content is still sample/demo content and should be replaced before a real launch.
