import Vue from "vue";
import Vuex from "vuex";
import uuid from "uuid";
import {
  getEvents,
  getCurrentEvent,
  postCurrentEvent,
} from "@/services/EventService.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      id: uuid.v4(),
      name: "Harry Manchanda",
    },
    categories: [
      "sustainability",
      "nature",
      "animal welfare",
      "housing",
      "education",
      "food",
      "community",
    ],
    events: [],
    event: {},
  },
  mutations: {
    ADD_CURRENT_EVENT(currentState, { event }) {
      currentState.events.push(event);
    },
    SET_CURRENT_EVENT(currentState, { event }) {
      currentState.event = event;
    },
    SET_EVENTS(currentState, { events }) {
      currentState.events = events;
    },
  },
  actions: {
    async createEvent({ commit }, { event }) {
      try {
        await postCurrentEvent(event);
        commit("ADD_CURRENT_EVENT", { event });
      } catch (error) {
        console.error(error);
      }
    },
    async fetchEvents({ commit }, { perPage, page }) {
      try {
        const { data: events, headers } = await getEvents(perPage, page);
        console.log(`Total Events: ${headers["x-total-count"]}`);
        commit("SET_EVENTS", { events });
      } catch (error) {
        console.error(error);
      }
    },
    async fetchCurrentEvent({ commit, getters }, { eventId }) {
      try {
        const event = getters.getEventById(eventId);
        if (event) {
          commit("SET_CURRENT_EVENT", { event });
        } else {
          const { data: eventFromApi } = await getCurrentEvent(eventId);
          commit("SET_CURRENT_EVENT", { event: eventFromApi });
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  getters: {
    catLength: state => state.categories.length,
    getEventById: state => eventId =>
      state.events.find(event => event.id == eventId),
  },
});
