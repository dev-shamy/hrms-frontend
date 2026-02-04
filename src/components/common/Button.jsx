import React from "react";

const Button = ({
  children,
  onClick,
  variant = "primary",
  type = "button",
  className = "",
  icon: Icon,
  disabled = false,
  fullWidth = false,
}) => {
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200",
    secondary: "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50",
    danger: "bg-rose-500 text-white hover:bg-rose-600 shadow-rose-200",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100",
  };

  const shadowClass =
    variant !== "ghost" && variant !== "secondary"
      ? "shadow-lg hover:shadow-xl"
      : "";
  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-3 py-2 rounded-3xl font-medium transition-all duration-200 
        flex items-center justify-center gap-2 
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${shadowClass} ${widthClass} ${className}
      `}
    >
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
};

export default Button;
