
import { useState, useEffect } from 'react';
import { StockData } from '@/data/stocksData';
import { ArrowUpRight, ArrowDownRight, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface StockPriceUpdaterProps {
  stock: StockData;
}

const StockPriceUpdater = ({ stock }: StockPriceUpdaterProps) => {
  const [currentPrice, setCurrentPrice] = useState(stock.price);
  const [previousPrice, setPreviousPrice] = useState(stock.price);
  const [priceChange, setPriceChange] = useState(0);
  const [changePercent, setChangePercent] = useState(0);
  const [explanation, setExplanation] = useState<string>("");
  
  useEffect(() => {
    const interval = setInterval(() => {
      // Random fluctuation between -1.5% and +1.5%
      const fluctuation = (Math.random() * 3 - 1.5) / 100;
      setPreviousPrice(currentPrice);
      const newPrice = parseFloat((currentPrice * (1 + fluctuation)).toFixed(2));
      setCurrentPrice(newPrice);
      
      // Calculate change from original price
      const newChange = parseFloat((newPrice - stock.price).toFixed(2));
      setPriceChange(newChange);
      
      // Calculate percent change
      const newPercentChange = parseFloat(((newChange / stock.price) * 100).toFixed(2));
      setChangePercent(newPercentChange);
      
      // Generate detailed explanation for price change
      generatePriceChangeExplanation(fluctuation, stock.sector, stock.industry);
    }, 4000); // Update every 4 seconds
    
    return () => clearInterval(interval);
  }, [currentPrice, stock.price, stock.sector, stock.industry]);
  
  // Generate detailed explanation for price change
  const generatePriceChangeExplanation = (fluctuation: number, sector: string, industry: string) => {
    const isPositive = fluctuation > 0;
    const magnitude = Math.abs(fluctuation) * 100;
    
    // Factors that could affect stock price
    const marketFactors = [
      "overall market sentiment",
      "sector-wide trends",
      "trading volume changes",
      "investor confidence",
      "algorithm-triggered trading",
      "institutional buying pressure",
      "short-selling activity",
      "retail investor activity"
    ];
    
    const companyFactors = [
      "anticipated earnings reports",
      "analyst recommendation changes",
      "product development news",
      "competitive positioning",
      "corporate governance updates",
      "management changes",
      "merger and acquisition rumors",
      "intellectual property developments"
    ];
    
    const economicFactors = [
      "interest rate expectations",
      "inflation data",
      "employment statistics",
      "supply chain developments",
      "regulatory changes",
      "international trade relations",
      "commodity price movements",
      "currency exchange fluctuations"
    ];
    
    // Select random factors based on magnitude of change
    const numFactors = magnitude < 0.5 ? 1 : magnitude < 1 ? 2 : 3;
    const allFactors = [...marketFactors, ...companyFactors, ...economicFactors];
    const selectedFactors: string[] = [];
    
    for (let i = 0; i < numFactors; i++) {
      const randomIndex = Math.floor(Math.random() * allFactors.length);
      const factor = allFactors[randomIndex];
      if (!selectedFactors.includes(factor)) {
        selectedFactors.push(factor);
        allFactors.splice(randomIndex, 1);
      }
    }
    
    // Sector-specific reasons
    const sectorReasons: Record<string, string[]> = {
      "Technology": [
        "changes in semiconductor demand",
        "software subscription growth",
        "cloud computing adoption rates",
        "cybersecurity concerns",
        "artificial intelligence developments"
      ],
      "Healthcare": [
        "clinical trial results",
        "FDA approval progress",
        "healthcare policy changes",
        "insurance reimbursement changes",
        "patent expiration concerns"
      ],
      "Financial Services": [
        "interest rate sensitivity",
        "loan default rates",
        "banking regulation changes",
        "fintech competition",
        "asset management performance"
      ],
      "Consumer Cyclical": [
        "consumer spending trends",
        "retail sales data",
        "seasonal shopping patterns",
        "e-commerce penetration",
        "brand sentiment analysis"
      ],
      "Energy": [
        "crude oil price movements",
        "natural gas inventories",
        "renewable energy adoption",
        "production capacity changes",
        "environmental regulation impact"
      ]
    };
    
    // Add a sector-specific reason if available
    if (sector in sectorReasons) {
      const randomSectorReason = sectorReasons[sector][Math.floor(Math.random() * sectorReasons[sector].length)];
      selectedFactors.push(randomSectorReason);
    }
    
    // Create description sentence
    let reason = `${stock.symbol} ${isPositive ? 'gained' : 'declined'} ${magnitude.toFixed(2)}% due to `;
    
    if (selectedFactors.length === 1) {
      reason += selectedFactors[0] + ".";
    } else if (selectedFactors.length === 2) {
      reason += `${selectedFactors[0]} and ${selectedFactors[1]}.`;
    } else {
      const lastFactor = selectedFactors.pop();
      reason += `${selectedFactors.join(', ')}, and ${lastFactor}.`;
    }
    
    // Add extra context based on price movement
    if (isPositive) {
      if (magnitude > 1) {
        reason += ` Analysts are expressing optimism about ${stock.name}'s position in the ${industry} industry.`;
      } else {
        reason += ` Market observers note modest positive momentum for ${sector} stocks overall.`;
      }
    } else {
      if (magnitude > 1) {
        reason += ` Some analysts are recommending caution for ${industry} stocks in the near term.`;
      } else {
        reason += ` This represents normal market volatility for ${sector} companies.`;
      }
    }
    
    setExplanation(reason);
  };
  
  // Determine if price increased or decreased from previous update
  const hasIncreased = currentPrice > previousPrice;
  const hasDecreased = currentPrice < previousPrice;
  
  return (
    <div className="inline-flex items-center">
      <div className="flex flex-col">
        <motion.div 
          key={currentPrice}
          initial={{ opacity: 0.8 }} 
          animate={{ opacity: 1 }} 
          className={`font-semibold ${hasIncreased ? 'text-green-600' : hasDecreased ? 'text-red-600' : ''}`}
        >
          ${currentPrice.toFixed(2)}
        </motion.div>
        <div className={`flex items-center text-xs ${priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {priceChange >= 0 ? (
            <ArrowUpRight size={12} className="mr-1" />
          ) : (
            <ArrowDownRight size={12} className="mr-1" />
          )}
          <span>{priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)} ({changePercent >= 0 ? '+' : ''}{changePercent.toFixed(2)}%)</span>
        </div>
      </div>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="ml-2 text-slate-400 hover:text-slate-600"
              aria-label="Price change explanation"
            >
              <Info size={16} />
            </motion.button>
          </TooltipTrigger>
          <TooltipContent className="max-w-md bg-white p-4 shadow-lg rounded-lg border">
            <p className="text-sm">{explanation}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default StockPriceUpdater;
