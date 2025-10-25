# PureFlow Water Supply — Static Site

This is a small responsive static website scaffold for a water supply company. It includes pages for Home, Products, Order, Contact, and About, with simple forms that POST to placeholder Google Sheets endpoints.

Files added:
- `index.html` — Home page with hero and featured products
- `products.html` — Product catalog (30ml to 20L samples)
- `order.html` — Order form that sends JSON to a placeholder endpoint
- `contact.html` — Contact form and map embed
- `about.html` — Company info and testimonials
- `assets/css/style.css` — Styles
- `assets/js/main.js` — Client-side behavior for nav and forms
- `assets/images/*.svg` — Placeholder images and logo

How to use
1. Open the `index.html` (or any page) in a browser. It's static — no build step required.
2. Replace placeholder images in `assets/images/` with your brand assets.
3. Replace the placeholder Google Sheets endpoints in `assets/js/main.js` with the URLs for your Apps Script or API that writes form submissions to Google Sheets. There are two constants to replace:
   - `GOOGLE_SHEETS_ENDPOINT` — used by the order form
   - `CONTACT_ENDPOINT` — used by the contact form

Google Sheets integration notes
- A common approach: create a Google Apps Script that accepts POST requests and appends rows to a Google Sheet. Deploy it as a web app and copy the web app URL into the constants above.
- Make sure your Apps Script endpoint accepts CORS or use a simple proxy if necessary.

Accessibility & Improvements
- Add `aria-` attributes and more form validation for production use.
- Hook real payment or order-processing as required.

Questions or next steps
- I can help wire a sample Google Apps Script endpoint for the sheet and show how to deploy it if you want.
