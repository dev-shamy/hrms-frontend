import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import Button from "../common/Button";
import toast from "react-hot-toast";

const EmployeeModal = ({ isOpen, onClose, onSubmit, employee }) => {
  const [formData, setFormData] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (employee) {
      setFormData({
        employee_id: employee.employee_id || "",
        full_name: employee.full_name || "",
        email: employee.email || "",
        department: employee.department || "",
      });
    } else {
      setFormData({
        employee_id: "",
        full_name: "",
        email: "",
        department: "",
      });
    }
  }, [employee, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (employee) {
      const hasChanges =
        formData.full_name !== (employee.full_name || "") ||
        formData.email !== (employee.email || "") ||
        formData.department !== (employee.department || "");

      if (!hasChanges) {
        toast("No changes detected", { icon: "ℹ️" });
        onClose();
        return;
      }
    } else {
      // Validation for employee ID
      const empIdRegex = /^EMP.*?\d+/;
      if (!empIdRegex.test(formData.employee_id)) {
        toast.error("Employee ID must start with EMP and include a numeric value (e.g., EMP-001)");
        return;
      }
    }

    try {
      setIsSubmitting(true);
      await onSubmit(formData);
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none transition-all";

  return (
    <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl animate-in zoom-in duration-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">
            {employee ? "Edit Employee" : "Add New Employee"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
              Employee ID
            </label>
            <input
              required
              disabled={!!employee}
              className={`${inputClass} ${employee ? "bg-gray-100 cursor-not-allowed" : ""}`}
              value={formData.employee_id}
              onChange={(e) =>
                setFormData({ ...formData, employee_id: e.target.value })
              }
              placeholder="Enter employee ID (e.g., EMP-001)"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
              Full Name
            </label>
            <input
              required
              className={inputClass}
              value={formData.full_name}
              onChange={(e) =>
                setFormData({ ...formData, full_name: e.target.value })
              }
              placeholder="Enter full name"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
              Email
            </label>
            <input
              required
              type="email"
              className={inputClass}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="email@example.com"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
              Department
            </label>
            <select
              required
              className={inputClass}
              value={formData.department}
              onChange={(e) =>
                setFormData({ ...formData, department: e.target.value })
              }
            >
              <option value="">Select Department</option>
              <option value="Engineering">Engineering</option>
              <option value="HR">HR</option>
              <option value="Sales">Sales</option>
              <option value="Design">Design</option>
            </select>
          </div>
          <Button type="submit" fullWidth className="py-4 mt-2" loading={isSubmitting}>
            {employee ? "Update Employee" : "Add Employee"}
          </Button>

        </form>
      </div>
    </div>
  );
};

export default EmployeeModal;
