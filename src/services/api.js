import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Interceptor to add Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const adminLogin = (credentials) => {
  return api.post(
    "auth/admin-login",
    {
      username: credentials.username,
      password: credentials.password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};

export const getEmployees = () => api.get("admin/employees");
export const createEmployee = (data) => api.post("admin/employees", data);
export const updateEmployee = (id, data) => api.put(`admin/employees/${id}`, data);
export const deleteEmployee = (id) => api.delete(`/admin/employees/${id}`);
export const markAttendance = (data) => api.post("admin/attendance", data);
export const getAttendance = (id) => api.get(`/admin/attendance/${id}`);
export const getPresentToday = () => api.get("/admin/attendance/present-today");

export default api;
