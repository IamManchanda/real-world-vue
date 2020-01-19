import Vue from "vue";
import Router from "vue-router";
import EventList from "@/views/EventList.vue";
import EventShow from "@/views/EventShow.vue";
import EventCreate from "@/views/EventCreate.vue";
import NotFound from "@/views/NotFound.vue";
import NetworkIssue from "@/views/NetworkIssue.vue";
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
      props: true,
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
        try {
          const event = await store.dispatch("eventModule/fetchCurrentEvent", {
            eventId,
          });
          routeTo.params.event = event;
          next();
        } catch (error) {
          if (error.response && error.response.status === 404) {
            next({
              name: "page-not-found-404",
              params: {
                resource: "Event",
              },
            });
          } else {
            next({
              name: "network-issue",
            });
          }
        }
      },
    },
    {
      path: "/page-not-found-404",
      name: "page-not-found-404",
      component: NotFound,
      props: true,
    },
    {
      path: "/network-issue",
      name: "network-issue",
      component: NetworkIssue,
      props: true,
    },
    {
      path: "*",
      redirect: {
        name: "page-not-found-404",
        params: {
          resource: "Page",
        },
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
