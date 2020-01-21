import { reactive, computed, toRefs } from "@vue/composition-api";

const useEventSpace = () => {
  const event = reactive({
    capacity: 4,
    attending: ["Tim", "Bob", "Joe"],
    spacesLeft: computed(() => {
      return event.capacity - event.attending.length;
    }),
  });
  const increaseCapacity = () => {
    event.capacity++;
  };

  return { ...toRefs(event), increaseCapacity };
};

export default useEventSpace;
