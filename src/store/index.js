import Vue from "vue";
import Vuex from "vuex";
import * as userModule from "./modules/user";
import * as eventModule from "./modules/event";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    userModule,
    eventModule,
  },
  state: {
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
  getters: {
    catLength: state => state.categories.length,
  },
});
