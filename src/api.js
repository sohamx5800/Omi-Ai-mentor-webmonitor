const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
export const apiFetch = async (endpoint, options = {}) => {
  const response = await fetch(`${BACKEND_URL}${endpoint}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  return response.json();
};