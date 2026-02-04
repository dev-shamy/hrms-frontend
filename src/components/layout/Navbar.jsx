import React, { useState, useRef, useEffect } from "react";
import { UserCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-50">
      <div className="flex-1">
        <h1 className="font-bold text-md md:text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent inline-block">
          Human Resource Management System
        </h1>
      </div>

      <div className="flex items-center gap-6">
        {/* User Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-3 p-1.5 pr-3 rounded-2xl hover:bg-gray-50 transition-all duration-200 group"
          >
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 shadow-sm group-hover:scale-105 transition-transform duration-200">
              <UserCircle size={24} />
            </div>

            <div className="text-left hidden sm:block">
              <p className="text-sm font-bold text-gray-900 leading-tight">
                Admin
              </p>
              <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                Administrator
              </p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
