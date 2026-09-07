import { useState } from 'react';
import { Trash2, Plus, Minus, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/useCart';
import { formatCurrency } from '../../utils/formatCurrency';

export const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const [direction, setDirection] = useState(1);

  const handleIncrement = () => {
    setDirection(1);
    updateQuantity(item.id, item.size, item.color, item.quantity + 1);
  };

  const handleDecrement = () => {
    setDirection(-1);
    if (item.quantity > 1) {
      updateQuantity(item.id, item.size, item.color, item.quantity - 1);
    } else {
      removeFromCart(item.id, item.size, item.color);
    }
  };

  return (
    <motion.div
      layout
      className="zenji-cart-item"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95, height: 0, marginBottom: 0, overflow: 'hidden' }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="zenji-cart-item__img-wrap">
        <img src={item.image} alt={item.name} className="zenji-cart-item__img" />
        <span className="zenji-cart-item__img-tag">DROP 004</span>
      </div>

      <div className="zenji-cart-item__details">
        <div className="zenji-cart-item__header">
          <div>
            <h4 className="zenji-cart-item__title">{item.name}</h4>
            <div className="zenji-cart-item__unit-price">
              {formatCurrency(item.price)} each
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.15, color: 'var(--accent-red)' }}
            whileTap={{ scale: 0.9 }}
            onClick={() => removeFromCart(item.id, item.size, item.color)}
            className="zenji-cart-item__remove"
            title="Remove item"
            aria-label="Remove item"
          >
            <Trash2 size={15} />
          </motion.button>
        </div>

        <div className="zenji-cart-item__meta">
          <span className="zenji-cart-item__pill">
            <span className="zenji-cart-item__pill-label">SIZE</span>
            <span className="zenji-cart-item__pill-val">{item.size}</span>
          </span>
          {item.color && item.color !== 'Default' && (
            <span className="zenji-cart-item__pill zenji-cart-item__pill--color">
              <span
                className="zenji-cart-item__color-dot"
                style={{
                  backgroundColor:
                    item.color.toLowerCase() === 'obsidian' || item.color.toLowerCase() === 'black'
                      ? '#111'
                      : item.color.toLowerCase() === 'bone' || item.color.toLowerCase() === 'white'
                      ? '#eaeaea'
                      : item.color.toLowerCase() === 'acid' || item.color.toLowerCase() === 'volt'
                      ? '#d4ff00'
                      : item.color.toLowerCase() === 'steel' || item.color.toLowerCase() === 'grey'
                      ? '#64748b'
                      : '#999'
                }}
              />
              <span className="zenji-cart-item__pill-val">{item.color}</span>
            </span>
          )}
          <span className="zenji-cart-item__spec-tag">
            <Tag size={10} />
            ARCHIVE SPEC
          </span>
        </div>

        <div className="zenji-cart-item__footer">
          <div className="zenji-cart-item__qty-ctrl">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.85 }}
              onClick={handleDecrement}
              className="zenji-cart-item__qty-btn"
              aria-label={item.quantity === 1 ? 'Remove item' : 'Decrease quantity'}
            >
              {item.quantity === 1 ? <Trash2 size={12} className="zenji-cart-item__trash-icon" /> : <Minus size={12} />}
            </motion.button>

            <div className="zenji-cart-item__qty-num-wrap">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={item.quantity}
                  initial={{ y: direction * 12, opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: -direction * 12, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="zenji-cart-item__qty-num"
                >
                  {item.quantity}
                </motion.span>
              </AnimatePresence>
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.85 }}
              onClick={handleIncrement}
              className="zenji-cart-item__qty-btn"
              aria-label="Increase quantity"
            >
              <Plus size={12} />
            </motion.button>
          </div>

          <div className="zenji-cart-item__price-wrap">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={item.price * item.quantity}
                initial={{ opacity: 0.6, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="zenji-cart-item__price"
              >
                {formatCurrency(item.price * item.quantity)}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

