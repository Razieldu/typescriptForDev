import { ref, Ref } from "vue";
import { DataItem } from "../typescriptDefine/type";
import { useRightDataStore } from "../store/DataHandleStore";

export const rowEditFunction = () => {
  const { setDataToUpdateSelectDataPage } = useRightDataStore();
  const currentEditCell: Ref<(string | number)[]> = ref([]);
  const editMode: Ref<boolean> = ref(false);
  const buttonContent: Ref<string> = ref("修改");

  const handleCellEdit = (colKey: string, rowIndex: number) => {
    if (!editMode.value) return;
    currentEditCell.value = [colKey, rowIndex];
  };

  const handleEditMode = () => {
    let oldValue = editMode.value;
    editMode.value = !oldValue;
    if (editMode.value === false) {
      currentEditCell.value = [];
      buttonContent.value = "修改";
    } else {
      buttonContent.value = "儲存";
    }
  };

  const multipleSelection = ref<DataItem[]>([]);
  const handleSelectionChange = (val: DataItem[]) => {
    multipleSelection.value = val;
    setDataToUpdateSelectDataPage(multipleSelection.value);
  };

  return {
    currentEditCell,
    editMode,
    buttonContent,
    multipleSelection,
    handleEditMode,
    handleCellEdit,
    handleSelectionChange,
  };
};
