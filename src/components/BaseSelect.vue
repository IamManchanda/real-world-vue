<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <select
      :value="value"
      v-bind="$attrs"
      v-on="listeners"
      @input="updateValue"
    >
      <option value disabled>{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="option"
        :selected="option === value"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
import formFieldMixin from "@/mixins/formFieldMixin";

export default {
  mixins: [formFieldMixin],
  props: {
    options: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
};
</script>
