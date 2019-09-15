<template>
  <div>
    <h2>Create an Event, {{ user.name }}</h2>
    <p>This event was created by Id: {{ user.id }}</p>
    <p>
      <strong>Categories:</strong>
    </p>
    <ul>
      <li v-for="category in categories" :key="category">{{ category }}</li>
    </ul>
    <p>
      <strong>Total:</strong>
      {{ catLength }} categories
    </p>
    <p>
      <strong>Get Event 1:</strong>
      {{ getEventById(1) }}
    </p>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["catLength", "getEventById"]),
    ...mapState(["user", "categories"]),
  },
};
</script>

<style></style>
