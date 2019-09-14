import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const getEvents = () => apiClient.get("/events");
export const getCurrentEvent = eventId => apiClient.get(`/events/${eventId}`);
