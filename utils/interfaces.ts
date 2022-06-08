export interface IValue {
  value: {
    currency: string;
    price: number;
  };
}

export interface ILandingPage {
  averageTickerValues: {
    currency: string;
    price: number;
  }[];
  tradingPairs: any;
}

export interface ITradingPairs {
  name: string;
  trading: string;
  description: string;
  url_symbol: string;
}

export interface ITradingPair {
  high: string;
  low: string;
  last: string;
  timestamp: string;
  volume: string;
}
