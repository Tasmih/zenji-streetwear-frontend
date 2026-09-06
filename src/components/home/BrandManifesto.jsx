import { ShieldCheck, Zap, Layers, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { scrollFadeUp, scrollStaggerContainer, scrollCardItem } from '../../utils/motionVariants';

export const BrandManifesto = () => {
  const pillars = [
    {
      icon: Layers,
      title: '500+ GSM BESPOKE FLEECE',
      description: 'Ultra-dense French Terry loopback cotton milled exclusively to maintain an architectural boxy drape.'
    },
    {
      icon: Zap,
      title: 'MODULAR HARDWARE',
      description: 'German Fidlock magnetic snaps and Japanese matte YKK Aquaguard zippers integrated seamlessly.'
    },
    {
      icon: ShieldCheck,
      title: 'NFC ARCHIVE AUTHENTICATION',
      description: 'Each piece features an encrypted internal silicone tag verifying genuine Tokyo studio provenance.'
    },
    {
      icon: RefreshCw,
      title: 'LIMITED SMALL BATCHES',
      description: 'Zero deadstock philosophy. Drops are produced in limited runs with no mass re-issues.'
    }
  ];

  return (
    <section className="zenji-manifesto">
      <motion.div
        className="zenji-manifesto__banner"
        variants={scrollFadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-70px' }}
      >
        <div className="zenji-manifesto__tag-wrap">
          <span className="zenji-manifesto__dot-live" />
          <span className="zenji-manifesto__label">TOKYO ARCHIVE PROTOCOL // ARC-26</span>
        </div>
        <h2 className="zenji-manifesto__heading">
          NOT FASHION. <br />
          AN ARCHIVAL EXPERIMENT IN TACTICAL STREETWEAR.
        </h2>
        <p className="zenji-manifesto__text">
          ZENJI bridges the gap between Tokyo dystopian subcultures and Japanese architectural tailoring precision. Every garment is constructed to endure the modern metropolis.
        </p>
      </motion.div>

      <motion.div
        className="zenji-manifesto__grid"
        variants={scrollStaggerContainer(0.12, 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-70px', amount: 0.1 }}
      >
        {pillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          const serial = `ARC.0${idx + 1}`;
          return (
            <motion.div
              key={idx}
              className="zenji-manifesto__card"
              variants={scrollCardItem}
              whileHover={{ y: -6, scale: 1.015 }}
              transition={{ duration: 0.25 }}
              style={{ willChange: 'transform, opacity' }}
            >
              <div className="zenji-manifesto__card-header">
                <div className="zenji-manifesto__icon-wrap">
                  <Icon size={20} />
                </div>
                <span className="zenji-manifesto__serial">{serial}</span>
              </div>
              <h3 className="zenji-manifesto__card-title">{pillar.title}</h3>
              <p className="zenji-manifesto__card-desc">{pillar.description}</p>
              <div className="zenji-manifesto__card-bar" />
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};
