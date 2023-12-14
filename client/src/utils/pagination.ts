import { ref } from "vue";
import { DataItem } from "../type/type";

export const handlePagination = (current:number,size:number) => {
  const currentPage = ref(current);
  const pageSize = ref(size);

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
