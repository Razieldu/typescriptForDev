////right.vue
export const exportFile = (mainContentData: any) => {
  let deleteM_idData = mainContentData.value.map(({ m_id, ...rest }: any) => rest);
  const ws = utils.json_to_sheet(deleteM_idData);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Data");
  const sheetData: any[] = utils.sheet_to_json(ws, { header: 1 });
  const columnCount: number = sheetData[0].length;

  for (let col = 0; col < columnCount; col++) {
    const columnWidth = 30;
    ws["!cols"] = ws["!cols"] || [];
    ws["!cols"][col] = { wch: columnWidth };
  }

  writeFileXLSX(wb, `會員資料_${new Date().toLocaleString()}.xlsx`);
};
