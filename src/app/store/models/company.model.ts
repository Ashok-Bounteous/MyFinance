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
