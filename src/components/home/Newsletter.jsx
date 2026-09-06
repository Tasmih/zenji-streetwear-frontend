import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '../common/Button';

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
      <div className="zenji-newsletter__container">
        <div className="zenji-newsletter__content">
          <span className="zenji-newsletter__tag">EARLY ACCESS VIP ARCHIVE</span>
          <h2 className="zenji-newsletter__title">ACCESS DROP 005 BEFORE PUBLIC RELEASE</h2>
          <p className="zenji-newsletter__desc">
            Subscribers receive private 1-hour early access keys and password invites for upcoming limited drops.
          </p>
        </div>

        {subscribed ? (
          <div className="zenji-newsletter__success">
            <Check size={20} className="zenji-newsletter__check" />
            <span>YOU ARE REGISTERED FOR DROP 005 EARLY ACCESS.</span>
          </div>
        ) : (
          <form className="zenji-newsletter__form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="zenji-newsletter__input"
            />
            <Button type="submit" variant="primary" icon={ArrowRight}>
              SUBSCRIBE
            </Button>
          </form>
        )}
      </div>
    </section>
  );
};
