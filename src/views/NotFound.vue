<template>
  <div>
    <h2 class="-text-error">Ooops, Error 404!</h2>
    <h3>
      The {{ resource }} you are looking for is not found. Error Code: 404!
      Please click the back button to go back to the Home page of the App.
    </h3>
    <router-link :to="backToHome">Back to Home Page</router-link>
  </div>
</template>

<script>
export default {
  name: "NotFound",
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
