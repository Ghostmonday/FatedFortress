# 🚀 COMPLETE LANDING PAGE PROMPT

Use this prompt with ChatGPT, Claude, or Gemini to generate a production-ready landing page.

---

```
Build a complete, production-ready landing page for FatedFortress (formerly FatedFortress), an AI-native collaboration platform for developers.

## COMPANY INFO

**Name:** FatedFortress  
**Tagline:** Build with people who actually ship  
**Value Prop:** Turn solo developers into elite, execution-driven teams  
**Target Audience:** Independent developers, startup founders, early engineers, builders tired of resumes, LinkedIn, and hiring theater  
**Tone:** Confident, no corporate fluff, builder-first, slightly rebellious  
**Visual Style:** Dark mode default, clean typography, subtle motion, technical but human

## REQUIRED SECTIONS

### 1. HERO SECTION
- Bold headline: "Stop Building Alone."
- Subhead: "Build with people who actually ship. No resumes. No LinkedIn theater. Just execution."
- Two CTAs:
  - Primary: "Create Your Profile" (gradient button: #00d4ff to #7c3aed)
  - Secondary: "Get Early Access" (outline button)
- Hero visual: Abstract tech illustration or code-inspired graphic

### 2. SOCIAL PROOF STRIP
- "Join 2,500+ developers on the waitlist"
- "Trusted by engineers from Google, Meta, Stripe, and startups"
- Company logos placeholder (grayscale, 5-6 logos)

### 3. PROBLEM SECTION
- Headline: "The Collaboration Problem"
- Three problems with illustrations:
  - "📄 Resumes lie. Execution doesn't." - Current systems reward self-promotion over real contribution
  - "🏗️ Building alone is slow." - Talent exists everywhere but coordination fails
  - "🎭 Identity theater is exhausting." - Senior engineers hide; newcomers struggle

### 4. FEATURES GRID (6 cards)
- **XP-Based Reputation**: Your work speaks. Earn experience points through verified contributions. No self-promotion required.
- **AI Team Assembly**: Platform intelligence matches you with collaborators based on skills, timezone, and reliability.
- **Anonymous Participation**: Senior engineers exploring? Newcomers building confidence? Contribute without exposure until ready.
- **Trust That Matters**: Trust decays without signal. What you've done recently matters more than what you did years ago.
- **Task-Based Contribution**: Clear tasks, defined scope, verified completion. Earn XP for actual work.
- **Geographic Optimization**: Match by timezone. Collaborate in real-time or async. Your choice.

### 5. HOW IT WORKS (3 steps with icons)
1. **Create Your Profile** - Link GitHub, showcase work, set availability
2. **Join or Start a Project** - Browse opportunities or launch your own idea
3. **Ship Together** - Collaborate, earn XP, build reputation

### 6. EARLY ACCESS PRICING TIERS
| Tier | Price | Benefits |
|------|-------|----------|
| Pioneer | $99 | Lifetime 20% discount, founding member badge, direct input on features |
| Champion | $299 | Pioneer benefits + 1hr consulting call + early API access |
| Founder | $999 | All Champion benefits + advisory board seat + custom integration |

### 7. EMAIL CAPTURE SECTION
- Headline: "Be First to Launch"
- Subtext: "Early access members get founding priority and lifetime benefits"
- Form fields: Email only (minimal friction)
- Submit button: "Join Waitlist" (gradient)
- Urgency badge: "⚡ Launching Q2 2026. Secure your spot."
- Backend: Formspree integration placeholder: `https://formspree.io/f/YOUR_FORM_ID`

### 8. FAQ SECTION (4-5 questions)
- "Is my contribution data public?" → Privacy-first. You control visibility—full anonymity available.
- "How does XP work?" → Earn through verified tasks. Trust decays without activity.
- "Can I join anonymously?" → Yes. ANON mode hides your identity while tracking contributions.
- "What if I'm new to development?" → Build confidence through protected participation.

