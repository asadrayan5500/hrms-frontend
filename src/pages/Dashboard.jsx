import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
          <h1 className="text-4xl font-bold mb-2">Welcome to HRMS</h1>
          <p className="text-blue-100 text-lg">Manage your employees and attendance efficiently</p>
          <div className="mt-6 flex gap-4 flex-wrap">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-sm text-blue-100">System Status:</span>
              <p className="text-white font-semibold">🟢 Operational</p>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-sm text-blue-100">Last Updated:</span>
              <p className="text-white font-semibold">Just now</p>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="space-y-8">
          <EmployeeForm />
          <EmployeeList />
        </div>
      </div>
    </div>
  );
}
