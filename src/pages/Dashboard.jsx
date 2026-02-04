import { useState, useEffect } from "react";
import { getEmployees, getPresentToday } from "../services/api";
import { Users, Briefcase, CalendarCheck, Clock } from "lucide-react";
import StatsGrid from "../components/common/StatsGrid";
import Card from "../components/common/Card";
import Badge from "../components/common/Badge";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [presentEmployees, setPresentEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [empRes, presentRes] = await Promise.all([
          getEmployees(),
          getPresentToday(),
        ]);
        setEmployees(empRes.data);
        setPresentEmployees(presentRes.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = [
    {
      title: "Total Employees",
      value: employees.length,
      icon: Users,
      colorClass: "bg-indigo-50 text-indigo-600",
    },
    {
      title: "Departments",
      value: new Set(employees.map((e) => e.department)).size,
      icon: Briefcase,
      colorClass: "bg-blue-50 text-blue-600",
    },
    {
      title: "Present Now",
      value: presentEmployees.length.toString(),
      icon: CalendarCheck,
      colorClass: "bg-amber-50 text-amber-600",
    },
  ];

  if (loading)
    return (
      <div className="h-64 flex items-center justify-center text-blue-600">
        Loading dashboard...
      </div>
    );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 mt-2 font-semibold">
          Summary of organization
        </p>
      </div>
      <StatsGrid stats={stats} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RecentEmployees employees={employees.slice(0, 5)} />
        <AttendanceSummary
          totalEmployees={employees.length}
          presentCount={presentEmployees.length}
        />
      </div>
    </div>
  );
};

const RecentEmployees = ({ employees }) => (
  <Card
    title="Recent Hires"
    subtitle="Latest 5 employees added to the system"
    action={
      <Link
        to="/employees"
        className="text-indigo-600 text-sm font-semibold hover:underline"
      >
        View All
      </Link>
    }
  >
    <div className="space-y-4">
      {employees?.length > 0 ? (
        employees?.map((emp) => (
          <div
            key={emp.id}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold">
                {emp.full_name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">
                  {emp.full_name}
                </p>
                <p className="text-xs text-gray-500">{emp.department}</p>
              </div>
            </div>
            <Badge variant="gray">{emp.employee_id}</Badge>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-400 py-4">No recent employees</p>
      )}
    </div>
  </Card>
);

const AttendanceSummary = ({ totalEmployees, presentCount }) => {
  const presentPercentage = totalEmployees
    ? Math.round((presentCount / totalEmployees) * 100)
    : 0;
  const absentCount = totalEmployees - presentCount;
  const absentPercentage = totalEmployees
    ? Math.round((absentCount / totalEmployees) * 100)
    : 0;

  return (
    <Card title="Attendance Overview" subtitle="Quick look at today's stats">
      <div className="space-y-6">
        <AttendanceBar
          label="Present"
          value={presentPercentage}
          color="bg-emerald-500"
        />
        <AttendanceBar
          label="Absent"
          value={absentPercentage}
          color="bg-rose-500"
        />
        <div className="pt-4 border-t border-gray-50 flex justify-between">
          <div>
            <h5 className="text-lg font-bold text-gray-900">{totalEmployees}</h5>
            <p className="text-xs text-gray-500">Total Employees</p>
          </div>
          <Link to="/attendance" className="btn-primary py-2 text-sm">
            Update Attendance
          </Link>
        </div>
      </div>
    </Card>
  );
};

const AttendanceBar = ({ label, value, color }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <span className="font-medium text-gray-700">{label}</span>
      <span className="text-gray-500 font-bold">{value}%</span>
    </div>
    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
      <div className={`h-full ${color}`} style={{ width: `${value}%` }}></div>
    </div>
  </div>
);

export default Dashboard;
