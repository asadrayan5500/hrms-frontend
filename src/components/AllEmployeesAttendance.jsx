import { useEffect, useState } from "react";
import { getEmployees, getAttendance } from "../api/api";

export default function AllEmployeesAttendance() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [allAttendanceRecords, setAllAttendanceRecords] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [filteredRecords, setFilteredRecords] = useState([]);

  useEffect(() => {
    getEmployees().then((data) => {
      setEmployees(data);
      
      // Fetch attendance for all employees
      const attendanceMap = {};
      let completed = 0;
      
      data.forEach((emp) => {
        getAttendance(emp.employee_id).then((records) => {
          attendanceMap[emp.employee_id] = records;
          completed++;
          
          if (completed === data.length) {
            setAllAttendanceRecords(attendanceMap);
            setIsLoading(false);
          }
        });
      });
    });
  }, []);

  useEffect(() => {
    if (selectedEmployeeId === "") {
      // Show all employees' attendance
      const allRecords = [];
      Object.values(allAttendanceRecords).forEach(records => {
        allRecords.push(...records);
      });
      // Sort by date in descending order
      allRecords.sort((a, b) => new Date(b.date) - new Date(a.date));
      setFilteredRecords(allRecords);
    } else if (selectedEmployeeId && allAttendanceRecords[selectedEmployeeId]) {
      // Show specific employee's attendance
      setFilteredRecords(allAttendanceRecords[selectedEmployeeId]);
    }
  }, [selectedEmployeeId, allAttendanceRecords]);

  const selectedEmployee = employees.find(e => e.employee_id === selectedEmployeeId);
  
  const presentCount = filteredRecords.filter(r => r.status === "Present").length;
  const absentCount = filteredRecords.filter(r => r.status === "Absent").length;
  const attendancePercentage = filteredRecords.length > 0 ? ((presentCount / filteredRecords.length) * 100).toFixed(1) : "0";

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      {/* Header with Dropdown */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">All Employees Attendance</h2>
            <p className="text-sm text-gray-500 mt-1">{selectedEmployeeId ? "View individual employee attendance" : "View attendance records for all employees"}</p>
          </div>
          <div className="w-full sm:w-64">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Select Employee</label>
            <select
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none transition-all duration-200 bg-white text-gray-800 font-medium"
              value={selectedEmployeeId}
              onChange={(e) => setSelectedEmployeeId(e.target.value)}
            >
              <option value="">View all employees</option>
              {employees.map((emp) => (
                <option key={emp.employee_id} value={emp.employee_id}>
                  {emp.full_name} ({emp.employee_id})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="p-12 flex items-center justify-center">
          <svg className="animate-spin h-8 w-8 text-slate-600" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
          </svg>
          <span className="ml-2 text-gray-600">Loading attendance data...</span>
        </div>
      ) : filteredRecords.length === 0 ? (
        <div className="p-12 text-center">
          <svg className="h-12 w-12 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-gray-600 font-medium">No attendance records</p>
          <p className="text-gray-400 text-sm mt-1">No attendance data available {selectedEmployeeId ? "for this employee" : "yet"}</p>
        </div>
      ) : (
        <div className="space-y-6 p-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white border border-green-200 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600 font-medium mb-1">Present</p>
              <p className="text-2xl font-bold text-green-600">{presentCount}</p>
            </div>
            <div className="bg-white border border-red-200 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600 font-medium mb-1">Absent</p>
              <p className="text-2xl font-bold text-red-600">{absentCount}</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600 font-medium mb-1">Attendance %</p>
              <p className="text-2xl font-bold text-slate-600">{attendancePercentage}%</p>
            </div>
          </div>

          {/* Employee Info - Only show when a specific employee is selected */}
          {selectedEmployee && (
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-semibold text-gray-800">{selectedEmployee.full_name}</span>
                <span className="text-gray-500"> • ID: {selectedEmployee.employee_id}</span>
              </p>
              <p className="text-sm text-gray-600">
                <span className="text-gray-500">Department: </span>
                <span className="font-semibold text-gray-800">{selectedEmployee.department}</span>
              </p>
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  {!selectedEmployeeId && (
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 uppercase tracking-wider text-xs">Employee</th>
                  )}
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 uppercase tracking-wider text-xs">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 uppercase tracking-wider text-xs">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((r, i) => {
                  const employee = !selectedEmployeeId ? employees.find(e => e.employee_id === r.employee_id) : null;
                  return (
                    <tr key={i} className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150">
                      {!selectedEmployeeId && (
                        <td className="py-3 px-4 font-medium text-gray-800">
                          {employee ? employee.full_name : "Unknown"}
                        </td>
                      )}
                      <td className="py-3 px-4 font-medium text-gray-800">{r.date}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full font-semibold text-sm inline-flex items-center gap-2 ${
                            r.status === "Present"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {r.status === "Present" ? (
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          )}
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
