<template>
  <div>
    <h1>Showing Event #{{ eventId }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    eventId: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style></style>
