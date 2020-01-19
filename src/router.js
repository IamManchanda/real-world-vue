import Vue from "vue";
import Router from "vue-router";
import EventList from "@/views/EventList.vue";
import EventShow from "@/views/EventShow.vue";
import EventCreate from "@/views/EventCreate.vue";
import NProgress from "nprogress";
import store from "@/store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "event-list",
      component: EventList,
    },
    {
      path: "/event/create",
      name: "event-create",
      component: EventCreate,
    },
    {
      path: "/event/:eventId",
      name: "event-show",
      component: EventShow,
      props: true,
      async beforeEnter(routeTo, routeFrom, next) {
        const { eventId } = routeTo.params;
        const event = await store.dispatch("eventModule/fetchCurrentEvent", {
          eventId,
        });
        routeTo.params.event = event;
        next();
      },
    },
  ],
});

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
