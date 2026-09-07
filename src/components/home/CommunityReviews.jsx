import { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle2, MessageSquareQuote, ShieldCheck, MapPin } from 'lucide-react';

const REVIEWS = [
  {
    id: 'rev-001',
    quote: "ZENJI's heavyweight hoodie quality is incredible. The fit and fabric feel premium.",
    customer: 'Alex M.',
    location: 'Tokyo, Japan',
    itemPurchased: '500 GSM OMNI HOODIE // DROP 004',
    rating: 5,
    initials: 'AM',
    avatarColor: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
    verified: true,
    tag: 'VERIFIED COLLECTOR',
    jpCity: '東京'
  },
  {
    id: 'rev-002',
    quote: 'The oversized silhouette and details are exactly what modern streetwear should be.',
    customer: 'Ryan K.',
    location: 'New York, USA',
    itemPurchased: 'ARCHITECTURAL SWEATER // DROP 004',
    rating: 5,
    initials: 'RK',
    avatarColor: 'linear-gradient(135deg, #27272a 0%, #09090b 100%)',
    verified: true,
    tag: 'VERIFIED COLLECTOR',
    jpCity: 'ニューヨーク'
  },
  {
    id: 'rev-003',
    quote: 'Limited drops make every piece feel unique. The craftsmanship is impressive.',
    customer: 'Daniel R.',
    location: 'London, UK',
    itemPurchased: 'HEAVY UTILITY CARGO // DROP 003',
    rating: 5,
    initials: 'DR',
    avatarColor: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    verified: true,
    tag: 'VERIFIED COLLECTOR',
    jpCity: 'ロンドン'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 36,
    scale: 0.96
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export const CommunityReviews = memo(() => {
  const [activeMobileIdx, setActiveMobileIdx] = useState(0);

  const handleScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    const cardWidth = e.target.offsetWidth * 0.85;
    if (cardWidth > 0) {
      const index = Math.round(scrollLeft / cardWidth);
      setActiveMobileIdx(Math.min(Math.max(index, 0), REVIEWS.length - 1));
    }
  };

  return (
    <section
      className="zenji-reviews-section"
      id="community-reviews"
      aria-label="Customer Reviews"
    >
      {/* Background Ambience: Dark Luxury Canvas + Radial Neon Halo */}
      <div className="zenji-reviews-section__bg-glow" aria-hidden="true" />
      <div className="zenji-reviews-section__bg-grid" aria-hidden="true" />

      <div className="zenji-reviews-section__container">
        {/* Section Header */}
        <motion.div
          className="zenji-reviews-section__header"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="zenji-reviews-section__kicker">
            <span className="zenji-reviews-section__kicker-dot" />
            <span className="zenji-reviews-section__kicker-text">
              GLOBAL ATELIER FEEDBACK
            </span>
            <span className="zenji-reviews-section__kicker-jp">コミュニティ評価</span>
          </div>

          <h2 className="zenji-reviews-section__title">
            WHAT THE COMMUNITY SAYS
          </h2>

          <p className="zenji-reviews-section__subtitle">
            Authentic dispatches from collectors wearing ZENJI architectural garments worldwide.
          </p>

          <div className="zenji-reviews-section__hud-strip">
            <div className="zenji-reviews-section__stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={13} className="zenji-reviews-section__hud-star" />
              ))}
            </div>
            <span className="zenji-reviews-section__hud-score">4.98 / 5.0</span>
            <div className="zenji-reviews-section__hud-divider" />
            <div className="zenji-reviews-section__hud-item">
              <ShieldCheck size={12} className="zenji-reviews-section__hud-icon" />
              <span>100% AUTHENTICATED PURCHASES</span>
            </div>
          </div>
        </motion.div>

        {/* 3 Review Cards Grid (Carousel on Mobile) */}
        <motion.div
          className="zenji-reviews-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px', amount: 0.1 }}
          onScroll={handleScroll}
        >
          {REVIEWS.map((review) => (
            <motion.div
              key={review.id}
              variants={cardVariants}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { type: 'spring', stiffness: 380, damping: 22 }
              }}
              className="zenji-reviews-card"
            >
              {/* Tactical Corner Marks */}
              <div className="zenji-reviews-card__corner zenji-reviews-card__corner--tl" />
              <div className="zenji-reviews-card__corner zenji-reviews-card__corner--tr" />
              <div className="zenji-reviews-card__corner zenji-reviews-card__corner--bl" />
              <div className="zenji-reviews-card__corner zenji-reviews-card__corner--br" />

              {/* Neon Border Shimmer Line on Hover */}
              <div className="zenji-reviews-card__beam" aria-hidden="true" />

              {/* Decorative Background Quote Icon */}
              <MessageSquareQuote
                size={80}
                className="zenji-reviews-card__watermark"
                aria-hidden="true"
              />

              {/* Card Header: Rating Stars & Verified Badge */}
              <div className="zenji-reviews-card__top">
                <div className="zenji-reviews-card__rating">
                  {[...Array(review.rating)].map((_, idx) => (
                    <Star
                      key={idx}
                      size={14}
                      className="zenji-reviews-card__star"
                    />
                  ))}
                </div>

                <div className="zenji-reviews-card__verified-badge">
                  <CheckCircle2 size={12} className="zenji-reviews-card__verified-icon" />
                  <span>{review.tag}</span>
                </div>
              </div>

              {/* Review Testimonial Quote */}
              <blockquote className="zenji-reviews-card__quote">
                &ldquo;{review.quote}&rdquo;
              </blockquote>

              {/* Divider */}
              <div className="zenji-reviews-card__divider" />

              {/* Customer Info & Avatar Placeholder */}
              <div className="zenji-reviews-card__footer">
                <div className="zenji-reviews-card__author">
                  {/* Customer Avatar Placeholder */}
                  <div
                    className="zenji-reviews-card__avatar"
                    style={{ background: review.avatarColor }}
                    aria-label={`Avatar for ${review.customer}`}
                  >
                    <span className="zenji-reviews-card__initials">
                      {review.initials}
                    </span>
                    <span className="zenji-reviews-card__avatar-dot" />
                  </div>

                  <div className="zenji-reviews-card__author-meta">
                    <div className="zenji-reviews-card__author-name-row">
                      <span className="zenji-reviews-card__name">
                        {review.customer}
                      </span>
                      <span className="zenji-reviews-card__jp-city">
                        {review.jpCity}
                      </span>
                    </div>
                    <div className="zenji-reviews-card__location">
                      <MapPin size={11} className="zenji-reviews-card__pin-icon" />
                      <span>{review.location}</span>
                    </div>
                  </div>
                </div>

                <div className="zenji-reviews-card__item-tag">
                  {review.itemPurchased}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Carousel Indicator Dots */}
        <div className="zenji-reviews-mobile-dots" aria-hidden="true">
          {REVIEWS.map((_, dotIdx) => (
            <span
              key={dotIdx}
              className={`zenji-reviews-mobile-dot ${
                activeMobileIdx === dotIdx ? 'zenji-reviews-mobile-dot--active' : ''
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

CommunityReviews.displayName = 'CommunityReviews';
export default CommunityReviews;
