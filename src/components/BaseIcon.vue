<template>
  <div>
    <div class="icon-wrapper">
      <svg class="icon" :width="width" :height="height">
        <use v-bind="svgIcon(name)" />
      </svg>
    </div>
    <span>
      <slot />
    </span>
  </div>
</template>

<script>
const svgIcon = name => ({ "xlink:href": `/feather-sprite.svg#${name}` });

export default {
  props: {
    name: {
      type: String,
      default: "",
    },
    width: {
      type: [Number, String],
      default: 24,
    },
    height: {
      type: [Number, String],
      default: 24,
    },
  },
  data() {
    return {
      svgIcon,
    };
  },
};
</script>

<style scoped>
.icon-wrapper {
  display: inline-flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.4);
  font-size: 1rem;
  font-weight: 600;
}
.icon {
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
  margin-right: 6px;
}
</style>
