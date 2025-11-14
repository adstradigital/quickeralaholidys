import axios from "axios";
import Swal from "sweetalert2";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", // Changed to HTTP
});

// List of public endpoints that don't require authentication
const PUBLIC_ENDPOINTS = [
  'tourism/enquiries/submit/',
  'auth/login/',
  'auth/register/',
  // Add other public endpoints here
];

// ✅ Request Interceptor → Attach token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Response Interceptor → Handle expired session with attractive UI
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error.config?.url || '';
    
    // Check if this is a public endpoint
    const isPublicEndpoint = PUBLIC_ENDPOINTS.some(endpoint => 
      url.includes(endpoint)
    );
    
    // Only handle session expiry for non-public endpoints
    if (!isPublicEndpoint && error.response && (error.response.status === 401 || error.response.status === 403)) {
      localStorage.removeItem("auth_token");

      Swal.fire({
        icon: "warning",
        title: "Session Expired",
        text: "Your session has expired. Please login again to continue.",
        confirmButtonText: "Go to Login",
        confirmButtonColor: "#3085d6",
        allowOutsideClick: false,
      }).then(() => {
        window.location.href = "/quick-userlogin";
      });
    }
    return Promise.reject(error);
  }
);

export default API;