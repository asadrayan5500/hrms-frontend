export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePhoneNumber = (phone) => {
  const regex = /^[\d\s\-\+\(\)]{7,}$/;
  return regex.test(phone);
};

export const validateEmployee = (employee) => {
  const errors = {};

  if (!employee.full_name?.trim()) {
    errors.full_name = 'Full name is required';
  } else if (employee.full_name.trim().length < 3) {
    errors.full_name = 'Full name must be at least 3 characters';
  }

  if (!employee.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(employee.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!employee.phone?.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!validatePhoneNumber(employee.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  if (!employee.department?.trim()) {
    errors.department = 'Department is required';
  }

  if (!employee.position?.trim()) {
    errors.position = 'Position is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
