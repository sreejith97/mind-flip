// Input.js
export const Input = ({ className, ...props }) => {
  return (
    <input
      {...props}
      className={`border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    />
  );
};
