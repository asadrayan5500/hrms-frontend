import { useEffect, useState } from "react";
import { getEmployees } from "../api/api";
import Breadcrumb from "../components/Breadcrumb";
import AttendanceAnalytics from "../components/AttendanceAnalytics";
import MonthlyReports from "../components/MonthlyReports";

export default function Dashboard() {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    getEmployees().then((data) => {
      setEmployeeCount(data.length);
      setLastUpdated(new Date());
    });
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", { 
      hour: "2-digit", 
      minute: "2-digit",
      second: "2-digit"
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Professional Header */}
      <div className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-slate-800 mb-2 tracking-tight">Dashboard</h1>
              <p className="text-slate-600 text-base font-medium">Centralized Human Resource Management System</p>
            </div>
            <div className="text-right">
              <p className="text-slate-600 text-sm">Last Synced</p>
              <p className="text-slate-800 font-mono text-base font-semibold">{formatTime(lastUpdated)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Breadcrumb */}
        <Breadcrumb items={[
          { label: "HRMS" },
          { label: "Dashboard" }
        ]} />

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Employees Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300">
            <div className="bg-gradient-to-br from-slate-600 to-slate-700 p-6 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-200 text-sm font-semibold uppercase tracking-wide">Total Employees</p>
                  <p className="text-5xl font-bold mt-2">{employeeCount}</p>
                </div>
                <div className="bg-slate-500 bg-opacity-30 rounded-full p-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM9 16a6 6 0 00-6-6 6 6 0 000 12 6 6 0 006-6zM13 8a1 1 0 100-2 1 1 0 000 2zM13 12a1 1 0 01-1-1 1 1 0 011-1 1 1 0 011 1 1 1 0 01-1 1zM17 9a1 1 0 100-2 1 1 0 000 2zM17 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50">
              <p className="text-gray-600 text-sm">Active in system</p>
            </div>
          </div>

          {/* System Status Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300">
            <div className="bg-gradient-to-br from-green-600 to-green-700 p-6 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-green-100 text-sm font-semibold uppercase tracking-wide">System Status</p>
                  <p className="text-3xl font-bold mt-2 flex items-center gap-2">
                    <span className="w-3 h-3 bg-green-300 rounded-full animate-pulse"></span>
                    Operational
                  </p>
                </div>
                <div className="bg-green-500 bg-opacity-30 rounded-full p-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50">
              <p className="text-gray-600 text-sm">All systems running smoothly</p>
            </div>
          </div>

          {/* Data Sync Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-blue-100 text-sm font-semibold uppercase tracking-wide">Data Sync</p>
                  <p className="text-3xl font-bold mt-2">Real-time</p>
                </div>
                <div className="bg-blue-500 bg-opacity-30 rounded-full p-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 1111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 105.199 5.1H7a1 1 0 000-2H4a1 1 0 00-1 1z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50">
              <p className="text-gray-600 text-sm">Updated {lastUpdated.toLocaleTimeString()}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-6 py-3 font-medium border-b-2 transition-colors ${
              activeTab === "overview"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            <svg className="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
            Overview
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`px-6 py-3 font-medium border-b-2 transition-colors ${
              activeTab === "analytics"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            <svg className="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
            Analytics
          </button>
          <button
            onClick={() => setActiveTab("reports")}
            className={`px-6 py-3 font-medium border-b-2 transition-colors ${
              activeTab === "reports"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            <svg className="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000-2H3a1 1 0 00-1 1v13a1 1 0 001 1h14a1 1 0 001-1V4a1 1 0 00-1-1 1 1 0 000 2 2 2 0 012 2v11a1 1 0 11-2 0V4a1 1 0 00-1-1H5a1 1 0 00-1 1v10a1 1 0 102 0V5z" clipRule="evenodd" />
            </svg>
            Reports
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-lg border border-slate-200">
                <p className="text-slate-700 text-sm font-semibold mb-2 uppercase tracking-wide">Total Departments</p>
                <p className="text-3xl font-bold text-slate-800">5</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
                <p className="text-green-700 text-sm font-semibold mb-2 uppercase tracking-wide">Today's Attendance</p>
                <p className="text-3xl font-bold text-green-800">--</p>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-lg border border-amber-200">
                <p className="text-amber-700 text-sm font-semibold mb-2 uppercase tracking-wide">Absent Today</p>
                <p className="text-3xl font-bold text-amber-800">--</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
                <p className="text-blue-700 text-sm font-semibold mb-2 uppercase tracking-wide">Active</p>
                <p className="text-3xl font-bold text-blue-800">{employeeCount}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "analytics" && <AttendanceAnalytics />}

        {activeTab === "reports" && <MonthlyReports />}
      </div>
    </div>
  );
}
