import { ElMessage } from "element-plus";

type MessageType = "success" | "warning" | "error" | "info";

interface MessageParams {
  showClose: boolean;
  message: string;
  type: MessageType;
}

export function openMessage(param: MessageParams) {
  ElMessage(param);
}


export const processMsg = (fn: Function, i18nFn: Function, ...args: any[]) => {
  let result: string = fn(...args)
  if (result.includes('success')) {
    openMessage({ message: i18nFn(result), type: 'success', showClose: true })
  } else {
    openMessage({ message: i18nFn(result), type: 'error', showClose: true })
  }
}