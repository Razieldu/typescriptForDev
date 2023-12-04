import { defineStore } from "pinia";
import { Item, LeftDataState } from "../typescriptDefine/type";

export const useLeftDataStore = defineStore("leftData", {
  state: (): LeftDataState => ({
    data: [
      [
        { id: "01", name: "劉", select: false },
        { id: "02", name: "陳", select: false },
        { id: "03", name: "林", select: false },
      ],
      [
        { id: "11", name: "gmail", select: false },
        { id: "12", name: "hotmail", select: false },
      ],
      [
        { id: "21", name: "大學", select: false },
        { id: "22", name: "政府", select: false },
      ],
      [
        { id: "31", name: "董事長", select: false },
        { id: "32", name: "總監", select: false },
      ],
      [
        { id: "41", name: "242", select: false },
        { id: "42", name: "112", select: false },
      ],
      [
        { id: "51", name: "新北", select: false },
        { id: "52", name: "台北市", select: false },
      ],
    ],
    open: [false, false, false, false, false, false],
  }),

  actions: {
    handleNewData(index: number, newData: string): void {
      if (newData === "") return;
      const newObject: Item = {
        id: `${index}${this.data[index].length + 1}`,
        name: newData,
        select: false,
      };
      this.data[index].push(newObject);
      console.log(this.data[index]);
    },

    deleteData(index: number, id: string): void {
      console.log(index, id);
      this.data[index] = this.data[index].filter((item) => item.id !== id);
    },
    handleAddSearchTitle(index: number, inputValue: string): void {
      if (inputValue === "") return;
      let targetLength = this.data[index].length;
      let newSearchItem = {
        id: `${index}${targetLength + 1}`,
        name: inputValue,
        select: false,
      };
      console.log(newSearchItem);
      this.data[index].push(newSearchItem);
    },
    // handleOpen(index: number): void {
    //   const currentOpenState = this.open[index];
    //   this.open = this.open.map((_, i) => i === index ? !currentOpenState : false);
    //   console.log(index, this.open);
    // },

    handleSelect(id: string): void {
      this.data.forEach((subArray) => {
        subArray.forEach((item) => {
          if (item.id === id) {
            item.select = !item.select;
          }
        });
      });
    },

    clearSelectState(): void {
      this.data.forEach((subArray) => {
        subArray.forEach((item) => {
          item.select = false;
        });
      });
    },
  },
});
