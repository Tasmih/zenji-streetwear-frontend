import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/useCart';
import { ANNOUNCEMENT, NAV_LINKS, BRAND_NAME } from '../../utils/constants';

export const Navbar = () => {
  const { totalItemsCount, toggleCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`zenji-header ${isScrolled ? 'zenji-header--scrolled' : ''}`}>
      {/* Top Announcement Ticker */}
      <div className="zenji-ticker">
        <div className="zenji-ticker__content">
          <span>{ANNOUNCEMENT}</span>
          <span className="zenji-ticker__dot">•</span>
          <span>LIMITED RELEASE SS26</span>
          <span className="zenji-ticker__dot">•</span>
          <span>{ANNOUNCEMENT}</span>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="zenji-nav">
        <div className="zenji-nav__container">
          {/* Mobile Menu Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="zenji-nav__toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>

          {/* Brand Logo */}
          <Link to="/" className="zenji-logo" onClick={() => setMobileMenuOpen(false)}>
            <motion.span
              className="zenji-logo__jp"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              禅侍
            </motion.span>
            <span className="zenji-logo__text">{BRAND_NAME}</span>
            <span className="zenji-logo__sub">TOKYO</span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="zenji-nav__links">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`zenji-nav__link ${isActive ? 'zenji-nav__link--active' : ''}`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '2px',
                        background: 'var(--accent-neon)',
                        boxShadow: '0 0 8px var(--accent-neon)'
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions: Shop Link & Cart Drawer Toggle */}
          <div className="zenji-nav__actions">
            <Link to="/shop">
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="zenji-nav__action-btn"
                title="Explore Shop"
              >
                <Search size={19} />
              </motion.div>
            </Link>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="zenji-cart-btn"
              onClick={toggleCart}
              aria-label="Open Cart"
            >
              <ShoppingBag size={20} />
              <span className="zenji-cart-btn__label">BAG</span>
              {totalItemsCount > 0 && (
                <motion.span
                  key={totalItemsCount}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', damping: 15, stiffness: 350 }}
                  className="zenji-cart-btn__badge"
                >
                  {totalItemsCount}
                </motion.span>
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="zenji-mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              className="zenji-mobile-menu__inner"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="zenji-mobile-menu__header">
                <span className="zenji-logo__jp">禅侍</span>
                <button
                  className="zenji-mobile-menu__close"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>
              <nav className="zenji-mobile-menu__nav">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="zenji-mobile-menu__link"
                  >
                    <span>{link.label}</span>
                    <ArrowRight size={16} />
                  </Link>
                ))}
              </nav>
              <div className="zenji-mobile-menu__footer">
                <p className="zenji-mobile-menu__info">DROP 004 // ARCHIVAL TACTICAL</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
