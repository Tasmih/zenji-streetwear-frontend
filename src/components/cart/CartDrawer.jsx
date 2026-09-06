import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  ShoppingBag,
  ArrowRight,
  Truck,
  Gift,
  ShieldCheck,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  Trash2,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/useCart';
import { CartItem } from './CartItem';
import { Button } from '../common/Button';
import { formatCurrency } from '../../utils/formatCurrency';
import { CATEGORIES } from '../../data/categories';

export const CartDrawer = () => {
  const { isCartOpen, closeCart, cartItems, totalItemsCount, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const FREE_SHIPPING_THRESHOLD = 200;
  const GIFT_THRESHOLD = 350;

  const handleClose = useCallback(() => {
    setShowClearConfirm(false);
    closeCart();
  }, [closeCart]);

  // Handle ESC key to close cart
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isCartOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, handleClose]);


  // Disable background scrolling when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  // Quick navigation handler
  const handleCategoryClick = (categorySlug) => {
    handleClose();
    if (categorySlug === 'all') {
      navigate('/shop');
    } else {
      navigate(`/shop?category=${categorySlug}`);
    }
  };


  const handleBagOverview = () => {
    setToastMessage('Session bag reserved. Frontend UI preview mode active.');
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleConfirmClear = () => {
    clearCart();
    setShowClearConfirm(false);
    setToastMessage('Bag successfully cleared.');
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          className="zenji-drawer-overlay"
          onClick={handleClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
        >
          <motion.aside
            className="zenji-drawer"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping Bag"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.85 }}
          >
            {/* Drawer Header */}
            <div className="zenji-drawer__header">
              <div className="zenji-drawer__title-wrap">
                <div className="zenji-drawer__icon-badge">
                  <ShoppingBag size={18} />
                </div>
                <div>
                  <div className="zenji-drawer__protocol-tag">
                    <span className="zenji-drawer__pulse-dot" />
                    ZN-BAG // SESSION ARCHIVE
                  </div>
                  <h3 className="zenji-drawer__title">
                    YOUR BAG <span className="zenji-drawer__count-badge">({totalItemsCount})</span>
                  </h3>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="zenji-drawer__close"
                onClick={handleClose}
                aria-label="Close bag"
              >
                <X size={18} />
              </motion.button>
            </div>


            {/* Tiered Perks & Free Shipping Tracker */}
            <div className="zenji-drawer__shipping-bar">
              <div className="zenji-drawer__shipping-header">
                <div className="zenji-drawer__shipping-status">
                  {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                    <span className="zenji-drawer__shipping-msg zenji-drawer__shipping-msg--success">
                      <CheckCircle2 size={13} />
                      FREE WORLDWIDE EXPRESS UNLOCKED
                    </span>
                  ) : (
                    <span className="zenji-drawer__shipping-msg">
                      <Truck size={13} />
                      ADD {formatCurrency(FREE_SHIPPING_THRESHOLD - subtotal)} FOR FREE EXPRESS
                    </span>
                  )}
                </div>

                <div className="zenji-drawer__shipping-tier-tag">
                  {subtotal >= GIFT_THRESHOLD ? (
                    <span className="zenji-drawer__gift-tag zenji-drawer__gift-tag--unlocked">
                      <Gift size={11} /> VIP GIFT UNLOCKED
                    </span>
                  ) : (
                    <span className="zenji-drawer__gift-tag">
                      <Sparkles size={11} /> {formatCurrency(GIFT_THRESHOLD - subtotal)} TO VIP GIFT
                    </span>
                  )}
                </div>
              </div>

              <div className="zenji-drawer__progress-track">
                <motion.div
                  className="zenji-drawer__progress-fill"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${Math.min(100, (subtotal / GIFT_THRESHOLD) * 100)}%`
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
                <div
                  className={`zenji-drawer__progress-pin zenji-drawer__progress-pin--shipping ${
                    subtotal >= FREE_SHIPPING_THRESHOLD ? 'is-active' : ''
                  }`}
                  style={{ left: `${(FREE_SHIPPING_THRESHOLD / GIFT_THRESHOLD) * 100}%` }}
                  title="Free Express Shipping Milestone ($200)"
                />
              </div>
            </div>

            {/* Notification Toast */}
            <AnimatePresence>
              {toastMessage && (
                <motion.div
                  className="zenji-drawer__toast"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sparkles size={14} />
                  <span>{toastMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Cart Item List or Empty State */}
            <div className="zenji-drawer__body">
              {cartItems.length === 0 ? (
                <motion.div
                  className="zenji-drawer__empty"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  <div className="zenji-drawer__empty-visual">
                    <div className="zenji-drawer__empty-glow" />
                    <div className="zenji-drawer__empty-icon-wrap">
                      <ShoppingBag size={44} strokeWidth={1.2} />
                      <span className="zenji-drawer__empty-scan" />
                    </div>
                  </div>

                  <div className="zenji-drawer__empty-badge">ARCHIVE STATUS // ZERO ITEMS</div>
                  <h4 className="zenji-drawer__empty-title">YOUR BAG IS EMPTY</h4>
                  <p className="zenji-drawer__empty-desc">
                    No streetwear artifacts currently reserved in your session. Explore our limited Drop 004 archive before pieces sell out.
                  </p>

                  <div className="zenji-drawer__empty-actions">
                    <Button
                      variant="primary"
                      fullWidth
                      icon={ArrowRight}
                      onClick={() => handleCategoryClick('all')}
                    >
                      EXPLORE FULL ARCHIVE
                    </Button>
                  </div>

                  {/* Category Quick Jump Chips */}
                  <div className="zenji-drawer__quick-categories">
                    <span className="zenji-drawer__quick-title">QUICK JUMP CATEGORIES</span>
                    <div className="zenji-drawer__quick-chips">
                      {CATEGORIES.filter((c) => c.slug !== 'all').map((cat) => (
                        <motion.button
                          key={cat.id}
                          whileHover={{ scale: 1.05, borderColor: 'var(--accent-neon)' }}
                          whileTap={{ scale: 0.95 }}
                          className="zenji-drawer__chip"
                          onClick={() => handleCategoryClick(cat.slug)}
                        >
                          {cat.name}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Empty state perks */}
                  <div className="zenji-drawer__empty-perks">
                    <div className="zenji-drawer__empty-perk">
                      <ShieldCheck size={14} />
                      <span>100% Authentic Verified</span>
                    </div>
                    <div className="zenji-drawer__empty-perk">
                      <Truck size={14} />
                      <span>Global Express Dispatch</span>
                    </div>
                    <div className="zenji-drawer__empty-perk">
                      <RotateCcw size={14} />
                      <span>14-Day Free Exchange</span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="zenji-drawer__items-container">
                  <div className="zenji-drawer__items-header">
                    <span className="zenji-drawer__items-label">RESERVED PIECES</span>
                    <span className="zenji-drawer__items-tag">EDITION 004 // LIMITED RUN</span>
                  </div>

                  <div className="zenji-drawer__items">
                    <AnimatePresence initial={false} mode="popLayout">
                      {cartItems.map((item) => (
                        <CartItem
                          key={`${item.id}-${item.size}-${item.color}`}
                          item={item}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </div>

            {/* Drawer Footer (Pure Frontend Interaction) */}
            {cartItems.length > 0 && (
              <div className="zenji-drawer__footer">
                {/* Cost Breakdown */}
                <div className="zenji-drawer__summary">
                  <div className="zenji-drawer__row">
                    <span className="zenji-drawer__row-label">ITEM SUBTOTAL</span>
                    <span className="zenji-drawer__amount">{formatCurrency(subtotal)}</span>
                  </div>

                  <div className="zenji-drawer__row zenji-drawer__row--sub">
                    <span className="zenji-drawer__row-label">
                      <Truck size={13} />
                      EXPRESS COURIER
                    </span>
                    <span className="zenji-drawer__row-val">
                      {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                        <span className="zenji-drawer__free-pill">FREE</span>
                      ) : (
                        formatCurrency(15)
                      )}
                    </span>
                  </div>

                  <div className="zenji-drawer__row zenji-drawer__row--sub">
                    <span className="zenji-drawer__row-label">
                      <Layers size={13} />
                      SIGNATURE PACKAGING
                    </span>
                    <span className="zenji-drawer__row-val">
                      <span className="zenji-drawer__free-pill">COMPLIMENTARY</span>
                    </span>
                  </div>

                  <div className="zenji-drawer__divider" />

                  <div className="zenji-drawer__row zenji-drawer__row--total">
                    <div className="zenji-drawer__total-label-wrap">
                      <span className="zenji-drawer__total-title">ESTIMATED TOTAL</span>
                      <span className="zenji-drawer__total-tax-hint">DUTIES & TAXES INCLUDED</span>
                    </div>
                    <span className="zenji-drawer__total-amount">
                      {formatCurrency(
                        subtotal + (subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 15)
                      )}
                    </span>
                  </div>
                </div>

                {/* Clear Bag Confirmation Modal / Toggle */}
                <AnimatePresence>
                  {showClearConfirm && (
                    <motion.div
                      className="zenji-drawer__confirm-box"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p>Clear all {totalItemsCount} pieces from your bag?</p>
                      <div className="zenji-drawer__confirm-actions">
                        <button
                          className="zenji-drawer__confirm-btn zenji-drawer__confirm-btn--danger"
                          onClick={handleConfirmClear}
                        >
                          YES, CLEAR BAG
                        </button>
                        <button
                          className="zenji-drawer__confirm-btn zenji-drawer__confirm-btn--cancel"
                          onClick={() => setShowClearConfirm(false)}
                        >
                          CANCEL
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Primary Action Buttons */}
                <div className="zenji-drawer__actions">
                  <motion.div whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }}>
                    <Button
                      variant="primary"
                      fullWidth
                      icon={ArrowRight}
                      onClick={handleBagOverview}
                    >
                      BAG OVERVIEW & RESERVE ({formatCurrency(subtotal)})
                    </Button>
                  </motion.div>

                  <div className="zenji-drawer__sub-actions">
                    <button
                      className="zenji-drawer__clear-btn"
                      onClick={() => setShowClearConfirm(!showClearConfirm)}
                    >
                      <Trash2 size={12} />
                      EMPTY BAG
                    </button>
                    <span className="zenji-drawer__secure-badge">
                      <ShieldCheck size={12} />
                      FRONTEND UI PREVIEW
                    </span>
                  </div>
                </div>
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

