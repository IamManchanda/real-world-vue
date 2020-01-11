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
    <span v-if="page !== 1">|</span>
    <router-link :to="paginationLinkByType('next')" rel="next">
      <span>Next</span>
    </router-link>
  </div>
</template>

<script>
import EventCard from "@/components/EventCard.vue";
import { mapState } from "vuex";

export default {
  components: {
    EventCard,
  },
  data() {
    return {
      perPage: 3,
    };
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1;
    },
    ...mapState({
      user: state => state.userModule.user,
      events: state => state.eventModule.events,
    }),
  },
  created() {
    const { perPage, page } = this;
    this.$store.dispatch("eventModule/fetchEvents", {
      perPage,
      page,
    });
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
