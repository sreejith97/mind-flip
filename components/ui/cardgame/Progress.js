export const Progress = ({ value, className }) => {
  return (
    <div className={`h-2 bg-gray-200 rounded ${className}`}>
      <div
        style={{ width: `${value}%` }}
        className="h-full bg-green-500 rounded"
      />
    </div>
  );
};
