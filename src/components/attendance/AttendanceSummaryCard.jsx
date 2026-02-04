import React from 'react';
import Card from '../common/Card';
import { Calendar } from 'lucide-react';

const AttendanceSummaryCard = ({ employees, attendanceData }) => {
    return (
        <Card title="Attendance Summary" subtitle="Total present days per employee">
            <div className="space-y-4 xl:h-[166px] overflow-y-auto pr-2">
                {employees.map(emp => {
                    const presentDays = attendanceData[emp.employee_id]?.filter(r => r.status === 'Present').length || 0;
                    const totalDays = attendanceData[emp.employee_id]?.length || 0;
                    const percentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;

                    return (
                        <div key={emp.employee_id} className="flex items-center justify-between p-3 rounded-xl border border-gray-50 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-bold">
                                    {emp.full_name.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">{emp.full_name}</p>
                                    <p className="text-xs text-gray-500">{emp.employee_id}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-bold text-indigo-600">{presentDays} Days</p>
                                <p className="text-xs text-gray-400">{percentage}% Attendance</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
};

export default AttendanceSummaryCard;
