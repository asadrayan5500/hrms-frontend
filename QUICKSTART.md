# HRMS Frontend - Quick Start Guide

## Getting Started

### Installation
```bash
npm install
npm run dev
```

### Project Structure Overview

```
HRMS Frontend/
├── src/
│   ├── components/          # All React components
│   ├── context/            # Context providers (Toast, Theme)
│   ├── pages/              # Page components (Dashboard, Employees, Attendance)
│   ├── utils/              # Utility functions (validation, export, formatting)
│   ├── api/                # API integration
│   ├── App.jsx             # Main app component with providers
│   └── main.jsx            # Entry point
├── public/                 # Static assets
├── PROFESSIONAL_FEATURES.md     # Detailed feature documentation
├── IMPLEMENTATION_SUMMARY.md    # Implementation overview
└── README.md               # Original project README
```

---

## Main Features at a Glance

### 1️⃣ Dashboard
- **Location**: `/`
- **Features**: 
  - Overview statistics
  - Attendance analytics
  - Monthly reports
  - Department-wise trends

### 2️⃣ Employees
- **Location**: `/employees`
- **Features**:
  - Advanced list with pagination
  - Multi-column sorting
  - Department filtering
  - Search by name/ID/email
  - Bulk operations (delete, export)
  - Employee form with validation

### 3️⃣ Attendance
- **Location**: `/attendance`
- **Features**:
  - Mark attendance for employees
  - View all employees' attendance
  - Filter by employee
  - Status tracking (Present/Absent)

---

## Using Key Features

### Toast Notifications
```jsx
import { useToast } from '../context/ToastContext';

function MyComponent() {
  const { addToast } = useToast();

  const handleAction = async () => {
    try {
      // Do something
      addToast('Success!', 'success');
    } catch (error) {
      addToast('Error occurred', 'error');
    }
  };

  return <button onClick={handleAction}>Action</button>;
}
```

### Form Validation
```jsx
import { validateEmployee } from '../utils/validation';

const handleSubmit = (e) => {
  e.preventDefault();
  const validation = validateEmployee(form);
  
  if (!validation.isValid) {
    setErrors(validation.errors);  // Show errors
    return;
  }
  
  // Submit form
  await createEmployee(form);
};
```

### CSV Export
```jsx
import { exportToCSV } from '../utils/csvExport';

const handleExport = () => {
  exportToCSV(employees, 'employees_list.csv');
};
```

### Confirmation Dialog
```jsx
<ConfirmDialog
  isOpen={isDialogOpen}
  title="Delete Employee?"
  message={`Delete ${employeeName}? This cannot be undone.`}
  onConfirm={handleConfirmDelete}
  onCancel={() => setIsDialogOpen(false)}
  isDangerous
/>
```

---

## UI Components

### Icons Used
- Heroicons (integrated via inline SVG)
- Professional, minimalist design
- Dark mode compatible

### Color Palette
- **Primary**: Slate/Gray (#1e293b - #475569)
- **Success**: Green (#16a34a - #22c55e)
- **Danger**: Red (#dc2626 - #ef4444)
- **Warning**: Yellow/Amber (#ca8a04 - #f59e0b)
- **Info**: Blue (#2563eb - #3b82f6)

---

## Common Tasks

### Add a New Feature
1. Create component in `src/components/`
2. Use `useToast()` for notifications
3. Implement error handling with `addToast(msg, 'error')`
4. Add to appropriate page component
5. Test with different states (loading, error, empty)

### Create a New Page
1. Create file in `src/pages/`
2. Add route to `App.jsx`
3. Add navigation link to `Sidebar.jsx`
4. Use `Breadcrumb` component for navigation
5. Wrap in `ErrorBoundary` for safety

### Add Form Validation
1. Add validation rules to `src/utils/validation.js`
2. Import and use in form component
3. Show errors with visual feedback
4. Test with invalid inputs

### Export Data
1. Prepare array of objects
2. Import `exportToCSV` from utils
3. Call with data and filename
4. Toast notification on success

---

## Development Tips

### Hot Module Replacement
- Changes are reflected instantly with Vite
- Refresh page if state issues occur

### Component Debugging
- Check browser console for errors
- Use React DevTools extension
- Verify toast notifications display

### Performance
- Use pagination for large lists
- Implement skeletons for loading states
- Avoid rendering all data at once
- Use Error Boundaries to prevent crashes

### Styling
- Uses Tailwind CSS 4.1.18
- All utilities are available
- Dark mode classes (dark:) available
- Custom colors in theme palette

---

## API Integration

### Available Endpoints
```javascript
import { 
  getEmployees, 
  createEmployee, 
  deleteEmployee, 
  getAttendance, 
  markAttendance 
} from '../api/api';
```

### Error Handling Pattern
```javascript
try {
  const data = await getEmployees();
  // Use data
} catch (error) {
  addToast(error.message || 'Failed to load', 'error');
}
```

---

## Performance Optimization

- **Pagination**: Limits data per page
- **Lazy Loading**: Analytics load on demand
- **Memoization**: Prevent unnecessary re-renders
- **Error Boundaries**: Isolate component failures
- **Skeletons**: Better perceived performance

---

## Troubleshooting

### Toast Not Showing?
- Ensure `ToastProvider` wraps the app
- Check `Toast.jsx` is imported in `App.jsx`
- Verify `useToast()` is called in component

### Validation Not Working?
- Import `validateEmployee` from utils
- Call validation before submission
- Display errors from validation result

### Dark Mode Not Working?
- Check `ThemeProvider` wraps app
- Verify `ThemeToggle` is in navbar
- Clear localStorage if stuck

### Data Not Displaying?
- Check network tab for API calls
- Verify API endpoints are correct
- Look for error messages in console

---

## Browser DevTools Tips

1. **React DevTools**
   - Inspect component hierarchy
   - Check props and state
   - Trace re-renders

2. **Network Tab**
   - Monitor API calls
   - Check request/response data
   - Verify status codes

3. **Console**
   - Look for error messages
   - Check toast notifications
   - Debug validation issues

4. **Storage**
   - Check localStorage for theme
   - Verify persisted preferences

---

## Production Checklist

- [ ] All features tested in Chrome, Firefox, Safari
- [ ] Mobile responsiveness verified
- [ ] Dark mode works correctly
- [ ] Error boundaries handling errors
- [ ] Toast notifications working
- [ ] Validation functioning properly
- [ ] CSV export generating files
- [ ] Pagination working smoothly
- [ ] Sorting and filtering functional
- [ ] API calls error handling in place
- [ ] Loading states displaying
- [ ] Empty states showing correctly

---

## Resources

- **React Documentation**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Vite Guide**: https://vitejs.dev
- **React Router**: https://reactrouter.com

---

## Support

For questions or issues:
1. Check PROFESSIONAL_FEATURES.md for feature details
2. Review IMPLEMENTATION_SUMMARY.md for architecture
3. Look at component comments for usage
4. Check browser console for errors

---

**Version**: 2.0.0  
**Last Updated**: February 26, 2026  
**Status**: Production Ready ✅
