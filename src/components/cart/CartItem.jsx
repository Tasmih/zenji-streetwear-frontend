import { Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../../context/useCart';
import { formatCurrency } from '../../utils/formatCurrency';

export const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="zenji-cart-item">
      <div className="zenji-cart-item__img-wrap">
        <img src={item.image} alt={item.name} className="zenji-cart-item__img" />
      </div>

      <div className="zenji-cart-item__details">
        <div className="zenji-cart-item__header">
          <h4 className="zenji-cart-item__title">{item.name}</h4>
          <button
            onClick={() => removeFromCart(item.id, item.size, item.color)}
            className="zenji-cart-item__remove"
            title="Remove item"
            aria-label="Remove item"
          >
            <Trash2 size={16} />
          </button>
        </div>

        <div className="zenji-cart-item__meta">
          <span className="zenji-cart-item__pill">SIZE: {item.size}</span>
          {item.color && item.color !== 'Default' && (
            <span className="zenji-cart-item__pill">{item.color}</span>
          )}
        </div>

        <div className="zenji-cart-item__footer">
          <div className="zenji-cart-item__qty-ctrl">
            <button
              onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
              className="zenji-cart-item__qty-btn"
              aria-label="Decrease quantity"
            >
              <Minus size={12} />
            </button>
            <span className="zenji-cart-item__qty-num">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
              className="zenji-cart-item__qty-btn"
              aria-label="Increase quantity"
            >
              <Plus size={12} />
            </button>
          </div>

          <div className="zenji-cart-item__price">
            {formatCurrency(item.price * item.quantity)}
          </div>
        </div>
      </div>
    </div>
  );
};
