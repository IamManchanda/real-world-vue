<template>
  <div>
    <h2>Create an Event</h2>
    <form @submit.prevent="createEvent">
      <BaseSelect
        v-model="event.category"
        label="Select a Category"
        :options="categories"
        placeholder="Please Select a Category"
        class="field"
      />
      <h3>Name & describe your event</h3>
      <BaseInput
        v-model="event.title"
        type="text"
        label="Title"
        placeholder="Add an event title"
        class="field"
      />
      <BaseInput
        v-model="event.description"
        type="text"
        label="Description"
        placeholder="Add a description"
        class="field"
      />
      <h3>Where is your event?</h3>
      <BaseInput
        v-model="event.location"
        type="text"
        label="Location"
        placeholder="Add a location"
        class="field"
      />
      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker v-model="event.date" placeholder="Select a date" />
      </div>
      <BaseSelect
        v-model="event.time"
        label="Select a Time"
        placeholder="Please Select a Time"
        :options="times"
        class="field"
      />
      <BaseButton type="submit" button-class="-fill-gradient">
        Submit
      </BaseButton>
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
