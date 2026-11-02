# Sapphire International website

Static site (HTML / CSS / JS, no build step). Open `index.html` in a browser, or serve the folder with any static server.

## Pages
- `index.html` â€” home
- `about.html` â€” story, business group, mission/vision/values, quality policy, org chart
- `products.html` â€” segments and filterable brand catalogue
- `partners.html` â€” official distributorships (Lepu, Demax), award, sub-distribution brands, tender business
- `reach.html` â€” sales growth chart and customers by region
- `contact.html` â€” offices and enquiry form

## Editing
- Styles: `assets/css/styles.css` (brand colours are CSS variables at the top)
- Behaviour and icons: `assets/js/main.js`
- Images: `assets/img/` (cleaned logos, rings, certificate). Raw images and extracted text from the company profile are kept locally in `assets/source/` (git-ignored, not published).
- The header and footer are repeated in each page, so a nav change needs editing in all six files.

## Notes
- The enquiry form has no backend: it opens the visitor's email app addressed to info@sapphireint.com.
- Not deployed. No domain, hosting or analytics set up yet.

