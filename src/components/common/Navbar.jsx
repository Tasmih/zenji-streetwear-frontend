import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, ArrowRight } from 'lucide-react';
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
          <button
            className="zenji-nav__toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Brand Logo */}
          <Link to="/" className="zenji-logo" onClick={() => setMobileMenuOpen(false)}>
            <span className="zenji-logo__jp">禅侍</span>
            <span className="zenji-logo__text">{BRAND_NAME}</span>
            <span className="zenji-logo__sub">TOKYO</span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="zenji-nav__links">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className={`zenji-nav__link ${
                  location.pathname === link.path ? 'zenji-nav__link--active' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions: Shop Link & Cart Drawer Toggle */}
          <div className="zenji-nav__actions">
            <Link to="/shop" className="zenji-nav__action-btn" title="Explore Shop">
              <Search size={19} />
            </Link>

            <button
              className="zenji-cart-btn"
              onClick={toggleCart}
              aria-label="Open Cart"
            >
              <ShoppingBag size={20} />
              <span className="zenji-cart-btn__label">BAG</span>
              {totalItemsCount > 0 && (
                <span className="zenji-cart-btn__badge">{totalItemsCount}</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="zenji-mobile-menu">
          <div className="zenji-mobile-menu__inner">
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
          </div>
        </div>
      )}
    </header>
  );
};
