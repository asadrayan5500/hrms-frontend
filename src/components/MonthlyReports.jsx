import { useState, useEffect } from 'react';
import { getEmployees, getAttendance } from '../api/api';
import { exportToCSV } from '../utils/csvExport';
import { useToast } from '../context/ToastContext';

export default function MonthlyReports() {
  const { addToast } = useToast();
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadReport();
  }, [selectedMonth]);

  const loadReport = async () => {
    setIsLoading(true);
    try {
      const employees = await getEmployees();
      const [year, month] = selectedMonth.split('-');
      const monthStart = new Date(year, parseInt(month) - 1, 1);
      const monthEnd = new Date(year, parseInt(month), 0);

      const report = {
        month: selectedMonth,
        monthName: monthStart.toLocaleString('en-US', { month: 'long', year: 'numeric' }),
        employeeRecords: [],
        summary: {
          totalEmployees: employees.length,
          totalRecords: 0,
          totalPresent: 0,
          totalAbsent: 0,
          averageAttendance: 0,
        },
      };

      for (const emp of employees) {
        const allRecords = await getAttendance(emp.employee_id);
        const monthRecords = allRecords.filter(r => {
          const recordDate = new Date(r.date);
          return recordDate >= monthStart && recordDate <= monthEnd;
        });

        const present = monthRecords.filter(r => r.status === 'Present').length;
        const absent = monthRecords.filter(r => r.status === 'Absent').length;
        const total = monthRecords.length;

        if (total > 0) {
          report.employeeRecords.push({
            employee_id: emp.employee_id,
            full_name: emp.full_name,
            department: emp.department,
            present,
            absent,
            total,
            percentage: ((present / total) * 100).toFixed(1),
          });

          report.summary.totalRecords += total;
          report.summary.totalPresent += present;
          report.summary.totalAbsent += absent;
        }
      }

      if (report.summary.totalRecords > 0) {
        report.summary.averageAttendance = (
          (report.summary.totalPresent / report.summary.totalRecords) * 100
        ).toFixed(1);
      }

      setReportData(report);
    } catch (error) {
      addToast('Failed to load report', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = () => {
    if (!reportData || reportData.employeeRecords.length === 0) {
      addToast('No data to export', 'warning');
      return;
    }

    exportToCSV(reportData.employeeRecords, `monthly-report-${selectedMonth}.csv`);
    addToast('Report exported successfully', 'success');
  };

  if (isLoading) {
    return <div className="text-center text-gray-600 p-12">Loading report...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Monthly Reports</h2>
            <p className="text-sm text-gray-600 mt-1">Attendance and HR summary reports</p>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
            <button
              onClick={handleExport}
              className="px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Export
            </button>
          </div>
        </div>
      </div>

      {reportData && (
        <>
          {/* Summary */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 text-center">
              <p className="text-sm text-gray-600 mb-2 font-medium">Period</p>
              <p className="text-lg font-bold text-gray-900">{reportData.monthName}</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 text-center">
              <p className="text-sm text-gray-600 mb-2 font-medium">Total Employees</p>
              <p className="text-lg font-bold text-blue-600">{reportData.summary.totalEmployees}</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 text-center">
              <p className="text-sm text-gray-600 mb-2 font-medium">Present Days</p>
              <p className="text-lg font-bold text-green-600">{reportData.summary.totalPresent}</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 text-center">
              <p className="text-sm text-gray-600 mb-2 font-medium">Absent Days</p>
              <p className="text-lg font-bold text-red-600">{reportData.summary.totalAbsent}</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 text-center">
              <p className="text-sm text-gray-600 mb-2 font-medium">Avg Attendance</p>
              <p className="text-lg font-bold text-slate-600">{reportData.summary.averageAttendance}%</p>
            </div>
          </div>

          {/* Employee Records */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Employee Records</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 uppercase tracking-wider text-xs">Employee</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 uppercase tracking-wider text-xs">Department</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700 uppercase tracking-wider text-xs">Present</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700 uppercase tracking-wider text-xs">Absent</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700 uppercase tracking-wider text-xs">Total</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700 uppercase tracking-wider text-xs">Attendance %</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.employeeRecords.map((record) => (
                    <tr key={record.employee_id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 font-medium text-gray-900">{record.full_name}</td>
                      <td className="py-3 px-4 text-gray-600">{record.department}</td>
                      <td className="py-3 px-4 text-center">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium text-xs">
                          {record.present}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full font-medium text-xs">
                          {record.absent}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center font-medium text-gray-900">{record.total}</td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-600 transition-all"
                              style={{ width: `${record.percentage}%` }}
                            ></div>
                          </div>
                          <span className="font-medium text-gray-900 w-12 text-right">{record.percentage}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
