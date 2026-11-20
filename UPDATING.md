# How to update the website (no software to install)

Everything on this site is a file in this repository. When you save a change
and commit it, **GitHub rebuilds and republishes the site automatically within
about a minute** — you never "build" or "deploy" anything by hand.

You do all of this in a web browser (e.g. Chrome/Edge), signed in to GitHub.

## The 30-second routine

1. In the GitHub repository, click the file you want to change.
2. Click the **pencil icon** (Edit this file).
3. Make your change.
4. Scroll down and click **Commit changes…**, then **Commit changes**.
5. Watch: a green "Build and deploy to GitHub Pages" check appears under the
   commit (Actions tab). When it's a green tick, the live site is updated.
   Refresh the site (hold Ctrl and click, or press Ctrl+F5, to be sure).

If something goes wrong, don't panic: click **Commits**, find your commit, and
there's a **"Revert"** option to put the file back. Every change is kept as a
version, so nothing is ever lost.

## Where things live

| I want to change… | Edit this file |
|---|---|
| A news item (add new, edit old) | `src/news/` — one file per item |
| Group times, addresses, notes | `src/groups.html` |
| "What happens in a group" text | `src/what-happens.html` |
| Volunteering / roles / application steps | `src/get-involved.html` |
| The sample group report | `src/report-example.html` |
| Volunteer area placeholder text | `src/volunteers-area.html` |
| Contact details / phones / email | `src/contact.html` **and** the footer in `src/_includes/base.njk` |
| Site-wide text (footer, navigation labels) | `src/_includes/base.njk` |
| Photos and other assets | `assets/img/` (upload via drag-and-drop in GitHub's web UI) |

Files starting with an underscore (like `src/news/_template.md`) are ignored by
the site builder — they're notes/templates, not live pages.

## Adding a news item (the common case)

1. Open `src/news/` on GitHub and click **Add file → Create new file**.
2. Name it `YYYY-MM-DD-short-name.md` (e.g. `2026-12-05-summer-groups.md`).
   The date at the start of the name keeps things tidy.
3. Paste in the contents of `src/news/_template.md`, then fill it in:

   ```
   ---
   layout: post.njk
   title: "Headline of your news item"
   date: 2026-12-05
   badge: "December 2026"
   description: "One or two sentences that show on the home page."
   permalink: news/{{ page.fileSlug }}/
   ---

   Write your news here…
   ```

4. Commit. The new item appears on the home page automatically (newest first)
   and gets its own page too.

## Editing a group's details

Open `src/groups.html`, find the group's card, and change the text between the
`<p class="when">…</p>` (day and time) or `<p class="addr">…</p>` (address)
lines. The file has lots of HTML around it — change only the text inside the
tags, nothing else.

## Simple formatting inside Markdown news

- `**bold**` → bold
- `[link text](https://example.com)` → a link
- link to another page *on this site*: `[our groups](../../groups.html)` — note the `../../`
- a blank line between paragraphs
- keep it simple; the layout does the rest

## When to ask for help (Rowan)

- Adding a whole new page (e.g. "Our team")
- Changing the look: colours, layout, fonts
- Replacing photos (upload + wiring in)
- Anything you're unsure about — asking first is always fine
