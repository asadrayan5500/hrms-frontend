export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-slate-800 to-slate-700 shadow-lg px-6 py-4 sticky top-0 z-40 border-b border-slate-600">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-lg p-2">
            <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">HRMS</h1>
            <p className="text-slate-300 text-xs">Human Resource Management System</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-slate-300 text-sm font-medium">
            Enterprise Edition
          </div>
        </div>
      </div>
    </nav>
  );
}
