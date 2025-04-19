
import { create } from 'zustand';
import { StockData } from '@/data/stocksData';
import { PortfolioStock, Transaction } from '@/types/portfolio';

interface PortfolioState {
  stocks: PortfolioStock[];
  cash: number;
  addStock: (stock: StockData, shares: number) => void;
  sellStock: (symbol: string, shares: number, currentPrice: number) => void;
  removeStock: (symbol: string) => void;
  getPortfolioValue: () => number;
  getPortfolioPerformance: () => { totalInvested: number; currentValue: number; profitLoss: number; profitLossPercent: number; };
}

export const usePortfolio = create<PortfolioState>((set, get) => ({
  stocks: [],
  cash: 10000, // Starting with $10,000 virtual cash
  
  addStock: (stock: StockData, shares: number) => {
    set((state) => {
      // Check if user has enough cash
      const cost = stock.price * shares;
      if (cost > state.cash) {
        throw new Error("Insufficient funds");
      }
      
      const existingStock = state.stocks.find(s => s.symbol === stock.symbol);
      
      if (existingStock) {
        // Calculate new average purchase price
        const totalShares = existingStock.shares + shares;
        const totalCost = (existingStock.purchasePrice * existingStock.shares) + (stock.price * shares);
        const newAveragePrice = totalCost / totalShares;
        
        return {
          cash: state.cash - cost,
          stocks: state.stocks.map(s => 
            s.symbol === stock.symbol
              ? {
                  ...s,
                  shares: totalShares,
                  purchasePrice: newAveragePrice,
                  totalValue: totalShares * stock.price,
                  transactions: [...s.transactions, {
                    type: 'buy',
                    date: new Date(),
                    shares,
                    price: stock.price
                  }]
                }
              : s
          )
        };
      }
      
      return {
        cash: state.cash - cost,
        stocks: [
          ...state.stocks,
          {
            ...stock,
            shares,
            purchasePrice: stock.price,
            totalValue: shares * stock.price,
            transactions: [{
              type: 'buy',
              date: new Date(),
              shares,
              price: stock.price
            }]
          }
        ]
      };
    });
  },
  
  sellStock: (symbol: string, shares: number, currentPrice: number) => {
    set((state) => {
      const existingStock = state.stocks.find(s => s.symbol === symbol);
      
      if (!existingStock) {
        throw new Error("Stock not found in portfolio");
      }
      
      if (existingStock.shares < shares) {
        throw new Error("Not enough shares to sell");
      }
      
      const revenue = currentPrice * shares;
      const remainingShares = existingStock.shares - shares;
      
      if (remainingShares === 0) {
        return {
          cash: state.cash + revenue,
          stocks: state.stocks.filter(s => s.symbol !== symbol)
        };
      }
      
      return {
        cash: state.cash + revenue,
        stocks: state.stocks.map(s => 
          s.symbol === symbol
            ? {
                ...s,
                shares: remainingShares,
                totalValue: remainingShares * currentPrice,
                transactions: [...s.transactions, {
                  type: 'sell',
                  date: new Date(),
                  shares,
                  price: currentPrice
                }]
              }
            : s
        )
      };
    });
  },
  
  removeStock: (symbol: string) => {
    set((state) => ({
      stocks: state.stocks.filter(s => s.symbol !== symbol)
    }));
  },
  
  getPortfolioValue: () => {
    const state = get();
    return state.stocks.reduce((total, stock) => total + stock.totalValue, 0) + state.cash;
  },
  
  getPortfolioPerformance: () => {
    const state = get();
    const totalInvested = state.stocks.reduce((total, stock) => total + (stock.purchasePrice * stock.shares), 0);
    const currentValue = state.stocks.reduce((total, stock) => total + stock.totalValue, 0);
    const profitLoss = currentValue - totalInvested;
    const profitLossPercent = totalInvested > 0 ? (profitLoss / totalInvested) * 100 : 0;
    
    return {
      totalInvested,
      currentValue,
      profitLoss,
      profitLossPercent
    };
  }
}));
