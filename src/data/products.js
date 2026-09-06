export const PRODUCTS = [
  {
    id: 'zenji-h01',
    name: 'VOID OMNI HEAVYWEIGHT HOODIE',
    category: 'hoodies',
    price: 165,
    originalPrice: 195,
    tag: 'NEW DROP',
    rating: 4.9,
    reviewsCount: 42,
    images: [
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=85'
    ],
    localFallback: '/products/prod-hoodie.jpg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Obsidian Black', hex: '#111111' },
      { name: 'Acid Washed Grey', hex: '#4a4a4a' }
    ],
    description: 'Constructed from 500 GSM custom-milled French Terry cotton. Features an architectural boxy drop-shoulder cut, double-layered structured hood, subtle tonal embroidery on the chest, and vintage garment acid wash finish.',
    features: [
      '500 GSM 100% French Terry Cotton',
      'Custom boxy oversized silhouette',
      'Double-lined hood with zero drawstrings for clean aesthetic',
      'Ribbed cuffs and hem with heavy spandex blend',
      'Designed in Tokyo, crafted in Portugal'
    ],
    isFeatured: true,
    inStock: true
  },
  {
    id: 'zenji-t01',
    name: 'CYBERPUNK GRAPHIC OVERSIZED TEE',
    category: 'tees',
    price: 85,
    originalPrice: null,
    tag: 'NEW DROP',
    rating: 4.7,
    reviewsCount: 29,
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=85'
    ],
    localFallback: '/products/prod-tee.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Washed Black', hex: '#222222' },
      { name: 'Chalk White', hex: '#eaeaea' }
    ],
    description: '300 GSM combed cotton vintage wash tee featuring high-density screenprinted dystopian anime-inspired graphic artwork on the reverse and minimalist chest insignia.',
    features: [
      '300 GSM ultra-heavyweight combed organic cotton',
      'Relaxed dropped shoulder vintage boxy cut',
      'High-density crack-resistant screen print',
      'Thick 1.25" seamless collar ribbing',
      'Pre-shrunk treatment'
    ],
    isFeatured: true,
    inStock: true
  },
  {
    id: 'zenji-j01',
    name: 'NEO-TACTICAL MODULAR BOMBER',
    category: 'outerwear',
    price: 280,
    originalPrice: null,
    tag: 'LIMITED RUN',
    rating: 5.0,
    reviewsCount: 18,
    images: [
      'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=85'
    ],
    localFallback: '/products/prod-jacket.jpg',
    sizes: ['M', 'L', 'XL'],
    colors: [
      { name: 'Cyber Matte Black', hex: '#0a0a0a' },
      { name: 'Military Olive', hex: '#3b443b' }
    ],
    description: 'Weather-resistant Cordura nylon outer shell with detachable magnetic utility harness. Thermal Primaloft insulation for sub-zero urban exploration.',
    features: [
      'Water-repellent 500D Cordura Ripstop shell',
      'Detachable Fidlock magnetic chest sling system',
      'Primaloft Eco recycled thermal insulation',
      'Dual-way YKK matte waterproof zippers',
      'Internal storm cuffs'
    ],
    isFeatured: true,
    inStock: true
  },
  {
    id: 'zenji-p01',
    name: 'SHADOW SYSTEM 8-POCKET CARGO',
    category: 'pants',
    price: 190,
    originalPrice: 220,
    tag: 'BESTSELLER',
    rating: 4.8,
    reviewsCount: 64,
    images: [
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1000&q=85'
    ],
    localFallback: '/products/prod-cargo.jpg',
    sizes: ['30', '32', '34', '36'],
    colors: [
      { name: 'Pitch Black', hex: '#141414' },
      { name: 'Stealth Grey', hex: '#2b2c30' }
    ],
    description: 'Engineered with articulated knee darting for unrestricted movement. 8 asymmetrical utility pockets with quick-release nylon webbing pullers and cinchable bungee ankle cuffs.',
    features: [
      'Heavyweight cotton-twill with 2% elastane for flex',
      'Deep volume bellows cargo pockets',
      'Bungee cord adjustable leg opening for tapered or wide styling',
      'Reinforced seat and knee panels',
      'Custom matte hardware'
    ],
    isFeatured: true,
    inStock: true
  },
  {
    id: 'zenji-a01',
    name: 'KINETIC UTILITY CROSSBODY BAG',
    category: 'accessories',
    price: 95,
    originalPrice: null,
    tag: 'ESSENTIAL',
    rating: 4.9,
    reviewsCount: 53,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['ONE SIZE'],
    colors: [
      { name: 'Matte Stealth', hex: '#121212' }
    ],
    description: 'Compact modular cross-body sling with X-Pac waterproof fabric, magnetic quick-disconnect buckle, and internal fleece-lined device compartment.',
    features: [
      'Dimension-Polyant X-Pac waterproof sailcloth',
      'Fidlock V-Buckle magnetic locking strap',
      'Waterproof Aquaguard YKK zippers',
      'Quick-access hidden passport/phone back pocket',
      'Modular MOLLE attachment loops'
    ],
    isFeatured: false,
    inStock: true
  },
  {
    id: 'zenji-h02',
    name: 'KANJI ACID ARCHIVE HOODIE',
    category: 'hoodies',
    price: 175,
    originalPrice: null,
    tag: 'RESTOCK',
    rating: 4.9,
    reviewsCount: 71,
    images: [
      'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Phantom Charcoal', hex: '#22252a' }
    ],
    description: 'Distressed raw-edge details with Japanese kanji typographic puff print along the sleeve and oversized hood crest.',
    features: [
      '520 GSM loopback cotton fleece',
      'Hand-distressed hems and raw seam details',
      '3D tactile puff-print typography',
      'Double oversized hood'
    ],
    isFeatured: false,
    inStock: true
  },
  {
    id: 'zenji-t02',
    name: 'ARCHETYPAL MINIMALIST OVERSIZED TEE',
    category: 'tees',
    price: 75,
    originalPrice: 90,
    tag: 'ESSENTIAL',
    rating: 4.8,
    reviewsCount: 38,
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Core Raw Ecru', hex: '#dedbd2' },
      { name: 'Deep Onyx', hex: '#18181b' }
    ],
    description: 'Clean luxury streetwear staple. Heavyweight drape with dropped shoulders and micro rubberized ZENJI branding on lower hem.',
    features: [
      '280 GSM luxury organic ring-spun cotton',
      'Clean unbranded minimalist exterior',
      'Matte silicone micro-badge at hem',
      'Wide ribbed collar that keeps shape after washing'
    ],
    isFeatured: false,
    inStock: true
  },
  {
    id: 'zenji-a02',
    name: 'TACTICAL BALACLAVA & BEANIE 2-IN-1',
    category: 'accessories',
    price: 55,
    originalPrice: null,
    tag: 'LIMITED RUN',
    rating: 4.6,
    reviewsCount: 19,
    images: [
      'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['ONE SIZE'],
    colors: [
      { name: 'Obsidian', hex: '#111111' }
    ],
    description: 'Multi-functional convertible ribbed merino wool headwear. Can be worn as a standard rolled beanie or pulled down into an urban wind-resistant balaclava.',
    features: [
      '100% Extra fine Merino Wool',
      'Convertible dual-mode structure',
      'Reflective woven ZENJI label on cuff',
      'Breathable rib-knit pattern'
    ],
    isFeatured: false,
    inStock: true
  }
];
