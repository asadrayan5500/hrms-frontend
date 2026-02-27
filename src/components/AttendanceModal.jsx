import { useEffect, useState } from "react";
import { getAttendance } from "../api/api";

export default function AttendanceModal({ isOpen, onClose, employee }) {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && employee) {
      console.log("AttendanceModal opened with employee:", employee);
      console.log("Employee ID:", employee.employee_id);
      
      if (!employee.employee_id) {
        setError("Invalid employee: missing employee_id");
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      setError(null);
      getAttendance(employee.employee_id)
        .then((data) => {
          console.log("Attendance records loaded:", data);
          setRecords(data || []);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error loading attendance:", err);
          setError(err.message || "Failed to load attendance records");
          setIsLoading(false);
        });
    }
  }, [isOpen, employee?.employee_id]);

  if (!isOpen) return null;

  const presentCount = records.filter(r => r.status === "Present").length;
  const absentCount = records.filter(r => r.status === "Absent").length;
  const attendancePercentage = records.length > 0 ? ((presentCount / records.length) * 100).toFixed(1) : "0";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      {/* Modal Container */}
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200">
        {/* Modal Header */}
        <div className="sticky top-0 bg-gradient-to-r from-slate-700 to-slate-800 text-white px-6 py-4 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2 1 1 0 000-2H3a1 1 0 00-1 1v13a1 1 0 001 1h10a1 1 0 001-1V4a1 1 0 00-1-1 1 1 0 000 2h1a1 1 0 012 0v.05A2.5 2.5 0 1113 12H4a1 1 0 100 2h9a1 1 0 100-2H4a1 1 0 010-2h5V5a2 2 0 10-5 .09V4H6a2 2 0 00-2 2v11a1 1 0 102 0v-2h8v2a1 1 0 102 0V5z" />
            </svg>
            <div>
              <h2 className="text-lg font-semibold">Attendance History</h2>
              <p className="text-slate-300 text-sm">{employee?.first_name} {employee?.last_name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <svg className="animate-spin h-8 w-8 text-slate-600" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              <span className="ml-2 text-gray-600">Loading records...</span>
            </div>
          ) : records.length === 0 ? (
            <div className="text-center py-8">
              <svg className="h-12 w-12 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-600 font-medium">No attendance records</p>
              <p className="text-gray-400 text-sm mt-1">Mark attendance to see history</p>
            </div>
          ) : (
            <div className="space-y-6">
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
                  <p className="text-sm text-gray-600 font-medium mb-1">Rate</p>
                  <p className="text-2xl font-bold text-slate-600">{attendancePercentage}%</p>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700 uppercase tracking-wider text-xs">Date</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700 uppercase tracking-wider text-xs">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((r, i) => (
                      <tr key={i} className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150">
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
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-lg font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
