import { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../api/api";
import ConfirmDialog from "./ConfirmDialog";
import AttendanceModal from "./AttendanceModal";
import Breadcrumb from "./Breadcrumb";
import { EmployeeRowSkeleton } from "./Skeletons";
import { useToast } from "../context/ToastContext";
import { exportToCSV } from "../utils/csvExport";
import { formatDate } from "../utils/dateFormatter";

export default function EmployeeListAdvanced() {
  const { addToast } = useToast();
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({ key: "full_name", direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedEmployees, setSelectedEmployees] = useState(new Set());
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, employeeId: null, employeeName: "" });
  const [attendanceModal, setAttendanceModal] = useState({ isOpen: false, employee: null });
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    setIsLoading(true);
    try {
      const data = await getEmployees();
      setEmployees(data);
      const uniqueDepartments = [...new Set(data.map(e => e.department))];
      setDepartments(uniqueDepartments);
      applyFiltersAndSort(data, "", "all");
    } catch (error) {
      addToast("Failed to load employees", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const applyFiltersAndSort = (data, search, dept) => {
    let filtered = data;

    // Apply search
    if (search) {
      const query = search.toLowerCase();
      filtered = filtered.filter(
        (e) =>
          e.full_name.toLowerCase().includes(query) ||
          e.employee_id.toLowerCase().includes(query) ||
          e.email.toLowerCase().includes(query)
      );
    }

    // Apply department filter
    if (dept !== "all") {
      filtered = filtered.filter((e) => e.department === dept);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredEmployees(filtered);
    setCurrentPage(1);
    setSelectedEmployees(new Set());
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    applyFiltersAndSort(employees, query, departmentFilter);
  };

  const handleDepartmentFilter = (dept) => {
    setDepartmentFilter(dept);
    applyFiltersAndSort(employees, searchQuery, dept);
  };

  const handleSort = (key) => {
    const newDirection =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction: newDirection });
    applyFiltersAndSort(employees, searchQuery, departmentFilter);
  };

  const handleDelete = (id, name) => {
    setConfirmDialog({ isOpen: true, employeeId: id, employeeName: name });
  };

  const confirmDelete = async () => {
    try {
      await deleteEmployee(confirmDialog.employeeId);
      addToast("Employee deleted successfully", "success");
      loadEmployees();
    } catch (error) {
      addToast(error.message, "error");
    } finally {
      setConfirmDialog({ isOpen: false, employeeId: null, employeeName: "" });
    }
  };

  const handleBulkDelete = async () => {
    if (selectedEmployees.size === 0) {
      addToast("No employees selected", "warning");
      return;
    }

    setConfirmDialog({
      isOpen: true,
      isBulk: true,
      count: selectedEmployees.size,
    });
  };

  const confirmBulkDelete = async () => {
    try {
      for (const id of selectedEmployees) {
        await deleteEmployee(id);
      }
      addToast(`${selectedEmployees.size} employees deleted successfully`, "success");
      setSelectedEmployees(new Set());
      loadEmployees();
    } catch (error) {
      addToast(error.message, "error");
    } finally {
      setConfirmDialog({ isOpen: false });
    }
  };

  const handleBulkExport = () => {
    if (selectedEmployees.size === 0) {
      addToast("No employees selected", "warning");
      return;
    }

    const selectedData = employees.filter((e) => selectedEmployees.has(e.employee_id));
    exportToCSV(selectedData, `employees_${new Date().toISOString().split('T')[0]}.csv`);
    addToast("Export successful!", "success");
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedEmployees(new Set(paginatedEmployees.map((e) => e.employee_id)));
    } else {
      setSelectedEmployees(new Set());
    }
  };

  const handleSelectEmployee = (id, checked) => {
    const newSelected = new Set(selectedEmployees);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedEmployees(newSelected);
  };

  const handleExportAllVisible = () => {
    if (filteredEmployees.length === 0) {
      addToast("No employees to export", "warning");
      return;
    }
    exportToCSV(filteredEmployees, `employees_${new Date().toISOString().split('T')[0]}.csv`);
    addToast("All filtered employees exported!", "success");
  };

  // Pagination
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEmployees = filteredEmployees.slice(startIndex, startIndex + itemsPerPage);

  const SortIcon = ({ field }) => {
    if (sortConfig.key !== field) return <svg className="w-4 h-4 opacity-30" fill="currentColor" viewBox="0 0 20 20"><path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3z" /></svg>;
    return sortConfig.direction === "asc" ? (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h9a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
    ) : (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0-4a1 1 0 011-1h9a1 1 0 110 2H4a1 1 0 01-1-1zm0-4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
    );
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[
        { label: "HRMS", href: "/" },
        { label: "Employees" }
      ]} />

      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        {/* Header with controls */}
        <div className="p-6 border-b border-gray-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-2xl font-bold text-gray-900">Employees</h2>
            <div className="flex items-center gap-2">
              {selectedEmployees.size > 0 && (
                <>
                  <button
                    onClick={handleBulkExport}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Export ({selectedEmployees.size})
                  </button>
                  <button
                    onClick={handleBulkDelete}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Filters and Search */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <div className="relative">
                <svg className="absolute left-3 top-3 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
                <input
                  type="text"
                  placeholder="Search by name, ID, or email..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                value={departmentFilter}
                onChange={(e) => handleDepartmentFilter(e.target.value)}
              >
                <option value="all">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Items per page</label>
              <select
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value="10">10 per page</option>
                <option value="25">25 per page</option>
                <option value="50">50 per page</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleExportAllVisible}
            className="w-full sm:w-auto px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Export All Visible
          </button>
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody>
                {[...Array(5)].map((_, i) => (
                  <EmployeeRowSkeleton key={i} />
                ))}
              </tbody>
            </table>
          </div>
        ) : filteredEmployees.length === 0 ? (
          <div className="p-12 text-center">
            <svg className="h-12 w-12 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            <p className="text-gray-600 font-medium">No employees found</p>
            <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    <input
                      type="checkbox"
                      checked={selectedEmployees.size === paginatedEmployees.length && paginatedEmployees.length > 0}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="w-4 h-4 rounded"
                    />
                  </th>
                  <th
                    onClick={() => handleSort("full_name")}
                    className="text-left py-3 px-4 font-semibold text-gray-700 uppercase tracking-wider text-xs cursor-pointer hover:bg-gray-100 flex items-center gap-2"
                  >
                    Name <SortIcon field="full_name" />
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 uppercase tracking-wider text-xs">
                    ID
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 uppercase tracking-wider text-xs cursor-pointer hover:bg-gray-100 flex items-center gap-2"
                    onClick={() => handleSort("department")}
                  >
                    Department <SortIcon field="department" />
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 uppercase tracking-wider text-xs">
                    Email
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 uppercase tracking-wider text-xs">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedEmployees.map((emp) => (
                  <tr key={emp.employee_id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        checked={selectedEmployees.has(emp.employee_id)}
                        onChange={(e) => handleSelectEmployee(emp.employee_id, e.target.checked)}
                        className="w-4 h-4 rounded"
                      />
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-900">{emp.full_name}</td>
                    <td className="py-3 px-4 text-gray-600">{emp.employee_id}</td>
                    <td className="py-3 px-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        {emp.department}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600 text-xs">{emp.email}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setAttendanceModal({ isOpen: true, employee: emp })}
                          className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600"
                          title="View Attendance"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000-2H3a1 1 0 00-1 1v13a1 1 0 001 1h14a1 1 0 001-1V4a1 1 0 00-1-1 1 1 0 000 2 2 2 0 012 2v11a1 1 0 11-2 0V4a1 1 0 00-1-1H5a1 1 0 00-1 1v10a1 1 0 102 0V5z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(emp.employee_id, emp.full_name)}
                          className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                          title="Delete"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {filteredEmployees.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
              <span className="font-medium">{Math.min(startIndex + itemsPerPage, filteredEmployees.length)}</span> of{" "}
              <span className="font-medium">{filteredEmployees.length}</span> employees
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                ← Previous
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Dialogs */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.isBulk ? "Delete Multiple Employees?" : "Delete Employee?"}
        message={
          confirmDialog.isBulk
            ? `Are you sure you want to delete ${confirmDialog.count} employees? This action cannot be undone.`
            : `Are you sure you want to delete ${confirmDialog.employeeName}? This action cannot be undone.`
        }
        confirmText="Delete"
        isDangerous
        onConfirm={confirmDialog.isBulk ? confirmBulkDelete : confirmDelete}
        onCancel={() => setConfirmDialog({ isOpen: false })}
      />

      <AttendanceModal
        isOpen={attendanceModal.isOpen}
        employee={attendanceModal.employee}
        onClose={() => setAttendanceModal({ isOpen: false, employee: null })}
      />
    </div>
  );
}
