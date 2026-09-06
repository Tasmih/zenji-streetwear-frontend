import { Link } from 'react-router-dom';
import { ArrowRight, Flame } from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export const Hero = () => {
  return (
    <section className="zenji-hero">
      <div className="zenji-hero__backdrop">
        <div className="zenji-hero__glow"></div>
      </div>

      <div className="zenji-hero__container">
        <div className="zenji-hero__content">
          <div className="zenji-hero__badge-row">
            <Badge variant="neon">DROP 004 // LIVE NOW</Badge>
            <span className="zenji-hero__tagline-sub">SS26 ARCHIVAL ARCHITECTURE</span>
          </div>

          <h1 className="zenji-hero__title">
            CYBERNETIC <br />
            <span className="zenji-hero__title-accent">TACTICAL MINIMALISM</span>
          </h1>

          <p className="zenji-hero__subtitle">
            Engineered in Tokyo with custom 500 GSM French Terry, waterproof Cordura ripstop, and modular magnetic utility hardware.
          </p>

          <div className="zenji-hero__cta-group">
            <Link to="/shop">
              <Button variant="primary" size="lg" icon={ArrowRight}>
                EXPLORE DROP 004
              </Button>
            </Link>
            <Link to="/shop?category=hoodies">
              <Button variant="outline" size="lg" icon={Flame}>
                VIEW HOODIES
              </Button>
            </Link>
          </div>

          <div className="zenji-hero__stats">
            <div className="zenji-hero__stat-item">
              <span className="zenji-hero__stat-val">500+</span>
              <span className="zenji-hero__stat-lbl">GSM CUSTOM MILLED</span>
            </div>
            <div className="zenji-hero__stat-div"></div>
            <div className="zenji-hero__stat-item">
              <span className="zenji-hero__stat-val">LIMITED</span>
              <span className="zenji-hero__stat-lbl">BATCH RUNS</span>
            </div>
            <div className="zenji-hero__stat-div"></div>
            <div className="zenji-hero__stat-item">
              <span className="zenji-hero__stat-val">100%</span>
              <span className="zenji-hero__stat-lbl">AUTHENTIC ARCHIVE</span>
            </div>
          </div>
        </div>

        <div className="zenji-hero__visual">
          <div className="zenji-hero__card">
            <img
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80"
              alt="ZENJI Drop 004 Hero Lookbook"
              className="zenji-hero__card-img"
            />
            <div className="zenji-hero__card-overlay">
              <span className="zenji-hero__card-tag">EDITORIAL LOOKBOOK</span>
              <h3 className="zenji-hero__card-name">ARCHIVE DROP 004</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
