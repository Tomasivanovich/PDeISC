// hooks/useApi.js
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function useApi(tokenKey = "token") {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem(tokenKey);

  const request = async (endpoint, method = "GET", body = null) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: body ? JSON.stringify(body) : null,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Error en la API");

      return data;
    } catch (err) {
      console.error("❌ API error:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    request, // 🔹 ahora lo devolvemos
    get: (endpoint) => request(endpoint, "GET"),
    post: (endpoint, body) => request(endpoint, "POST", body),
    put: (endpoint, body) => request(endpoint, "PUT", body),
    del: (endpoint) => request(endpoint, "DELETE"),
  };
}
