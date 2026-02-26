import { useEffect, useState } from 'react';
import { getEmployees, getAttendance } from '../api/api';

export default function AttendanceAnalytics() {
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const employees = await getEmployees();
      let totalPresent = 0;
      let totalAbsent = 0;
      const departmentStats = {};
      const topAbsentees = {};

      for (const emp of employees) {
        const records = await getAttendance(emp.employee_id);
        const presentCount = records.filter(r => r.status === 'Present').length;
        const absentCount = records.filter(r => r.status === 'Absent').length;

        totalPresent += presentCount;
        totalAbsent += absentCount;

        // Department stats
        if (!departmentStats[emp.department]) {
          departmentStats[emp.department] = { present: 0, absent: 0, total: 0 };
        }
        departmentStats[emp.department].present += presentCount;
        departmentStats[emp.department].absent += absentCount;
        departmentStats[emp.department].total += records.length;

        // Track absentees
        if (absentCount > 0) {
          topAbsentees[emp.full_name] = absentCount;
        }
      }

      const topAbsenteesArray = Object.entries(topAbsentees)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

      const totalRecords = totalPresent + totalAbsent;
      const attendancePercentage = totalRecords > 0 ? ((totalPresent / totalRecords) * 100).toFixed(1) : 0;

      setAnalytics({
        totalPresent,
        totalAbsent,
        totalRecords,
        attendancePercentage,
        departmentStats,
        topAbsentees: topAbsenteesArray,
      });
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-40 bg-gray-200 rounded-xl animate-pulse"></div>
        <div className="h-60 bg-gray-200 rounded-xl animate-pulse"></div>
      </div>
    );
  }

  if (!analytics) {
    return <div className="text-center text-gray-600">Failed to load analytics</div>;
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-2 font-medium">Total Present</p>
          <p className="text-3xl font-bold text-green-600">{analytics.totalPresent}</p>
          <p className="text-xs text-gray-500 mt-2">days recorded</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-2 font-medium">Total Absent</p>
          <p className="text-3xl font-bold text-red-600">{analytics.totalAbsent}</p>
          <p className="text-xs text-gray-500 mt-2">days recorded</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-2 font-medium">Total Records</p>
          <p className="text-3xl font-bold text-blue-600">{analytics.totalRecords}</p>
          <p className="text-xs text-gray-500 mt-2">attendance entries</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-2 font-medium">Attendance Rate</p>
          <p className="text-3xl font-bold text-slate-600">{analytics.attendancePercentage}%</p>
          <p className="text-xs text-gray-500 mt-2">overall</p>
        </div>
      </div>

      {/* Department Stats */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Attendance by Department</h3>
        <div className="space-y-3">
          {Object.entries(analytics.departmentStats).map(([dept, stats]) => {
            const percentage = stats.total > 0 ? ((stats.present / stats.total) * 100).toFixed(0) : 0;
            return (
              <div key={dept}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{dept}</span>
                  <span className="text-xs font-medium text-gray-600">{percentage}% • {stats.present}/{stats.total}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Absentees */}
      {analytics.topAbsentees.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Top Absentees</h3>
          <div className="space-y-2">
            {analytics.topAbsentees.map(([name, count], index) => (
              <div key={name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 bg-red-100 text-red-600 font-bold rounded-full text-sm">
                    {index + 1}
                  </span>
                  <span className="font-medium text-gray-900">{name}</span>
                </div>
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full font-medium text-sm">
                  {count} absences
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
