import validator from "validator";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export async function signup({ data }) {
  const res = await fetch(`${API_URL}/api/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    console.error(result.message);
    throw new Error(result.message);
  }

  return result;
}

export async function register({ data }) {
  const res = await fetch(`${API_URL}/api/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    console.error(result.message || "registeration failed");
    throw new Error(result.message || "registeration failed");
  }

  return result;
}

export async function verifyOTP({ data }) {
  const res = await fetch(`${API_URL}/api/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    console.error(result.message || "verification failed");
    throw new Error(result.message || "verification failed");
  }

  return result;
}

export async function setPassword({ data }) {
  const res = await fetch(`${API_URL}/api/set-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    console.error(result.message || "setting password failed");
    throw new Error(result.message || "setting password failed");
  }

  return result;
}

export async function login({ email, password }) {
  let loginData;
  if (validator.isEmail(email)) {
    loginData = { email, password };
  } else {
    loginData = { employeeId: email, password };
  }

  const res = await fetch(`${API_URL}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginData),
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    console.error(data.message || "Login failed!");
    throw new Error(data.message || "Login failed!");
  }

  return data;
}

export async function getCurrentUser() {
  const res = await fetch(`${API_URL}/api/profile`, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) {
    console.error(data.message || "User not found!");
    throw new Error(data.message || "User not found!");
  }
  return data.user || data;
}

export async function logout() {
  const res = await fetch(`${API_URL}/api/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  const data = res.json();
  if (!res.ok) {
    console.log(data.message || "Error logging out!");
    throw new Error(data.message || "Error logging out!");
  }
  return data;
}
