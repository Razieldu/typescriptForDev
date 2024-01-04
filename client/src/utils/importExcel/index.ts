export const importExcel = (fileRaw: any): Promise<any> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            const arrayBuffer = reader.result as ArrayBuffer;

            try {
                const workbook = read(new Uint8Array(arrayBuffer), { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = utils.sheet_to_json(worksheet)
                let resultJsonData = jsonData
                    .filter((obj) => Object.values(obj as { [key: string]: unknown })
                        .some(value => typeof value === 'string' && value.trim() !== ""));

                resolve(resultJsonData);
            } catch (error) {
                console.error('解析 Excel 文件失败:', error);
                reject(error);
            }
        };

        if (fileRaw.value) {
            reader.readAsArrayBuffer(fileRaw.value);
        }
    });
};
