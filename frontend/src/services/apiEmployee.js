const API_URL = import.meta.env.VITE_API_BASE_URL;

export async function getAllEmployees() {
  const res = await fetch(`${API_URL}/api/profile/all`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) {
    console.error(data.message || "Error updating user's general data!");
    throw new Error(data.message || "Error updating user's general data!");
  }
  return data;
}

export async function getUserGeneralData({ data }) {
  const res = await fetch(`${API_URL}/api/profile/general`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) {
    console.error(result.message || "Error updating user's general data!");
    throw new Error(result.message || "Error updating user's general data!");
  }
  return result;
}

export async function getUserPersonalData({ data }) {
  const res = await fetch(`${API_URL}/api/profile/personal`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) {
    console.error(result.message.errors || "Error updating user's personal data!");
    throw new Error(result.message.errors || "Error updating user's personal data!");
  }
  return result;
}

export async function getBankDetails({ data }) {
  const res = await fetch(`${API_URL}/api/profile/bank-details`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) {
    console.error(result.message || "Error adding bank details!");
    throw new Error(result.message || "Error adding bank details!");
  }
  return result;
}

export async function getUserContactData({ data }) {
  const res = await fetch(`${API_URL}/api/profile/contact`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) {
    console.error(result.message.errors || "Error updating user's contact data!");
    throw new Error(result.message.errors || "Error updating user's contact data!");
  }
  return result;
}

export async function uploadFile({ data }) {
  const res = await fetch(`${API_URL}/api/upload`, {
    method: "POST",
    //The browser automatically sets the Content-Type with the correct boundary when using FormData
    // headers: { "Content-Type": "multipart/form-data" },
    credentials: "include",
    body: data, //no need to stringify into JSON as there'd be file
  });

  const result = await res.json();
  if (!res.ok) {
    console.error(result.message || "Error uploading file");
    throw new Error(result.message || "Error uploading file");
  }
  return result;
}