### 9. TRUST INDICATORS (3 icons with text)
- "🔒 Your data stays yours" - No selling, no tracking, your choice
- "🛡️ Anonymity without abuse" - Privacy with accountability
- "✓ Verified contributions only" - No gaming the system

### 10. FOOTER
- Navigation: About | Privacy | Terms | GitHub | Twitter
- Copyright: "© 2026 FatedFortress. Built by builders, for builders."
- Made with love badge

## DESIGN SPECIFICATIONS

### Color Palette
- Background: #0a0a0a (very dark, almost black)
- Cards: #1a1a1a (dark gray)
- Text Primary: #e0e0e0 (off-white)
- Text Secondary: #a0a0a0 (gray)
- Accent Primary: #00d4ff (cyan)
- Accent Secondary: #7c3aed (purple)
- Gradient: linear-gradient(135deg, #00d4ff, #7c3aed)
- Error: #ff6b6b
- Success: #10b981

### Typography
- Headings: Bold, modern sans-serif
- Body: System font stack (-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif)
- Sizes: Responsive base 16px

### Spacing & Layout
- Container max-width: 1200px
- Section padding: 4rem 2rem
- Card padding: 2rem
- Border radius: 12px for cards, 8px for buttons
- Border: 1px solid #2a2a2a for cards

### Effects
- Smooth scroll behavior
- Button hover: translateY(-2px), subtle shadow
- Card hover: border-color lighten slightly
- Subtle fade-in animations

## TECHNICAL REQUIREMENTS

1. Single HTML file with embedded CSS and JS
2. Fully mobile responsive (breakpoints: 768px, 1024px)
3. Semantic HTML5 structure
4. Fast loading (no heavy external libraries)
5. Form ready for Formspree integration
6. SEO meta tags included
7. Open Graph tags for social sharing

## OUTPUT FORMAT

Return a single, complete HTML file with:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FatedFortress - Build With People Who Actually Ship</title>
    <meta name="description" content="AI-native collaboration platform for developers. XP-based reputation, anonymous participation, AI matching.">
    <!-- Open Graph -->
    <meta property="og:title" content="FatedFortress - Build With People Who Actually Ship">
    <meta property="og:description" content="Turn solo developers into elite, execution-driven teams.">
    <meta property="og:type" content="website">
    <style>
        /* All CSS embedded */
    </style>
</head>
<body>
    <!-- All sections -->
    <nav>...</nav>
    <header id="hero">...</header>
    <section id="social-proof">...</section>
    <section id="problem">...</section>
    <section id="features">...</section>
    <section id="how-it-works">...</section>
    <section id="pricing">...</section>
    <section id="waitlist">...</section>
    <section id="faq">...</section>
    <footer>...</footer>
    
    <script>
        // Smooth scroll, form handling
    </script>
</body>
</html>
```

## FORM INTEGRATION

For the email capture form, use:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
    <input type="email" name="email" placeholder="Enter your email" required>
    <button type="submit" class="btn btn-primary">Join Waitlist</button>
</form>
```

## VALIDATION CHECKLIST

Before returning, verify:
- [ ] Dark theme applied everywhere
- [ ] Mobile responsive (test with DevTools)
- [ ] All buttons have hover states
- [ ] Forms have proper validation
- [ ] Smooth scroll works for anchor links
- [ ] No broken images or placeholders
- [ ] Fast load time (under 3 seconds)
- [ ] Accessible (contrast, labels, keyboard nav)
```

---

## 🎯 HOW TO USE

1. **Copy the entire prompt above**
2. **Paste into** ChatGPT, Claude, or Gemini
3. **Wait 10-30 seconds** for HTML generation
4. **Save as** `index.html` in `/landing/` folder
5. **Replace** `YOUR_FORM_ID` with your Formspree form ID
6. **Deploy** to Hostinger

---

## 📁 OUTPUT LOCATION

Save generated file to:
```
/home/amir/Desktop/fatedfortress/landing/index.html
```

---

**Document Version:** 1.0  
**Created:** February 10, 2026  
**Usage:** AI-assisted landing page generation
