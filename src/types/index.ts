export interface CoinListType {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap_rank: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number;
}

export interface CoinType {
  id: string;
  name: string;
  symbol: string;
  image: {
    large: string;
    small: string;
    thumb: string;
  };
  description:{
    en: string;
  }

  market_cap_rank: number;

  market_data: {
    current_price: {
      usd: number;
    };
    market_cap: {
      usd: number;
    };
    total_volume: {
      usd: number;
    };
    fully_diluted_valuation:{
      usd: number;
    };
    total_supply: number;
    max_supply: number;
    circulating_supply: number;


    market_cap_change_percentage_24h: number;
    

    price_change_percentage_24h: number;
  };
}
