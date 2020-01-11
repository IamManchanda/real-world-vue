<template>
  <div class="notification-bar" :class="notificationTypeClass">
    <p>{{ notification.message }}</p>
  </div>
</template>

<script>
export default {
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  computed: {
    notificationTypeClass() {
      return `-text-${this.notification.type}`;
    },
  },
  mounted() {
    this.timeout = setTimeout(this.destroyNotification, 5000);
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  },
  methods: {
    destroyNotification() {
      this.$store.dispatch("notificationModule/removeNotification", {
        notification: this.notification,
      });
    },
  },
};
</script>

<style scoped>
.notification-bar {
  margin: 1em 0 1em;
}
</style>
