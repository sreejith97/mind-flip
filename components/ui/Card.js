// src/components/ui/card.js
export const Card = ({ children, className }) => (
  <div className={`border rounded-lg shadow-lg p-4 ${className}`}>
    {children}
  </div>
);
