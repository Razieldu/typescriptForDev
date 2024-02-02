
export interface RightDataStore {
  firstTimeLogin:boolean;
  loading: boolean;
  data: ApiResponse;
  saveData: ApiResponse;
  isFirst: boolean;
  currentSelectedDataId: string;
  currentSelectedData: SelectedData[] | [];
  selectedData: SelectedData[];
  dataUpdateToSelectPage: ApiResponse;
}

export interface DataItem {
  m_id: string;
  姓名: string;
  Email: string;
  服務單位: string;
  職稱: string;
  郵遞區號: string;
  地址: string;
  郵遞區號2: string;
  地址2: string;
  連絡電話_公司: string;
  連絡電話_秘書: string;
  連絡電話_住宅: string;
  連絡電話_手機: string;
  連絡電話1: string;
  連絡電話2: string;
  傳真電話: string;
  傳真2: string;
  [key: string]: string;
}

export type ApiResponse = DataItem[];

export interface MemberData {
  [key: string]: any;
}

export interface SelectedData {
  title: string;
  content: ApiResponse;
  id: string;
}
