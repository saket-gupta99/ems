const API_URL = import.meta.env.VITE_API_BASE_URL;

export async function checkIn({ data }) {
  const res = await fetch(`${API_URL}/api/attendance/checkin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  const result = await res.json();

  if (!res.ok) {
    console.error(result.message || "Signup failed!");
    throw new Error(result.message || "Signup failed!");
  }
  return result;
}

export async function checkOut({ data }) {
  const res = await fetch(`${API_URL}/api/attendance/checkout`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  const result = await res.json();

  if (!res.ok) {
    console.error(result.message || "Signup failed!");
    throw new Error(result.message || "Signup failed!");
  }
  return result;
}

export async function getAttendance() {
  const res = await fetch(`${API_URL}/api/attendance`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  const result = await res.json();

  if (!res.ok) {
    console.error(result.message || "Signup failed!");
    throw new Error(result.message || "Signup failed!");
  }
  return result;
}

export async function setAbsent({ data }) {
  const res = await fetch(`${API_URL}/api/attendance/set-absent`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  const result = await res.json();

  if (!res.ok) {
    console.error(result.message || "failed setting attendance to absent");
    throw new Error(result.message || "failed setting attendance to absent");
  }
  return result;
}
