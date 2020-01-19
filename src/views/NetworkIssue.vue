<template>
  <div>
    <h2 class="-text-error">Ooops, Network Issue!</h2>
    <h3>
      It looks like either you or us are facing a network issue. Your request
      couldn't suceed. Please click the back button and try again.
    </h3>
    <router-link :to="backToHome">Back to Home Page</router-link>
  </div>
</template>

<script>
export default {
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
