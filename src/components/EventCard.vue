<template>
  <router-link class="event-link" :to="eventShow(event.id)">
    <div class="event-card -shadow">
      <span class="eyebrow"
        >@{{ event.time }} on {{ event.date | dateFilter }}</span
      >
      <h4 class="title">{{ event.title }}</h4>
      <base-icon name="users">{{ event.attendees.length }} attending</base-icon>
    </div>
  </router-link>
</template>

<script>
const eventShow = eventId => ({
  name: "event-show",
  params: {
    eventId,
  },
});

export default {
  props: {
    event: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      eventShow,
    };
  },
};
</script>

<style scoped>
.event-card {
  padding: 20px;
  margin-bottom: 24px;
  transition: all 0.2s linear;
  cursor: pointer;
}
.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}
.event-card > .title {
  margin: 0;
}

.event-link {
  color: black;
  text-decoration: none;
  font-weight: 100;
}
</style>
