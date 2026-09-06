export const Badge = ({ children, variant = 'default', className = '' }) => {
  return (
    <span className={`zenji-badge zenji-badge--${variant} ${className}`}>
      {children}
    </span>
  );
};
