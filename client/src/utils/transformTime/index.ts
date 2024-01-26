export const transformTime = (time: any) => {
    const year = time.getFullYear();
    const month = time.getMonth() + 1; // 月份是從 0 開始的，所以要加 1
    const day = time.getDate();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const numericDate = `${year}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}${hours.toString().padStart(2, '0')}${minutes.toString().padStart(2, '0')}${seconds.toString().padStart(2, '0')}`;
    return numericDate
}