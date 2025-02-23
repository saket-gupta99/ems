const API_URL = import.meta.env.VITE_API_BASE_URL;

export async function applyLeave({ data }) {
  const res = await fetch(`${API_URL}/api/leave/apply`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    console.error(result.message || "apply leave failed!");
    throw new Error(result.message || "apply leave failed!");
  }

  return result;
}

export async function getLeaves() {
  const res = await fetch(`${API_URL}/api/leaves`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  const result = await res.json();

  if (!res.ok) {
    console.error(result.message || "failed getting leaves data");
    throw new Error(result.message || "failed getting leaves data");
  }

  return result;
}

export async function getLeaveById(id) {
  const res = await fetch(`${API_URL}/api/leaves/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  const result = await res.json();

  if (!res.ok) {
    console.error(result.message || "failed getting leave data");
    throw new Error(result.message || "failed getting leave data");
  }

  return result;
}

export async function reviewLeave({ data }) {
  const res = await fetch(`${API_URL}/api/leave/review`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    console.error(result.message || "leave review failed");
    throw new Error(result.message || "leave review failed");
  }

  return result;
}
