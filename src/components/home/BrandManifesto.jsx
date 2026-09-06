import { ShieldCheck, Zap, Layers, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

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
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="zenji-manifesto__label">DESIGN PHILOSOPHY</span>
        <h2 className="zenji-manifesto__heading">
          NOT FASHION. <br />
          AN ARCHIVAL EXPERIMENT IN TACTICAL STREETWEAR.
        </h2>
        <p className="zenji-manifesto__text">
          ZENJI bridges the gap between dystopian cyberpunk subcultures and Japanese tailoring precision. Every garment is constructed to endure the modern metropolis.
        </p>
      </motion.div>

      <motion.div
        className="zenji-manifesto__grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {pillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <motion.div
              key={idx}
              className="zenji-manifesto__card"
              variants={cardVariants}
              whileHover={{ y: -6, borderColor: 'var(--border-focus)' }}
              transition={{ duration: 0.25 }}
            >
              <div className="zenji-manifesto__icon-wrap">
                <Icon size={22} />
              </div>
              <h3 className="zenji-manifesto__card-title">{pillar.title}</h3>
              <p className="zenji-manifesto__card-desc">{pillar.description}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};
