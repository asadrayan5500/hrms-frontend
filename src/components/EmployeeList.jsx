import { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../api/api";
import AttendanceModal from "./AttendanceModal";


export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [attendanceModal, setAttendanceModal] = useState({ isOpen: false, employeeId: null, employeeName: "" });

  useEffect(() => {
    getEmployees().then((data) => {
      setEmployees(data);
      setFilteredEmployees(data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredEmployees(employees);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = employees.filter(
        (emp) =>
          emp.employee_id.toLowerCase().includes(term) ||
          emp.full_name.toLowerCase().includes(term) ||
          emp.email.toLowerCase().includes(term) ||
          emp.department.toLowerCase().includes(term)
      );
      setFilteredEmployees(filtered);
    }
  }, [searchTerm, employees]);

  const handleDelete = async (employeeId) => {
    try {
      await deleteEmployee(employeeId);
      setEmployees(
        employees.filter((x) => x.employee_id !== employeeId)
      );
      setDeleteConfirm(null);
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white p-12 rounded-xl shadow-lg flex flex-col items-center justify-center border border-gray-200">
        <svg className="animate-spin h-12 w-12 text-slate-600 mb-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
        </svg>
        <p className="text-gray-600">Loading employees...</p>
      </div>
    );
  }

  if (!employees.length) {
    return (
      <div className="bg-white p-12 rounded-xl shadow-lg border border-gray-200 text-center">
        <div className="text-5xl mb-4">👥</div>
        <p className="text-gray-700 text-lg font-medium">No employees found yet</p>
        <p className="text-gray-500 text-sm mt-2">Start by adding your first employee</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Employee Directory</h2>
            <p className="text-sm text-gray-500 mt-1">{filteredEmployees.length} of {employees.length} employees</p>
          </div>
          <div className="relative">
            <svg className="absolute left-3 top-3 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by name, ID, email..."
              className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {filteredEmployees.length === 0 ? (
        <div className="p-12 text-center">
          <svg className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-600 font-medium">No employees match your search</p>
          <p className="text-gray-500 text-sm mt-1">Try adjusting your search terms</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">ID</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">Name</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">Email</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">Department</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((e, idx) => (
                <>
                  <tr key={e.employee_id} className="border-b border-gray-200 hover:bg-slate-50 transition-colors duration-150">
                    <td className="py-4 px-6">
                      <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {e.employee_id}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-900">{e.full_name}</td>
                    <td className="py-4 px-6 text-gray-600 text-sm">{e.email}</td>
                    <td className="py-4 px-6">
                      <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-sm font-medium">
                        {e.department}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <button
                          className="bg-slate-600 hover:bg-slate-700 text-white px-3 py-2 rounded-lg transition-colors duration-200 font-medium text-sm"
                          onClick={() =>
                            setAttendanceModal({
                              isOpen: true,
                              employeeId: e.employee_id,
                              employeeName: e.full_name
                            })
                          }
                        >
                          Attendance
                        </button>
                        <button
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition-colors duration-200 font-medium text-sm"
                          onClick={() => setDeleteConfirm(e.employee_id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>

                  {deleteConfirm === e.employee_id && (
                    <tr className="bg-red-50 border-b border-red-200">
                      <td colSpan="5" className="py-4 px-6">
                        <div className="flex items-center justify-between bg-white border-l-4 border-red-500 p-4 rounded-r-lg">
                          <span className="text-red-700 font-medium">Are you sure you want to delete this employee?</span>
                          <div className="flex gap-2">
                            <button
                              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg font-medium transition-colors"
                              onClick={() => setDeleteConfirm(null)}
                            >
                              Cancel
                            </button>
                            <button
                              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                              onClick={() => handleDelete(e.employee_id)}
                            >
                              Confirm Delete
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Attendance Modal */}
      <AttendanceModal
        isOpen={attendanceModal.isOpen}
        onClose={() => setAttendanceModal({ isOpen: false, employeeId: null, employeeName: "" })}
        employeeId={attendanceModal.employeeId}
        employeeName={attendanceModal.employeeName}
      />
    </div>
  );
}

