import { ShieldCheck, Zap, Layers, RefreshCw } from 'lucide-react';

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
      <div className="zenji-manifesto__banner">
        <span className="zenji-manifesto__label">DESIGN PHILOSOPHY</span>
        <h2 className="zenji-manifesto__heading">
          NOT FASHION. <br />
          AN ARCHIVAL EXPERIMENT IN TACTICAL STREETWEAR.
        </h2>
        <p className="zenji-manifesto__text">
          ZENJI bridges the gap between dystopian cyberpunk subcultures and Japanese tailoring precision. Every garment is constructed to endure the modern metropolis.
        </p>
      </div>

      <div className="zenji-manifesto__grid">
        {pillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div key={idx} className="zenji-manifesto__card">
              <div className="zenji-manifesto__icon-wrap">
                <Icon size={22} />
              </div>
              <h3 className="zenji-manifesto__card-title">{pillar.title}</h3>
              <p className="zenji-manifesto__card-desc">{pillar.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
