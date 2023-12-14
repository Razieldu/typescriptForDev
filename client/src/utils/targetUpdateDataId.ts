// dataUtils.ts

import { ref } from "vue";
import { SelectedData } from "../type/type";

export const targetUpdateDataId = ref<string>("");

export function findId(value: string, selectedData: SelectedData[]) {
  if (value !== "") {
    let temp = selectedData.filter((one) => one.title === value);
    targetUpdateDataId.value = temp[0].id;
  }
  return targetUpdateDataId.value;
}
