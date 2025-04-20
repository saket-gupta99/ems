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
    console.error(result.message.errors);
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
  const data = await res.json();
  if (!res.ok) {
    console.log(data.message || "Error logging out!");
    throw new Error(data.message || "Error logging out!");
  }
  return data;
}

export async function resetPassword({ data }) {
  const res = await fetch(`${API_URL}/api/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  const result = await res.json();
  if (!res.ok) {
    console.log(result.message || "Error resetting password!");
    throw new Error(result.message || "Error resetting password!");
  }
  return result;
}

export async function forgotPassword({ data }) {
  const res = await fetch(`${API_URL}/api/forgot-password`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(data),
    credentials: "include",
  });
  const result = await res.json();
  if (!res.ok) {
    console.log(result.message || "Error sending OTP!");
    throw new Error(result.message || "Error sending OTP!");
  }
  return result;
}

export async function deacitvateEmployee({ data }) {
  const res = await fetch(`${API_URL}/api/deactivate-user`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) {
    console.log(result.message || "Error deactivating out!");
    throw new Error(result.message || "Error deactivating out!");
  }
  return result;
}

export async function sendMessage({ data }) {
  const res = await fetch(`${API_URL}/api/send-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) {
    console.log(result.message || "Error sending msg");
    throw new Error(result.message || "Error sending msg");
  }
  return result;
}
