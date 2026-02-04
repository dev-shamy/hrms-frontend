import React from 'react';
import Badge from '../common/Badge';
import EmptyState from '../common/EmptyState';
import { ClipboardX } from 'lucide-react';

const AttendanceTable = ({ records }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
                        <th className="px-6 py-4 font-semibold">Date</th>
                        <th className="px-6 py-4 font-semibold">Employee ID</th>
                        <th className="px-6 py-4 font-semibold">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {records.length > 0 ? records.map((rec, idx) => (
                        <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{rec.date}</td>
                            <td className="px-6 py-4 text-sm text-indigo-600 font-mono">{rec.employee_id}</td>
                            <td className="px-6 py-4">
                                <Badge variant={rec.status === 'Present' ? 'success' : 'danger'}>
                                    {rec.status}
                                </Badge>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="3">
                                <EmptyState
                                    title="No Records"
                                    description="No attendance records match your search or filter."
                                    icon={ClipboardX}
                                />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AttendanceTable;
