<template>
  <div>
    <h3>Event Listing for {{ user.name }}</h3>
    <event-card v-for="event in events" :key="event.id" :event="event" />
    <router-link
      v-if="page !== 1"
      :to="paginationLinkByType('prev')"
      rel="prev"
    >
      <span>Prev</span>
    </router-link>
    <span v-if="page !== 1 && hasNextPage">|</span>
    <router-link
      v-if="hasNextPage"
      :to="paginationLinkByType('next')"
      rel="next"
    >
      <span>Next</span>
    </router-link>
  </div>
</template>

<script>
import EventCard from "@/components/EventCard.vue";
import store from "@/store";
import { mapState } from "vuex";

const getPageEvents = async (routeTo, next) => {
  const page = parseInt(routeTo.query.page) || 1;
  await store.dispatch("eventModule/fetchEvents", {
    page,
  });
  routeTo.params.page = page;
  next();
};

export default {
  name: "EventList",
  components: {
    EventCard,
  },
  props: {
    page: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapState({
      user: state => state.userModule.user,
      events: state => state.eventModule.events,
      eventsTotal: state => state.eventModule.eventsTotal,
      perPage: state => state.eventModule.perPage,
    }),
    hasNextPage() {
      return this.eventsTotal > this.page * this.perPage;
    },
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next);
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next);
  },
  methods: {
    paginationLinkByType(type) {
      let page = 1;
      if (type === "prev") {
        page = this.page - 1;
      } else if (type === "next") {
        page = this.page + 1;
      }
      return {
        name: "event-list",
        query: {
          page,
        },
      };
    },
  },
};
</script>

<style></style>
