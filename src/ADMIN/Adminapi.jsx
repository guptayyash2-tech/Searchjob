import axios from "axios";

const BASE_URL = "http://localhost:3015/admin";

// Create Axios instance
export const admin = axios.create({
  baseURL: BASE_URL,
});

// ✅ Dynamically set Authorization header for protected routes
export const setAuthToken = (token) => {
  if (token) {
    admin.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete admin.defaults.headers.common["Authorization"];
  }
};

// Centralized error handler
const handleRequest = async (apiCall) => {
  try {
    const response = await apiCall();
    return response.data;
  } catch (error) {
    if (error.response && error.response.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message || "Server Error");
    }
  }
};

// ====== ADMIN API CALLS ======

// Register admin (with optional image upload)
export const adminRegister = (formData) =>
  handleRequest(() =>
    admin.post("/adminregister", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  );

// Login admin
export const adminLogin = (credentials) =>
  handleRequest(() => admin.post("/adminlogin", credentials));

// Get admin profile (protected)
export const getAdminProfile = async () => {
  const token = localStorage.getItem("token");
  if (token) setAuthToken(token); // ✅ ensure token before call
  return handleRequest(() => admin.get("/admingetprofile"));
};

// Update admin profile (protected)
export const updateadminProfile = async (profileData) => {
  const token = localStorage.getItem("token");
  if (token) setAuthToken(token); // ✅ ensure token before call

  return handleRequest(() =>
    admin.put("/adminupdateprofile", profileData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  );
};
