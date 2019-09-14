<template>
  <div>
    <h1>Event Listing</h1>
    <event-card v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script>
import EventCard from "@/components/EventCard.vue";
import { getEvents } from "@/services/EventService.js";

export default {
  components: {
    EventCard,
  },
  data() {
    return {
      events: [],
    };
  },
  created() {
    (async () => {
      try {
        const { data: events } = await getEvents();
        this.events = events;
      } catch (error) {
        console.error(error);
      }
    })();
  },
};
</script>

<style></style>
