import React from 'react';

const Badge = ({ children, variant = 'info', className = '' }) => {
    const variants = {
        success: 'bg-emerald-50 text-emerald-700 border-emerald-100',
        danger: 'bg-rose-50 text-rose-700 border-rose-100',
        warning: 'bg-amber-50 text-amber-700 border-amber-100',
        info: 'bg-blue-50 text-blue-700 border-blue-100',
        gray: 'bg-gray-50 text-gray-700 border-gray-100',
    };

    return (
        <span className={`
      px-2.5 py-1 rounded-full text-xs font-semibold border 
      ${variants[variant]} ${className}
    `}>
            {children}
        </span>
    );
};

export default Badge;
