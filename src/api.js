const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
export const apiFetch = async (endpoint, options = {}) => {
  const url = `${BACKEND_URL.replace(/\/+$/, '')}${endpoint}`; // Removes trailing slash from BACKEND_URL
  console.log('Fetching:', url);
  const response = await fetch(url, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  return response.json();
};