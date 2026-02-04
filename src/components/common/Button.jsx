import React from "react";

const Button = ({
  children,
  onClick,
  variant = "primary",
  type = "button",
  className = "",
  icon: Icon,
  disabled = false,
  loading = false,
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
      disabled={disabled || loading}
      className={`
        px-3 py-2 rounded-3xl font-medium transition-all duration-200 
        flex items-center justify-center gap-2 
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${shadowClass} ${widthClass} ${className}
      `}
    >
      {loading ? (
        <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : Icon && <Icon size={18} />}
      {children}
    </button>
  );
};


export default Button;
