import { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../api/api";
import AttendanceForm from "./AttendanceForm";
import AttendanceList from "./AttendanceList";


export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [openEmployee, setOpenEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    getEmployees().then((data) => {
      setEmployees(data);
      setIsLoading(false);
    });
  }, []);

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
      <div className="bg-white p-12 rounded-2xl shadow-lg flex flex-col items-center justify-center">
        <svg className="animate-spin h-12 w-12 text-blue-600 mb-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
        </svg>
        <p className="text-gray-600">Loading employees...</p>
      </div>
    );
  }

  if (!employees.length) {
    return (
      <div className="bg-gradient-to-br from-white to-gray-50 p-12 rounded-2xl shadow-lg border border-gray-100 text-center">
        <div className="text-4xl mb-4">👥</div>
        <p className="text-gray-600 text-lg font-medium">No employees found yet</p>
        <p className="text-gray-500 text-sm mt-2">Start by adding your first employee</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-green-600 rounded-lg p-3">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000-2H3a1 1 0 00-1 1v13a1 1 0 001 1h10a1 1 0 001-1V4a1 1 0 00-1-1 1 1 0 000 2h1a1 1 0 012 0v.05A2.5 2.5 0 1113 12H4a1 1 0 100 2h9a1 1 0 100-2H4a1 1 0 010-2h5V5a2 2 0 10-5 .09V4H6a2 2 0 00-2 2v11a1 1 0 102 0v-2h8v2a1 1 0 102 0V5z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Employee Directory</h2>
        <span className="ml-auto bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
          {employees.length} Employees
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200 bg-gray-50">
              <th className="text-left py-4 px-4 font-semibold text-gray-700">ID</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-700">Name</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-700">Email</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-700">Department</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((e, idx) => (
              <>
                <tr key={e.employee_id} className="border-b border-gray-200 hover:bg-blue-50 transition-colors duration-200">
                  <td className="py-4 px-4">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {e.employee_id}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-medium text-gray-800">{e.full_name}</td>
                  <td className="py-4 px-4 text-gray-600">{e.email}</td>
                  <td className="py-4 px-4">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-medium">
                      {e.department}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium flex items-center gap-2 text-sm"
                        onClick={() =>
                          setOpenEmployee(
                            openEmployee === e.employee_id ? null : e.employee_id
                          )
                        }
                      >
                        <span>📋</span>
                        {openEmployee === e.employee_id ? "Close" : "Attendance"}
                      </button>
                      <button
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium flex items-center gap-2 text-sm"
                        onClick={() => setDeleteConfirm(e.employee_id)}
                      >
                        <span>🗑️</span>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>

                {deleteConfirm === e.employee_id && (
                  <tr className="bg-red-50 border-b border-red-200">
                    <td colSpan="5" className="py-4 px-4">
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

                {openEmployee === e.employee_id && (
                  <tr className="bg-gradient-to-b from-blue-50 to-white border-b border-blue-200">
                    <td colSpan="5" className="p-6">
                      <div className="space-y-4">
                        <AttendanceForm employeeId={e.employee_id} />
                        <AttendanceList employeeId={e.employee_id} />
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
