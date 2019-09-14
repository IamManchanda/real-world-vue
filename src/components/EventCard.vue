<template>
  <router-link class="event-link" :to="eventShow(event.id)">
    <div class="event-card -shadow">
      <span class="eyebrow">@{{ event.time }} on {{ event.date }}</span>
      <h4 class="title">{{ event.title }}</h4>
      <span>{{ event.attendees.length }} attending</span>
    </div>
  </router-link>
</template>

<script>
import uuid from "uuid";

const eventShow = eventId => ({
  name: "event-show",
  params: {
    eventId,
  },
});

export default {
  data() {
    return {
      eventShow,
      event: {
        id: uuid.v4(),
        title: "Beach Cleanup",
        date: "Sat Sep 14 2019",
        time: "",
        attendees: [
          {
            id: uuid.v4(),
            name: "MS Dhoni",
          },
          {
            id: uuid.v4(),
            name: "Virat Kohli",
          },
        ],
      },
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
