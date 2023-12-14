export interface Item {
    id: string;
    name: string;
    select: boolean;
  }
  
  export interface LeftDataState {
    data: Item[][];
    open: boolean[];
  }
  