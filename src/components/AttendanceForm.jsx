import { useState, useEffect } from "react";
import { markAttendance, getEmployees } from "../api/api";

export default function AttendanceForm({ employeeId }) {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(employeeId || "");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!employeeId) {
      getEmployees().then((data) => {
        setEmployees(data);
        if (data.length > 0) {
          setSelectedEmployeeId(data[0].employee_id);
        }
      });
    }
  }, [employeeId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await markAttendance({
        employee_id: selectedEmployeeId || employeeId,
        date,
        status,
      });
      setSuccess(true);
      setDate("");
      setStatus("Present");
      if (!employeeId && employees.length > 0) {
        setSelectedEmployeeId(employees[0].employee_id);
      }
      setTimeout(() => setSuccess(false), 3000);
      window.location.reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-3 mb-5">
        <div className="bg-slate-100 rounded-lg p-2.5">
          <svg className="w-5 h-5 text-slate-700" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2 1 1 0 000-2H3a1 1 0 00-1 1v13a1 1 0 001 1h10a1 1 0 001-1V4a1 1 0 00-1-1 1 1 0 000 2h1a1 1 0 012 0v.05A2.5 2.5 0 1113 12H4a1 1 0 100 2h9a1 1 0 100-2H4a1 1 0 010-2h5V5a2 2 0 10-5 .09V4H6a2 2 0 00-2 2v11a1 1 0 102 0v-2h8v2a1 1 0 102 0V5z" />
          </svg>
        </div>
        <h3 className="font-bold text-lg text-gray-900">Mark Attendance</h3>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4 flex items-start gap-3">
          <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm mb-4 flex items-start gap-3">
          <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>Attendance marked successfully!</span>
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        {!employeeId && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Employee</label>
            <select
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none transition-all duration-200 bg-white text-gray-800 font-medium"
              value={selectedEmployeeId}
              onChange={(e) => setSelectedEmployeeId(e.target.value)}
              required
            >
              <option value="">Select an employee</option>
              {employees.map((emp) => (
                <option key={emp.employee_id} value={emp.employee_id}>
                  {emp.full_name} ({emp.employee_id})
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
          <input
            type="date"
            className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none transition-all duration-200 bg-white text-gray-800"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
          <select
            className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none transition-all duration-200 bg-white text-gray-800 font-medium"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-slate-700 hover:bg-slate-800 text-white px-4 py-2.5 rounded-lg transition-colors duration-200 font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              <span>Saving...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M19.414 11.414l-7-7a2 2 0 00-2.828 0l-7 7a2 2 0 001.414 3.414H2v3a2 2 0 002 2h12a2 2 0 002-2v-3h.586a2 2 0 001.414-3.414z" />
              </svg>
              <span>Mark Attendance</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
