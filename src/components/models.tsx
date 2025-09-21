export interface StockProps {
  scrip_cd: string;
  scripname: string;
  ltradert: number;
  change_val: number;
  trend: string;
  change_percent: number;
  lowrate: number;
  highrate: number;
  openrate: number;
}

export interface IndianIndicesProps {
  name: string;
  ltp: number;
  chg: number;
  chgper: number;
  low: number;
  high: number;
  open: number;
  low52: number;
  high52: number;
}

export interface HomeStockProps {
  _id: string;
  currency: Currency;
  global: Global;
  mcx: Mcx;
}

export interface Currency {
  data: Daum[];
  success: number;
}

export interface Daum {
  chg: string;
  chgper: string;
  derived: boolean;
  high: string;
  href?: string;
  lastepoch: number;
  link_flag: number;
  low: string;
  ltp: string;
  market_state: string;
  message: string;
  name: string;
  open: string;
  prevclose: string;
  time: string;
  searchName?: string;
}

export interface Global {
  dataList: DataList[];
  header: Header[];
}

export interface DataList {
  data: string[][];
  heading: string;
}

export interface Header {
  name: string;
  type: string;
}

export interface Mcx {
  dataList: DataList[];
  header: Header[];
}
