import { useState } from "react";
import { createEmployee } from "../api/api";
import { validateEmployee } from "../utils/validation";
import { useToast } from "../context/ToastContext";

export default function EmployeeForm({ onSuccess }) {
  const { addToast } = useToast();
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    phone: "",
    department: "",
    position: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear error on change if field was touched
    if (touched[name]) {
      const validation = validateEmployee({ ...form, [name]: value });
      setErrors(validation.errors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validation = validateEmployee(form);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setTouched({
        employee_id: true,
        full_name: true,
        email: true,
        phone: true,
        department: true,
        position: true,
      });
      addToast('Please fill all fields correctly', 'error');
      return;
    }

    setIsLoading(true);
    try {
      await createEmployee(form);
      addToast('Employee added successfully!', 'success');
      setForm({
        employee_id: "",
        full_name: "",
        email: "",
        phone: "",
        department: "",
        position: "",
      });
      setErrors({});
      setTouched({});
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      addToast(err.message || 'Failed to add employee', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const fieldConfig = [
    { key: "employee_id", label: "Employee ID", type: "text", icon: "👤", fullWidth: false },
    { key: "full_name", label: "Full Name", type: "text", icon: "👨", fullWidth: false },
    { key: "email", label: "Email", type: "email", icon: "✉️", fullWidth: false },
    { key: "phone", label: "Phone", type: "tel", icon: "📱", fullWidth: false },
    { key: "department", label: "Department", type: "text", icon: "🏢", fullWidth: false },
    { key: "position", label: "Position", type: "text", icon: "💼", fullWidth: false },
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

      <form className="grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={handleSubmit}>
        {fieldConfig.map((field) => (
          <div key={field.key} className={field.fullWidth ? 'md:col-span-2' : ''}>
            <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <span>{field.icon}</span>
              {field.label}
              {errors[field.key] && <span className="text-red-600">*</span>}
            </label>
            <input
              type={field.type}
              name={field.key}
              placeholder={`Enter ${field.label.toLowerCase()}`}
              className={`w-full px-4 py-3 border-2 rounded-lg outline-none transition-all duration-200 bg-white hover:border-gray-300 focus:ring-2 ${
                touched[field.key] && errors[field.key]
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                  : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
              }`}
              value={form[field.key]}
              onChange={handleChange}
              onBlur={() => handleBlur(field.key)}
            />
            {touched[field.key] && errors[field.key] && (
              <p className="text-red-600 text-xs font-medium mt-1 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                {errors[field.key]}
              </p>
            )}
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
