import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/useCart';
import { ANNOUNCEMENT, BRAND_NAME } from '../../utils/constants';

const NAV_ITEMS = [
  { label: 'Home', jp: 'ホーム', path: '/' },
  { label: 'Shop All', jp: '全作品', path: '/shop' },
  { label: 'Drops', jp: '限定新作', path: '/shop?category=hoodies' },
  { label: 'Outerwear', jp: 'アウター', path: '/shop?category=outerwear' }
];

export const Navbar = () => {
  const { totalItemsCount, toggleCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mobileSearch, setMobileSearch] = useState('');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard escape key listener for accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <header className={`zenji-header ${isScrolled ? 'zenji-header--scrolled' : ''}`}>
      {/* Top Announcement Ticker */}
      <div className="zenji-ticker">
        <div className="zenji-ticker__content">
          <span>{ANNOUNCEMENT}</span>
          <span className="zenji-ticker__dot">•</span>
          <span>TYO-SHIBUYA 35.6580° N // ARCHIVE 04</span>
          <span className="zenji-ticker__dot">•</span>
          <span>LIMITED 150 PCS WORLDWIDE</span>
          <span className="zenji-ticker__dot">•</span>
          <span>AUTHENTIC TOKYO TAILORING</span>
          <span className="zenji-ticker__dot">•</span>
          <span>{ANNOUNCEMENT}</span>
        </div>
      </div>

      {/* Main Sticky Navigation Bar */}
      <nav
        className="zenji-nav"
        role="navigation"
        aria-label="Main Navigation"
      >
        <div className="zenji-nav__container">
          {/* Mobile Hamburger Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="zenji-nav__toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </motion.button>

          {/* Brand Logo with Tokyo Insignia */}
          <Link
            to="/"
            className="zenji-logo"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="ZENJI Homepage"
          >
            <motion.span
              className="zenji-logo__jp"
              whileHover={{ scale: 1.08, rotate: -2 }}
              transition={{ duration: 0.2 }}
            >
              禅侍
            </motion.span>
            <div className="zenji-logo__text-group">
              <span className="zenji-logo__text">{BRAND_NAME}</span>
              <span className="zenji-logo__sub">TOKYO ATELIER</span>
            </div>
          </Link>

          {/* Desktop Navigation Links with Active Glide Indicator */}
          <div className="zenji-nav__links">
            {NAV_ITEMS.map((link, idx) => {
              const isActive =
                link.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(link.path.split('?')[0]);

              return (
                <Link
                  key={link.label}
                  to={link.path}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`zenji-nav__link ${
                    isActive ? 'zenji-nav__link--active' : ''
                  }`}
                >
                  <span className="zenji-nav__link-text">{link.label}</span>
                  <span className="zenji-nav__link-jp">{link.jp}</span>

                  {/* Active Route Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="zenji-nav__active-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Hover Floating Dot */}
                  {hoveredIndex === idx && !isActive && (
                    <motion.div
                      layoutId="hoverNavDot"
                      className="zenji-nav__hover-dot"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Action Tools: Search & Bag Drawer */}
          <div className="zenji-nav__actions">
            <Link to="/shop" aria-label="Search Archives">
              <motion.div
                whileHover={{ scale: 1.08, borderColor: 'var(--accent-neon)' }}
                whileTap={{ scale: 0.92 }}
                className="zenji-nav__action-btn"
                title="Search Archives"
              >
                <Search size={18} />
              </motion.div>
            </Link>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="zenji-cart-btn"
              onClick={toggleCart}
              aria-label={`Shopping Bag (${totalItemsCount} items)`}
            >
              <div className="zenji-cart-btn__icon-wrap">
                <ShoppingBag size={18} />
                {totalItemsCount > 0 && (
                  <motion.span
                    key={totalItemsCount}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', damping: 14, stiffness: 360 }}
                    className="zenji-cart-btn__badge"
                  >
                    {totalItemsCount}
                  </motion.span>
                )}
              </div>
              <span className="zenji-cart-btn__label">BAG</span>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu with Staggered Animations */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="zenji-mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              className="zenji-mobile-menu__inner"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile Drawer Header */}
              <div className="zenji-mobile-menu__header">
                <div className="zenji-logo">
                  <span className="zenji-logo__jp">禅侍</span>
                  <span className="zenji-logo__text">{BRAND_NAME}</span>
                </div>
                <button
                  className="zenji-mobile-menu__close"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Mobile Search Input */}
              <form
                className="zenji-mobile-menu__search"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (mobileSearch.trim()) {
                    window.location.href = `/shop?category=all`;
                  }
                }}
              >
                <Search size={16} className="zenji-mobile-menu__search-icon" />
                <input
                  type="text"
                  placeholder="Search archives..."
                  value={mobileSearch}
                  onChange={(e) => setMobileSearch(e.target.value)}
                  className="zenji-mobile-menu__search-input"
                />
              </form>

              {/* Navigation Links with Stagger */}
              <motion.nav
                className="zenji-mobile-menu__nav"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.07, delayChildren: 0.1 }
                  }
                }}
              >
                {NAV_ITEMS.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <motion.div
                      key={link.label}
                      variants={{
                        hidden: { opacity: 0, x: -16 },
                        visible: { opacity: 1, x: 0 }
                      }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`zenji-mobile-menu__link ${
                          isActive ? 'zenji-mobile-menu__link--active' : ''
                        }`}
                      >
                        <div className="zenji-mobile-menu__link-left">
                          <span className="zenji-mobile-menu__link-title">
                            {link.label}
                          </span>
                          <span className="zenji-mobile-menu__link-jp">
                            {link.jp}
                          </span>
                        </div>
                        <ArrowRight size={16} />
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.nav>

              {/* Mobile Footer with Studio Coordinates */}
              <div className="zenji-mobile-menu__footer">
                <div className="zenji-mobile-menu__badge">
                  <ShieldCheck size={14} />
                  <span>NFC VERIFIED TOKYO ATELIER</span>
                </div>
                <p className="zenji-mobile-menu__coords">
                  TOKYO 35.6764° N, 139.6500° E // DROP 004
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
export default Navbar;
