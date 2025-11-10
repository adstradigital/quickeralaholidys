import axios from "axios";
import Swal from "sweetalert2";

const API = axios.create({
  baseURL: "https://rushikeshtourism.com/rushikesh_api/api/",
});

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
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
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
