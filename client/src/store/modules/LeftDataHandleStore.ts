import { Item, LeftDataState } from "@/types";
import { getLeftMenuData } from "../../firebase/firebase.utils"
export const useLeftDataStore = defineStore("leftData", {
  state: (): LeftDataState => ({
    data: [],
    open: [false, false, false, false, false, false],
  }),

  actions: {
    async handSetLeftMenuDataState(uid: string) {
      let dataFromFirestore = await getLeftMenuData(uid)
      if (dataFromFirestore !== undefined){
        this.data = JSON.parse(JSON.stringify(dataFromFirestore))
      }
    },
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
        searchKey: inputValue,
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
