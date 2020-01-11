import Vue from "vue";
import Vuex from "vuex";
import * as userModule from "./modules/user";
import * as eventModule from "./modules/event";
import * as notificationModule from "./modules/notification";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    userModule,
    eventModule,
    notificationModule,
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
});
