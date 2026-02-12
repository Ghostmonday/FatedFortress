# FatedFortress Landing Page — Refactored Code

**Complete refactored landing page with clean, professional styling.**

---

## Table of Contents

1. [CSS (index.css)](#1-css-indexcss)
2. [Main App (App.jsx)](#2-main-app-appjsx)
3. [Hero Section (HeroSection.jsx)](#3-hero-section-herosectionjsx)
4. [Email Capture (EmailCaptureSection.jsx)](#4-email-capture-emailcaptionsectionjsx)
5. [Footer (Footer.jsx)](#5-footer-footerjsx)

---

## 1. CSS (index.css)

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg-primary: #0a0a0a;
  --bg-card: rgba(26, 26, 26, 0.8);
  --bg-card-hover: rgba(35, 35, 35, 0.9);
  --text-primary: #f5f5f5;
  --text-secondary: #a3a3a3;
  --text-muted: #737373;
  --accent-cyan: #22d3ee;
  --accent-cyan-hover: #06b6d4;
  --accent-purple: #a78bfa;
  --accent-purple-hover: #8b5cf6;
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-accent: rgba(34, 211, 238, 0.2);
  --gradient-primary: linear-gradient(135deg, #22d3ee, #a78bfa);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Typography System - Clean & Professional */
h1 {
  font-size: clamp(36px, 5vw, 64px);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

h2 {
  font-size: clamp(28px, 4vw, 48px);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.01em;
}

h3 {
  font-size: clamp(20px, 3vw, 28px);
  font-weight: 600;
  line-height: 1.3;
}

h4 {
  font-size: clamp(16px, 2vw, 20px);
  font-weight: 600;
  line-height: 1.4;
}

p {
  font-size: 16px;
  font-weight: 400;
  line-height: 1.7;
  color: var(--text-secondary);
}

small {
  font-size: 13px;
  font-weight: 400;
  color: var(--text-muted);
}

/* Text utilities */
.text-primary { color: var(--text-primary); }
.text-secondary { color: var(--text-secondary); }
.text-muted { color: var(--text-muted); }
.text-cyan { color: var(--accent-cyan); }
.text-purple { color: var(--accent-purple); }

.font-light { font-weight: 300; }
.font-normal { font-weight: 400; }
.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }
.font-extrabold { font-weight: 800; }

/* Gradient text */
.gradient-text {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Card styling - Clean & Modern */
.card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  padding: 24px;
  transition: all 0.3s ease;
}

.card:hover {
  background: var(--bg-card-hover);
  border-color: var(--border-accent);
  transform: translateY(-2px);
}

/* Button styles - Clean & Professional */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 28px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
}

.btn-primary {
  background: var(--gradient-primary);
  color: #000;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border-subtle);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: var(--border-accent);
}

.btn-ghost {
  background: transparent;
  color: var(--text-secondary);
}

.btn-ghost:hover {
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.05);
}

/* Section styling */
.section {
  padding: 80px 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.section-tight {
  padding: 60px 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Grid utilities */
.grid {
  display: grid;
}

.grid-2 {
  grid-template-columns: repeat(2, 1fr);
}

.grid-3 {
  grid-template-columns: repeat(3, 1fr);
}

.grid-4 {
  grid-template-columns: repeat(4, 1fr);
}

@media (max-width: 768px) {
  .grid-2, .grid-3, .grid-4 {
    grid-template-columns: 1fr;
  }
}

/* Flex utilities */
.flex { display: flex; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.gap-4 { gap: 16px; }
.gap-6 { gap: 24px; }
.gap-8 { gap: 32px; }

/* Spacing utilities */
.mb-4 { margin-bottom: 16px; }
.mb-6 { margin-bottom: 24px; }
.mb-8 { margin-bottom: 32px; }
.mb-12 { margin-bottom: 48px; }
.mb-16 { margin-bottom: 64px; }
.mt-4 { margin-top: 16px; }
.mt-6 { margin-top: 24px; }
.mt-8 { margin-top: 32px; }
.mt-12 { margin-top: 48px; }
.py-8 { padding-top: 32px; padding-bottom: 32px; }
.py-12 { padding-top: 48px; padding-bottom: 48px; }
.py-16 { padding-top: 64px; padding-bottom: 64px; }
.py-20 { padding-top: 80px; padding-bottom: 80px; }
.py-24 { padding-top: 96px; padding-bottom: 96px; }
.text-center { text-align: center; }
.text-left { text-align: left; }
.max-w-2xl { max-width: 672px; }
.max-w-3xl { max-width: 768px; }
.max-w-4xl { max-width: 896px; }
.max-w-6xl { max-width: 1152px; }
.mx-auto { margin-left: auto; margin-right: auto; }

/* Input styling */
.input {
  width: 100%;
  padding: 14px 18px;
  font-size: 15px;
  font-family: inherit;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-subtle);
  border-radius: 8px;
  color: var(--text-primary);
  transition: all 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: var(--accent-cyan);
  box-shadow: 0 0 0 3px rgba(34, 211, 238, 0.1);
}

.input::placeholder {
  color: var(--text-muted);
}

/* Badge styling */
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 500;
  border-radius: 100px;
  background: rgba(34, 211, 238, 0.1);
  color: var(--accent-cyan);
  border: 1px solid rgba(34, 211, 238, 0.2);
}

/* Subtle background pattern */
.bg-pattern {
  background-image:
    radial-gradient(circle at 50% 0%, rgba(34, 211, 238, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(167, 139, 250, 0.03) 0%, transparent 50%);
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--bg-primary);
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* Selection color */
::selection {
  background: rgba(34, 211, 238, 0.3);
  color: var(--text-primary);
}

/* Animation utilities */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.6s ease forwards;
}

.animate-slideUp {
  animation: slideUp 0.6s ease forwards;
}

/* Glass effect - Subtle */
.glass {
  background: rgba(10, 10, 10, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border-subtle);
}

/* Glow effects */
.glow-cyan {
  box-shadow: 0 0 20px rgba(34, 211, 238, 0.15);
}

.glow-purple {
  box-shadow: 0 0 20px rgba(167, 139, 250, 0.15);
}
```

---

## 2. Main App (App.jsx)

```jsx
import React from 'react';
import { Helmet } from 'react-helmet';
import ScrollToTop from '@/components/ScrollToTop.jsx';
import HeroSection from '@/components/HeroSection.jsx';
import EmailCaptureSection from '@/components/EmailCaptureSection.jsx';
import Footer from '@/components/Footer.jsx';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <>
      <Helmet>
        <title>FatedFortress — Build with people who actually ship</title>
        <meta name="description" content="Build with people who actually ship. No resumes. No LinkedIn theater. Just execution." />
      </Helmet>

      <ScrollToTop />

      <div className="min-h-screen bg-primary text-white overflow-x-hidden">
        <HeroSection />

        {/* Placeholder for future sections */}
        <section className="section-tight text-center">
          <p className="text-muted mb-4">[More sections coming soon]</p>
        </section>

        <EmailCaptureSection />
        <Footer />
        <Toaster />
      </div>
    </>
  );
}

export default App;
```

---

## 3. Hero Section (HeroSection.jsx)

```jsx
import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="min-h-screen relative flex items-center justify-center bg-cover bg-center bg-pattern">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <span className="badge">
              Beta Access Opening Q2 2026
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            Stop Building <span className="gradient-text">Alone</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-secondary"
          >
            Build with people who actually ship. No resumes. No LinkedIn theater.
            Just execution.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="btn btn-primary">
              Create Your Profile
            </button>

            <button className="btn btn-secondary">
              Get Early Access
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 bg-white/40 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
```

---

## 4. Email Capture (EmailCaptureSection.jsx)

```jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

const EmailCaptureSection = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "You're on the list",
        description: "We'll notify you when we launch.",
      });
      setEmail('');
    }
  };

  return (
    <section className="py-20 px-6 bg-pattern">
      <div className="max-w-2xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4"
        >
          Be First to <span className="gradient-text">Launch</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          Early access members get founding priority and lifetime benefits.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 border border-cyan-500/20 bg-cyan-500/5 rounded-full mb-8"
        >
          <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          <span className="text-sm text-cyan-400">Launching Q2 2026</span>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="input"
          />
          <button
            type="submit"
            className="btn btn-primary whitespace-nowrap"
          >
            Join Waitlist
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default EmailCaptureSection;
```

---

## 5. Footer (Footer.jsx)

```jsx
import React from 'react';
import { Github, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-8 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="#about"
              className="text-sm text-muted hover:text-secondary transition-colors"
            >
              About
            </a>
            <a
              href="#privacy"
              className="text-sm text-muted hover:text-secondary transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              className="text-sm text-muted hover:text-secondary transition-colors"
            >
              Terms of Service
            </a>
          </div>

          {/* Social */}
          <div className="flex gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-primary transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted">
            © 2026 FatedFortress. Built by builders, for builders.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```

---

## File Locations

| File | Location |
|------|----------|
| CSS | [`apps/web/src/index.css`](../apps/web/src/index.css) |
| Main App | [`apps/web/src/App.jsx`](../apps/web/src/App.jsx) |
| Hero Section | [`apps/web/src/components/HeroSection.jsx`](../apps/web/src/components/HeroSection.jsx) |
| Email Capture | [`apps/web/src/components/EmailCaptureSection.jsx`](../apps/web/src/components/EmailCaptureSection.jsx) |
| Footer | [`apps/web/src/components/Footer.jsx`](../apps/web/src/components/Footer.jsx) |

---

## Quick Copy Commands

```bash
# Copy CSS
cp apps/web/src/index.css apps/web/src/index.css.bak

# Copy App
cp apps/web/src/App.jsx apps/web/src/App.jsx.bak

# Copy Hero
cp apps/web/src/components/HeroSection.jsx apps/web/src/components/HeroSection.jsx.bak

# Copy Email Capture
cp apps/web/src/components/EmailCaptureSection.jsx apps/web/src/components/EmailCaptureSection.jsx.bak

# Copy Footer
cp apps/web/src/components/Footer.jsx apps/web/src/components/Footer.jsx.bak
```

---

## Design Summary

| Element | Before | After |
|---------|--------|-------|
| **Font** | Orbitron (sci-fi display) | Inter (clean sans-serif) |
| **All Caps** | Yes (tracking-widest) | Normal case |
| **Background** | Grid patterns, scanlines | Subtle radial gradients |
| **Buttons** | Clip-path polygons | Rounded rectangles |
| **Cards** | Glass panels, neon borders | Subtle hover effects |
| **Animations** | Heavy glows, pulses | Smooth fades |
| **Color** | High contrast neon | Softer accents |

---

*Document Version: 1.0*
*Created: February 11, 2026*
