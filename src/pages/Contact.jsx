import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MapPin, Mail, Clock, ShieldCheck, CheckCircle2, Radio, Sparkles } from 'lucide-react';
import { useDocumentTitle } from '../utils/useDocumentTitle';

export const Contact = () => {
  useDocumentTitle(
    'Contact Atelier // Tokyo Dispatch',
    'Direct inquiry channel to ZENJI Tokyo Design Studio and client concierge.'
  );

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'order-inquiry',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      subject: 'order-inquiry',
      message: ''
    });
    setIsSubmitted(false);
  };

  return (
    <div className="zenji-contact-page">
      {/* Background Ambience */}
      <div className="zenji-contact-page__bg-glow" aria-hidden="true" />
      <div className="zenji-contact-page__bg-grid" aria-hidden="true" />

      <div className="zenji-contact-page__container">
        {/* Header */}
        <motion.div
          className="zenji-contact-page__header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="zenji-contact-page__kicker">
            <Radio size={12} className="zenji-contact-page__beacon" />
            <span className="zenji-contact-page__kicker-text">
              TRANSMISSION TERMINAL // TYO-SHIBUYA
            </span>
            <span className="zenji-contact-page__kicker-jp">連絡窓口</span>
          </div>

          <h1 className="zenji-contact-page__title">
            CONTACT ATELIER
          </h1>

          <p className="zenji-contact-page__subtitle">
            Direct communication line to ZENJI Tokyo Design Studio, customer concierge, and archive distribution.
          </p>

          <div className="zenji-contact-page__status-bar">
            <span className="zenji-contact-page__live-dot" />
            <span>DISPATCH STATUS: ACTIVE // 24H STANDARD RESPONSE</span>
          </div>
        </motion.div>

        {/* Content Spread */}
        <div className="zenji-contact-page__grid">
          {/* Left Column: Atelier Coordinates & Details */}
          <motion.div
            className="zenji-contact-info-card"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Tactical Corners */}
            <div className="zenji-contact-card__corner zenji-contact-card__corner--tl" />
            <div className="zenji-contact-card__corner zenji-contact-card__corner--tr" />
            <div className="zenji-contact-card__corner zenji-contact-card__corner--bl" />
            <div className="zenji-contact-card__corner zenji-contact-card__corner--br" />

            <div className="zenji-contact-info-card__header">
              <span className="zenji-contact-info-card__tag">
                HEADQUARTERS & ARCHIVE
              </span>
              <span className="zenji-contact-info-card__jp">東京工房</span>
            </div>

            <h2 className="zenji-contact-info-card__heading">
              ZENJI TOKYO DESIGN STUDIO
            </h2>

            <div className="zenji-contact-info-list">
              {/* Location */}
              <div className="zenji-contact-info-item">
                <div className="zenji-contact-info-icon">
                  <MapPin size={16} />
                </div>
                <div className="zenji-contact-info-text">
                  <span className="zenji-contact-info-label">COORDINATES</span>
                  <p className="zenji-contact-info-value">
                    Jingumae 5-Chome, Shibuya-ku, Tokyo 150-0001, Japan
                  </p>
                </div>
              </div>

              {/* Direct Mail */}
              <div className="zenji-contact-info-item">
                <div className="zenji-contact-info-icon">
                  <Mail size={16} />
                </div>
                <div className="zenji-contact-info-text">
                  <span className="zenji-contact-info-label">DIRECT INQUIRY</span>
                  <p className="zenji-contact-info-value">
                    concierge@zenjistreetwear.jp
                  </p>
                  <p className="zenji-contact-info-sub">
                    atelier@zenjistreetwear.jp (Press & Collabs)
                  </p>
                </div>
              </div>

              {/* Atelier Operating Hours */}
              <div className="zenji-contact-info-item">
                <div className="zenji-contact-info-icon">
                  <Clock size={16} />
                </div>
                <div className="zenji-contact-info-text">
                  <span className="zenji-contact-info-label">OPERATING CYCLES</span>
                  <p className="zenji-contact-info-value">
                    Monday — Friday: 10:00 — 19:00 JST
                  </p>
                  <p className="zenji-contact-info-sub">
                    Weekend Archives Dispatched Remotely
                  </p>
                </div>
              </div>
            </div>

            {/* Verification Badge Box */}
            <div className="zenji-contact-trust-box">
              <div className="zenji-contact-trust-item">
                <ShieldCheck size={14} className="zenji-contact-trust-icon" />
                <span>SSL 256-BIT ENCRYPTED TRANSMISSION</span>
              </div>
              <div className="zenji-contact-trust-item">
                <Sparkles size={14} className="zenji-contact-trust-icon" />
                <span>DIRECT DESIGNER INBOX // ZERO AUTOMATED BOTS</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Transmission Form */}
          <motion.div
            className="zenji-contact-form-card"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Tactical Corners */}
            <div className="zenji-contact-card__corner zenji-contact-card__corner--tl" />
            <div className="zenji-contact-card__corner zenji-contact-card__corner--tr" />
            <div className="zenji-contact-card__corner zenji-contact-card__corner--bl" />
            <div className="zenji-contact-card__corner zenji-contact-card__corner--br" />

            <div className="zenji-contact-form-card__beam" />

            <div className="zenji-contact-form-card__top">
              <span className="zenji-contact-form-card__pill">
                CLIENT TERMINAL
              </span>
              <span className="zenji-contact-form-card__mono">
                PROTOCOL // FORM 004
              </span>
            </div>

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  className="zenji-contact-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="zenji-contact-success__icon">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="zenji-contact-success__title">
                    TRANSMISSION DISPATCHED
                  </h3>
                  <p className="zenji-contact-success__desc">
                    Thank you, {formData.name || 'Collector'}. Your communication has been routed to the ZENJI Tokyo Atelier. An archivist will review and respond within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="zenji-contact-success__btn"
                  >
                    SEND ANOTHER TRANSMISSION
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="zenji-contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="zenji-contact-form__field">
                    <label htmlFor="name" className="zenji-contact-form__label">
                      COLLECTOR NAME *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="e.g. Kenji Takahashi"
                      value={formData.name}
                      onChange={handleChange}
                      className="zenji-contact-form__input"
                    />
                  </div>

                  <div className="zenji-contact-form__field">
                    <label htmlFor="email" className="zenji-contact-form__label">
                      COMMUNICATION EMAIL *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="e.g. collector@domain.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="zenji-contact-form__input"
                    />
                  </div>

                  <div className="zenji-contact-form__field">
                    <label htmlFor="subject" className="zenji-contact-form__label">
                      SUBJECT CLASSIFICATION
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="zenji-contact-form__select"
                    >
                      <option value="order-inquiry">ORDER DISPATCH & TRACKING</option>
                      <option value="sizing-fit">ARCHITECTURAL FIT & SIZING</option>
                      <option value="drop-info">UPCOMING DROP RESERVATION</option>
                      <option value="press-collab">EDITORIAL PRESS & COLLABORATION</option>
                      <option value="other">OTHER ATELIER INQUIRY</option>
                    </select>
                  </div>

                  <div className="zenji-contact-form__field">
                    <label htmlFor="message" className="zenji-contact-form__label">
                      MESSAGE TRANSMISSION *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      placeholder="Describe your inquiry or order specifications..."
                      value={formData.message}
                      onChange={handleChange}
                      className="zenji-contact-form__textarea"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="zenji-contact-form__submit-btn"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <span>ENCRYPTING & DISPATCHING...</span>
                    ) : (
                      <>
                        <span>TRANSMIT TO ATELIER</span>
                        <Send size={14} />
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
