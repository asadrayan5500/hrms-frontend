import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      id: 1,
      label: "Dashboard",
      path: "/",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
        </svg>
      ),
    },
    {
      id: 2,
      label: "Employees",
      path: "/employees",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM9 16a6 6 0 00-6-6 6 6 0 000 12 6 6 0 006-6zM13 8a1 1 0 100-2 1 1 0 000 2zM13 12a1 1 0 01-1-1 1 1 0 011-1 1 1 0 011 1 1 1 0 01-1 1zM17 9a1 1 0 100-2 1 1 0 000 2zM17 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      id: 3,
      label: "Attendance",
      path: "/attendance",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2 1 1 0 000-2H3a1 1 0 00-1 1v13a1 1 0 001 1h10a1 1 0 001-1V4a1 1 0 00-1-1 1 1 0 000 2h1a1 1 0 012 0v.05A2.5 2.5 0 1113 12H4a1 1 0 100 2h9a1 1 0 100-2H4a1 1 0 010-2h5V5a2 2 0 10-5 .09V4H6a2 2 0 00-2 2v11a1 1 0 102 0v-2h8v2a1 1 0 102 0V5z" />
        </svg>
      ),
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed bottom-6 right-6 z-40 bg-slate-700 hover:bg-slate-800 text-white p-4 rounded-full shadow-lg transition-all duration-300"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative md:translate-x-0 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 h-auto md:min-h-screen bg-gradient-to-b from-slate-800 to-slate-900 text-white shadow-2xl z-30 md:z-auto overflow-y-auto`}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-500 rounded-lg p-2">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.5 1.5H3.75A2.25 2.25 0 001.5 3.75v12.5A2.25 2.25 0 003.75 18.5h12.5a2.25 2.25 0 002.25-2.25V9.5M10.5 1.5v8m0-8h8m0 0v8m0-8l-8 8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold">HRMS</h2>
              <p className="text-xs text-slate-400">Management System</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 mb-4">Main Menu</p>
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive(item.path)
                  ? "bg-blue-600 text-white shadow-lg font-semibold"
                  : "text-slate-300 hover:bg-slate-700 hover:text-white"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
              {isActive(item.path) && (
                <span className="ml-auto">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Footer Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700 bg-slate-800">
          <div className="text-xs text-slate-400 space-y-1">
            <p className="font-semibold text-slate-300">System Status</p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span>Operational</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
