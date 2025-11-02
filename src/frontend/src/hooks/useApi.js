import { useAuth } from "@clerk/clerk-react";

export const useApi = () => {
  const { getToken } = useAuth();
  
  // Your backend is on port 5000, and routes are at the root
  // REMOVED the "/api" prefix
  const API_URL = 'http://localhost:5000'; 

  const makeRequest = async (endpoint, options = {}) => {
    const token = await getToken(); 

    const defaultHeaders = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`, 
    };

    // This will now correctly call http://localhost:5000/listings
    const response = await fetch(`${API_URL}/${endpoint}`, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error || "An API error occurred");
    }

    return response.json();
  };

  return { makeRequest };
};