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
      <div className="bg-white p-6 rounded-lg flex items-center justify-center">
        <svg className="animate-spin h-6 w-6 text-purple-600" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
        </svg>
        <span className="ml-2 text-gray-600 text-sm">Loading attendance records...</span>
      </div>
    );
  }

  if (!records.length) {
    return (
      <div className="bg-white p-8 rounded-lg text-center border-2 border-dashed border-gray-300">
        <div className="text-4xl mb-3">📋</div>
        <p className="text-gray-600 font-medium">No attendance records yet</p>
        <p className="text-gray-400 text-sm mt-1">Mark the first attendance above</p>
      </div>
    );
  }

  const presentCount = records.filter(r => r.status === "Present").length;
  const absentCount = records.filter(r => r.status === "Absent").length;
  const attendancePercentage = ((presentCount / records.length) * 100).toFixed(1);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">📊</span>
        <h4 className="font-bold text-lg text-gray-800">Attendance History</h4>
        <span className="ml-auto text-xs font-semibold text-white bg-purple-600 px-3 py-1 rounded-full">
          {records.length} Records
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded-r-lg">
          <p className="text-sm text-gray-600 font-medium">Present</p>
          <p className="text-2xl font-bold text-green-600">{presentCount}</p>
        </div>
        <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-r-lg">
          <p className="text-sm text-gray-600 font-medium">Absent</p>
          <p className="text-2xl font-bold text-red-600">{absentCount}</p>
        </div>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r-lg">
          <p className="text-sm text-gray-600 font-medium">Attendance %</p>
          <p className="text-2xl font-bold text-blue-600">{attendancePercentage}%</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b-2 border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">📅 Date</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r, i) => (
              <tr key={i} className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                <td className="py-3 px-4 font-medium text-gray-800">{r.date}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-4 py-2 rounded-full font-semibold text-sm flex w-fit gap-2 items-center ${
                      r.status === "Present"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    <span>{r.status === "Present" ? "✓" : "✗"}</span>
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
