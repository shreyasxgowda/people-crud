import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

export const getPeople = () => api.get("/people").then((r) => r.data);
export const getPerson = (id) => api.get(`/people/${id}`).then((r) => r.data);
export const createPerson = (payload) => api.post("/people", payload).then((r) => r.data);
export const updatePerson = (id, payload) => api.put(`/people/${id}`, payload);
export const deletePerson = (id) => api.delete(`/people/${id}`);