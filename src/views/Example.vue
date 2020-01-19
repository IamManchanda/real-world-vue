<template>
  <form @submit.prevent="handleFormSubmission">
    <div>
      <input
        v-model="email"
        type="email"
        placeholder="What's your email"
        :class="{ error: $v.email.$error }"
        @blur="$v.email.$touch()"
      />
    </div>
    <div v-if="$v.email.$error">
      <p v-if="!$v.email.email" class="-text-error">
        Please enter a valid email
      </p>
      <p v-if="!$v.email.required" class="-text-error">
        Email field is required
      </p>
    </div>
    <br />
    <button
      :disabled="$v.$invalid"
      class="button"
      :class="{
        '-fill-gradient -cursor-pointer': !$v.$invalid,
      }"
      type="submit"
    >
      Submit
    </button>
    <p v-if="$v.$anyError" class="-text-error">
      Please fill out the required fields.
    </p>
  </form>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";

export default {
  name: "Example",
  data() {
    return {
      email: null,
    };
  },
  validations: {
    email: {
      required,
      email,
    },
  },
  methods: {
    handleFormSubmission() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        console.log("Form Submitted", { email: this.email });
      }
    },
  },
};
</script>
