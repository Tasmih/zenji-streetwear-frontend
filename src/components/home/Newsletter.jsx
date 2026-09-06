import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../common/Button';
import { scrollFadeUp, scrollCardItem } from '../../utils/motionVariants';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <section className="zenji-newsletter">
      <motion.div
        className="zenji-newsletter__container"
        variants={scrollCardItem}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-70px' }}
        style={{ willChange: 'transform, opacity' }}
      >
        <motion.div
          className="zenji-newsletter__content"
          variants={scrollFadeUp}
        >
          <span className="zenji-newsletter__tag">EARLY ACCESS VIP ARCHIVE</span>
          <h2 className="zenji-newsletter__title">ACCESS DROP 005 BEFORE PUBLIC RELEASE</h2>
          <p className="zenji-newsletter__desc">
            Subscribers receive private 1-hour early access keys and password invites for upcoming limited drops.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {subscribed ? (
            <motion.div
              key="success"
              className="zenji-newsletter__success"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'spring', damping: 22, stiffness: 320 }}
            >
              <Check size={20} className="zenji-newsletter__check" />
              <span>YOU ARE REGISTERED FOR DROP 005 EARLY ACCESS.</span>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              className="zenji-newsletter__form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <input
                type="email"
                placeholder="Enter your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="zenji-newsletter__input"
              />
              <motion.div whileHover={{ scale: 1.025, y: -2 }} whileTap={{ scale: 0.98 }}>
                <Button type="submit" variant="primary" icon={ArrowRight}>
                  SUBSCRIBE
                </Button>
              </motion.div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
