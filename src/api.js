export const apiFetch = async (endpoint, options = {}) => {
    const response = await fetch(`http://localhost:8000${endpoint}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...options.headers },
    });
    return response.json();
  };