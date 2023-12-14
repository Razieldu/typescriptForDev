import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useRightDataStore } from "@/store";

export const computeFn = () => {
  const { currentSelectedData, selectedData } = storeToRefs(
    useRightDataStore()
  );
  const selectedDataTitle = computed({
    get: () => currentSelectedData?.value?.[0]?.title || "",
    set: (value) => {
      if (currentSelectedData.value) {
        currentSelectedData.value[0].title = value;
      }
    },
  });

  const shouldDisableButton = computed(() => {
    return selectedData.value.length === 0;
  });

  return {
    selectedDataTitle,
    shouldDisableButton,
  };
};
