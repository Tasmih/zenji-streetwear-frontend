import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowUpRight, MapPin } from 'lucide-react';
import { BRAND_NAME, FOOTER_LINKS } from '../../utils/constants';

const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    url: 'https://instagram.com/zenji.archive',
    ariaLabel: 'Follow ZENJI on Instagram',
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    )
  },
  {
    name: 'X / Twitter',
    url: 'https://x.com/zenji_archive',
    ariaLabel: 'Follow ZENJI on X (formerly Twitter)',
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="17"
        height="17"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    )
  },
  {
    name: 'TikTok',
    url: 'https://tiktok.com/@zenji.tokyo',
    ariaLabel: 'Follow ZENJI on TikTok',
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="17"
        height="17"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-.88-.06A6.34 6.34 0 0 0 3.14 15.7a6.34 6.34 0 0 0 10.84 4.47V10.8a8.28 8.28 0 0 0 5.61 2.23V9.58a4.84 4.84 0 0 1-3.77-2.89z" />
      </svg>
    )
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com/@zenjiarchive',
    ariaLabel: 'Subscribe to ZENJI on YouTube',
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
      </svg>
    )
  },
  {
    name: 'Facebook',
    url: 'https://facebook.com/zenji.atelier',
    ariaLabel: 'Follow ZENJI on Facebook',
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    )
  },
  {
    name: 'Pinterest',
    url: 'https://pinterest.com/zenjiarchive',
    ariaLabel: 'Explore ZENJI moodboards on Pinterest',
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <line x1="12" y1="9" x2="12" y2="21" />
        <path d="M8 12a4 4 0 1 1 8 0c0 2.22-1.78 4-4 4-1.12 0-2.12-.46-2.83-1.21" />
        <path d="M10.5 16.5 9 22" />
      </svg>
    )
  }
];

const socialContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.12
    }
  }
};

const socialItemVariants = {
  hidden: {
    opacity: 0,
    y: 12,
    scale: 0.86
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 420,
      damping: 24
    }
  }
};

