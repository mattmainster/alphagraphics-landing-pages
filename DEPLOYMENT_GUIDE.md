# AlphaGraphics Landing Pages - Deployment Guide

## What's In This Project

```
alphagraphics-landing-pages/
├── rancho/index.html      ← Rancho Cucamonga landing page
├── irvine/index.html      ← Irvine landing page
├── css/styles.css          ← Shared custom styles
├── images/                 ← Drop your portfolio photos here
├── admin/                  ← Decap CMS visual editor
│   ├── index.html
│   └── config.yml
├── netlify.toml            ← Netlify config (headers, caching)
└── DEPLOYMENT_GUIDE.md     ← You are here
```

## Deployment Options

### Option A: Two Separate Netlify Sites (Recommended)

This is the cleanest approach — one Netlify site per location, each with its own subdomain.

**Step 1: Create a GitHub repo**

1. Go to github.com → New Repository → name it `alphagraphics-landing-pages`
2. Push this entire folder to the repo

**Step 2: Deploy Rancho Cucamonga site**

1. Log into Netlify → "Add new site" → "Import from Git"
2. Connect your GitHub repo
3. Build settings: leave blank (no build command needed)
4. Publish directory: `.` (root)
5. Deploy
6. Go to Site Settings → Domain Management → Add custom domain
7. Add: `go.alphagraphicsrancho.com` (or `ads.alphagraphicsrancho.com`)
8. In GoDaddy DNS, add a CNAME record:
   - Name: `go` (or `ads`)
   - Value: `[your-netlify-site].netlify.app`
   - TTL: 1 hour
9. Back in Netlify, enable HTTPS (automatic with Let's Encrypt)
10. Update `netlify.toml` — uncomment the Rancho redirect block

**Step 3: Deploy Irvine site**

Repeat the same steps with a second Netlify site:
- Custom domain: `go.alphagraphicsirvine.com`
- Uncomment the Irvine redirect block in `netlify.toml`

**Final URLs:**
- `go.alphagraphicsrancho.com/window-wraps`
- `go.alphagraphicsirvine.com/window-wraps`

### Option B: Single Netlify Site with Both Pages

If you prefer one site:
- Deploy once to Netlify
- Access pages at:
  - `your-site.netlify.app/rancho/`
  - `your-site.netlify.app/irvine/`
- Use a single custom domain like `ads.alphagraphics.com`

## Setting Up the Visual Editor (Decap CMS)

**Step 1: Enable Netlify Identity**

1. In Netlify dashboard → Site Settings → Identity → Enable Identity
2. Under Registration, select "Invite only"
3. Under Services → Git Gateway → Enable Git Gateway

**Step 2: Invite yourself**

1. Go to Identity tab → Invite users
2. Enter your email (mattmainster@gmail.com)
3. You'll receive an email to set a password

**Step 3: Access the editor**

1. Go to `your-site-url/admin/`
2. Log in with your Identity credentials
3. You'll see fields to edit:
   - Hero text, phone numbers, addresses
   - Upload portfolio images
   - Add/edit testimonials
   - Swap the hero background image

## Adding Your Portfolio Photos

**For immediate use (before CMS is set up):**

1. Drop your photos into the `images/` folder
2. Name them descriptively: `rancho-retail-wrap.jpg`, `irvine-dental-frosted.jpg`
3. Edit the HTML to replace the placeholder `<div>` blocks with `<img>` tags:

```html
<!-- Replace the placeholder div with: -->
<img src="../images/rancho-retail-wrap.jpg"
     alt="Retail store window wrap in Rancho Cucamonga"
     class="w-full h-full object-cover">
```

**Photo recommendations:**
- Use landscape orientation (4:3 ratio works best)
- Minimum 800px wide, ideally 1200px
- Compress to WebP or optimized JPEG (under 200KB each)
- Before/after pairs are the most compelling

## Google Ads Conversion Tracking Setup

**Step 1: Get your tracking codes**

In Google Ads:
1. Tools → Conversions → New conversion action
2. Create two conversions:
   - "Quote Form Submission" (category: Lead)
   - "Phone Call from Landing Page" (category: Phone call lead, count calls >60 sec)

**Step 2: Add to the pages**

Uncomment and replace the tracking snippet in the `<head>`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-XXXXXXXXX');
</script>
```

**Step 3: Create a Thank You page**

After form submission, redirect to a thank-you page that fires the conversion:

```html
<script>gtag('event', 'conversion', {'send_to': 'AW-XXXXXXXXX/YYYYYY'});</script>
```

## Form Handling

The form currently submits to `#` (no backend). You have several options:

1. **Netlify Forms (easiest):** Add `netlify` attribute to the form tag:
   ```html
   <form action="/thank-you" method="POST" netlify>
   ```
   Netlify will handle submissions and email you notifications. Free for up to 100/month.

2. **Formspree:** Add `action="https://formspree.io/f/YOUR_ID"` — free tier available.

3. **Custom backend:** Connect to your CRM or email system.

## GoDaddy DNS Setup (Quick Reference)

For each domain, add a CNAME record:

| Domain | Type | Name | Value |
|--------|------|------|-------|
| alphagraphicsrancho.com | CNAME | go | your-rancho-site.netlify.app |
| alphagraphicsirvine.com | CNAME | go | your-irvine-site.netlify.app |

DNS propagation takes 15 min to 48 hours (usually under 1 hour).

## Performance Checklist

- [ ] Compress all images (use squoosh.app or TinyPNG)
- [ ] Test mobile responsiveness (Chrome DevTools → mobile view)
- [ ] Verify page load under 3 seconds (PageSpeed Insights)
- [ ] Test form submission
- [ ] Verify phone click-to-call on mobile
- [ ] Check Google Ads conversion tracking fires correctly
- [ ] Test in Chrome, Safari, Firefox, and Edge
