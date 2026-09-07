# ZENJI (禅侍) — Tokyo Atelier | Premium Japanese Streetwear

<div align="center">

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-d4ff00?style=for-the-badge&logo=vercel&logoColor=black)](https://zenji-website-nine.vercel.app)

**An ultra-premium Japanese-inspired streetwear e-commerce frontend engineering heavyweight silhouettes, cyberpunk technical apparel, and limited archival drops.**

[🌐 **Explore Live Storefront**](https://zenji-website-nine.vercel.app) • [Key Features](#2-features) • [Tech Stack](#3-tech-stack) • [Installation](#4-installation)

</div>

---

## 1. Project Overview

**ZENJI** is a premium Japanese-inspired streetwear ecommerce frontend designed with a dark, high-fashion Tokyo atelier aesthetic. It merges post-industrial technical apparel specifications (500 GSM bespoke French Terry, Cordura® ripstop, modular Fidlock® hardware) with fluid, modern web performance.

Built from scratch using React, Vite, and Framer Motion, ZENJI features an obsidian black canvas (`#050608`), cybernetic neon lime accents (`#D4FF00`), and a bespoke Vanilla CSS design system for 60 FPS fluidity.

---

## 2. Features

- **Responsive Design:** Optimized for fluid viewing across mobile (320px & 375px), tablets (768px), and ultra-wide 4K desktop displays with zero horizontal overflow.
- **Animated Hero Section:** Cinematic lookbook carousel with word-stagger typography, atmospheric radial light hazes, Tokyo Shibuya GPS coordinates (`35.6580° N, 139.7016° E`), and an initial luxury brand preloader.
- **Product Showcase:** Multi-discipline catalog with real-time category filtering (Hoodies, Cargos, Graphic Tees, Outerwear, Accessories), keyword search, price range filtering, and interactive Quick View modals.
- **Product Detail Pages:** High-resolution perspective gallery with interactive mouse-tracking hover zoom, GSM technical fabric specifications, size/color selectors, and dynamic related piece recommendations.
- **Cart Drawer:** Full slide-over shopping bag with persistent `localStorage`, live directional quantity adjusters, automated item removal, and a real-time Free Worldwide Express Shipping calculation bar ($200 tier).
- **Brand Storytelling Sections:** Tokyo Design Studio atelier manifesto, craftsmanship engineering pillars, archival release timeline, and verified client community reviews.
- **Contact Page:** Transmission terminal interface with studio location coordinates, dispatch status indicators, and an interactive transmission form with simulated asynchronous submission feedback.
- **Framer Motion Animations:** Spring-physics page transitions, staggered grid reveals, micro-interactions, and GPU-accelerated transforms.
- **Dark / Light Theme Toggle:** Dual luxury palettes with smooth CSS custom property transitions and persistent theme memory.

---

## 3. Tech Stack

- **React** (v19) — Component architecture, state management, and custom hooks
- **Vite** (v8) — Fast development bundling and production build pipeline
- **JavaScript** (ESNext) — Modern modular logic, async operations, and state flow
- **CSS** (Vanilla CSS) — Bespoke design token system, CSS variables, and fluid media queries
- **Framer Motion** — Declarative UI animations, layout transitions, and spring physics
- **React Router** (v7) — Client-side routing with lazy-loading and Suspense boundaries
- **Lucide React** — Minimalist technical iconography

---

## 4. Installation

### Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (or yarn / pnpm)

### Setup Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Tasmih/zenji-streetwear-frontend.git
   cd zenji-streetwear-frontend
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173/`.

---

## 5. Build

Compile and bundle the project for production deployment:

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

## 6. Project Structure Overview

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

## 7. Frontend-Only Note

> [!IMPORTANT]
> **Client-Side Portfolio Project:**
> This repository is a **frontend-only** implementation. It includes **no backend server, database, user authentication, or real financial payment processing**. All shopping bag items, search filters, and theme preferences are managed entirely on the client side using React Context and the browser's `localStorage` API.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

<div align="center">
  <sub>ZENJI TOKYO ATELIER // SHIBUYA 35.6580° N, 139.7016° E</sub>
</div>
