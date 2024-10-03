// components/ui/Button.js
import React from "react";

// Button component
export const Button = ({ onClick, disabled, children, className }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out transform hover:scale-105 ${className}`}
    >
      {children}
    </button>
  );
};
