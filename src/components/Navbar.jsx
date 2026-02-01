export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg px-6 py-5 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-lg p-2">
            <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.5 1.5H3.75A2.25 2.25 0 001.5 3.75v12.5A2.25 2.25 0 003.75 18.5h12.5a2.25 2.25 0 002.25-2.25V9.5M10.5 1.5v8m0-8h8m0 0v8m0-8l-8 8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">
              HRMS
            </h1>
            <p className="text-blue-100 text-xs">Human Resource Management</p>
          </div>
        </div>
        <div className="text-white text-sm font-medium opacity-75">
          Management System
        </div>
      </div>
    </nav>
  );
}
