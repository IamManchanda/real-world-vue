<template>
  <div>
    <h2>Create an Event</h2>
    <form @submit.prevent="createEvent">
      <label>Select a Category</label>
      <select v-model="event.category">
        <option value disabled>Please Select a Category</option>
        <option v-for="cat in categories" :key="cat">{{ cat }}</option>
      </select>
      <h3>Name & describe your event</h3>
      <BaseInput
        v-model="event.title"
        label="Title"
        type="text"
        class="field"
        placeholder="Add an event title"
      />
      <BaseInput
        v-model="event.description"
        label="Description"
        type="text"
        class="field"
        placeholder="Add a description"
      />
      <h3>Where is your event?</h3>
      <BaseInput
        v-model="event.location"
        label="Location"
        type="text"
        class="field"
        placeholder="Add a location"
      />
      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker v-model="event.date" placeholder="Select a date" />
      </div>
      <div class="field">
        <label>Select a Time</label>
        <select v-model="event.time">
          <option value disabled>Please Select a Time</option>
          <option v-for="time in times" :key="time">{{ time }}</option>
        </select>
      </div>
      <input type="submit" class="button -fill-gradient" value="Submit" />
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Datepicker from "vuejs-datepicker";
import uuid from "uuid";
import NProgress from "nprogress";

export default {
  name: "EventCreate",
  components: {
    Datepicker,
  },
  data() {
    const times = [];
    for (let i = 1; i <= 24; i++) {
      times.push(i + ":00");
    }
    return {
      event: this.createFreshEvent(),
      times,
    };
  },
  computed: {
    ...mapState({
      user: state => state.userModule.user,
      categories: state => state.categories,
    }),
  },
  methods: {
    async createEvent() {
      try {
        NProgress.start();
        const { event } = this;
        await this.$store.dispatch("eventModule/createEvent", { event });
        this.$router.push({
          name: "event-show",
          params: { eventId: this.event.id },
        });
        this.event = this.createFreshEvent();
      } catch (error) {
        console.error(error);
        NProgress.done();
      }
    },
    createFreshEvent() {
      const user = this.$store.state.userModule.user;
      return {
        id: uuid.v4(),
        user: user.name,
        category: "",
        organizer: user.name,
        title: "",
        description: "",
        location: "",
        date: "",
        time: "",
        attendees: [],
      };
    },
  },
};
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
