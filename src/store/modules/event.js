import {
  getEvents,
  getCurrentEvent,
  postCurrentEvent,
} from "@/services/EventService.js";

export const namespaced = true;

export const state = {
  events: [],
  event: {},
};

export const mutations = {
  ADD_CURRENT_EVENT(currentState, { event }) {
    currentState.events.push(event);
  },
  SET_CURRENT_EVENT(currentState, { event }) {
    currentState.event = event;
  },
  SET_EVENTS(currentState, { events }) {
    currentState.events = events;
  },
};

export const actions = {
  async createEvent({ commit, dispatch }, { event }) {
    try {
      await postCurrentEvent(event);
      commit("ADD_CURRENT_EVENT", { event });
      dispatch(
        "notificationModule/addNotification",
        {
          notification: {
            type: "success",
            message: "Your event has been created",
          },
        },
        {
          root: true,
        }
      );
    } catch (error) {
      dispatch(
        "notificationModule/addNotification",
        {
          notification: {
            type: "error",
            message: `There was a problem creating your event ${error.message}`,
          },
        },
        {
          root: true,
        }
      );
      throw new Error(error);
    }
  },
  async fetchEvents({ commit, dispatch }, { perPage, page }) {
    try {
      const { data: events, headers } = await getEvents(perPage, page);
      console.log(`Total Events: ${headers["x-total-count"]}`);
      commit("SET_EVENTS", { events });
    } catch (error) {
      dispatch(
        "notificationModule/addNotification",
        {
          notification: {
            type: "error",
            message: `There was a problem fetching events list : ${error.message}`,
          },
        },
        {
          root: true,
        }
      );
    }
  },
  async fetchCurrentEvent({ commit, getters, dispatch }, { eventId }) {
    const event = getters.getEventById(eventId);
    if (event) {
      commit("SET_CURRENT_EVENT", { event });
    } else {
      try {
        const { data: eventFromApi } = await getCurrentEvent(eventId);
        commit("SET_CURRENT_EVENT", { event: eventFromApi });
      } catch (error) {
        dispatch(
          "notificationModule/addNotification",
          {
            notification: {
              type: "error",
              message: `There was a problem fetching current event : ${error.message}`,
            },
          },
          {
            root: true,
          }
        );
      }
    }
  },
};

export const getters = {
  getEventById: state => eventId =>
    state.events.find(event => event.id == eventId),
};
