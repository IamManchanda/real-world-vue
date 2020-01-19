<template>
  <div>
    <h2 class="-text-error">Ooops, Error 404!</h2>
    <h3>
      The {{ resource }} you are looking for is not found. Error Code: 404
    </h3>
    <router-link :to="backToHome">Back to Home Page</router-link>
  </div>
</template>

<script>
export default {
  props: {
    resource: {
      type: String,
      default: "Page",
    },
  },
  computed: {
    backToHome() {
      return {
        name: "event-list",
      };
    },
  },
};
</script>

<style scoped></style>
