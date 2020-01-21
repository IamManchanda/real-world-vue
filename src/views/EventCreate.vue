<template>
  <div>
    <h2>Create an Event</h2>
    <template v-if="$v.$anyError">
      <p class="field error -text-error">
        Please fill out the required fields
      </p>
      <hr />
      <br />
    </template>

    <form @submit.prevent="createEvent">
      <BaseSelect
        v-model="event.category"
        label="Select a Category"
        :options="categories"
        placeholder="Please Select a Category"
        class="field"
        :class="{ error: $v.event.category.$error }"
        @blur="$v.event.category.$touch()"
      />
      <template v-if="$v.event.category.$error">
        <p v-if="!$v.event.category.required" class="-text-error">
          Category is required.
        </p>
      </template>
      <h3>Name & describe your event</h3>
      <BaseInput
        v-model="event.title"
        type="text"
        label="Title"
        placeholder="Add an event title"
        class="field"
        :class="{ error: $v.event.title.$error }"
        @blur="$v.event.title.$touch()"
      />
      <template v-if="$v.event.title.$error">
        <p v-if="!$v.event.title.required" class="-text-error">
          Title is required.
        </p>
      </template>
      <BaseInput
        v-model="event.description"
        type="text"
        label="Description"
        placeholder="Add a description"
        class="field"
        :class="{ error: $v.event.description.$error }"
        @blur="$v.event.description.$touch()"
      />
      <template v-if="$v.event.description.$error">
        <p v-if="!$v.event.description.required" class="-text-error">
          Description is required.
        </p>
      </template>
      <h3>Where is your event?</h3>
      <BaseInput
        v-model="event.location"
        type="text"
        label="Location"
        placeholder="Add a location"
        class="field"
        :class="{ error: $v.event.location.$error }"
        @blur="$v.event.location.$touch()"
      />
      <template v-if="$v.event.location.$error">
        <p v-if="!$v.event.location.required" class="-text-error">
          Location is required.
        </p>
      </template>
      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker
          v-model="event.date"
          placeholder="Select a date"
          :input-class="{ error: $v.event.date.$error }"
          @opened="$v.event.date.$touch()"
        />
      </div>
      <template v-if="$v.event.date.$error">
        <p v-if="!$v.event.date.required" class="-text-error">
          Date is required.
        </p>
      </template>
      <BaseSelect
        v-model="event.time"
        label="Select a Time"
        placeholder="Please Select a Time"
        :options="times"
        class="field"
        :class="{ error: $v.event.time.$error }"
        @blur="$v.event.time.$touch()"
      />
      <template v-if="$v.event.time.$error">
        <p v-if="!$v.event.time.required" class="-text-error">
          Time is required.
        </p>
      </template>
      <BaseButton
        type="submit"
        button-class="-fill-gradient -cursor-pointer"
        :disabled="$v.$anyError"
      >
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
import { required } from "vuelidate/lib/validators";

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
  validations: {
    event: {
      category: { required },
      title: { required },
      description: { required },
      location: { required },
      date: { required },
      time: { required },
    },
  },
  methods: {
    async createEvent() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
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
  padding: 6px 8px 12px;
}
</style>
