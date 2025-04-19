
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { usePortfolio } from '@/hooks/usePortfolio';
import { Slider } from "@/components/ui/slider";
import { PortfolioStock } from '@/types/portfolio';

interface SellStockModalProps {
  stock: PortfolioStock;
  isOpen: boolean;
  onClose: () => void;
}

const SellStockModal = ({ stock, isOpen, onClose }: SellStockModalProps) => {
  const [shares, setShares] = useState(1);
  const { toast } = useToast();
  const { sellStock } = usePortfolio();
  const [sliderValue, setSliderValue] = useState(1);

  const handleSell = () => {
    if (shares <= 0) {
      toast({
        title: "Invalid shares amount",
        description: "Please enter a valid number of shares.",
        variant: "destructive",
      });
      return;
    }

    if (shares > stock.shares) {
      toast({
        title: "Too many shares",
        description: `You only have ${stock.shares} shares of ${stock.symbol}.`,
        variant: "destructive",
      });
      return;
    }

    try {
      sellStock(stock.symbol, shares, stock.price);
      toast({
        title: "Stock sold!",
        description: `Successfully sold ${shares} shares of ${stock.symbol} for $${(shares * stock.price).toFixed(2)}`,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error selling stock",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    }
  };

  const handleSliderChange = (value: number[]) => {
    const newValue = Math.round(value[0]);
    setSliderValue(newValue);
    setShares(newValue);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Sell {stock.symbol}</DialogTitle>
          <DialogDescription>
            Current price: ${stock.price.toFixed(2)} | You own: {stock.shares} shares
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-600">Number of shares to sell</label>
            <div className="flex items-center gap-3 mt-1">
              <Input 
                type="number"
                min="1"
                max={stock.shares}
                value={shares}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value)) {
                    setShares(Math.min(Math.max(1, value), stock.shares));
                    setSliderValue(Math.min(Math.max(1, value), stock.shares));
                  }
                }}
                className="w-24"
              />
              <div className="flex-1">
                <Slider
                  value={[sliderValue]}
                  min={1}
                  max={stock.shares}
                  step={1}
                  onValueChange={handleSliderChange}
                />
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  setShares(stock.shares);
                  setSliderValue(stock.shares);
                }}
              >
                Max
              </Button>
            </div>
          </div>
          
          <div className="bg-slate-50 p-3 rounded-md space-y-2">
            <div className="flex justify-between text-sm">
              <span>Sell Price:</span>
              <span className="font-medium">${stock.price.toFixed(2)} per share</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Total Sale Value:</span>
              <span className="font-medium">${(shares * stock.price).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Original Cost Basis:</span>
              <span className="font-medium">${(shares * stock.purchasePrice).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm border-t pt-2 mt-2">
              <span>P/L for this Sale:</span>
              <span className={`font-medium ${shares * (stock.price - stock.purchasePrice) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${(shares * (stock.price - stock.purchasePrice)).toFixed(2)}
              </span>
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button 
              onClick={handleSell}
              variant="default"
              className="bg-red-500 hover:bg-red-600"
            >
              Sell Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SellStockModal;
