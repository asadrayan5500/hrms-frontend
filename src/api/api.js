const BASE_URL = "https://hrms-backend-q2l1.onrender.com";

export async function getEmployees() {
  const res = await fetch(`${BASE_URL}/employees`);
  return res.json();
}

export async function createEmployee(data) {
  const res = await fetch(`${BASE_URL}/employees`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Failed to create employee");
  }
}

export async function deleteEmployee(id) {
  await fetch(`${BASE_URL}/employees/${id}`, { method: "DELETE" });
}

export async function markAttendance(data) {
  const res = await fetch(`${BASE_URL}/attendance`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Attendance error");
  }
}

export async function getAttendance(employeeId) {
  if (!employeeId) {
    throw new Error("Employee ID is required");
  }
  
  const url = `${BASE_URL}/attendance/${employeeId}`;
  console.log("Fetching attendance from:", url);
  
  try {
    const res = await fetch(url);
    
    if (!res.ok) {
      console.error("Attendance fetch error:", res.status, res.statusText);
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || `HTTP ${res.status}: Failed to get attendance`);
    }
    
    const data = await res.json();
    console.log("Attendance data received:", data);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
