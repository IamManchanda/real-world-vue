import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const getEvents = (perPage, page) =>
  apiClient.get(`/events?_limit=${perPage}&_page=${page}`);
export const getCurrentEvent = eventId => apiClient.get(`/events/${eventId}`);
export const postCurrentEvent = event => apiClient.post("/events", event);
