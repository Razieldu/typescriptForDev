import { reactive } from "vue"
type dialogOptions = {
  title: string
  component: any
  props?: Object
  width: string
  visible?: any
  callBack?: Function
}
export const dialogList: dialogOptions[] = reactive([])

export const addDialog = (options: dialogOptions) => {
  dialogList.push(Object.assign(options, { visible: true }))
}

export const closeDialog = (item: dialogOptions, i: number, args?: any, isNativeClose?: boolean) => {
  dialogList.splice(i, 1)
  if (!isNativeClose) item.callBack && item.callBack(...args)
}

