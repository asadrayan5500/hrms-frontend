# HRMS Quick Reference Card

## 📱 Main Features at a Glance

| Feature | Location | Key Benefits |
|---------|----------|--------------|
| **Toast Notifications** | Toast.jsx, ToastContext.jsx | Real-time user feedback |
| **Confirmation Dialogs** | ConfirmDialog.jsx | Prevent accidental deletions |
| **Form Validation** | validation.js, EmployeeForm.jsx | Data quality assurance |
| **Pagination** | EmployeeListAdvanced.jsx | Handle large datasets |
| **Sorting** | EmployeeListAdvanced.jsx | Organize data by preference |
| **Filtering** | EmployeeListAdvanced.jsx | Find specific data quickly |
| **CSV Export** | csvExport.js | Download data |
| **Bulk Actions** | EmployeeListAdvanced.jsx | Efficient batch operations |
| **Analytics** | AttendanceAnalytics.jsx | Attendance insights |
| **Reports** | MonthlyReports.jsx | HR summaries |
| **Dark Mode** | ThemeContext.jsx | Eye comfort |
| **Breadcrumbs** | Breadcrumb.jsx | Navigation clarity |
| **Error Handling** | ErrorBoundary.jsx | Crash prevention |
| **Loading States** | Skeletons.jsx | Better UX |

---

## 🎯 Common Code Snippets

### Show Toast Notification
```javascript
import { useToast } from '../context/ToastContext';
const { addToast } = useToast();
addToast('Success!', 'success'); // success, error, warning, info
```

### Validate Employee Form
```javascript
import { validateEmployee } from '../utils/validation';
const validation = validateEmployee(form);
if (!validation.isValid) setErrors(validation.errors);
```

### Export to CSV
```javascript
import { exportToCSV } from '../utils/csvExport';
exportToCSV(employeeData, 'employees.csv');
```

### Confirmation Dialog
```javascript
<ConfirmDialog
  isOpen={open}
  title="Delete?"
  message="Cannot be undone"
  onConfirm={handleDelete}
  onCancel={() => setOpen(false)}
/>
```

### Format Date
```javascript
import { formatDate } from '../utils/dateFormatter';
const formatted = formatDate('2026-02-26'); // Feb 26, 2026
```

---

## 📂 File Structure Quick Map

```
src/
├── components/
│   ├── AdminFeatures
│   │   ├── EmployeeListAdvanced ← Pagination, Sort, Filter, Bulk
│   │   └── AttendanceAnalytics ← Charts, Trends
│   ├── CoreUI
│   │   ├── Toast ← Notifications
│   │   ├── ConfirmDialog ← Confirmations
│   │   └── ErrorBoundary ← Error Handling
│   ├── Pages
│   │   ├── Dashboard ← Overview, Analytics, Reports
│   │   ├── Employees ← Employee Management
│   │   └── Attendance ← Mark & View Attendance
│   └── Utils
│       ├── Breadcrumb ← Navigation
│       ├── ThemeToggle ← Dark Mode
│       └── Skeletons ← Loading States
│
├── context/
│   ├── ToastContext ← Toast System
│   └── ThemeContext ← Dark Mode
│
└── utils/
    ├── validation.js ← Form Validation
    ├── csvExport.js ← CSV Download
    ├── dateFormatter.js ← Date Formatting
    └── activityLog.js ← Activity Tracking
```

---

## 🎨 Styling Quick Reference

### Tailwind Color Classes
```
Slate/Gray: slate-50 to slate-900
Green: green-50 to green-900 (Success)
Red: red-50 to red-900 (Danger)
Blue: blue-50 to blue-900 (Primary)
Yellow: amber-50 to amber-900 (Warning)
```

### Common Classes
```
Padding: p-4, px-6, py-3
Margin: m-4, mx-auto, mb-6
Border: border, border-gray-200, border-2, rounded-lg
Shadow: shadow-lg, shadow-xl
Flex: flex, flex-col, gap-4, items-center, justify-between
Grid: grid, grid-cols-3, gap-6
```

---

## 🔧 API Integration

### Available Functions
```javascript
// Employee Management
getEmployees()           // Get all employees
createEmployee(data)     // Create new employee
deleteEmployee(id)       // Delete employee

// Attendance
getAttendance(empId)     // Get employee attendance
markAttendance(data)     // Mark attendance
```

