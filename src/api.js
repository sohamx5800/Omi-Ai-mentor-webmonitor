const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
console.log('Using BACKEND_URL:', BACKEND_URL);
export const apiFetch = async (endpoint, options = {}) => {
  console.log('Fetching:', `${BACKEND_URL}${endpoint}`);
  const response = await fetch(`${BACKEND_URL}${endpoint}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  return response.json();
};