# Setup notes (for maintaining this site)

A static site, ready for GitHub Pages: live Power BI reports and an ML churn app.

## 1. Personalise (one file)
Open `assets/config.js` and fill in:
- your name, email, LinkedIn and CV path (put the PDF in `assets/`)
- the **Publish to web** link for each report (`https://app.powerbi.com/view?r=...`)
- your Streamlit app URL

Any link you leave empty shows "Coming soon", so you can go live with one report and add the rest later.

## 2. Publish on GitHub Pages
1. Create a repo named **`Parkar05.github.io`** (exactly your username + `.github.io`).
2. Upload everything in this folder to the repo root (keep the `assets` and `projects` folders and `.nojekyll`).
3. Go to **Settings → Pages → Source: Deploy from a branch → main / root**.
4. After about a minute the site is live at **https://parkar05.github.io**. Put that link on your CV.

## Editing text
Project write-ups are plain HTML in `projects/*.html`. Edit them directly in GitHub if you want to change wording.

## Extras (all in assets/config.js)
- **photo**: upload `assets/photo.jpg`, then set `photo: "assets/photo.jpg"`
- **certificate**: name, issuer and link of your certificate
- **thumbs**: upload images to `assets/thumbs/` (e.g. `b2b-360.png`), then set the path for each project card
- **videos**: paste a YouTube (unlisted) or Loom link per dashboard. A "90-second tour" appears under the report
- **goatcounter**: sign up free at goatcounter.com (pick a code like `parkar05`) and paste the code to see visitor stats
