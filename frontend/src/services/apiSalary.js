const API_URL = import.meta.env.VITE_API_BASE_URL;

export async function addSalaryData({ data }) {
  const res = await fetch(`${API_URL}/api/add-salary`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    console.error(result.message || "failed to add salary data");
    throw new Error(result.message || "failed to add salary data");
  }

  return result;
}

export async function getSalaryData() {
  const res = await fetch(`${API_URL}/api/salary`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  const result = await res.json();

  if (!res.ok) {
    console.error(result.message || "failed to fetch salary data");
    throw new Error(result.message || "failed to fetch salary data");
  }

  return result;
}

export async function getSalarySlip({ data }) {
  try {
    const res = await fetch(`${API_URL}/api/salary-slip`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to generate payslip");
    }

    // Check if we received a PDF
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/pdf")) {
      throw new Error("Received invalid response format");
    }

    // Create a blob from the PDF data
    const blob = await res.blob();

    // Create a URL for the blob
    const url = window.URL.createObjectURL(blob);

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = url;
    link.download = `payslip-${data.employeeId}-${data.payrollMonth}.pdf`;

    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up
    window.URL.revokeObjectURL(url);

    return true;
  } catch (error) {
    console.error("Download error:", error);
    throw error;
  }
}
