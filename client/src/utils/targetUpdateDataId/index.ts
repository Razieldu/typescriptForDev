// dataUtils.ts

import { SelectedData } from "@/types";

export const targetUpdateDataId = ref<string>("");

export function findId(value: string, selectedData: SelectedData[]) {
  if (value !== "") {
    let temp = selectedData.filter((one) => one.title === value);
    // console.log(temp,"選定資料")
    // console.log(selectedData,"選定資料")
    targetUpdateDataId.value = temp[0].id;
  }
  return targetUpdateDataId.value;
}
