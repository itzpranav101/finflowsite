
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { StockData } from '@/data/stocksData';
import { usePortfolio } from '@/hooks/usePortfolio';
import { Slider } from "@/components/ui/slider";
import AIAdvisor from './AIAdvisor';

interface BuyStockModalProps {
  stock: StockData;
  isOpen: boolean;
  onClose: () => void;
}

const BuyStockModal = ({ stock, isOpen, onClose }: BuyStockModalProps) => {
  const [shares, setShares] = useState(1);
  const { toast } = useToast();
  const { addStock, cash } = usePortfolio();
  const [sliderValue, setSliderValue] = useState(1);
  const maxAffordableShares = Math.floor(cash / stock.price);

  const handleBuy = () => {
    if (shares <= 0) {
      toast({
        title: "Invalid shares amount",
        description: "Please enter a valid number of shares.",
        variant: "destructive",
      });
      return;
    }

    try {
      addStock(stock, shares);
      toast({
        title: "Stock purchased!",
        description: `Successfully bought ${shares} shares of ${stock.symbol}`,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error purchasing stock",
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
          <DialogTitle>Buy {stock.symbol}</DialogTitle>
          <DialogDescription>
            Current price: ${stock.price.toFixed(2)}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-600">Number of shares</label>
            <div className="flex items-center gap-3 mt-1">
              <Input 
                type="number"
                min="1"
                max={maxAffordableShares}
                value={shares}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value)) {
                    setShares(Math.min(Math.max(1, value), maxAffordableShares));
                    setSliderValue(Math.min(Math.max(1, value), maxAffordableShares));
                  }
                }}
                className="w-24"
              />
              <div className="flex-1">
                <Slider
                  value={[sliderValue]}
                  min={1}
                  max={Math.min(maxAffordableShares, 1000)}
                  step={1}
                  onValueChange={handleSliderChange}
                />
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  setShares(maxAffordableShares);
                  setSliderValue(maxAffordableShares);
                }}
              >
                Max
              </Button>
            </div>
          </div>
          
          <div className="bg-slate-50 p-3 rounded-md space-y-2">
            <div className="flex justify-between text-sm">
              <span>Available Cash:</span>
              <span className="font-medium">${cash.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Share Price:</span>
              <span className="font-medium">${stock.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm border-t pt-2 mt-2">
              <span>Total Cost:</span>
              <span className="font-medium">${(shares * stock.price).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Remaining Cash:</span>
              <span className={`font-medium ${cash - (shares * stock.price) < 0 ? 'text-red-600' : ''}`}>
                ${(cash - (shares * stock.price)).toFixed(2)}
              </span>
            </div>
          </div>
          
          <AIAdvisor selectedStock={stock} />
          
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleBuy}>Buy Now</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BuyStockModal;
