# Proxima Digital Innovations — Enterprise Web Platform

This repository contains the official landing page and technical overview for **Proxima Digital Innovations**, a technology company based in **Kaduna, Nigeria** that builds mission-critical management systems and biometric security solutions.

---

## Design System & Principles

1. **Aesthetic Direction**: Serious, restrained, technical, and high-density — aligned with enterprise leaders like Stripe, Linear, and Vercel. Free of AI-generated tropes, neon gradients, or consumer gimmicks.
2. **Color Palette**:
   - **Primary Background**: Pure White (`#FFFFFF`) and Light Gray (`#F8F9FA`)
   - **Dark Text**: Near-Black (`#0F172A`)
   - **Secondary Text**: Slate Gray (`#475569`)
   - **Accent Color**: Deep Professional Blue (`#1E3A8A`)
   - **Borders & Dividers**: Subtle Light Gray (`#E2E8F0`)
3. **Geometry**: Sharp 4px corners (`--radius-sm: 4px`), restrained ambient shadows, generous whitespace, strict typographic hierarchy.

---

## Architectural Sections

1. **Navigation**: Semantic header with brand identity, core system links, and direct demo CTA.
2. **Hero Section**: Concrete value proposition, offline resilience metrics, and a technical telemetry console showcasing multi-branch edge synchronization and biometric socket streams.
3. **Operational Trust Strip**: Highlight of tamper-evident cryptography, edge deployment, zero-downtime offline storage, and sub-300ms verification.
4. **Solutions / Products**:
   - `Proxima BMS / ERP`: Enterprise resource planning, multi-depot inventory, POS, double-entry accounting.
   - `Proxima HMS`: Hospital management system, private clinic EMR, pharmacy batch expiry, and LIS diagnostic logs.
   - `Proxima SMS`: Academic records, automated continuous assessment (CA), fee reconciliation, and turnstile roll-call.
   - `Biometric Attendance & Security`: Direct hardware drivers for Hikvision/ZKTeco, sub-300ms edge template matching, anti-buddy-punching.
5. **Industries We Serve**: Structured breakdown for Businesses & Retail, Hospitals & Clinics, Schools & Academies, and Multi-Branch Organizations.
6. **Why Proxima**: Technical differentiators tailored for African operating conditions, accompanied by an architectural comparison matrix against standard cloud software.
7. **Company / About**: Background on the engineering-first culture and on-site deployment accountability in Kaduna, Nigeria.
8. **Contact / Site Audit Form**: Enterprise consultation request with field validation, phone/email contact channels, and Kaduna headquarters details.
9. **Interactive Technical Specifications Modal**: Keyboard-accessible specification inspector detailing deployment topology, database engine, peripherals, and security controls.
10. **Footer**: Clean corporate directory, operational status telemetry badge, copyright, and compliance details.

---

## Local Development & Preview

The site is built with pure semantic HTML5, modern CSS3, and vanilla JavaScript with zero external dependencies.

To preview locally:
```bash
# Using Python 3's built-in HTTP server:
python -m http.server 8000
```
Then visit `http://localhost:8000` in any modern web browser.