export const Footer = () => {
  return (
    <footer className="zenji-footer" aria-label="ZENJI Footer">
      {/* Thin Animated Neon Line with Moving Glow Effect */}
      <div className="zenji-footer__top-neon-line" aria-hidden="true">
        <div className="zenji-footer__top-neon-beam" />
      </div>

      <div className="zenji-footer__container">
        {/* Brand Column */}
        <div className="zenji-footer__brand">
          {/* Logo with fade-in */}
          <motion.div
            className="zenji-footer__brand-top"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="zenji-logo zenji-logo--footer">
              <span className="zenji-logo__jp">禅侍</span>
              <span className="zenji-logo__text">{BRAND_NAME}</span>
            </div>
            <span className="zenji-footer__jp-badge">東京工房</span>
          </motion.div>

          {/* Subtitle: TOKYO ATELIER */}
          <motion.h3
            className="zenji-footer__brand-title"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            TOKYO ATELIER
          </motion.h3>

          {/* Description */}
          <motion.p
            className="zenji-footer__desc"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
          >
            Engineering heavyweight streetwear through Japanese precision, experimental silhouettes, and limited archive releases.
          </motion.p>

          {/* Thin Neon Lime Divider Line with Drawing Animation */}
          <motion.div
            className="zenji-footer__divider-line"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'left' }}
            aria-hidden="true"
          />

          {/* Brand Status Panel with Technical Grid Pattern */}
          <motion.div
            className="zenji-footer__status-panel"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Tactical Corners */}
            <div className="zenji-footer__panel-corner zenji-footer__panel-corner--tl" />
            <div className="zenji-footer__panel-corner zenji-footer__panel-corner--tr" />
            <div className="zenji-footer__panel-corner zenji-footer__panel-corner--bl" />
            <div className="zenji-footer__panel-corner zenji-footer__panel-corner--br" />

            {/* System Status Row */}
            <div className="zenji-footer__status-header">
              <span className="zenji-footer__status-sys">
                ZENJI ARCHIVE SYSTEM
              </span>
              <span className="zenji-footer__status-jp">設計基盤</span>
            </div>

            <div className="zenji-footer__status-active-row">
              <span className="zenji-footer__status-pulse-dot" />
              <span className="zenji-footer__status-active-text">
                ACTIVE // TOKYO STUDIO
              </span>
            </div>

            {/* Location & Coordinates */}
            <div className="zenji-footer__status-location">
              <div className="zenji-footer__location-name">
                <MapPin size={11} className="zenji-footer__loc-icon" />
                <span>SHIBUYA, TOKYO</span>
              </div>
              <span className="zenji-footer__coords-text">
                35.6580° N, 139.7016° E
              </span>
            </div>
          </motion.div>
        </div>

        {/* Links Grid: 4 Columns */}
        <div className="zenji-footer__links">
          {/* Column 1: COLLECTIONS */}
          <div className="zenji-footer__col">
            <h4 className="zenji-footer__col-title">COLLECTIONS</h4>
            <ul className="zenji-footer__list">
              {FOOTER_LINKS.shop.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="zenji-footer__link">
                    <span className="zenji-footer__link-chevron">›</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: ATELIER */}
          <div className="zenji-footer__col">
            <h4 className="zenji-footer__col-title">ATELIER</h4>
            <ul className="zenji-footer__list">
              {FOOTER_LINKS.brand.map((link) => (
                <li key={link.label}>
                  <a href={link.path} className="zenji-footer__link">
                    <span className="zenji-footer__link-chevron">›</span>
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: CONTACT ZENJI */}
          <div className="zenji-footer__col zenji-footer__col--contact">
            <h4 className="zenji-footer__col-title">CONTACT ZENJI</h4>

            <div className="zenji-footer__email-block">
              <span className="zenji-footer__label">EMAIL</span>
              <a href="mailto:support@zenji.com" className="zenji-footer__email">
                <Mail size={12} className="zenji-footer__email-icon" />
                <span>support@zenji.com</span>
                <ArrowUpRight size={11} className="zenji-footer__arrow" />
              </a>
            </div>

            <div className="zenji-footer__contact-links-wrap">
              <span className="zenji-footer__label">LINKS</span>
              <ul className="zenji-footer__list">
                <li>
                  <Link to="/contact" className="zenji-footer__link">
                    <span className="zenji-footer__link-chevron">›</span>
                    <span>Contact</span>
                  </Link>
                </li>
                <li>
                  <a href="#faq" className="zenji-footer__link">
                    <span className="zenji-footer__link-chevron">›</span>
                    <span>FAQ</span>
                  </a>
                </li>
                <li>
                  <a href="#shipping" className="zenji-footer__link">
                    <span className="zenji-footer__link-chevron">›</span>
                    <span>Shipping</span>
                  </a>
                </li>
                <li>
                  <a href="#returns" className="zenji-footer__link">
                    <span className="zenji-footer__link-chevron">›</span>
                    <span>Returns</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 4: FOLLOW ZENJI (Social Media Column) */}
          <div className="zenji-footer__col zenji-footer__col--social">
            <h4 className="zenji-footer__col-title">FOLLOW ZENJI</h4>

            <p className="zenji-footer__social-subtitle">
              TOKYO DISPATCH CHANNELS
            </p>

            <motion.div
              className="zenji-footer__social-grid"
              variants={socialContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-20px' }}
            >
              {SOCIAL_LINKS.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="zenji-footer__social-btn"
                  aria-label={social.ariaLabel}
                  variants={socialItemVariants}
                  whileHover={{
                    y: -4,
                    scale: 1.12,
                    transition: { type: 'spring', stiffness: 420, damping: 20 }
                  }}
                  whileTap={{ scale: 0.94 }}
                >
                  <span className="zenji-footer__social-btn-glow" aria-hidden="true" />
                  <span className="zenji-footer__social-icon-wrap">
                    {social.icon}
                  </span>
                </motion.a>
              ))}
            </motion.div>

            <div className="zenji-footer__social-meta">
              <span className="zenji-footer__social-beacon" />
              <span>COMMUNITY PROTOCOL // 24H BROADCAST</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="zenji-footer__bottom">
        <div className="zenji-footer__bottom-container">
          <p>© {new Date().getFullYear()} {BRAND_NAME} STUDIOS TOKYO. ALL RIGHTS RESERVED.</p>
          <div className="zenji-footer__legal">
            <a href="#">PRIVACY POLICY</a>
            <span className="dot">•</span>
            <a href="#">TERMS OF ARCHIVE</a>
            <span className="dot">•</span>
            <a href="#">AUTHENTICITY GUARANTEE</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
