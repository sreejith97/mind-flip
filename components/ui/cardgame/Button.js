export const Button = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={`bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition ${className}`}
    >
      {children}
    </button>
  );
};
