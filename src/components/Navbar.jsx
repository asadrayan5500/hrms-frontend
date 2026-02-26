export default function Navbar() {
  const today = new Date();
  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
  const date = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

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
          <div className="flex items-center gap-3 bg-slate-700 bg-opacity-50 px-4 py-2 rounded-lg">
            <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6 2a1 1 0 000 2h8a1 1 0 100-2H6zM4 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm2 3a1 1 0 000 2h8a1 1 0 100-2H6zm0 4a1 1 0 100 2h8a1 1 0 100-2H6z" />
            </svg>
            <div>
              <p className="text-slate-300 text-xs font-medium">{dayName}</p>
              <p className="text-slate-100 text-sm font-semibold">{date}</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
