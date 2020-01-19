<template>
  <div>
    <button
      class="button"
      v-bind="$attrs"
      :class="buttonClass"
      v-on="$listeners"
    >
      <slot />
    </button>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    buttonClass: {
      type: String,
      default: "",
    },
  },
};
</script>
