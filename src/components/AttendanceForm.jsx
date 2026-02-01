import { useState } from "react";
import { markAttendance } from "../api/api";

export default function AttendanceForm({ employeeId }) {
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await markAttendance({
        employee_id: employeeId,
        date,
        status,
      });
      setSuccess(true);
      setDate("");
      setTimeout(() => setSuccess(false), 3000);
      window.location.reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl border-2 border-purple-200 p-6 shadow-md hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">✓</span>
        <h3 className="font-bold text-lg text-gray-800">Mark Attendance</h3>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-3 mb-4 rounded-r-lg">
          <p className="text-red-700 text-sm font-medium">⚠️ {error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border-l-4 border-green-500 p-3 mb-4 rounded-r-lg">
          <p className="text-green-700 text-sm font-medium">✓ Attendance marked successfully!</p>
        </div>
      )}

      <form className="flex flex-col sm:flex-row gap-4 items-end" onSubmit={handleSubmit}>
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 mb-2">📅 Date</label>
          <input
            type="date"
            className="w-full border-2 border-gray-300 p-3 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200 bg-white"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
          <select
            className="w-full border-2 border-gray-300 p-3 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200 bg-white font-medium"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option className="flex items-center" value="Present">✓ Present</option>
            <option className="flex items-center" value="Absent">✗ Absent</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-lg hover:shadow-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              Saving...
            </>
          ) : (
            <>
              <span>💾</span>
              Save
            </>
          )}
        </button>
      </form>
    </div>
  );
}
