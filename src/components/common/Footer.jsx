import { Link } from 'react-router-dom';
import { BRAND_NAME, FOOTER_LINKS } from '../../utils/constants';

export const Footer = () => {
  return (
    <footer className="zenji-footer">
      <div className="zenji-footer__container">
        {/* Brand Column */}
        <div className="zenji-footer__brand">
          <div className="zenji-logo zenji-logo--footer">
            <span className="zenji-logo__jp">禅侍</span>
            <span className="zenji-logo__text">{BRAND_NAME}</span>
          </div>
          <p className="zenji-footer__desc">
            Archival streetwear, heavy custom-milled textiles, and tactical silhouettes engineered for modern dystopias.
          </p>
          <div className="zenji-footer__coords">
            <span>TYO-SHIBUYA 35.6580° N, 139.7016° E // ARCHIVE LAB</span>
          </div>
        </div>

        {/* Links Grid */}
        <div className="zenji-footer__links">
          <div className="zenji-footer__col">
            <h4 className="zenji-footer__col-title">COLLECTIONS</h4>
            <ul>
              {FOOTER_LINKS.shop.map((link) => (
                <li key={link.label}>
                  <Link to={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="zenji-footer__col">
            <h4 className="zenji-footer__col-title">ATELIER</h4>
            <ul>
              {FOOTER_LINKS.brand.map((link) => (
                <li key={link.label}>
                  <a href={link.path}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="zenji-footer__col">
            <h4 className="zenji-footer__col-title">CLIENT SERVICE</h4>
            <ul>
              {FOOTER_LINKS.support.map((link) => (
                <li key={link.label}>
                  <a href={link.path}>{link.label}</a>
                </li>
              ))}
            </ul>
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
