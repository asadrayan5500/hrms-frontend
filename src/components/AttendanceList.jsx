import { useEffect, useState } from "react";
import { getAttendance } from "../api/api";


export default function AttendanceList({ employeeId }) {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAttendance(employeeId).then((data) => {
      setRecords(data);
      setIsLoading(false);
    });
  }, [employeeId]);

  if (isLoading) {
    return (
      <div className="bg-white p-8 rounded-xl flex items-center justify-center border border-gray-200">
        <svg className="animate-spin h-6 w-6 text-slate-600" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
        </svg>
        <span className="ml-2 text-gray-600 text-sm">Loading records...</span>
      </div>
    );
  }

  if (!records.length) {
    return (
      <div className="bg-white p-8 rounded-xl text-center border border-gray-200">
        <svg className="h-12 w-12 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="text-gray-600 font-medium">No attendance records yet</p>
        <p className="text-gray-400 text-sm mt-1">Mark attendance to see history</p>
      </div>
    );
  }

  const presentCount = records.filter(r => r.status === "Present").length;
  const absentCount = records.filter(r => r.status === "Absent").length;
  const attendancePercentage = ((presentCount / records.length) * 100).toFixed(1);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-lg text-gray-900">Attendance History</h4>
            <p className="text-sm text-gray-500 mt-1">{records.length} total records</p>
          </div>
          <span className="text-xs font-semibold text-white bg-slate-600 px-3 py-1 rounded-full">
            {records.length} Records
          </span>
        </div>
      </div>

      <div className="p-6 bg-gray-50 border-b border-gray-200">
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
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left py-4 px-6 font-semibold text-gray-700 uppercase tracking-wider text-xs">Date</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700 uppercase tracking-wider text-xs">Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r, i) => (
              <tr key={i} className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150">
                <td className="py-4 px-6 font-medium text-gray-800">{r.date}</td>
                <td className="py-4 px-6">
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
  );
}
