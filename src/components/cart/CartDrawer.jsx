import { useEffect } from 'react';
import { X, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/useCart';
import { CartItem } from './CartItem';
import { Button } from '../common/Button';
import { formatCurrency } from '../../utils/formatCurrency';

export const CartDrawer = () => {
  const { isCartOpen, closeCart, cartItems, totalItemsCount, subtotal, clearCart } = useCart();

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

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          className="zenji-drawer-overlay"
          onClick={closeCart}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
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
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          >
            {/* Drawer Header */}
            <div className="zenji-drawer__header">
              <div className="zenji-drawer__title-wrap">
                <ShoppingBag size={20} />
                <h3 className="zenji-drawer__title">BAG ({totalItemsCount})</h3>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="zenji-drawer__close"
                onClick={closeCart}
                aria-label="Close bag"
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Shipping progress indicator */}
            <div className="zenji-drawer__shipping-bar">
              {subtotal >= 200 ? (
                <p className="zenji-drawer__shipping-msg zenji-drawer__shipping-msg--success">
                  ✓ YOU HAVE UNLOCKED FREE WORLDWIDE EXPRESS SHIPPING
                </p>
              ) : (
                <p className="zenji-drawer__shipping-msg">
                  ADD {formatCurrency(200 - subtotal)} MORE FOR FREE EXPRESS SHIPPING
                </p>
              )}
              <div className="zenji-drawer__progress-track">
                <motion.div
                  className="zenji-drawer__progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, (subtotal / 200) * 100)}%` }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>

            {/* Cart Item List or Empty State */}
            <div className="zenji-drawer__body">
              {cartItems.length === 0 ? (
                <motion.div
                  className="zenji-drawer__empty"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <ShoppingBag size={48} strokeWidth={1} />
                  <h4>YOUR BAG IS EMPTY</h4>
                  <p>Explore latest Drop 004 archive items and add pieces to your bag.</p>
                  <Button variant="primary" onClick={closeCart}>
                    CONTINUE EXPLORING
                  </Button>
                </motion.div>
              ) : (
                <div className="zenji-drawer__items">
                  <AnimatePresence initial={false}>
                    {cartItems.map((item) => (
                      <motion.div
                        key={`${item.id}-${item.size}-${item.color}`}
                        initial={{ opacity: 0, height: 0, y: -10 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                      >
                        <CartItem item={item} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Drawer Footer (Pure Frontend Interaction) */}
            {cartItems.length > 0 && (
              <div className="zenji-drawer__footer">
                <div className="zenji-drawer__summary">
                  <div className="zenji-drawer__row">
                    <span>SUBTOTAL</span>
                    <span className="zenji-drawer__amount">{formatCurrency(subtotal)}</span>
                  </div>
                  <p className="zenji-drawer__notice">
                    Taxes, customs & duties calculated upon simulated order preview.
                  </p>
                </div>

                <div className="zenji-drawer__actions">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant="primary"
                      fullWidth
                      icon={ArrowRight}
                      onClick={() => {
                        alert('Frontend UI preview mode: Streetwear order bag updated.');
                      }}
                    >
                      BAG OVERVIEW ({formatCurrency(subtotal)})
                    </Button>
                  </motion.div>
                  <button
                    className="zenji-drawer__clear-btn"
                    onClick={clearCart}
                  >
                    EMPTY BAG
                  </button>
                </div>
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
