<template>
  <div>
    <p>Spaces Left: {{ spacesLeft }} out of {{ capacity }}</p>
    <h2>Attending</h2>
    <ul>
      <li v-for="(name, index) in attending" :key="index">
        {{ name }}
      </li>
    </ul>
    <button @click="increaseCapacity()">Increase Capacity</button>
  </div>
</template>

<script>
import useEventSpace from "@/use/event-space";
import useHooks from "@/use/hooks";

export default {
  setup() {
    return {
      ...useEventSpace(),
      ...useHooks(),
    };
  },
};
</script>
