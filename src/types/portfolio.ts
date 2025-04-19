
import { StockData } from '@/data/stocksData';

export interface Transaction {
  type: 'buy' | 'sell';
  date: Date;
  shares: number;
  price: number;
}

export interface PriceChangeExplanation {
  reason: string;
  factors: string[];
  sentiment: 'positive' | 'negative' | 'neutral';
  significance: 'minor' | 'moderate' | 'major';
  timestamp: Date;
}

export interface PortfolioStock extends StockData {
  shares: number;
  purchasePrice: number;
  totalValue: number;
  transactions: Transaction[];
  priceHistory?: Array<{price: number, date: Date}>;
  explanations?: PriceChangeExplanation[];
}
