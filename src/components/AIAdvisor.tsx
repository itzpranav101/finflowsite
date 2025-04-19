
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, X, MessageSquare, Lightbulb, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from '@/hooks/usePortfolio';
import { StockData } from '@/data/stocksData';

interface AIAdvisorProps {
  selectedStock?: StockData | null;
  onClose?: () => void;
  placement?: 'fixed' | 'inline';
}

const AIAdvisor = ({ selectedStock, onClose, placement = 'inline' }: AIAdvisorProps) => {
  const [advice, setAdvice] = useState<string | null>(null);
  const [adviceType, setAdviceType] = useState<'info' | 'warning' | 'success'>('info');
  const { stocks, getPortfolioPerformance } = usePortfolio();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (selectedStock) {
      generateStockAdvice(selectedStock);
    } else {
      generatePortfolioAdvice();
    }
  }, [selectedStock]);

  const generateStockAdvice = (stock: StockData) => {
    const existingPosition = stocks.find(s => s.symbol === stock.symbol);
    
    // Check if stock is overvalued based on P/E
    if (stock.peRatio > 30) {
      setAdvice(`${stock.symbol} has a high P/E ratio of ${stock.peRatio.toFixed(1)}. This could indicate the stock is overvalued compared to its earnings. Consider the growth potential before investing heavily.`);
      setAdviceType('warning');
      return;
    }
    
    // Check if stock has good dividend
    if (stock.dividendYield > 3) {
      setAdvice(`${stock.symbol} offers an attractive dividend yield of ${stock.dividendYield.toFixed(2)}%. This could be a good option for income-focused investors.`);
      setAdviceType('success');
      return;
    }
    
    // Check if user is already overexposed to this stock
    if (existingPosition) {
      const portfolioValue = stocks.reduce((total, s) => total + s.totalValue, 0);
      const stockExposure = existingPosition.totalValue / portfolioValue * 100;
      
      if (stockExposure > 20) {
        setAdvice(`Your portfolio already has a ${stockExposure.toFixed(1)}% exposure to ${stock.symbol}. Consider diversifying to reduce risk.`);
        setAdviceType('warning');
        return;
      }
    }
    
    // General advice based on financial metrics
    if (stock.roe > 15 && stock.peRatio < 20) {
      setAdvice(`${stock.symbol} shows strong fundamentals with a healthy ROE of ${stock.roe.toFixed(1)}% and reasonable P/E ratio of ${stock.peRatio.toFixed(1)}. This could be a good value investment.`);
      setAdviceType('success');
      return;
    }
    
    if (stock.debtToEquity > 1.5) {
      setAdvice(`${stock.symbol} has a high debt-to-equity ratio of ${stock.debtToEquity.toFixed(2)}. Monitor the company's ability to service its debt.`);
      setAdviceType('warning');
      return;
    }
    
    // Random general advice
    const generalAdvice = [
      `${stock.symbol} is in the ${stock.sector} sector. Make sure your portfolio is diversified across multiple sectors.`,
      `Consider the company's competitive position in the ${stock.industry} industry before investing.`,
      `Review ${stock.symbol}'s recent financial statements and news before making investment decisions.`
    ];
    
    setAdvice(generalAdvice[Math.floor(Math.random() * generalAdvice.length)]);
    setAdviceType('info');
  };
  
  const generatePortfolioAdvice = () => {
    if (stocks.length === 0) {
      setAdvice("Your portfolio is empty. Start by researching and investing in a diversified set of stocks.");
      setAdviceType('info');
      return;
    }
    
    const { profitLoss, profitLossPercent } = getPortfolioPerformance();
    
    // Check portfolio diversification
    const sectors = new Set(stocks.map(stock => stock.sector));
    if (sectors.size < 3 && stocks.length >= 3) {
      setAdvice("Your portfolio has limited sector diversification. Consider investing in different sectors to reduce risk.");
      setAdviceType('warning');
      return;
    }
    
    // Check if portfolio is performing well or poorly
    if (profitLossPercent < -5) {
      setAdvice(`Your portfolio is down ${Math.abs(profitLossPercent).toFixed(2)}%. Don't panic - market downturns can present buying opportunities for quality stocks.`);
      setAdviceType('warning');
      return;
    }
    
    if (profitLossPercent > 10) {
      setAdvice(`Your portfolio is up ${profitLossPercent.toFixed(2)}%. Consider if it's time to rebalance or take some profits.`);
      setAdviceType('success');
      return;
    }
    
    // Random general portfolio advice
    const generalAdvice = [
      "Regular portfolio reviews are essential. Consider rebalancing quarterly to maintain your target asset allocation.",
      "Don't chase past performance. Focus on companies with strong fundamentals and reasonable valuations.",
      "Consider setting stop-loss orders to protect your investments from significant downturns."
    ];
    
    setAdvice(generalAdvice[Math.floor(Math.random() * generalAdvice.length)]);
    setAdviceType('info');
  };

  if (!isVisible) return null;

  const containerClass = placement === 'fixed' 
    ? 'fixed bottom-4 right-4 z-50 w-80 shadow-lg' 
    : 'w-full';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className={containerClass}
      >
        <Card className={`border ${
          adviceType === 'warning' ? 'border-orange-200 bg-orange-50' : 
          adviceType === 'success' ? 'border-green-200 bg-green-50' : 
          'border-blue-200 bg-blue-50'
        }`}>
          <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
            <div className="flex items-center">
              <div className={`rounded-full p-1.5 mr-2 ${
                adviceType === 'warning' ? 'bg-orange-100' : 
                adviceType === 'success' ? 'bg-green-100' : 
                'bg-blue-100'
              }`}>
                {adviceType === 'warning' ? (
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                ) : adviceType === 'success' ? (
                  <Lightbulb className="h-4 w-4 text-green-600" />
                ) : (
                  <Bot className="h-4 w-4 text-blue-600" />
                )}
              </div>
              <CardTitle className="text-sm font-medium">
                {adviceType === 'warning' ? 'Risk Analysis' : 
                 adviceType === 'success' ? 'Investment Opportunity' : 
                 'AI Advisor'}
              </CardTitle>
            </div>
            {onClose && (
              <Button variant="ghost" className="h-6 w-6 p-0" onClick={() => {
                setIsVisible(false);
                onClose();
              }}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <p className={`text-sm ${
              adviceType === 'warning' ? 'text-orange-700' : 
              adviceType === 'success' ? 'text-green-700' : 
              'text-blue-700'
            }`}>
              {advice}
            </p>
            
            <div className="flex justify-end mt-3">
              <Button 
                variant="ghost" 
                size="sm" 
                className={`text-xs ${
                  adviceType === 'warning' ? 'text-orange-700 hover:bg-orange-100' : 
                  adviceType === 'success' ? 'text-green-700 hover:bg-green-100' : 
                  'text-blue-700 hover:bg-blue-100'
                }`}
                onClick={() => {
                  if (selectedStock) {
                    generateStockAdvice(selectedStock);
                  } else {
                    generatePortfolioAdvice();
                  }
                }}
              >
                <MessageSquare className="h-3 w-3 mr-1" />
                More Advice
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default AIAdvisor;
