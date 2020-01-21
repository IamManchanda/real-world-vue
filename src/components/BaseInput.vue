<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input
      :value="value"
      v-bind="$attrs"
      v-on="listeners"
      @input="updateValue"
    />
  </div>
</template>

<script>
import formFieldMixin from "@/mixins/formFieldMixin";

export default {
  mixins: [formFieldMixin],
};
</script>
