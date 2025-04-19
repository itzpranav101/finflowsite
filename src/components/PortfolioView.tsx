import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, TrendingUp, TrendingDown, DollarSign, BarChart2, LineChart, Clock, ArrowUpDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { usePortfolio } from '@/hooks/usePortfolio';
import { Table, TableHeader, TableRow, TableBody, TableCell, TableHead } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SellStockModal from './SellStockModal';
import AIAdvisor from './AIAdvisor';

const PortfolioView = ({ onExploreStocks }: { onExploreStocks: () => void }) => {
  const { stocks: portfolioStocks, cash, getPortfolioPerformance } = usePortfolio();
  const [selectedStock, setSelectedStock] = useState<any | null>(null);
  const [showSellModal, setShowSellModal] = useState(false);
  const portfolioValue = portfolioStocks.reduce((acc, stock) => acc + stock.totalValue, 0);
  const totalAccountValue = portfolioValue + cash;
  const { profitLoss, profitLossPercent } = getPortfolioPerformance();

  const handleSellClick = (stock: any) => {
    setSelectedStock(stock);
    setShowSellModal(true);
  };

  if (portfolioStocks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-10"
      >
        <div className="bg-blue-50 rounded-full p-4 inline-flex items-center justify-center mb-4">
          <Briefcase className="h-8 w-8 text-blue-500" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Your Portfolio is Empty</h2>
        <p className="text-slate-600 max-w-md mx-auto mb-6">
          Start building your investment portfolio by exploring stocks in the screener and making your first trade.
        </p>
        <Button onClick={onExploreStocks}>
          Explore Stocks
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-500">Portfolio Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              ${portfolioValue.toFixed(2)}
            </div>
            <div className={`text-sm flex items-center ${profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {profitLoss >= 0 ? <ArrowUpRight className="mr-1" size={14} /> : <ArrowDownRight className="mr-1" size={14} />}
              {profitLoss.toFixed(2)} ({profitLossPercent.toFixed(2)}%)
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-500">Cash Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              ${cash.toFixed(2)}
            </div>
            <div className="text-sm text-slate-500">Available for trading</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-500">Total Account Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              ${totalAccountValue.toFixed(2)}
            </div>
            <div className="text-sm text-slate-500">Cash + Investments</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-500">Positions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {portfolioStocks.length}
            </div>
            <div className="text-sm text-slate-500">Active investments</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="holdings">
            <TabsList>
              <TabsTrigger value="holdings" className="flex items-center">
                <Briefcase className="mr-2" size={14} />
                Holdings
              </TabsTrigger>
              <TabsTrigger value="performance" className="flex items-center">
                <LineChart className="mr-2" size={14} />
                Performance
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex items-center">
                <Clock className="mr-2" size={14} />
                Activity
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="holdings" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Symbol</TableHead>
                        <TableHead>Shares</TableHead>
                        <TableHead>Avg Price</TableHead>
                        <TableHead>Current</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>P/L</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {portfolioStocks.map((stock) => {
                        const profitLoss = stock.totalValue - (stock.purchasePrice * stock.shares);
                        const profitLossPercent = (profitLoss / (stock.purchasePrice * stock.shares)) * 100;
                        
                        return (
                          <TableRow key={stock.symbol}>
                            <TableCell className="font-medium">{stock.symbol}</TableCell>
                            <TableCell>{stock.shares}</TableCell>
                            <TableCell>${stock.purchasePrice.toFixed(2)}</TableCell>
                            <TableCell>${stock.price.toFixed(2)}</TableCell>
                            <TableCell>${stock.totalValue.toFixed(2)}</TableCell>
                            <TableCell>
                              <div className={`flex items-center gap-1 ${profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {profitLoss >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                                {profitLoss.toFixed(2)} ({profitLossPercent.toFixed(2)}%)
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="outline" size="sm" onClick={() => handleSellClick(stock)}>
                                Sell
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="performance" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <BarChart2 className="h-16 w-16 mx-auto text-slate-300 mb-4" />
                    <p className="text-slate-500">Portfolio performance visualization will be available here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="activity" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {portfolioStocks.flatMap(stock => 
                      stock.transactions.map((transaction, index) => (
                        <div key={`${stock.symbol}-${index}`} className="flex items-center justify-between border-b pb-3">
                          <div className="flex items-center">
                            <div className={`p-2 rounded-full mr-3 ${transaction.type === 'buy' ? 'bg-green-100' : 'bg-red-100'}`}>
                              {transaction.type === 'buy' ? (
                                <ArrowUpRight className={`h-4 w-4 ${transaction.type === 'buy' ? 'text-green-600' : 'text-red-600'}`} />
                              ) : (
                                <ArrowDownRight className={`h-4 w-4 text-red-600`} />
                              )}
                            </div>
                            <div>
                              <div className="font-medium">{transaction.type === 'buy' ? 'Bought' : 'Sold'} {stock.symbol}</div>
                              <div className="text-sm text-slate-500">{transaction.date.toLocaleDateString()}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{transaction.shares} shares</div>
                            <div className="text-sm text-slate-500">${transaction.price.toFixed(2)} per share</div>
                          </div>
                        </div>
                      ))
                    ).sort((a, b) => {
                      const dateA = new Date(a.key.split('-')[1]);
                      const dateB = new Date(b.key.split('-')[1]);
                      return dateB.getTime() - dateA.getTime();
                    }).slice(0, 10)}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <AIAdvisor />
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-base">Portfolio Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {portfolioStocks.map(stock => (
                  <div key={stock.symbol} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{stock.symbol}</span>
                      <span className="font-medium">{((stock.totalValue / portfolioValue) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${(stock.totalValue / portfolioValue) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {selectedStock && (
        <SellStockModal
          stock={selectedStock}
          isOpen={showSellModal}
          onClose={() => setShowSellModal(false)}
        />
      )}
    </motion.div>
  );
};

export default PortfolioView;
