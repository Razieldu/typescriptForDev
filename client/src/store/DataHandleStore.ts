import { defineStore } from "pinia";
import { useLeftDataStore } from "./LeftDataHandleStore";
import Fuse from "fuse.js";

export interface RightDataStore {
  data: ApiResponse;
  saveData: ApiResponse;
  isFirst: boolean;
  currentSelectedDataId: string;
  currentSelectedData: SelectedData | null;
  selectedData: SelectedData[];
}

export interface DataItem {
  m_id: string;
  姓名: string;
  Email: string;
  服務單位: string;
  職稱: string;
  郵遞區號: string;
  地址: string;
  郵遞區號2: string;
  地址2: string;
  連絡電話_公司: string;
  連絡電話_秘書: string;
  連絡電話_住宅: string;
  連絡電話_手機: string;
  連絡電話1: string;
  連絡電話2: string;
  傳真電話: string;
  傳真2: string;
  [key: string]: string;
}

type ApiResponse = DataItem[];

interface MemberData {
  [key: string]: any;
}

// interface AddMemberResponse {
//   m_id: string;
// }

export interface SelectedData {
  title: string;
  content: ApiResponse;
  id: string;
}

export const useRightDataStore = defineStore("rightData", {
  state: (): RightDataStore => ({
    data: [],
    saveData: [],
    isFirst: true,
    currentSelectedDataId: "",
    currentSelectedData: null,
    selectedData: [],
  }),

  actions: {
    async fetchData(): Promise<ApiResponse | undefined> {
      try {
        //測試用
        const response = await fetch("http://localhost:3000/proxy", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const result = await response.json();
          this.data = JSON.parse(JSON.stringify(result.Data));
          this.saveData = JSON.parse(JSON.stringify(result.Data));
          // console.log(this.data);
          // console.log(this.saveData);
          return this.data;
        } else {
          throw new Error("Request failed.");
        }
      } catch (error) {
        console.log(error);
      }
    },

    async updateMemberData(memberNewData: MemberData | null) {
      try {
        ///測試用
        const response = await fetch("http://localhost:3000/proxy3", {
          method: "POST",
          body: JSON.stringify(memberNewData),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const result = await response.json();
          console.log(result);
          return result;
        } else {
          throw new Error("Request failed.");
        }
      } catch (error) {
        console.log(error);
      }
    },

    async addMemberData(
      memberNewData: MemberData
    ): Promise<string | undefined> {
      try {
        //測試用
        const response = await fetch("http://localhost:3000/proxy4", {
          method: "POST",
          body: JSON.stringify(memberNewData),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const result = await response.json();
          console.log(result);
          return result.m_id;
        } else {
          throw new Error("Request failed.");
        }
      } catch (error) {
        console.log(error);
      }
    },

    searchGoalByColumn(
      titieValue: string,
      value: string,
      ifRelated: boolean
    ): void {
      if (!ifRelated) {
        let searchResult = [];
        let useData = this.isFirst ? this.saveData : this.data;
        // console.log(useData["0"])
        let keyWord = new RegExp(value);
        for (let indexNum in useData) {
          for (let key in useData[indexNum]) {
            if (key !== titieValue) continue;
            let target = useData[indexNum][key];
            if (keyWord.test(target) === true) {
              searchResult.push(useData[indexNum]);
            }
          }
        }
        // console.log(searchResult);
        searchResult.length > 0 ? (this.data = searchResult) : null;
        // console.log(this.data);
        this.isFirst = false;
        // console.log(this.isFirst);
      } else if (ifRelated && !this.isFirst) {
        let searchResult = [];
        let useData = [...this.saveData];
        let keyWord = new RegExp(value);
        for (let indexNum in useData) {
          for (let key in useData[indexNum]) {
            if (key !== titieValue) continue;
            let target = useData[indexNum][key];
            if (keyWord.test(target) === true) {
              if (
                !this.data.some((one) => one.m_id === useData[indexNum].m_id)
              ) {
                // console.log(one)
                searchResult.push(useData[indexNum]);
                // console.log(searchResult)
              }
            }
          }
        }
        this.data = [...this.data, ...searchResult];
        this.isFirst = false;
        console.log(this.isFirst);
      }
    },

    resetSearchResult(): void {
      const leftDataStore = useLeftDataStore();
      const { clearSelectState } = leftDataStore;
      this.data = [...this.saveData];
      this.isFirst = true;
      this.currentSelectedDataId = "";
      clearSelectState();
      // console.log(this.data, "THIS.DATA");
      // console.log(this.saveData, "SAVEDATA");
    },

    handleRowDelete(id: string, currentSelectedDataId: string): void {
      if (!currentSelectedDataId) {
        this.data = this.data.filter((one) => one.m_id !== id);
        this.saveData = this.saveData.filter((one) => one.m_id !== id);
      } else {
        if (this.currentSelectedData) {
          let currentContent = this.currentSelectedData.content.filter(
            (one) => {
              if (one.m_id !== id) {
                return true;
              } else {
                return false;
              }
            }
          );
          this.currentSelectedData.content = currentContent;
          this.selectedData = this.selectedData.map((each) => {
            if (each.id == currentSelectedDataId) {
              return { ...each, content: currentContent };
            } else {
              return each;
            }
          });
          console.log(this.selectedData);
          this.data = currentContent
        }
      }
    },

    async handleAddNewData(): Promise<void> {
      console.log("添加");
      const newObj = {} as DataItem; // 创建一个空对象
      this.data = [newObj, ...this.data]; // 在数据列表开头添加新对象
      this.saveData = [newObj, ...this.saveData]; // 在保存数据列表开头添加新对象

      try {
        const result = await this.addMemberData(newObj); // 发送添加数据的请求
        console.log(result);

        // 更新第一个对象的m_id属性
        if (result !== undefined) {
          this.data[0].m_id = result;
          this.saveData[0].m_id = result;
        }
        console.log(this.data[0]);
        console.log(this.saveData[0]);
      } catch (error) {
        console.log(error);
      }
    },

    async handleUpdateData(row: DataItem): Promise<void> {
      console.log(row);
      let objToServer = null;
      this.data = this.data.map((one) => {
        if (one.m_id === row.m_id) {
          let updateObj = { ...one, ...row };
          console.log(updateObj);
          return updateObj;
        }
        return one;
      });
      this.saveData = this.saveData.map((one) => {
        if (one.m_id === row.m_id) {
          let updateObj = { ...one, ...row };
          objToServer = updateObj;
          return updateObj;
        }
        return one;
      });
      console.log(objToServer, "給後端");
      let result = await this.updateMemberData(objToServer);
      console.log(result);
    },

    handleSelectedData(
      title: string,
      isDialogVisible: (isVisible: boolean) => void,
      resetInput: () => void
    ): void {
      if (title === "") return;
      isDialogVisible(false);
      resetInput();
      let newId = Math.floor(100000 * Math.random());
      let selectedObject = {
        title,
        content: [...this.data],
        id: `${newId}_${title}`,
      };
      this.selectedData.push(selectedObject);
      console.log(this.selectedData);
    },

    showSelectedData(id: string): void {
      // console.log(id);
      this.isFirst = false;
      let readyToShowData = this.selectedData.filter(
        (eachSelectedData) => eachSelectedData.id === id
      );
      this.data = [...readyToShowData[0].content];
      this.currentSelectedData = { ...readyToShowData[0] };
      console.log(this.currentSelectedData);
      this.currentSelectedDataId = id;
    },

    updateSelectedData(
      id: string,
      isDialogVisible: (isVisible: boolean) => void,
      newTitle: string
    ): void {
      this.selectedData = this.selectedData.map((eachSelectedData) => {
        if (eachSelectedData.id === id) {
          let newData = [...this.data];
          return { ...eachSelectedData, title: newTitle, content: newData };
        } else {
          return eachSelectedData;
        }
      });
      isDialogVisible(false);
    },

    fuzzySearch(value: string): void {
      const options = {
        keys: [
          "姓名",
          "Email",
          "服務單位",
          "職稱",
          "郵遞區號",
          "地址",
          "郵遞區號2",
          "地址2",
          "連絡電話_公司",
          "連絡電話_秘書",
          "連絡電話_住宅",
          "連絡電話_手機",
          "連絡電話1",
          "連絡電話2",
          "傳真電話",
          "傳真2",
        ],
      };
      const products = [...this.data];
      const fuse = new Fuse(products, options);
      const result = fuse.search(value);
      let useData = result.map((one) => one.item);
      this.data = [...useData];
    },
  },
});
