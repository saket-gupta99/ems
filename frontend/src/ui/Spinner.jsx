function Spinner({ 
  size = "40px", 
  color = "gray", 
  borderWidth = "4px",
  className = ""
}) {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full border-solid ${className}`}
        style={{
          width: typeof size === 'number' ? `${size}px` : size,
          height: typeof size === 'number' ? `${size}px` : size,
          borderWidth: typeof borderWidth === 'number' ? `${borderWidth}px` : borderWidth,
          borderColor: color,
          borderTopColor: "transparent",
          borderStyle: "solid"
        }}
      />
    </div>
  );
}

export default Spinner;