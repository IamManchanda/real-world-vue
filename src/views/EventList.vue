<template>
  <div>
    <h1>Event Listing</h1>
    <router-link :to="eventShow">Show Event #1</router-link>
  </div>
</template>

<script>
const eventShow = {
  name: "event-show",
  params: {
    eventId: 1,
  },
};

export default {
  data() {
    return {
      eventShow,
    };
  },
};
</script>

<style></style>
