export const Badge = ({ children, variant = 'default', className = '', hasDot = false, dotColor }) => {
  return (
    <span className={`zenji-badge zenji-badge--${variant} ${className}`}>
      {hasDot && (
        <span
          className="zenji-badge__status-dot"
          style={dotColor ? { backgroundColor: dotColor, boxShadow: `0 0 8px ${dotColor}` } : undefined}
        />
      )}
      {children}
    </span>
  );
};

