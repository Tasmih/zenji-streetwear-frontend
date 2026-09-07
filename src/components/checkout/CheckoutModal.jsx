import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Lock,
  ShoppingBag,
  Sparkles,
  Tag,
  CreditCard,
  Building2,
  Package
} from 'lucide-react';
import { useCart } from '../../context/useCart';
import { formatCurrency } from '../../utils/formatCurrency';
import { Button } from '../common/Button';

export const CheckoutModal = () => {
  const { isCheckoutOpen, closeCheckout, openCart, cartItems, subtotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    email: 'client@zenji-tokyo.jp',
    firstName: 'Kenji',
    lastName: 'Takahashi',
    address: '5-7-2 Minami-Aoyama',
    apartment: 'Atelier Suite 402',
    city: 'Minato-ku, Tokyo',
    postalCode: '107-0062',
    country: 'Japan',
    phone: '+81 3 5555 0192',
    shippingMethod: 'express'
  });

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoNotice, setPromoNotice] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const FREE_SHIPPING_THRESHOLD = 200;
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 15;
  const totalAmount = Math.max(0, subtotal - discount + shippingCost);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isCheckoutOpen) {
        closeCheckout();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCheckoutOpen, closeCheckout]);

  // Lock body scroll
  useEffect(() => {
    if (isCheckoutOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCheckoutOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoCode.trim()) return;
    const clean = promoCode.trim().toUpperCase();
    if (clean === 'DROP004' || clean === 'ZENJI' || clean === 'TOKYO') {
      const disc = Math.round(subtotal * 0.15);
      setDiscount(disc);
      setPromoNotice({ type: 'success', text: `VIP PASS APPLIED (-${formatCurrency(disc)})` });
    } else {
      setPromoNotice({ type: 'error', text: 'INVALID ARCHIVE CODE' });
      setTimeout(() => setPromoNotice(null), 3000);
    }
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    const generatedOrder = `ZN-TYO-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedOrder);
    setIsSubmitted(true);
  };

  const handleFinish = () => {
    clearCart();
    setIsSubmitted(false);
    closeCheckout();
  };

  const handleReturnToBag = () => {
    closeCheckout();
    openCart();
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <motion.div
          className="zenji-checkout-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={closeCheckout}
        >
          <motion.div
            className="zenji-checkout-modal"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Checkout Preview"
          >
            {/* Modal Header */}
            <div className="zenji-checkout__header">
              <div className="zenji-checkout__brand">
                <div className="zenji-checkout__logo-group">
                  <span className="zenji-checkout__jp">禅侍</span>
                  <div>
                    <h2 className="zenji-checkout__title">ZENJI TOKYO ATELIER</h2>
                    <span className="zenji-checkout__subtitle">CHECKOUT PREVIEW // 注文手続き</span>
                  </div>
                </div>
              </div>

              <div className="zenji-checkout__header-actions">
                <button
                  type="button"
                  className="zenji-checkout__back-btn"
                  onClick={handleReturnToBag}
                >
                  <ArrowLeft size={14} />
                  <span>BACK TO BAG</span>
                </button>
                <button
                  type="button"
                  className="zenji-checkout__close-btn"
                  onClick={closeCheckout}
                  aria-label="Close checkout"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="zenji-checkout__body">
              {isSubmitted ? (
                /* Order Confirmation Screen */
                <motion.div
                  className="zenji-checkout__confirmed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="zenji-checkout__confirmed-badge">
                    <CheckCircle2 size={40} className="zenji-checkout__confirmed-icon" />
                  </div>
                  <span className="zenji-checkout__confirmed-tag">DISPATCH PROTOCOL INITIATED</span>
                  <h3 className="zenji-checkout__confirmed-title">ARCHIVE ORDER CONFIRMED</h3>
                  <p className="zenji-checkout__confirmed-desc">
                    Thank you, {formData.firstName}. Your reservation of limited Edition 004 pieces has been simulated successfully.
                  </p>

                  <div className="zenji-checkout__confirmed-receipt">
                    <div className="zenji-checkout__receipt-row">
                      <span className="zenji-checkout__receipt-label">ORDER REFERENCE</span>
                      <span className="zenji-checkout__receipt-val zenji-checkout__receipt-val--highlight">
                        {orderNumber}
                      </span>
                    </div>
                    <div className="zenji-checkout__receipt-row">
                      <span className="zenji-checkout__receipt-label">DISPATCH TO</span>
                      <span className="zenji-checkout__receipt-val">
                        {formData.address}, {formData.city}, {formData.country}
                      </span>
                    </div>
                    <div className="zenji-checkout__receipt-row">
                      <span className="zenji-checkout__receipt-label">TOTAL PREVIEW</span>
                      <span className="zenji-checkout__receipt-val zenji-checkout__receipt-val--neon">
                        {formatCurrency(totalAmount)}
                      </span>
                    </div>
                    <div className="zenji-checkout__receipt-row">
                      <span className="zenji-checkout__receipt-label">SECURITY NOTICE</span>
                      <span className="zenji-checkout__receipt-val">
                        FRONTEND PREVIEW ONLY — NO REAL TRANSACTION BILLED
                      </span>
                    </div>
                  </div>

                  <div className="zenji-checkout__confirmed-actions">
                    <Button
                      variant="primary"
                      icon={Sparkles}
                      onClick={handleFinish}
                    >
                      RETURN TO ARCHIVES
                    </Button>
                  </div>
                </motion.div>
              ) : (
                /* Two Column Checkout Form & Summary */
                <div className="zenji-checkout__grid">
                  {/* Left Column: Customer Form UI */}
                  <div className="zenji-checkout__form-col">
                    {/* Notice Banner */}
                    <div className="zenji-checkout__notice-banner">
                      <Lock size={14} className="zenji-checkout__notice-icon" />
                      <div>
                        <strong>FRONTEND UI PREVIEW</strong>
                        <p>No backend, database, or payment processing. Form UI demonstration only.</p>
                      </div>
                    </div>

                    <form onSubmit={handleSubmitOrder} className="zenji-checkout__form">
                      {/* Contact Info */}
                      <section className="zenji-checkout__section">
                        <div className="zenji-checkout__section-title">
                          <span className="zenji-checkout__step-num">01</span>
                          <span>CONTACT INFORMATION</span>
                        </div>
                        <div className="zenji-checkout__field-group">
                          <div className="zenji-checkout__field">
                            <label htmlFor="checkout-email">EMAIL ADDRESS</label>
                            <input
                              id="checkout-email"
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="client@domain.com"
                              required
                            />
                          </div>
                          <div className="zenji-checkout__field">
                            <label htmlFor="checkout-phone">PHONE (FOR COURIER DISPATCH)</label>
                            <input
                              id="checkout-phone"
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="+1 555 0192"
                            />
                          </div>
                        </div>
                      </section>

                      {/* Shipping Address */}
                      <section className="zenji-checkout__section">
                        <div className="zenji-checkout__section-title">
                          <span className="zenji-checkout__step-num">02</span>
                          <span>DELIVERY DESTINATION</span>
                        </div>

                        <div className="zenji-checkout__grid-2">
                          <div className="zenji-checkout__field">
                            <label htmlFor="checkout-first-name">FIRST NAME</label>
                            <input
                              id="checkout-first-name"
                              type="text"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              placeholder="First name"
                              required
                            />
                          </div>
                          <div className="zenji-checkout__field">
                            <label htmlFor="checkout-last-name">LAST NAME</label>
                            <input
                              id="checkout-last-name"
                              type="text"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              placeholder="Last name"
                              required
                            />
                          </div>
                        </div>

                        <div className="zenji-checkout__field">
                          <label htmlFor="checkout-address">STREET ADDRESS</label>
                          <input
                            id="checkout-address"
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Street and house number"
                            required
                          />
                        </div>

                        <div className="zenji-checkout__grid-3">
                          <div className="zenji-checkout__field">
                            <label htmlFor="checkout-city">CITY</label>
                            <input
                              id="checkout-city"
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              placeholder="City"
                              required
                            />
                          </div>
                          <div className="zenji-checkout__field">
                            <label htmlFor="checkout-postal">POSTAL CODE</label>
                            <input
                              id="checkout-postal"
                              type="text"
                              name="postalCode"
                              value={formData.postalCode}
                              onChange={handleChange}
                              placeholder="Postal code"
                              required
                            />
                          </div>
                          <div className="zenji-checkout__field">
                            <label htmlFor="checkout-country">COUNTRY</label>
                            <select
                              id="checkout-country"
                              name="country"
                              value={formData.country}
                              onChange={handleChange}
                            >
                              <option value="Japan">Japan (日本)</option>
                              <option value="United States">United States</option>
                              <option value="United Kingdom">United Kingdom</option>
                              <option value="Germany">Germany</option>
                              <option value="France">France</option>
                              <option value="Canada">Canada</option>
                              <option value="Australia">Australia</option>
                              <option value="South Korea">South Korea</option>
                              <option value="Singapore">Singapore</option>
                            </select>
                          </div>
                        </div>
                      </section>

                      {/* Shipping Method */}
                      <section className="zenji-checkout__section">
                        <div className="zenji-checkout__section-title">
                          <span className="zenji-checkout__step-num">03</span>
                          <span>SHIPPING METHOD</span>
                        </div>

                        <div className="zenji-checkout__shipping-options">
                          <label className="zenji-checkout__shipping-option">
                            <input
                              type="radio"
                              name="shippingMethod"
                              value="express"
                              checked={formData.shippingMethod === 'express'}
                              onChange={handleChange}
                            />
                            <div className="zenji-checkout__shipping-option-content">
                              <div className="zenji-checkout__shipping-title-row">
                                <span className="zenji-checkout__shipping-name">
                                  <Truck size={14} /> TOKYO EXPRESS AIR DISPATCH (2-4 DAYS)
                                </span>
                                <span className="zenji-checkout__shipping-price">
                                  {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                                    <span className="zenji-checkout__free-tag">FREE</span>
                                  ) : (
                                    formatCurrency(15)
                                  )}
                                </span>
                              </div>
                              <span className="zenji-checkout__shipping-desc">
                                Insured priority worldwide freight directly from Shibuya Atelier.
                              </span>
                            </div>
                          </label>
                        </div>
                      </section>

                      {/* Payment Method UI Demonstration */}
                      <section className="zenji-checkout__section">
                        <div className="zenji-checkout__section-title">
                          <span className="zenji-checkout__step-num">04</span>
                          <span>PAYMENT METHOD (SIMULATED UI)</span>
                        </div>

                        <div className="zenji-checkout__payment-preview-box">
                          <div className="zenji-checkout__payment-header">
                            <CreditCard size={16} className="zenji-checkout__payment-icon" />
                            <span>CREDIT / DEBIT / APPLE PAY (DEMO MODE)</span>
                          </div>
                          <p className="zenji-checkout__payment-desc">
                            This is an interactive design preview. No actual transaction will occur, and no financial data is gathered.
                          </p>
                        </div>
                      </section>

                      {/* Submit Action */}
                      <div className="zenji-checkout__submit-wrap">
                        <Button
                          type="submit"
                          variant="primary"
                          fullWidth
                          size="lg"
                          icon={ArrowRight}
                        >
                          CONFIRM PREVIEW ORDER ({formatCurrency(totalAmount)})
                        </Button>
                      </div>
                    </form>
                  </div>

                  {/* Right Column: Order Summary */}
                  <div className="zenji-checkout__summary-col">
                    <div className="zenji-checkout__summary-card">
                      <div className="zenji-checkout__summary-header">
                        <ShoppingBag size={16} />
                        <h3>ORDER ARCHIVE ({cartItems.length} PIECES)</h3>
                      </div>

                      {/* Item Mini List */}
                      <div className="zenji-checkout__items-list">
                        {cartItems.map((item) => (
                          <div
                            key={`${item.id}-${item.size}-${item.color}`}
                            className="zenji-checkout__item"
                          >
                            <div className="zenji-checkout__item-img-wrap">
                              <img src={item.image} alt={item.name} />
                              <span className="zenji-checkout__item-qty">{item.quantity}</span>
                            </div>
                            <div className="zenji-checkout__item-info">
                              <h4 className="zenji-checkout__item-title">{item.name}</h4>
                              <div className="zenji-checkout__item-meta">
                                <span>SIZE: {item.size}</span>
                                {item.color && item.color !== 'Default' && (
                                  <span>• COLOR: {item.color}</span>
                                )}
                              </div>
                            </div>
                            <span className="zenji-checkout__item-price">
                              {formatCurrency(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Promo Code Box */}
                      <form onSubmit={handleApplyPromo} className="zenji-checkout__promo-form">
                        <div className="zenji-checkout__promo-input-wrap">
                          <Tag size={13} className="zenji-checkout__promo-icon" />
                          <input
                            type="text"
                            placeholder="VIP Code (try DROP004)"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                          />
                          <button type="submit" className="zenji-checkout__promo-btn">
                            APPLY
                          </button>
                        </div>
                        {promoNotice && (
                          <div
                            className={`zenji-checkout__promo-msg zenji-checkout__promo-msg--${promoNotice.type}`}
                          >
                            {promoNotice.text}
                          </div>
                        )}
                      </form>

                      {/* Cost Summary Breakdown */}
                      <div className="zenji-checkout__cost-breakdown">
                        <div className="zenji-checkout__cost-row">
                          <span>PIECES SUBTOTAL</span>
                          <span>{formatCurrency(subtotal)}</span>
                        </div>

                        {discount > 0 && (
                          <div className="zenji-checkout__cost-row zenji-checkout__cost-row--discount">
                            <span>VIP ACCESS PASS (15%)</span>
                            <span>-{formatCurrency(discount)}</span>
                          </div>
                        )}

                        <div className="zenji-checkout__cost-row">
                          <span>WORLDWIDE EXPRESS</span>
                          <span>
                            {shippingCost === 0 ? (
                              <span className="zenji-checkout__cost-free">FREE</span>
                            ) : (
                              formatCurrency(shippingCost)
                            )}
                          </span>
                        </div>

                        <div className="zenji-checkout__cost-row">
                          <span>ATELIER SIGNATURE PACKAGING</span>
                          <span className="zenji-checkout__cost-free">COMPLIMENTARY</span>
                        </div>

                        <div className="zenji-checkout__cost-divider" />

                        <div className="zenji-checkout__cost-row zenji-checkout__cost-row--total">
                          <div>
                            <span className="zenji-checkout__total-label">ESTIMATED TOTAL</span>
                            <span className="zenji-checkout__total-sub">DUTIES & TAXES INCLUDED</span>
                          </div>
                          <span className="zenji-checkout__total-amount">
                            {formatCurrency(totalAmount)}
                          </span>
                        </div>
                      </div>

                      {/* Guarantee Badges */}
                      <div className="zenji-checkout__badges">
                        <div className="zenji-checkout__badge">
                          <ShieldCheck size={14} />
                          <span>100% Authentic Guaranteed</span>
                        </div>
                        <div className="zenji-checkout__badge">
                          <Building2 size={14} />
                          <span>Tokyo Atelier Shibuya Origin</span>
                        </div>
                        <div className="zenji-checkout__badge">
                          <Package size={14} />
                          <span>Numbered Garment Archive Tag</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
