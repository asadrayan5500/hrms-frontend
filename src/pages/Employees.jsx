import { useState, useRef } from "react";
import EmployeeFormModal from "../components/EmployeeFormModal";
import EmployeeListAdvanced from "../components/EmployeeListAdvanced";

export default function Employees() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const listRef = useRef();

  const handleSuccess = () => {
    setIsModalOpen(false);
    // Reload the list
    if (listRef.current?.reloadEmployees) {
      listRef.current.reloadEmployees();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Professional Header */}
      <div className="bg-gradient-to-r from-slate-700 to-slate-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Employee Management</h1>
              <p className="text-slate-300 text-base font-medium">Manage and organize your workforce</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white hover:bg-gray-50 text-slate-700 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
              </svg>
              <span>Add Employee</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EmployeeListAdvanced ref={listRef} />
      </div>

      {/* Modal */}
      <EmployeeFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
