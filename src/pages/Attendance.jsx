import { useEffect, useState } from "react";
import AttendanceForm from "../components/AttendanceForm";
import AllEmployeesAttendance from "../components/AllEmployeesAttendance";

export default function Attendance() {
  const [attendanceCount, setAttendanceCount] = useState(0);

  useEffect(() => {
    // You can fetch actual attendance data here if needed
    setAttendanceCount(0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Professional Header */}
      <div className="bg-gradient-to-r from-slate-700 to-slate-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Attendance Tracking</h1>
          <p className="text-slate-300 text-base font-medium">Record and monitor employee attendance</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Today's Check-ins */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300">
            <div className="bg-gradient-to-br from-amber-600 to-amber-700 p-6 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-amber-100 text-sm font-semibold uppercase tracking-wide">Today's Check-ins</p>
                  <p className="text-5xl font-bold mt-2">0</p>
                </div>
                <div className="bg-amber-500 bg-opacity-30 rounded-full p-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 107.753-1.3A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50">
              <p className="text-gray-600 text-sm">Employees checked in today</p>
            </div>
          </div>

          {/* Average Attendance Rate */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300">
            <div className="bg-gradient-to-br from-teal-600 to-teal-700 p-6 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-teal-100 text-sm font-semibold uppercase tracking-wide">Attendance Rate</p>
                  <p className="text-5xl font-bold mt-2">0%</p>
                </div>
                <div className="bg-teal-500 bg-opacity-30 rounded-full p-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h.01a1 1 0 110 2H12zm-2 2a1 1 0 100-2 1 1 0 000 2zm4 0a1 1 0 100-2 1 1 0 000 2zm2-2a1 1 0 110-2h.01a1 1 0 110 2H16zM9 15a1 1 0 100-2H8.999a1 1 0 100 2H9zm4 0a1 1 0 100-2h-.01a1 1 0 110 2h.01zm4 0a1 1 0 100-2H17a1 1 0 100 2h.01z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50">
              <p className="text-gray-600 text-sm">Monthly average</p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <AttendanceForm />
            </div>
          </div>

          {/* Attendance List Section */}
          <div className="lg:col-span-2">
            <AllEmployeesAttendance />
          </div>
        </div>
      </div>
    </div>
  );
}
