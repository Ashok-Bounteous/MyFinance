// export interface CompanyData {
//     symbol: string;
//     lastRefreshed: string;
//     timeSeries: {
//       date: string;
//       open: number;
//       high: number;
//       low: number;
//       close: number;
//       volume: number;
//     }[];
//   }
  

export interface CompanyData {
  symbol: string;
  lastRefreshed: string;
  timeSeries: Array<{
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  }>;
}
