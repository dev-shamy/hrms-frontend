import React, { useState, useEffect } from 'react';
import { getEmployees, markAttendance, getAttendance } from '../services/api';
import { Search, Filter, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import Card from '../components/common/Card';
import MarkAttendance from '../components/attendance/MarkAttendance';
import AttendanceTable from '../components/attendance/AttendanceTable';
import AttendanceSummaryCard from '../components/attendance/AttendanceSummaryCard';

const Attendance = () => {
    const [employees, setEmployees] = useState([]);
    const [attendanceData, setAttendanceData] = useState({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const init = async () => {
            try {
                const res = await getEmployees();
                setEmployees(res.data);
                // Fetch attendance for all employees
                const allAttendance = {};
                for (const emp of res.data) {
                    const att = await getAttendance(emp.employee_id);
                    allAttendance[emp.employee_id] = att.data;
                }
                setAttendanceData(allAttendance);
            } catch (err) { console.error(err); } finally { setLoading(false); }
        };
        init();
    }, []);

    const handleMark = async (data) => {
        setSubmitting(true);
        try {
            await markAttendance(data);
            const updated = await getAttendance(data.employee_id);
            setAttendanceData(prev => ({ ...prev, [data.employee_id]: updated.data }));
            toast.success("Attendance marked successfully!");
        } catch (err) {
            toast.error(err.response?.data?.detail || "Failed to mark attendance");
        } finally {
            setSubmitting(false);
        }
    };


    const [selectedDate, setSelectedDate] = useState('');

    const flatRecords = Object.values(attendanceData).flat().sort((a, b) => new Date(b.date) - new Date(a.date));
    const filteredRecords = selectedDate ? flatRecords.filter(r => r.date === selectedDate) : flatRecords;

    if (loading) return <div className="p-12 text-center text-blue-600">Loading attendance system...</div>;


    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
                    <p className="text-gray-500">Track and manage employee presence.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1 space-y-8">
                    <MarkAttendance employees={employees} onMark={handleMark} loading={submitting} />
                    <AttendanceSummaryCard employees={employees} attendanceData={attendanceData} />
                </div>


                <div className="lg:col-span-2">
                    <Card
                        title="Attendance History"
                        subtitle="Detailed log of all records"
                        className="flex flex-col"
                        action={
                            <div className="flex items-center gap-2">
                                <Calendar size={16} className="text-gray-400" />
                                <input
                                    type="date"
                                    className="text-xs bg-gray-50 border-none rounded-lg p-1 focus:ring-1 focus:ring-indigo-200 outline-none"
                                    value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}
                                />
                                {selectedDate && <button onClick={() => setSelectedDate('')} className="text-xs text-indigo-600 font-bold ml-2">Clear</button>}
                            </div>
                        }
                    >
                        <div className="overflow-y-auto max-h-[650px] xl:max-h-[620px] -mx-6 -my-6">
                            <AttendanceTable records={filteredRecords} />
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Attendance;
