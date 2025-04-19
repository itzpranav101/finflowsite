
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Coins, TrendingUp, BookOpen } from "lucide-react";

interface AuthorInfo {
  name: string;
  bio: string;
  investmentStyle?: string;
  portfolio?: string[];
  techniques?: string[];
}

const authorData: Record<string, AuthorInfo> = {
  "Warren Buffett": {
    name: "Warren Buffett",
    bio: "Warren Buffett is an American business magnate, investor, and philanthropist. He is widely considered one of the most successful investors in the world and has a net worth of over $100 billion, making him one of the richest people globally.",
    investmentStyle: "Value Investing",
    portfolio: ["Apple", "Bank of America", "Coca-Cola", "American Express", "Kraft Heinz"],
    techniques: ["Long-term investing", "Buying undervalued companies", "Focus on companies with strong moats"]
  },
  "Ray Dalio": {
    name: "Ray Dalio",
    bio: "Ray Dalio is an American billionaire investor and hedge fund manager, who founded Bridgewater Associates. He served as co-chief investment officer of the world's largest hedge fund, which manages approximately $140 billion in global investments.",
    investmentStyle: "All Weather Portfolio Strategy",
    portfolio: ["Diversified ETFs", "Gold", "Treasury Bonds", "Emerging Markets"],
    techniques: ["Risk parity", "Diversification across asset classes", "Economic cycle investing"]
  },
  "Cathie Wood": {
    name: "Cathie Wood",
    bio: "Cathie Wood is the founder, CEO, and CIO of ARK Invest, an investment management firm focused on disruptive innovation. She is known for her investments in high-growth, innovative companies and technologies.",
    investmentStyle: "Disruptive Innovation Investing",
    portfolio: ["Tesla", "Roku", "Square (Block)", "Teladoc Health", "Coinbase"],
    techniques: ["Focus on emerging technologies", "High-growth potential", "Five-year investment horizon"]
  },
  "Peter Lynch": {
    name: "Peter Lynch",
    bio: "Peter Lynch is an American investor, mutual fund manager, and philanthropist. As the manager of the Magellan Fund at Fidelity Investments between 1977 and 1990, Lynch averaged a 29.2% annual return, consistently more than doubling the S&P 500 market index.",
    investmentStyle: "Growth at a Reasonable Price (GARP)",
    portfolio: ["Diverse across multiple sectors"],
    techniques: ["Invest in what you know", "Company research", "Finding overlooked opportunities"]
  },
  "Benjamin Graham": {
    name: "Benjamin Graham",
    bio: "Benjamin Graham was a British-born American economist, professor, and investor. He is widely known as the 'father of value investing' and mentor of Warren Buffett. His book 'The Intelligent Investor' is considered a foundational text in value investing.",
    investmentStyle: "Value Investing",
    portfolio: ["Historically focused on undervalued securities"],
    techniques: ["Margin of safety", "Intrinsic value calculation", "Focus on company fundamentals"]
  },
  "Charlie Munger": {
    name: "Charlie Munger",
    bio: "Charles Thomas Munger was an American billionaire investor, businessman, and former real estate attorney. He was vice chairman of Berkshire Hathaway, the conglomerate controlled by Warren Buffett, and Buffett's closest business partner and right-hand man.",
    investmentStyle: "Value Investing with Mental Models",
    portfolio: ["Berkshire Hathaway holdings", "Daily Journal Corporation"],
    techniques: ["Mental models", "Multidisciplinary thinking", "Avoiding stupidity"]
  }
};

interface AuthorPopoverProps {
  author: string;
  children: React.ReactNode;
}

const AuthorPopover = ({ author, children }: AuthorPopoverProps) => {
  const authorInfo = authorData[author] || {
    name: author,
    bio: "Information about this author is not available yet."
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <span className="text-blue-300 cursor-pointer hover:underline">
          {children}
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-slate-800 border border-slate-700 text-white p-0">
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">{authorInfo.name}</h3>
          <p className="text-slate-300 mb-3">{authorInfo.bio}</p>
          
          {authorInfo.investmentStyle && (
            <div className="mb-3">
              <div className="flex items-center gap-2 text-blue-300 mb-1">
                <TrendingUp size={16} />
                <h4 className="font-semibold">Investment Style</h4>
              </div>
              <p className="text-slate-300 ml-6">{authorInfo.investmentStyle}</p>
            </div>
          )}
          
          {authorInfo.portfolio && authorInfo.portfolio.length > 0 && (
            <div className="mb-3">
              <div className="flex items-center gap-2 text-green-300 mb-1">
                <Coins size={16} />
                <h4 className="font-semibold">Notable Investments</h4>
              </div>
              <ul className="text-slate-300 ml-6 list-disc list-inside">
                {authorInfo.portfolio.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          
          {authorInfo.techniques && authorInfo.techniques.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-purple-300 mb-1">
                <BookOpen size={16} />
                <h4 className="font-semibold">Key Techniques</h4>
              </div>
              <ul className="text-slate-300 ml-6 list-disc list-inside">
                {authorInfo.techniques.map((technique, index) => (
                  <li key={index}>{technique}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AuthorPopover;
