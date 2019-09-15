<template>
  <div>
    <h2>Create an Event, {{ user.name }}</h2>
    <p>This event was created by Id: {{ user.id }}</p>
    <ul>
      <li v-for="category in categories" :key="category">{{ category }}</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["user", "categories"]),
  },
};
</script>

<style></style>
