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
  },
  mutations: {},
  actions: {},
});
