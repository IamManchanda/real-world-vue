import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export const getEvents = (perPage, page) =>
  api.get(`/events?_limit=${perPage}&_page=${page}`);
export const getCurrentEvent = eventId => api.get(`/events/${eventId}`);
export const postCurrentEvent = event => api.post("/events", event);
