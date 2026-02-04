import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import toast from 'react-hot-toast';

const MarkAttendance = ({ employees, onMark, loading, className = "" }) => {
    const getLocalDate = () => {
        const d = new Date();
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [selectedEmp, setSelectedEmp] = useState('');
    const [status, setStatus] = useState('Present');
    const [date, setDate] = useState(getLocalDate());

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedEmp) {
            toast.error("Please select an employee");
            return;
        }

        const today = getLocalDate();
        if (date > today) {
            toast.error("Attendance cannot be marked for future dates");
            return;
        }

        onMark({ employee_id: selectedEmp, status, date });
    };

    return (
        <Card title="Mark Quick Attendance" subtitle="Daily attendance for an employee" className={className}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Employee</label>
                    <select
                        required className="input-field py-2"
                        value={selectedEmp} onChange={(e) => setSelectedEmp(e.target.value)}
                    >
                        <option value="">Select an employee</option>
                        {employees.map(e => <option key={e.employee_id} value={e.employee_id}>{e.full_name} ({e.employee_id})</option>)}
                    </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Date</label>
                        <input type="date" className="input-field py-2" value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Status</label>
                        <select className="input-field py-2" value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                        </select>
                    </div>
                </div>
                <Button type="submit" fullWidth loading={loading} className="py-3 mt-2">
                    Confirm Attendance
                </Button>
            </form>
        </Card>
    );
};

export default MarkAttendance;
