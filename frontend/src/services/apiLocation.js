const API_URL = import.meta.env.VITE_API_BASE_URL;

export async function addLocation({ data }) {
  const res = await fetch(`${API_URL}/api/add-location`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  const result = await res.json();

  if (!res.ok) {
    console.error(result.message);
    throw new Error(result.message);
  }
  return result;
}

export async function removeLocation(id) {
    const res = await fetch(`${API_URL}/api/remove-location/${id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
    });

    const result = await res.json();

    if (!res.ok) {
      console.error(result.message);
      throw new Error(result.message);
    }
    return result;
}

export async function editEmployeeLocation({data}) {
    const res = await fetch(`${API_URL}/api/location/edit-employee`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      const result = await res.json();
    
      if (!res.ok) {
        console.error(result.message);
        throw new Error(result.message);
      }
      return result;
}

export async function getLocations() {
    const res = await fetch(`${API_URL}/api/get-locations`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const result = await res.json();
    
      if (!res.ok) {
        console.error(result.message);
        throw new Error(result.message);
      }
      return result;
}