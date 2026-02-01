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
  const res = await fetch(`${BASE_URL}/attendance/${employeeId}`);
  return res.json();
}
