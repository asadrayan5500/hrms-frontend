# API Error Handling & Best Practices

## Overview
This document outlines the error handling patterns and best practices used throughout the HRMS Frontend application.

---

## Error Handling Strategy

### Three-Layer Error Handling
1. **Component Level** - Handle errors in try/catch
2. **User Level** - Show friendly messages via Toast
3. **System Level** - Error Boundaries catch unexpected crashes

---

## Error Handling Patterns

### Pattern 1: Async/Await with Try/Catch
```javascript
async function loadEmployees() {
  try {
    const data = await getEmployees();
    setEmployees(data);
    addToast('Employees loaded successfully', 'success');
  } catch (error) {
    const message = error.message || 'Failed to load employees';
    addToast(message, 'error');
    console.error('Load error:', error);
  }
}
```

### Pattern 2: Form Submission Errors
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  
  try {
    // Validate first
    const validation = validateEmployee(form);
    if (!validation.isValid) {
      setErrors(validation.errors);
      addToast('Please fix the errors below', 'warning');
      return;
    }

    // Submit
    await createEmployee(form);
    addToast('Employee created successfully!', 'success');
    resetForm();
  } catch (error) {
    addToast(error.message || 'Failed to create employee', 'error');
  } finally {
    setIsLoading(false);
  }
};
```

### Pattern 3: Bulk Operations with Error Recovery
```javascript
const handleBulkDelete = async () => {
  let successCount = 0;
  let failureCount = 0;

  for (const id of selectedEmployees) {
    try {
      await deleteEmployee(id);
      successCount++;
    } catch (error) {
      failureCount++;
      console.error(`Failed to delete ${id}:`, error);
    }
  }

  if (successCount > 0) {
    addToast(`${successCount} employees deleted`, 'success');
  }
  if (failureCount > 0) {
    addToast(`${failureCount} employees failed to delete`, 'error');
  }

  reloadEmployees();
};
```

---

## Common Error Types

### 1. Network Errors
```javascript
// When API is unreachable
catch (error) {
  if (!navigator.onLine) {
    addToast('No internet connection', 'error');
  } else {
    addToast('Network error. Please try again.', 'error');
  }
}
```

### 2. Validation Errors
```javascript
// Client-side validation
const validation = validateEmployee(form);
if (!validation.isValid) {
  setErrors(validation.errors);
  addToast('Please correct the errors', 'warning');
}
```

### 3. Server Errors
```javascript
// Server returned error
catch (error) {
  if (error.response?.status === 409) {
    addToast('This employee already exists', 'error');
  } else if (error.response?.status === 400) {
    addToast('Invalid data submitted', 'error');
  } else {
    addToast('Server error. Please try again later.', 'error');
  }
}
```

### 4. Authentication Errors
```javascript
// Unauthorized access
catch (error) {
  if (error.response?.status === 401) {
    addToast('Session expired. Please login again.', 'error');
    window.location.href = '/login';
  }
}
```

---

## User-Friendly Error Messages

### ❌ Don't Do This
```javascript
// Bad: Technical jargon
addToast('Error: ECONNREFUSED 127.0.0.1:3000', 'error');
addToast('TypeError: Cannot read property of undefined', 'error');
addToast('500 Internal Server Error', 'error');
```

### ✅ Do This Instead
```javascript
// Good: Clear, actionable messages
addToast('Unable to connect. Check your internet and try again.', 'error');
addToast('Please fill all required fields correctly.', 'error');
addToast('Something went wrong. Our team has been notified.', 'error');
```

---

## Error Boundary Usage

### Protected Route
```javascript
<ErrorBoundary>
  <EmployeeListAdvanced />
</ErrorBoundary>
```

### Full App Protection
```javascript
export default function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <ThemeProvider>
          {/* App routes */}
        </ThemeProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
}
```

### Custom Error Fallback
```javascript
<ErrorBoundary>
  <div>
    <p>Something went wrong loading this component</p>
    <button onClick={() => window.location.reload()}>Refresh</button>
  </div>
</ErrorBoundary>
```

---

## Validation Error Handling

### Complete Form Validation
```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  
  // Clear previous errors
  setErrors({});
  
  // Validate
  const validation = validateEmployee(form);
  
  if (!validation.isValid) {
    // Set error state
    setErrors(validation.errors);
    
    // Mark all fields as touched
    setTouched({
      full_name: true,
      email: true,
      phone: true,
      department: true,
      position: true,
    });
    
    // Show toast
    addToast('Please correct the errors below', 'warning');
    return;
  }
  
  // Safe to submit
  submitForm();
};
```

### Field-Level Error Display
```javascript
<input
  name="email"
  value={form.email}
  onChange={handleChange}
  onBlur={() => handleBlur('email')}
  className={`
    w-full px-4 py-3 border-2 rounded-lg
    ${
      touched.email && errors.email
        ? 'border-red-500 focus:ring-red-200'
        : 'border-gray-200 focus:ring-blue-200'
    }
  `}
