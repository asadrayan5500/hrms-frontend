import { useState } from "react";
import { createEmployee } from "../api/api";

export default function EmployeeForm() {
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await createEmployee(form);
      setSuccess(true);
      setForm({ employee_id: "", full_name: "", email: "", department: "" });
      setTimeout(() => setSuccess(false), 3000);
      window.location.reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fieldConfig = [
    { key: "employee_id", label: "Employee ID", type: "text", icon: "👤" },
    { key: "full_name", label: "Full Name", type: "text", icon: "👨" },
    { key: "email", label: "Email", type: "email", icon: "✉️" },
    { key: "department", label: "Department", type: "text", icon: "🏢" },
  ];

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-600 rounded-lg p-3">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.5 1.5a2 2 0 11-4 0 2 2 0 014 0zM10.167 4.5a6.338 6.338 0 00-6.154 9.462m12.338-9.462a6.338 6.338 0 00-6.154 9.462M1.117 16.25a7.338 7.338 0 0116.884.462" strokeWidth="1.5" stroke="currentColor" fill="none"/>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Add New Employee</h2>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg">
          <p className="text-red-700 font-medium text-sm">⚠️ {error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-r-lg">
          <p className="text-green-700 font-medium text-sm">✓ Employee added successfully!</p>
        </div>
      )}

      <form className="grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={handleSubmit}>
        {fieldConfig.map((field) => (
          <div key={field.key} className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <span>{field.icon}</span>
              {field.label}
            </label>
            <input
              type={field.type}
              placeholder={`Enter ${field.label.toLowerCase()}`}
              className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 bg-white hover:border-gray-300"
              value={form[field.key]}
              onChange={(e) =>
                setForm({ ...form, [field.key]: e.target.value })
              }
              required
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={isLoading}
          className="col-span-1 md:col-span-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Add Employee
            </>
          )}
        </button>
      </form>
    </div>
  );
}
