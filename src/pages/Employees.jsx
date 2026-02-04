import React, { useState, useEffect } from 'react';
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from '../services/api';
import { Plus, Search, Users as UsersIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import EmployeeList from '../components/employees/EmployeeList';
import EmployeeModal from '../components/employees/EmployeeModal';
import EmptyState from '../components/common/EmptyState';

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => { fetchEmployees(); }, []);

    const fetchEmployees = async () => {
        try {
            const response = await getEmployees();
            setEmployees(response.data);
        } catch (err) { console.error(err); } finally { setLoading(false); }
    };

    const handleSave = async (data) => {
        try {
            if (selectedEmployee) {
                await updateEmployee(selectedEmployee.employee_id, data);
                toast.success('Employee updated successfully');
            } else {
                await createEmployee(data);
                toast.success('Employee added successfully');
            }
            setIsModalOpen(false);
            setSelectedEmployee(null);
            fetchEmployees();
        } catch (err) {
            const errorMsg = err.response?.data?.detail || "Failed to save employee";
            toast.error(errorMsg);
        }
    };

    const handleEdit = (employee) => {
        setSelectedEmployee(employee);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        setDeletingId(id);
        try {
            await deleteEmployee(id);
            toast.success('Employee deleted successfully');
            fetchEmployees();
        } catch (err) {
            toast.error('Failed to delete employee');
        } finally {
            setDeletingId(null);
        }
    };


    const filteredEmployees = employees.filter(e =>
        e.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.employee_id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="md:text-3xl text-md font-bold text-gray-900">Workforce</h1>
                    <p className="text-gray-500">Manage all your employees in one place.</p>
                </div>
                <Button onClick={() => { setSelectedEmployee(null); setIsModalOpen(true); }} icon={Plus}>Add Employee</Button>
            </div>

            <Card className="px-0 py-0 overflow-visible">
                <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text" placeholder="Search by name or ID..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-100 outline-none"
                            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="p-12 text-center text-blue-600">Loading workforce...</div>
                ) : filteredEmployees.length > 0 ? (
                    <EmployeeList employees={filteredEmployees} onEdit={handleEdit} onDelete={handleDelete} deletingId={deletingId} />
                ) : (
                    <EmptyState
                        title="No Employees Found"
                        description={searchTerm ? "Try adjusting your search filters." : "Start by adding your first employee to the system."}
                        icon={UsersIcon}
                    />
                )}
            </Card>

            <EmployeeModal
                isOpen={isModalOpen}
                employee={selectedEmployee}
                onClose={() => { setIsModalOpen(false); setSelectedEmployee(null); }}
                onSubmit={handleSave}
            />
        </div>
    );
};

export default Employees;