### Error Handling Pattern
```javascript
try {
  const data = await getEmployees();
} catch (error) {
  addToast(error.message, 'error');
}
```

---

## ✅ Form Validation Rules

| Field | Rules | Example |
|-------|-------|---------|
| full_name | Min 3 chars | "John Doe" |
| email | Valid email format | "john@example.com" |
| phone | 7+ chars | "555-123-4567" |
| department | Required | "Engineering" |
| position | Required | "Developer" |

---

## 🎯 Usage Scenarios

### Scenario 1: Create Employee
1. Click "Add Employee"
2. Fill form (auto-validates)
3. See error messages if invalid
4. Submit - toast confirms success
5. Employee appears in list

### Scenario 2: Export Data
1. Select employees (checkboxes)
2. Click "Export"
3. CSV file downloads
4. Toast shows success

### Scenario 3: View Analytics
1. Go to Dashboard
2. Click "Analytics" tab
3. See attendance trends
4. Review department stats

### Scenario 4: Delete Employee
1. Click delete icon
2. Confirm dialog appears
3. Read warning message
4. Click "Delete" to confirm
5. Toast shows result

---

## 🔒 Error Prevention

### Confirmation Dialog Triggers
- Employee deletion
- Bulk employee deletion
- Destructive operations

### Validation Triggers
- Form submission
- Required field check
- Email format check
- Phone format check

### Error Boundaries Protect
- Dashboard component
- Employee list
- Attendance tracking
- Analytics display

---

## 📊 Data Flow

```
User Action
    ↓
Input Validation
    ↓
Confirmation Dialog? (if destructive)
    ↓
API Call
    ↓
Error? → Toast + Error Handling
    ↓
Success? → Toast + Data Update
    ↓
Component Re-render
```

---

## 🚀 Performance Tips

1. **Use Pagination** - Don't load all data at once
2. **Implement Search** - Filter on client side first
3. **Error Boundaries** - Prevent cascading failures
4. **Lazy Load Analytics** - Load on demand
5. **Use Skeletons** - Better perceived performance

---

## 🎓 Learning Path

1. Start: Read QUICKSTART.md
2. Explore: Review component files
3. Understand: Check PROFESSIONAL_FEATURES.md
4. Implement: Add new features
5. Debug: Use ERROR_HANDLING.md
6. Deploy: Follow deployment checklist

---

## 📞 Need Help?

| Issue | Check |
|-------|-------|
| Toast not showing | ToastProvider wrapping app |
| Validation not working | Import validateEmployee |
| Dark mode stuck | Clear localStorage |
| API errors | Check console for details |
| Styling issues | Check Tailwind classes |
| Pagination not working | Verify data array exists |

---

## 🏆 Pro Tips

1. **Always wrap async operations** in try/catch
2. **Toast every user action** for feedback
3. **Validate before API calls** to reduce errors
4. **Use breadcrumbs** for navigation clarity
5. **Test on mobile** for responsiveness
6. **Use dark mode** when working long hours
7. **Export important data** regularly
8. **Check console** for warnings during development

---

## 📋 Deployment Checklist

- [ ] npm install
- [ ] npm run dev (test locally)
- [ ] All features tested
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Dark mode works
- [ ] Toast notifications functional
- [ ] Validation working
- [ ] CSV export tested
- [ ] Error boundaries active
- [ ] Analytics loading
- [ ] Reports generating

---

## 🔗 Key Imports

```javascript
// Hooks & Context
import { useToast } from '../context/ToastContext';
import { useTheme } from '../context/ThemeContext';

// Components
import Toast from '../components/Toast';
import ConfirmDialog from '../components/ConfirmDialog';
import ErrorBoundary from '../components/ErrorBoundary';
import Breadcrumb from '../components/Breadcrumb';

// Utils
import { validateEmployee } from '../utils/validation';
import { formatDate } from '../utils/dateFormatter';
import { exportToCSV } from '../utils/csvExport';
import { addActivityLog } from '../utils/activityLog';

// API
import { getEmployees, createEmployee, deleteEmployee } from '../api/api';
```

---

## 🎯 Next Steps

1. **Explore** the codebase
2. **Test** all features
3. **Customize** as needed
4. **Deploy** with confidence
5. **Monitor** user feedback
6. **Iterate** on improvements

---

**Quick Reference v2.0.0 | Last Updated: Feb 26, 2026**

*For detailed documentation, see PROFESSIONAL_FEATURES.md*
