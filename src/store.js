import Vue from "vue";
import Vuex from "vuex";
import uuid from "uuid";

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
    events: [
      { id: 1, text: "...", organizer: "..." },
      { id: 2, text: "...", organizer: "..." },
      { id: 3, text: "...", organizer: "..." },
      { id: 4, text: "...", organizer: "..." },
    ],
  },
  mutations: {},
  actions: {},
  getters: {
    catLength: state => state.categories.length,
    getEventById: state => eventId =>
      state.events.find(event => event.id == eventId),
  },
});
