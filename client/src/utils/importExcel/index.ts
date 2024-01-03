export const importExcel = (fileRaw: any) => {
    let result;
    const reader = new FileReader();
    // 开始读取文件
    if (fileRaw.value) {
        reader.readAsArrayBuffer(fileRaw.value);
    }
    reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        // 输出 ArrayBuffer 的大小
        // console.log('ArrayBuffer 大小:', arrayBuffer.byteLength);

        try {
            // 输出 ArrayBuffer 的十六进制表示
            // console.log('ArrayBuffer 十六进制:', Array.from(new Uint8Array(arrayBuffer)).map(byte => byte.toString(16)).join(' '));
            const workbook = read(new Uint8Array(arrayBuffer), { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            // 在这里添加调试语句，检查 Sheet 名是否正确
            // console.log('Sheet名:', sheetName);
            const worksheet = workbook.Sheets[sheetName];
            // 输出工作表内容
            // console.log('工作表内容:', worksheet);
            const jsonData = utils.sheet_to_json(worksheet);
            // 在这里添加调试语句，检查 jsonData 是否成功生成
            console.log('jsonData:', jsonData);
            result = jsonData
        } catch (error) {
            console.error('解析 Excel 文件失败:', error);
        }
    };
    return result
}