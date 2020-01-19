import axios from "axios";
import NProgress from "nprogress";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(config => {
  NProgress.start();
  return config;
});

api.interceptors.response.use(response => {
  NProgress.done();
  return response;
});

export const getEvents = (perPage, page) =>
  api.get(`/events?_limit=${perPage}&_page=${page}`);
export const getCurrentEvent = eventId => api.get(`/events/${eventId}`);
export const postCurrentEvent = event => api.post("/events", event);
