# **App Name**: GetrePlus

## Core Features:

- Dynamic Landing Page Display: Renders all sections of the detailed landing page, incorporating responsive design, dynamic content (like the Live Activity Ticker), and seamless navigation across mobile and desktop breakpoints.
- User Account Authentication: Enables user sign-up and login functionalities, allowing new users to create accounts and existing users to access their personalized dashboards.
- Personalized Referral Dashboard: Displays a user's unique referral link, tracks their earnings, monitors referral progress, and provides an interface for requesting withdrawals.
- Interactive Feature Showcases: Implements animated sections such as 'How It Works' step-by-step guides, features section with dynamic carousels for mobile, and the urgency countdown with number flip animations.
- Contact Form & Support Integration: Provides a functional contact form for user inquiries, alongside direct links for WhatsApp support and community, with backend integration for message handling.
- Performance and Accessibility: Ensures optimized image loading (WebP, lazy load), preloaded fonts, and adherence to WCAG AA guidelines including focus management, aria attributes, and `prefers-reduced-motion` support.
- Sticky Mobile UI Elements: Implements the sticky bottom action bar (mobile only) and the WhatsApp floating button with visibility logic based on scroll position and keyboard presence, adhering to thumb-zone principles.

## Style Guidelines:

- Primary action color: Antique Gold (#B7862C). This sophisticated gold acts as the core accent for CTAs, financial figures, and active states, signifying premium wealth and trust against dark backgrounds, per user requirements.
- Dominant dark background: Obsidian (#0D0D0D). A warm, near-black used extensively for dark sections and card surfaces, providing depth and a professional foundation without the harshness of pure black.
- Primary supporting background: Midnight Green (#064E3B). A deep, institutional green that provides a trustworthy base for many section backgrounds and key elements, representing serious Nigerian finance.
- Light background and text: Warm Ivory (#F5F0E8). Replacing traditional white, this softer tone enhances readability in light sections and for body text on dark backgrounds, optimizing for mobile screens.
- Accent and success states: Rich Emerald (#065F46) and Error Red (#DC2626). These provide clear visual cues for positive actions, confirmations, and critical error messages.
- Display headings: 'Syne Bold' (sans-serif) for impact. Sub-headings: 'Plus Jakarta Sans SemiBold' (sans-serif). Body text: 'Inter Regular / Medium' (sans-serif) for legibility. Financial figures: 'Space Grotesk Bold' (monospace sans-serif) for a precise, techy feel. Note: currently only Google Fonts are supported.
- Utilize a combination of custom SVG illustrations for step-by-step guides and features, official brand logos (Paystack, WhatsApp) for trust signals, and functional icons like checkmarks and arrows. Icons are often housed in midnight green rounded square containers with antique gold coloration.
- Strict adherence to a mobile-first design philosophy, starting from a 375px viewport. Implements responsive column/grid layouts (e.g., 2-column on tablet, multi-column on desktop) and strategically placed horizontal carousels for mobile, ensuring proper content scaling and tap target sizes.
- Sophisticated scroll-triggered animations (fade up, slide in) using IntersectionObserver, complemented by subtle micro-interactions for buttons, inputs, and navigation elements. Dynamic visual cues include a number-flipping countdown, text shimmer, and animated floating background elements. All animations respect `prefers-reduced-motion`.