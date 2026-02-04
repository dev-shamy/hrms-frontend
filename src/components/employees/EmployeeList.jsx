import React, { useState } from 'react';
import { Trash2, Edit2, Check, X } from 'lucide-react';
import Badge from '../common/Badge';

const EmployeeList = ({ employees, onEdit, onDelete }) => {
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="bg-gray-50/50 text-gray-800 text-xs uppercase tracking-wider">
                        <th className="px-6 py-4 font-semibold">Employee</th>
                        <th className="px-6 py-4 font-semibold">ID</th>
                        <th className="px-6 py-4 font-semibold">Department</th>
                        <th className="px-6 py-4 font-semibold">Email</th>
                        <th className="px-6 py-4 font-semibold text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {employees.map((emp) => (
                        <tr key={emp.id} className="hover:bg-indigo-50/30 transition-colors group">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 bg-indigo-100 text-indigo-700 rounded-lg flex items-center justify-center font-bold text-sm">
                                        {emp.full_name.charAt(0)}
                                    </div>
                                    <span className="font-bold text-gray-900">{emp.full_name}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 font-mono text-sm text-indigo-600">{emp.employee_id}</td>
                            <td className="px-6 py-4">
                                <Badge variant="info">{emp.department}</Badge>
                            </td>
                            <td className="px-6 py-4 text-gray-500 text-sm">{emp.email}</td>
                            <td className="px-6 py-4 text-right">
                                {confirmDeleteId === emp.employee_id ? (
                                    <div className="flex justify-end items-center gap-2 animate-in slide-in-from-right-2 duration-200">
                                        <span className="text-xs font-bold text-rose-500 mr-1">Confirm?</span>
                                        <button
                                            onClick={() => {
                                                onDelete(emp.employee_id);
                                                setConfirmDeleteId(null);
                                            }}
                                            className="p-1.5 bg-rose-500 text-white rounded-md hover:bg-rose-600 transition-all shadow-sm"
                                            title="Confirm Delete"
                                        >
                                            <Check size={14} />
                                        </button>
                                        <button
                                            onClick={() => setConfirmDeleteId(null)}
                                            className="p-1.5 bg-gray-100 text-gray-500 rounded-md hover:bg-gray-200 transition-all"
                                            title="Cancel"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => onEdit && onEdit(emp)}
                                            className="p-2 text-indigo-500 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-all duration-200"
                                            title="Edit Employee"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => setConfirmDeleteId(emp.employee_id)}
                                            className="p-2 text-rose-500 hover:bg-rose-50 hover:text-rose-600 rounded-lg transition-all duration-200"
                                            title="Delete Employee"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
