import axios from "axios";

const BASE_URL = "http://localhost:3015/api";

// Create base Axios instance
export const api = axios.create({
  baseURL: BASE_URL,
});

// ✅ Set token dynamically for authorized requests
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// ====== USER API CALLS ======

// ✅ Register user (with image upload)
export const register = async (formData) => {
  const response = await api.post("/register", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data; // contains user + token
};

// ✅ Login user (JSON)
export const login = async (formData) => {
  const response = await api.post("/login", formData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

// ✅ Get user profile (protected)
export const getUserProfile = async () => {
  const response = await api.get("/usergetprofile");
  return response.data;
};

// ✅ Update user profile
export const updateUserProfile = async (profileData) => {
  const response = await api.put("/updateuserprofile", profileData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

// ✅ Save personal info
export const savePersonalInfo = async (personalData) => {
  const response = await api.post("/savepersonalinfo", personalData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};
// ✅ Get personal info
export const getPersonalInfo = async () => {
  const response = await api.get("/getpersonalinfo"
  );
  return response.data;
}
// ✅ Update personal info
export const updatePersonalInfo = async (personalData) => {
  const response = await api.put("/updatepersonalinfo", personalData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};
export const postresume = async (formData) => {
  const response = await api.post("/postresume", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}
export const getResumes = async () => {
  const response = await api.get("/getresumes");
  return response.data;
}