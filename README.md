# ZENJI — Luxury Streetwear & Archival Apparel Frontend

A premium frontend implementation of **ZENJI**, a luxury cyberpunk/tactical streetwear e-commerce experience built with React 19, Vite, and scalable UI architecture.

## ✨ Features

- **Cybernetic Tactical Design System**: Dark-mode luxury palette (`#09090b`), acid volt accents (`#d4ff00`), and bespoke typography (`Syne` + `Space Grotesk` + `Inter`).
- **Dedicated Routing Layer**: Built on `react-router-dom` for Home (`/`), Shop (`/shop`), and Product Details (`/product/:id`).
- **Interactive Product Catalog**: Dynamic category filtering, keyword search, price/rating sorting, and quick-view inspection modal.
- **Frontend Cart Drawer**: Slide-out shopping bag interaction with live quantity controls, subtotal calculation, and express shipping progress indicator.
- **Responsive Architecture**: Fully responsive layouts optimized for mobile, tablet, and desktop viewports.

## 📁 Scalable Directory Structure

```
src/
 ├── assets/          # Brand logos & media assets
 ├── components/
 │    ├── common/     # Navbar, Footer, Button, Badge
 │    ├── home/       # Hero, FeaturedDrops, BrandManifesto, Newsletter
 │    ├── product/    # ProductCard, ProductGrid, ProductFilter, ProductQuickView
 │    └── cart/       # CartDrawer, CartItem
 ├── context/         # Lightweight state management for Cart Drawer
 ├── data/            # Streetwear catalog and category metadata
 ├── pages/           # Home, Shop, ProductDetail views
 ├── routes/          # AppRouter routing layer
 └── utils/           # formatCurrency and brand constants
```

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

### 4. Run Linter
```bash
npm run lint
```
