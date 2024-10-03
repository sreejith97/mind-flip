// src/components/ui/input.js
export const Input = ({ type, placeholder, value, onChange }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="border rounded-md px-3 py-2 w-full"
  />
);
