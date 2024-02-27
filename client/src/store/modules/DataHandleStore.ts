import { useLeftDataStore } from "@/store";
import { getAllDocsFromFirestore, updateMemberData, addMemberData } from "@/firebase/firebase.utils";
import {
  RightDataStore,
  ApiResponse,
  DataItem,
} from "@/types";

export const useRightDataStore = defineStore("rightData", {
  state: (): RightDataStore => ({
    firstTimeLogin: true,
    loading: true,
    data: [],
    saveData: [],
    isFirst: true,
    currentSelectedDataId: "",
    currentSelectedData: [],
    selectedData: [],
    dataUpdateToSelectPage: [],
  }),

  actions: {
    setFirstTimeLogin(value: boolean) {
      this.firstTimeLogin = value
    },
    setLoading(value: boolean) {
      this.loading = value
    },
    async fetchData(uid: string) {
      try {
        const fetchedData = await getAllDocsFromFirestore(uid);
        this.data = JSON.parse(JSON.stringify(fetchedData));
        this.saveData = JSON.parse(JSON.stringify(fetchedData));
      } catch (error) {
        console.log(error)
      }
    },
    ///處理左方特定字詞,對特定欄位進行搜尋
    searchGoalByColumn(
      titleValue: string,
      value: string,
      ifRelated: boolean
    ): void {
      let searchResult = [];
      // console.log(titleValue, value)
      let keyWord = new RegExp(value);
      if (!ifRelated) {
        // console.log(value, titleValue); ///劉 姓名
        let useData = this.isFirst ? this.saveData : this.data;
        for (let eachData of useData) {
          if (keyWord.test(eachData[titleValue])) {
            searchResult.push(eachData);
          }
        }
        this.data = searchResult.length > 0 ? searchResult : [];
      } else if (ifRelated && !this.isFirst) {
        let useData = [...this.saveData];
        for (let eachData of useData) {
          if (keyWord.test(eachData[titleValue])) {
            if (!this.data.some((one) => one.m_id === eachData.m_id)) {
              searchResult.push(eachData);
            }
          }
        }
        this.data = [...this.data, ...searchResult];
        // console.log(this.isFirst);
      }
      this.isFirst = false;
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

    ///資料刪除,確認是否位於頁面分頁資料,進行不同處理
    handleRowDelete(id: string, currentSelectedDataId: string): void {
      if (!currentSelectedDataId) {
        this.data = this.data.filter((one) => one.m_id !== id);
        this.saveData = this.saveData.filter((one) => one.m_id !== id);
      } else {
        if (this.currentSelectedData) {
          let currentContent = this.currentSelectedData[0].content.filter(
            (one) => {
              if (one.m_id !== id) {
                return true;
              } else {
                return false;
              }
            }
          );
          this.currentSelectedData[0].content = currentContent;
          this.selectedData = this.selectedData.map((each) => {
            if (each.id == currentSelectedDataId) {
              return { ...each, content: currentContent };
            } else {
              return each;
            }
          });
          console.log(this.selectedData);
          this.data = currentContent;
        }
      }
    },

    ///批次刪除,確認使否位於分頁資料,進行不同操作
    batchDelete(currentId: string, data: DataItem[]): void {
      if (currentId !== "") {
        let updateObj;
        this.selectedData = this.selectedData.map((eachData) => {
          if (eachData.id === currentId) {
            let tempArray = eachData.content;
            let checkIdArray = data.map((one) => one.m_id);
            let updatedContent = tempArray.filter(
              (one) => checkIdArray.indexOf(one.m_id) === -1
            );
            updateObj = {
              ...eachData,
              content: updatedContent,
            };
            this.currentSelectedData = [updateObj];
            this.data = updateObj.content;
            return updateObj;
          } else {
            return eachData;
          }
        });
        console.log("批次刪除", this.currentSelectedData);
        console.log("批次刪除selectedData", this.selectedData);
      } else {
        let checkIdArray = data.map((one) => one.m_id);
        this.saveData = this.saveData.filter((eachOne) => {
          return checkIdArray.indexOf(eachOne.m_id) === -1;
        });
        this.data = this.data.filter((eachOne) => {
          return checkIdArray.indexOf(eachOne.m_id) === -1;
        });
      }
    },
    async handleAddNewData() {
      const newObj = {} as DataItem; // 创建一个空对象
      this.data = [newObj, ...this.data]; // 在数据列表开头添加新对象
      this.saveData = [newObj, ...this.saveData]; // 在保存数据列表开头添加新对象
      try {
        const result = await addMemberData(); // 发送添加数据的请求
        if (result !== undefined) {
          this.data[0].m_id = result;
          this.saveData[0].m_id = result;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async handleUpdateData(row: DataItem, uid: string): Promise<void> {
      if (uid !== undefined) {
        let objToServer = null;
        this.data = this.data.map((one) => {
          if (one.m_id === row.m_id) {
            let updateObj = { ...one, ...row };
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
        updateMemberData(objToServer, row.m_id, uid);
      }
    },

    handleSelectedData(
      title: string,
      isDialogVisible: () => void,
      resetInput: () => void
    ): string {
      if (title === "") return "basic.right.emptyTitle";
      if (this.selectedData.some(one => one.title === title)) {
        return "basic.right.duplicateTitle"
      }
      let newId = Math.floor(100000 * Math.random());
      let selectedObject = {
        title,
        content: [...this.data],
        id: `${newId}_${title}`,
      };

      this.selectedData.push(selectedObject);
      isDialogVisible();
      resetInput();
      // console.log(this.selectedData);
      // console.log(this.currentSelectedData)
      return "basic.right.successBuild"
    },

    buildNewPage(insertNewPageData: any, pageTitle: string,
      closeDialog: () => void, resetInput: () => void): string {
      console.log(insertNewPageData)
      if (pageTitle === "") return "basic.right.emptyTitle";
      if (insertNewPageData.length === 0) return "basic.right.noData"
      if (this.selectedData.some(one => one.title === pageTitle)) {
        return "basic.right.duplicateTitle"
      }

      let newId = Math.floor(100000 * Math.random());
      let selectedObject = {
        title: pageTitle,
        content: insertNewPageData,
        id: `${newId}_${pageTitle}`,
      };
      this.selectedData.push(selectedObject);
      // console.log(this.selectedData)
      resetInput();
      closeDialog()
      return "basic.right.successBuild"
    },

    showSelectedData(id: string): void {
      // console.log(id);
      this.isFirst = false;
      let readyToShowData = this.selectedData.filter(
        (eachSelectedData) => eachSelectedData.id === id
      );
      this.data = [...readyToShowData[0].content];
      this.currentSelectedData = [{ ...readyToShowData[0] }];
      console.log(this.currentSelectedData);
      this.currentSelectedDataId = id;
    },

    updateSelectedData(
      id: string,
      closeDialog: () => void,
      newTitle: string
    ): string {
      this.selectedData = this.selectedData.map((eachSelectedData) => {
        if (eachSelectedData.id === id) {
          let newData = [...this.data];
          return { ...eachSelectedData, title: newTitle, content: newData };
        } else {
          return eachSelectedData;
        }
      });
      closeDialog();
      return "basic.right.successUpdate"
    },

    fuzzySearch(value: string): void {
      if (value === "") return;
      let searchResult: DataItem[] = [];
      let keyWord = new RegExp(value);
      this.data.forEach((element) => {
        let jsonData = JSON.stringify(element);
        if (keyWord.test(jsonData)) {
          searchResult.push(element);
        }
      });
      this.data = [...searchResult];
    },

    setDataToUpdateSelectDataPage(data: ApiResponse): void {
      this.dataUpdateToSelectPage = [...data];
      console.log(this.selectedData);
    },

    updateToSelectedPageData(
      id: string,
      data: ApiResponse,
      isDialogVisible: (visible: boolean) => void
    ): string {
      // console.log(id);
      if (!id) return "basic.right.emptyTarget"
      isDialogVisible(false);
      let targetPage = this.selectedData.filter((one) => one.id === id);

      // console.log(targetPage,"targetPage")
      // console.log(this.selectedData)
      let prevData = targetPage[0].content;
      let prevDataId = prevData.map((one) => one.m_id);

      data.forEach((eachData) => {
        if (prevDataId.indexOf(eachData.m_id) === -1) {
          prevData.push(eachData);
        }
      });
      // console.log(prevData,"prev")
      // console.log(this.selectedData,"prev")
      this.selectedData = this.selectedData.map((eachSelectedData) => {
        if (eachSelectedData.id === id) {
          // 返回更新后的对象，保持响应性
          return { ...eachSelectedData, content: prevData };
        } else {
          return eachSelectedData;
        }
      });
      return "basic.right.successAddToTargetPage"
    },



  },
});
