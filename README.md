# ZENJI (禅侍) — Tokyo Atelier | Premium Japanese Streetwear

<div align="center">

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)

**An ultra-premium, dark-futuristic Japanese streetwear e-commerce frontend inspired by Tokyo high-fashion ateliers, technical apparel engineering, and archival drops.**

[Live Demo](#-getting-started) • [Key Features](#-features) • [Tech Stack](#-tech-stack) • [Architecture](#-project-structure) • [Installation](#-getting-started)

</div>

---

## ⛩️ Project Overview

**ZENJI (禅侍)** is a luxury Japanese-inspired technical streetwear storefront crafted with modern web performance and high-fashion aesthetics. Engineering heavyweight garments through Japanese precision, architectural silhouettes, and limited archive releases, the web application delivers an immersive editorial shopping experience.

The frontend is built with **React**, **Vite**, **Framer Motion**, and a bespoke **Vanilla CSS design system** that combines dark luxury minimalism (`#050608`), cybernetic neon accents (`#D4FF00`), and typography tailored with `Syne`, `Space Grotesk`, and `JetBrains Mono`.

> [!NOTE]
> **Frontend Demonstration Notice:** This repository represents an exploratory frontend client. It contains **no backend server, external database, user authentication, or real financial payment processing**. Cart state, search filters, and theme preferences persist locally in the browser via React Context and `localStorage`.

---

## ✨ Features

### 1. Animated Editorial Hero & Brand Preloader
- **Luxury Initial Preloader:** Tokyo Atelier brand insignia reveal with neon line drawing animation and smooth homepage crossfade.
- **Cinematic Lookbook Carousel:** Interactive drop showcases featuring bespoke 500 GSM heavyweight hoodies, modular outerwear, and vintage graphic tees.
- **Micro-Interactions:** Word stagger text reveals, Tokyo Shibuya GPS coordinates (`35.6580° N, 139.7016° E`), and atmospheric radial light hazes.

### 2. Interactive Product Catalog & Archival Filtering
- **Dynamic Multi-Criteria Filters:** Filter pieces by categories (Hoodies, Cargos, Tees, Outerwear, Accessories), price ranges, keyword search, or sort by price and rating.
- **URL-Synchronized Navigation:** Dedicated collection routes (`/shop`, `/drops`, `/outerwear`) seamlessly pre-filter the archive grid.
- **Product Quick View:** Modal dialog with instant specification inspection, size selection, and direct bag insertion without leaving the feed.

### 3. Fashion-Grade Product Detail Pages (`/product/:id`)
- **Magnification Visual Gallery:** High-resolution multi-angle perspectives with mouse-tracking interactive hover zoom.
- **Garment Architecture Specs:** GSM weight tags, technical fabrication breakdowns (Cordura®, French Terry, Ripstop), and stock availability indicators.
- **Contextual Recommendations:** Dynamic "Related Pieces" carousel based on silhouette discipline and collection tag.

### 4. Interactive Slide-Over Cart Drawer
- **Persistent Local Bag:** Stores items with selected size and color variant in `localStorage`.
- **Live Quantity Controls:** Direction-aware animated quantity counter with automated removal threshold.
- **Free Worldwide Shipping Progress:** Dynamic calculation bar tracking distance to the $200 free express dispatch tier.
- **Bag Management:** Inline item removal and empty bag confirmation modal with quick-category jumps.

### 5. Brand Storytelling & Editorial Sections
- **Tokyo Atelier Manifesto:** Architectural streetwear philosophy and technical craftsmanship pillars.
- **Archive Drop Timeline:** Release history across seasons (SS25 – FW26 editions).
- **Verified Community Reviews:** Client reviews featuring authentic piece verification badges.

### 6. Transmission Terminal (Contact Page)
- **Atelier Direct Line:** Interactive communication terminal with Shibuya studio coordinates, standard response timelines, and dispatch status indicators.
- **Transmission Form:** Input validation with simulated asynchronous dispatch confirmation.

### 7. Dark & Light Theme System
- **Dual Luxury Palettes:** Dark Mode (`#050608` deep obsidian) and Light Mode (`#F4F3EE` editorial bone white).
- **Smooth Transitioning:** Coordinated CSS variable switching, icon rotation animations, and persistent `localStorage` preference memory.

### 8. True Multi-Device Responsiveness
- Optimized down to **320px mobile**, **375px smartphones**, **768px tablets**, and **4K desktop monitors**.
- Zero horizontal overflow (`overflow-x: hidden`), fluid aspect ratios (`4:5`), and responsive typography (`clamp()`).

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Component architecture, state management, and modern hooks (`useMemo`, `useCallback`) |
| **Vite 8** | Next-generation build tool and ultra-fast hot module replacement (HMR) |
| **JavaScript (ESNext)** | Modern syntax, asynchronous operations, and modular utility design |
| **Vanilla CSS** | Fully customized design tokens, CSS custom variables, and responsive media queries |
| **Framer Motion** | Declarative GPU-accelerated layout transitions, spring physics, and scroll reveal animations |
| **React Router v7** | Client-side routing with route-based lazy loading and Suspense fallbacks |
| **Lucide React** | Lightweight, clean technical iconography |

---

## 📁 Project Structure

```text
zenji-website/
├── public/
│   ├── favicon.svg             # Custom ZENJI Tokyo emblem favicon
│   ├── products/               # High-resolution streetwear editorial photography
│   ├── lookbook/               # Campaign showcase lookbook assets
│   └── collections/            # Seasonal drop hero images
├── src/
│   ├── components/
│   │   ├── cart/               # CartDrawer, CartItem slide-over components
│   │   ├── checkout/           # Frontend checkout preview modal
│   │   ├── common/             # Navbar, Footer, Button, Badge, InitialLoader
│   │   ├── home/               # Hero, FeaturedDrops, BrandStory, Timeline, Reviews
│   │   └── product/            # ProductCard, ProductGrid, ProductFilter, QuickView
│   ├── context/
│   │   ├── CartContext.jsx     # Global shopping bag state & quantity actions
│   │   ├── ThemeContext.jsx    # Dark / Light theme provider & DOM updates
│   │   ├── useCart.js          # Cart hook consumer
│   │   └── useTheme.js         # Theme hook consumer
│   ├── data/
│   │   ├── products.js         # Complete archive product specifications & image references
│   │   └── categories.js       # Collection slugs and category taxonomies
│   ├── pages/
│   │   ├── Home.jsx            # Editorial homepage spread
│   │   ├── Shop.jsx            # Catalog filtering and archive grid
│   │   ├── ProductDetail.jsx   # Deep-dive piece specification and zoom gallery
│   │   └── Contact.jsx         # Shibuya studio transmission terminal
│   ├── routes/
│   │   └── AppRouter.jsx       # Lazy-loaded route boundaries with Suspense
│   ├── utils/
│   │   ├── cardVariants.js     # Shared Framer Motion card animations
│   │   ├── motionVariants.js   # Scroll reveal variants
│   │   ├── formatCurrency.js   # Currency formatting utilities
│   │   └── useDocumentTitle.js # Dynamic SEO page title updater
│   ├── App.jsx                 # Application shell & context provider tree
│   ├── index.css               # Core design tokens, theme definitions & layout engine
│   └── main.jsx                # Entry point mounting root React tree
├── index.html                  # HTML5 boilerplate, SEO meta tags & typography links
├── package.json                # Project scripts and production dependencies
└── vite.config.js              # Vite build and plugin configurations
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **yarn** / **pnpm**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Tasmih/zenji-streetwear-frontend.git
   cd zenji-streetwear-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173/`.

---

## 📦 Build & Production Verification

Compile and bundle the frontend for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Run static code analysis and linting:

```bash
npm run lint
```

---

## 🛡️ Quality & Performance Assurance

- **0 ESLint Errors / Warnings:** Complies strictly with modern React and React Refresh standards.
- **Fast Production Bundling:** Production build completes in under **1 second** with tree-shaken route chunks.
- **Hardware Acceleration:** All animations use GPU-composited CSS properties (`transform`, `opacity`) for smooth 60 FPS performance.
- **Accessibility & SEO:** Dynamic meta page titles, semantic HTML5 landmarks, image `alt` tags, and full ARIA modal attributes.

---

## 📄 License

This project is created for portfolio demonstration purposes under the [MIT License](LICENSE).

---

<div align="center">
  <sub>ZENJI TOKYO ATELIER // SHIBUYA 35.6580° N, 139.7016° E</sub>
</div>
