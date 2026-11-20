# Leicestershire Shared Reading — website redesign proposal

A clean redesign of <https://www.leicestershiresharedreading.org/>, built to
present to the group for approval in principle. All content is drawn from the
currently public Wix site; photography and the existing logo have been
downloaded into `assets/`.

**Branches:**
- `main` — the original flat-HTML mock (7 hand-written pages, no build step).
- `demo-ssg` (this branch) — the same site rebuilt as an **Eleventy static site
  generator** project: shared templates, Markdown news posts, and a GitHub
  Actions workflow that rebuilds and publishes the site on every push.
  Deployed for demoing at `https://goroboro.github.io/lsr-demo/`.

## Build & preview (demo-ssg branch)

```bash
npm install
npm run serve     # http://localhost:8080 with live reload
# or: npm run build  →  _site/  (what GitHub Actions builds and publishes)
```

## Content layout

| Where | What |
|---|---|
| `src/index.html` | Home: hero, news strip, who we are, how it works, latest news (auto from `src/news/`), video corner, quotes, what we read, volunteer CTA |
| `src/what-happens.html` | What happens in a shared reading group |
| `src/groups.html` | All nine groups (6 library, 3 Zoom) with times, addresses and booking notes |
| `src/get-involved.html` | Three ways in: join a group, Reader Leader role + 5-step application, steering group (incl. Fundraising Leader vacancy) |
| `src/report-example.html` | The sample group report extract |
| `src/volunteers-area.html` | Placeholder for the future private volunteer area |
| `src/contact.html` | Contact form (currently composes a pre-filled email; swap for a real endpoint later), phone numbers, Zoom-link help |
| `src/news/*.md` | **News posts — one Markdown file each.** New file = new item on the home page automatically (newest first) + its own page. `_template.md` is a fill-in example, never rendered. |
| `src/_includes/base.njk` | Shared head, header/nav, footer (nav labels + footer text live here) |
| `src/_includes/post.njk` | Layout every news post renders through |
| `eleventy.config.js` | Build config (news collection, asset copy) |
| `.github/workflows/deploy.yml` | Rebuild + publish to GitHub Pages on every push to `main` |
| `UPDATING.md` | **The plain-English guide for non-technical volunteers** |

The seven pages keep their `.html` URLs (e.g. `/groups.html`); news posts live
at `/news/<slug>/`. All internal links are relative, so the site works on any
host path (GitHub Pages, custom domain, etc.).

## Design language

