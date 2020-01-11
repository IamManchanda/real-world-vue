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
      <div class="field">
        <label>Title</label>
        <input
          v-model="event.title"
          type="text"
          placeholder="Add an event title"
        />
      </div>
      <div class="field">
        <label>Description</label>
        <input
          v-model="event.description"
          type="text"
          placeholder="Add a description"
        />
      </div>
      <h3>Where is your event?</h3>
      <div class="field">
        <label>Location</label>
        <input
          v-model="event.location"
          type="text"
          placeholder="Add a location"
        />
      </div>
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

export default {
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
        const { event } = this;
        await this.$store.dispatch("eventModule/createEvent", { event });
        this.$router.push({
          name: "event-show",
          params: { eventId: this.event.id },
        });
        this.event = this.createFreshEvent();
      } catch (error) {
        console.error(error);
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
