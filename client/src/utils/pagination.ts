import { ref } from "vue";
import { DataItem } from "../store/DataHandleStore";

export const handlePagination = () => {
  const currentPage = ref(1);
  const pageSize = ref(10);
  
  const handleShowData = (
    currentPage: number,
    pageSize: number,
    data: DataItem[]
  ) => {
    let pageStartIndex = (currentPage - 1) * pageSize;
    let pageEndIndex = currentPage * pageSize;
    let showData = data.slice(pageStartIndex, pageEndIndex);
    return showData;
  };

  return {
    currentPage,
    pageSize,
    handleShowData,
  };
};