/>
{touched.email && errors.email && (
  <p className="text-red-600 text-xs mt-1">
    {errors.email}
  </p>
)}
```

---

## API Error Response Handling

### Standard Error Response Format
```javascript
{
  "error": true,
  "message": "User not found",
  "status": 404,
  "details": {
    "field": "employee_id",
    "value": "EMP123"
  }
}
```

### Handling Different Status Codes
```javascript
catch (error) {
  const status = error.response?.status;
  const message = error.response?.data?.message;

  switch (status) {
    case 400:
      addToast(message || 'Invalid request data', 'error');
      break;
    case 401:
      addToast('Please login again', 'error');
      redirectToLogin();
      break;
    case 403:
      addToast('You do not have permission for this action', 'error');
      break;
    case 404:
      addToast('Resource not found', 'error');
      break;
    case 409:
      addToast(message || 'This item already exists', 'error');
      break;
    case 500:
      addToast('Server error. Please try again later.', 'error');
      break;
    default:
      addToast(message || 'An error occurred', 'error');
  }
}
```

---

## Loading States

### Complete Flow with Error Handling
```javascript
const [data, setData] = useState(null);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);

async function fetchData() {
  setIsLoading(true);
  setError(null);

  try {
    const result = await getEmployees();
    setData(result);
    addToast('Data loaded', 'success');
  } catch (error) {
    setError(error.message);
    addToast(error.message, 'error');
  } finally {
    setIsLoading(false);
  }
}

// Render based on state
if (isLoading) return <SkeletonLoader />;
if (error) return <ErrorMessage error={error} />;
if (!data) return <EmptyState />;
return <DataDisplay data={data} />;
```

---

## Retry Logic

### Automatic Retry with Backoff
```javascript
async function fetchWithRetry(
  fetchFn,
  maxRetries = 3,
  delayMs = 1000
) {
  let lastError;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fetchFn();
    } catch (error) {
      lastError = error;
      if (i < maxRetries - 1) {
        await new Promise(resolve => 
          setTimeout(resolve, delayMs * (i + 1))
        );
      }
    }
  }

  throw lastError;
}

// Usage
try {
  const data = await fetchWithRetry(() => getEmployees());
  setEmployees(data);
} catch (error) {
  addToast('Failed to load employees after retries', 'error');
}
```

---

## Error Logging

### Development vs Production
```javascript
function logError(error, context) {
  if (process.env.NODE_ENV === 'development') {
    console.error(`Error in ${context}:`, error);
  } else {
    // Send to error tracking service
    // Sentry.captureException(error, { tags: { context } });
  }
}

// Usage
try {
  await createEmployee(form);
} catch (error) {
  logError(error, 'createEmployee');
  addToast('Failed to create employee', 'error');
}
```

---

## Toast Notification Patterns

### Success Messages
```javascript
// Don't be too verbose
addToast('Employee created', 'success');

// Include action if helpful
addToast('5 employees deleted successfully', 'success');
```

### Error Messages
```javascript
// Be specific
addToast('Email format is invalid', 'error');

// Suggest action
addToast('Email already in use. Try a different one.', 'error');
```

### Warning Messages
```javascript
// Use for risky but recoverable situations
addToast('No employees selected for export', 'warning');
```

### Info Messages
```javascript
// Use for informational updates
addToast('Syncing data...', 'info');
```

---

## Best Practices Summary

### ✅ Do's
- Use try/catch for async operations
- Show user-friendly error messages
- Validate data before submission
- Wrap components in Error Boundaries
- Log errors for debugging
- Use toast for all feedback
- Handle loading and empty states
- Provide error recovery options

### ❌ Don'ts
- Show technical error messages to users
- Silently fail without notifying user
- Throw errors without catching them
- Show raw API error responses
- Forget to set isLoading to false
- Leave console errors unchecked
- Use console.log for errors (use proper logging)
- Block user input during loading indefinitely

---

## Testing Error Scenarios

### Test Cases to Cover
1. Network disconnection
2. Invalid form input
3. Duplicate data submission
4. Server error (500)
5. Unauthorized access (401)
6. Not found (404)
7. Timeout after waiting
8. Component crash scenarios
9. Missing required fields
10. Unexpected data format

---

## Conclusion

Proper error handling is critical for professional applications. This guide provides patterns and best practices to handle errors gracefully while maintaining a positive user experience.

Remember: **The user should never see a technical error message.**

---

**Last Updated**: February 26, 2026  
**Version**: 2.0.0