- **Typeface:** Rubik — the same family The Reader uses (loaded from Google Fonts;
  self-host the fonts for a production site if you'd prefer).
- **Palette:** extracted directly from The Reader's published theme CSS
  (`wp-content/themes/the-reader/compiled/css/min/style.css`):

  | Token | Hex | Role here |
  |---|---|---|
  | plum | `#87336C` | primary (header accents, buttons, headings on cream) |
  | plum dark / deep | `#6E2757` / `#4A2145` | hover states, hero overlay, quotes band |
  | teal | `#027D9C` | links, Zoom badges |
  | amber | `#E5920C` | news strip, numbered steps, "new" badges |
  | green | `#357543` | "in library" tags, checklists |
  | fox orange | `#DC6412` | small accents (wordmark rule) |
  | ink / paper / cream | `#2A2130` / `#FBF8F5` / `#F6EAD9` | text, page background, warm panels |

- **Layout:** sticky white header, big photo hero with plum overlay, rounded cards,
  generous whitespace, quote band, CTA bands, dark footer. Fully responsive with a
  no-JS mobile nav (CSS checkbox toggle). Semantic HTML, skip link, visible focus
  styles, colour contrast checked against WCAG AA.

## Logo strategy (easy swap)

- The site currently uses **your existing LSR logo** (`assets/img/logo-current.jpg`,
  white-on-grey, so it sits in a small grey chip in the header and footer).
- A **proposed replacement** is in this repo:
  - `assets/img/logo-fox.svg` — badge: a fox reading a book with an "LSR" cover,
    on a cream disc with a plum ring (Leicestershire fox + The Reader palette).
  - `assets/img/logo-fox-lockup.svg` — badge + "Leicestershire / SHARED READING" wordmark.
- **To swap the logo** (if the group approves the fox):
  1. replace the file contents of `assets/img/logo-current.jpg` with a new file
     (e.g. export the SVG to PNG/JPG — the JPG chip treatment assumes a square-ish
     image with its own background), **or**
  2. find-and-replace `logo-current.jpg` with `logo-fox.svg` in
     `src/_includes/base.njk` (two spots: header + footer) — on the `main`
     branch the equivalent is across the seven HTML pages.

  The logo path appears in exactly two spots per page (header + footer).
- Suggestion: have the fox re-cut by a designer as proper vector artwork before
  committing to it (the SVG text will be outlined); keep both assets versioned in
  this repo so the choice stays reversible.

## Images

Downloaded from the current Wix site's CDN (`static.wixstatic.com`) at usable
resolutions. Before launch, re-upload them to your own hosting (they're your own
photos, so that's fine) and check the hero crop on the phone. The fox SVG favicon
is used site-wide; add a 180px PNG apple-touch-icon when you settle the logo.

## Architecture: static now, application later

**Recommendation: ship the static site first, treat the "application" as phase 2.**

The features you listed (blogging, forms, a volunteer area) do *not* require a
custom web application to start:

| Need | Static-era solution (this repo) | Phase-2 app feature |
|---|---|---|
| Blog / news | News cards on the home page; add `news/*.html` posts, or drop in a tiny headless CMS (e.g. a Markdown folder + build step) | CMS with login for the admin volunteer |
| Contact form | `contact.html` composes a pre-filled email (works today, zero cost) | Real form endpoint (Netlify Forms / Formspree free tiers) |
| Volunteer reports | Continue with Google Forms (outputs to a Google Sheet) | Volunteer login; reports submitted in-app; auto-filed to Google Drive via the Sheets/Drive API |
| Reports in Excel | Keep the current Sheet copy-paste workflow | Reports stored in the Sheet automatically; the app *reads* the Sheet (source of truth) rather than you pasting |
| File sharing (Dropbox + Drive → Drive) | Consolidate everything into one Google Drive folder tree with a sharing guide; link from the volunteers' area | Drive becomes the backend storage; the app links in |
| Private volunteer area | `volunteers-area.html` placeholder + shared Drive links | Authenticated area (Google sign-in is a natural fit, given the Drive/Forms consolidation) |
| Group list | `groups.html` (static) | Optional: groups edited in one place (Sheet/CMS) and rendered |

If phase 2 does proceed, a practical shape is: a small server-rendered app
(Next.js or a Flask/Django app) with Google OAuth login, a `/volunteers` area,
and a job that reads the Google Form's Sheet and writes report files into the
Drive folder. A static frontend can coexist (same domain, app on a subpath, or
the app serving the marketing pages too).

### Free / super-cheap hosting for the static site

All of these host the folder as-is, with free HTTPS and free subdomains;
you point your domain's DNS at them:

- **Cloudflare Pages** — free, fast global CDN, free custom domain + SSL. (Best default.)
- **Netlify** — free tier, easiest drag-and-drop deploy, has free form handling
  (convenient when the contact form graduates from mailto).
- **GitHub Pages** — free if you want the repo to be the source of truth.
- If phase 2 uses a server: Oracle Cloud's free tier or a ~£3–5/month VPS
  (e.g. Hetzner) with a reverse proxy (Caddy — free automatic SSL).

**Cost context:** the real saving is leaving Wix (their UK plans with a custom
domain run roughly £17–30/month). The domain itself is cheap regardless — see below.

## Domain: registrar & DNS

Current state (from WHOIS/RDAP, checked 19 Nov 2026):

- **Registrar:** Tucows Domains Inc. (`whois.tucows.com`)
- **Nameservers:** `ns14.wixdns.net` / `ns15.wixdns.net` — i.e. Wix is doing your DNS
- **Registered:** 2019-10-01 · **Expires:** 2027-10-01 · Status: clientTransferProhibited, clientUpdateProhibited (normal)

### Option A (recommended, £0): keep Tucows, move DNS off Wix

Tucows already gives you free DNS management, and .org retail price there is
already at the bottom of the market — switching registrar saves only a few quid a
year at most. Instead:

1. Log in to Tucows (the account that owns the domain — check who has the login;
   if it's a Wix-linked account, Wix's support can release/transfer it to a new
   email).
2. Create a DNS zone for `leicestershiresharedreading.org` at **Cloudflare** (free
   plan: zone transfer just changes the registrar's nameservers to Cloudflare's
   two, and you manage records in Cloudflare).
   - Or use Tucows' own DNS control panel — no registrar change at all.
3. At Tucows, replace the Wix nameservers with your new ones. DNS propagates
   within minutes-to-hours; the site keeps running throughout.
4. Point records at the host: e.g. `A @ 76.76.21.21` + `CNAME www @` (or the
   Cloudflare "orange-cloud" proxy records) once your hosting is chosen.
5. Verify the domain is set to **auto-renew** (it expires 2027-10-01).

### Option B: transfer the domain itself

Only worth it if the Tucows account is inaccessible or you want everything under
one roof. The .org registry is **Public Interest Registry (PIR)**; UK-friendly
registrar options include **Nominet** (the UK registry, which registers .org
directly, ~£20/yr, free DNS) or **Cloudflare** (at-cost). Any registrar can be
switched to with an EPP/auth code requested from Tucows; expect a few days, and
the 60-day transfer lock means no other registrar moves within that window.
Verify live prices before deciding — the spread between registrars for .org is
small (typically ~£10–25/yr retail).

## Data consolidation (Dropbox + Google Drive → Google Drive)

Suggested folder tree in one shared Drive (with a "Who can access what" sheet):

```
LSR/
├── 01-Groups/            (one folder per group: current materials, logs)
├── 02-Session-reports/   (one folder per year; files named YYYY-MM-DD-group)
├── 03-Training-ReadToLead/
├── 04-Steering/          (minutes, policies, finance)
└── 05-Media/             (photos for the website)
```

Keep the Google Form as the intake for session reports (its output Sheet is the
system of record). The phase-2 app reads that Sheet and can mirror new reports
into `02-Session-reports/` automatically, replacing the copy-paste step.

## Next steps

1. **Show this mock to the group** (this folder, or deploy to a free subdomain,
   e.g. `lsr-redesign.pages.dev`, for easy phone viewing).
2. **Get Wix access** so you can: export the site data / member list, grab the
   original-resolution photos, and note anything not publicly visible.
3. **Confirm the logo direction** (keep current vs fox) and commission the final
   artwork if the fox is preferred.
4. **Pick the host** (Cloudflare Pages is the default suggestion) and do the
   nameserver move (Option A above) — do this *before* switching the domain over,
   so the live site stays up on Wix until the cutover.
5. **Agree the app spec** for phase 2 once the static site is accepted:
   volunteer login, report intake, Drive sync, blog/news editing.
