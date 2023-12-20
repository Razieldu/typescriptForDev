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

