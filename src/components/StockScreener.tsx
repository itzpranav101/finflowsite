import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart2, 
  Search, 
  SlidersHorizontal, 
  CheckCircle, 
  XCircle,
  Info,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Percent,
  Briefcase,
  Building,
  Clock,
  BookOpen
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import FinancialTermTooltip from "@/components/FinancialTermTooltip";
import StockPriceUpdater from "@/components/StockPriceUpdater";
import allStocks, { StockData } from '@/data/stocksData';
import BuyStockModal from './BuyStockModal';

const StockScreener = () => {
  const [stocks, setStocks] = useState<StockData[]>(allStocks.slice(0, 25));
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState<string>("all");
  const [sortKey, setSortKey] = useState<keyof StockData>("marketCap");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null);
  const [hoveredStock, setHoveredStock] = useState<StockData | null>(null);
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);
  
  const sectors = ["all", ...Array.from(new Set(allStocks.map(stock => stock.sector)))];
  
  useEffect(() => {
    let filteredStocks = allStocks;
    
    if (searchTerm) {
      filteredStocks = filteredStocks.filter(stock => 
        stock.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedSector !== "all") {
      filteredStocks = filteredStocks.filter(stock => stock.sector === selectedSector);
    }
    
    filteredStocks = [...filteredStocks].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });
    
    setStocks(filteredStocks.slice(0, 25));
  }, [searchTerm, selectedSector, sortKey, sortDirection]);
  
  const handleSortChange = (key: keyof StockData) => {
    setSortDirection(prevDirection => 
      sortKey === key 
        ? prevDirection === "asc" ? "desc" : "asc" 
        : "desc"
    );
    setSortKey(key);
  };
  
  const handleRowClick = (stock: StockData) => {
    setSelectedStock(stock);
    setIsDetailVisible(true);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">Stock Screener</h2>
            <p className="text-slate-600">Discover and analyze investment opportunities</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
              <Input
                placeholder="Search stocks..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={selectedSector} onValueChange={setSelectedSector}>
              <SelectTrigger className="min-w-[180px]">
                <div className="flex items-center">
                  <Briefcase className="mr-2" size={16} />
                  <SelectValue placeholder="All Sectors" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {sectors.map((sector) => (
                  <SelectItem key={sector} value={sector}>
                    {sector === "all" ? "All Sectors" : sector}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal size={16} />
              <span className="hidden sm:inline">Filters</span>
            </Button>
          </div>
        </div>
        
        <Card className="overflow-hidden border-slate-200">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table className="w-full">
                <TableHeader className="bg-slate-50">
                  <TableRow>
                    <TableHead className="w-[100px]">Symbol</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-slate-100"
                      onClick={() => handleSortChange('price')}
                    >
                      <div className="flex items-center gap-1">
                        Price
                        {sortKey === 'price' && (
                          sortDirection === 'asc' ? 
                            <TrendingUp size={14} /> : 
                            <TrendingDown size={14} />
                        )}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-slate-100"
                      onClick={() => handleSortChange('marketCap')}
                    >
                      <div className="flex items-center gap-1">
                        <FinancialTermTooltip 
                          term="Market Cap" 
                          definition="The total value of all outstanding shares of a company, calculated by multiplying the share price by the number of shares outstanding."
                        >
                          <div className="flex items-center group">
                            <span className="text-light-blue-500">Market Cap</span>
                            <Info className="ml-1 h-3 w-3 text-blue-400 opacity-70 group-hover:opacity-100" />
                          </div>
                        </FinancialTermTooltip>
                        {sortKey === 'marketCap' && (
                          sortDirection === 'asc' ? 
                            <TrendingUp size={14} /> : 
                            <TrendingDown size={14} />
                        )}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-slate-100"
                      onClick={() => handleSortChange('peRatio')}
                    >
                      <div className="flex items-center gap-1">
                        <FinancialTermTooltip 
                          term="P/E Ratio" 
                          definition="Price-to-Earnings Ratio. A valuation ratio calculated by dividing a company's share price by its earnings per share (EPS). It shows how much investors are willing to pay per dollar of earnings."
                        >
                          <div className="flex items-center group">
                            <span className="text-light-blue-500">P/E Ratio</span>
                            <Info className="ml-1 h-3 w-3 text-blue-400 opacity-70 group-hover:opacity-100" />
                          </div>
                        </FinancialTermTooltip>
                        {sortKey === 'peRatio' && (
                          sortDirection === 'asc' ? 
                            <TrendingUp size={14} /> : 
                            <TrendingDown size={14} />
                        )}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-slate-100"
                      onClick={() => handleSortChange('dividendYield')}
                    >
                      <div className="flex items-center gap-1">
                        <FinancialTermTooltip 
                          term="Dividend Yield" 
                          definition="A financial ratio showing how much a company pays out in dividends each year relative to its stock price, expressed as a percentage."
                        >
                          <div className="flex items-center group">
                            <span className="text-light-blue-500">Dividend Yield</span>
                            <Info className="ml-1 h-3 w-3 text-blue-400 opacity-70 group-hover:opacity-100" />
                          </div>
                        </FinancialTermTooltip>
                        {sortKey === 'dividendYield' && (
                          sortDirection === 'asc' ? 
                            <TrendingUp size={14} /> : 
                            <TrendingDown size={14} />
                        )}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-slate-100"
                      onClick={() => handleSortChange('roe')}
                    >
                      <div className="flex items-center gap-1">
                        <FinancialTermTooltip 
                          term="ROE" 
                          definition="Return on Equity. A measure of financial performance calculated by dividing net income by shareholders' equity, showing how efficiently a company uses its equity to generate profits."
                        >
                          <div className="flex items-center group">
                            <span className="text-light-blue-500">ROE</span>
                            <Info className="ml-1 h-3 w-3 text-blue-400 opacity-70 group-hover:opacity-100" />
                          </div>
                        </FinancialTermTooltip>
                        {sortKey === 'roe' && (
                          sortDirection === 'asc' ? 
                            <TrendingUp size={14} /> : 
                            <TrendingDown size={14} />
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="text-right">Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {stocks.map((stock) => (
                      <motion.tr
                        key={stock.symbol}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        whileHover={{ backgroundColor: "rgba(243, 244, 246, 0.5)" }}
                        className="cursor-pointer hover:bg-slate-50"
                        onClick={() => handleRowClick(stock)}
                        onMouseEnter={() => setHoveredStock(stock)}
                        onMouseLeave={() => setHoveredStock(null)}
                      >
                        <TableCell className="font-medium">{stock.symbol}</TableCell>
                        <TableCell>{stock.name}</TableCell>
                        <TableCell>
                          <StockPriceUpdater stock={stock} />
                        </TableCell>
                        <TableCell className="text-light-blue-500">
                          ${(stock.marketCap / 1000000000).toFixed(2)}B
                        </TableCell>
                        <TableCell className="text-light-blue-500">{stock.peRatio.toFixed(2)}</TableCell>
                        <TableCell className="text-light-blue-500">{stock.dividendYield.toFixed(2)}%</TableCell>
                        <TableCell className="text-light-blue-500">{stock.roe.toFixed(2)}%</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="rounded-full">
                            <Info size={16} />
                          </Button>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        
        <AnimatePresence>
          {hoveredStock && !isDetailVisible && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-4 right-4 w-72 bg-white shadow-lg rounded-lg border border-slate-200 p-4 z-50"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">{hoveredStock.symbol}</h3>
                  <p className="text-sm text-slate-600">{hoveredStock.name}</p>
                </div>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setHoveredStock(null)}>
                  <XCircle size={16} />
                </Button>
              </div>
              
              <div className="mt-2 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">Sector:</span>
                  <span className="text-xs font-medium">{hoveredStock.sector}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">Industry:</span>
                  <span className="text-xs font-medium">{hoveredStock.industry}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">Established:</span>
                  <span className="text-xs font-medium">{hoveredStock.establishedYear}</span>
                </div>
              </div>
              
              <Button className="w-full mt-3 text-xs py-1" size="sm" onClick={() => handleRowClick(hoveredStock)}>
                View Details
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {isDetailVisible && selectedStock && (
            <motion.div
              key="stock-detail"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={() => setIsDetailVisible(false)}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <h2 className="text-2xl font-bold text-slate-800">{selectedStock.name}</h2>
                        <div className="ml-3 px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-sm font-medium">
                          {selectedStock.symbol}
                        </div>
                      </div>
                      <p className="text-slate-600 mt-1">{selectedStock.industry} · {selectedStock.sector}</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button onClick={() => setShowBuyModal(true)} className="bg-green-500 hover:bg-green-600">
                        Buy Stock
                      </Button>
                      <Button variant="ghost" className="rounded-full" onClick={() => setIsDetailVisible(false)}>
                        <XCircle size={20} />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <Card className="md:col-span-2">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Price & Performance</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-end space-x-4">
                          <div>
                            <StockPriceUpdater stock={selectedStock} />
                          </div>
                          <div className="text-sm text-slate-500">
                            52W Range: <span className="font-medium">${selectedStock.low52Week} - ${selectedStock.high52Week}</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                          <div className="bg-slate-50 p-3 rounded-lg">
                            <p className="text-xs text-slate-500">Market Cap</p>
                            <p className="text-lg font-semibold text-blue-500">
                              ${(selectedStock.marketCap / 1000000000).toFixed(2)}B
                            </p>
                          </div>
                          <div className="bg-slate-50 p-3 rounded-lg">
                            <p className="text-xs text-slate-500">Volume</p>
                            <p className="text-lg font-semibold text-blue-500">
                              {(selectedStock.volume / 1000000).toFixed(2)}M
                            </p>
                          </div>
                          <div className="bg-slate-50 p-3 rounded-lg">
                            <p className="text-xs text-slate-500">P/E Ratio</p>
                            <p className="text-lg font-semibold text-blue-500">
                              {selectedStock.peRatio.toFixed(2)}
                            </p>
                          </div>
                          <div className="bg-slate-50 p-3 rounded-lg">
                            <p className="text-xs text-slate-500">EPS</p>
                            <p className="text-lg font-semibold text-blue-500">
                              ${selectedStock.eps.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Key Metrics</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-600">ROE</span>
                          <span className="font-medium text-blue-500">{selectedStock.roe.toFixed(2)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-600">ROCE</span>
                          <span className="font-medium text-blue-500">{selectedStock.roce.toFixed(2)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-600">Dividend Yield</span>
                          <span className="font-medium text-blue-500">{selectedStock.dividendYield.toFixed(2)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-600">Debt/Equity</span>
                          <span className="font-medium text-blue-500">{selectedStock.debtToEquity.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-600">Current Ratio</span>
                          <span className="font-medium text-blue-500">{selectedStock.currentRatio.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-600">Book Value</span>
                          <span className="font-medium text-blue-500">${selectedStock.bookValue.toFixed(2)}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="mt-6">
                    <Tabs defaultValue="overview">
                      <TabsList className="w-full bg-slate-100 p-1">
                        <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
                        <TabsTrigger value="pros-cons" className="flex-1">Pros & Cons</TabsTrigger>
                        <TabsTrigger value="financials" className="flex-1">Financials</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="overview" className="pt-4">
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-medium text-lg text-slate-800 mb-2">Company Description</h3>
                            <p className="text-slate-600">{selectedStock.description}</p>
                          </div>
                          
                          {selectedStock.keyPoints && selectedStock.keyPoints.length > 0 && (
                            <div>
                              <h3 className="font-medium text-lg text-slate-800 mb-2">Key Points</h3>
                              <ul className="space-y-2">
                                {selectedStock.keyPoints.map((point, idx) => (
                                  <motion.li 
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * idx }}
                                    className="flex items-start"
                                  >
                                    <CheckCircle className="text-green-500 mr-2 min-w-[16px] mt-1" size={16} />
                                    <span className="text-slate-600">{point}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                            <div className="bg-blue-50 p-4 rounded-lg">
                              <h4 className="font-medium text-blue-900 flex items-center">
                                <Building className="mr-2" size={16} />
                                Company Info
                              </h4>
                              <div className="mt-3 space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm text-blue-700">Founded</span>
                                  <span className="text-sm font-medium">{selectedStock.establishedYear}</span>
                                </div>
                                {selectedStock.website && (
                                  <div className="flex justify-between">
                                    <span className="text-sm text-blue-700">Website</span>
                                    <a 
                                      href={`https://${selectedStock.website}`} 
                                      target="_blank" 
                                      rel="noopener noreferrer" 
                                      className="text-sm font-medium text-blue-600 hover:underline"
                                    >
                                      {selectedStock.website}
                                    </a>
                                  </div>
                                )}
                                {selectedStock.promoterHolding !== undefined && (
                                  <div className="flex justify-between">
                                    <span className="text-sm text-blue-700">Promoter Holding</span>
                                    <span className="text-sm font-medium">{selectedStock.promoterHolding.toFixed(2)}%</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <div className="bg-amber-50 p-4 rounded-lg">
                              <h4 className="font-medium text-amber-900 flex items-center">
                                <Clock className="mr-2" size={16} />
                                Trading Info
                              </h4>
                              <div className="mt-3 space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm text-amber-700">Face Value</span>
                                  <span className="text-sm font-medium">${selectedStock.faceValue}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-amber-700">52 Week High</span>
                                  <span className="text-sm font-medium">${selectedStock.high52Week}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-amber-700">52 Week Low</span>
                                  <span className="text-sm font-medium">${selectedStock.low52Week}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="pros-cons" className="pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Card className="bg-green-50 border-green-100">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg text-green-800 flex items-center">
                                <CheckCircle className="mr-2" size={18} />
                                Pros
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              {selectedStock.pros && selectedStock.pros.length > 0 ? (
                                <ul className="space-y-2">
                                  {selectedStock.pros.map((pro, idx) => (
                                    <motion.li 
                                      key={idx}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: 0.1 * idx }}
                                      className="flex items-start"
                                    >
                                      <CheckCircle className="text-green-600 mr-2 min-w-[16px] mt-1" size={16} />
                                      <span className="text-green-800">{pro}</span>
                                    </motion.li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="text-slate-600 italic">No pros information available</p>
                              )}
                            </CardContent>
                          </Card>
                          
                          <Card className="bg-red-50 border-red-100">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg text-red-800 flex items-center">
                                <XCircle className="mr-2" size={18} />
                                Cons
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              {selectedStock.cons && selectedStock.cons.length > 0 ? (
                                <ul className="space-y-2">
                                  {selectedStock.cons.map((con, idx) => (
                                    <motion.li 
                                      key={idx}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: 0.1 * idx }}
                                      className="flex items-start"
                                    >
                                      <XCircle className="text-red-600 mr-2 min-w-[16px] mt-1" size={16} />
                                      <span className="text-red-800">{con}</span>
                                    </motion.li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="text-slate-600 italic">No cons information available</p>
                              )}
                            </CardContent>
                          </Card>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="financials" className="pt-4">
                        <div className="space-y-6">
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">Key Financial Ratios</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="space-y-1">
                                  <p className="text-xs text-slate-500">P/E Ratio</p>
                                  <p className="text-lg font-semibold text-blue-500">{selectedStock.peRatio.toFixed(2)}</p>
                                  <p className="text-xs text-slate-600">Price to Earnings</p>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-xs text-slate-500">ROE</p>
                                  <p className="text-lg font-semibold text-blue-500">{selectedStock.roe.toFixed(2)}%</p>
                                  <p className="text-xs text-slate-600">Return on Equity</p>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-xs text-slate-500">ROCE</p>
                                  <p className="text-lg font-semibold text-blue-500">{selectedStock.roce.toFixed(2)}%</p>
                                  <p className="text-xs text-slate-600">Return on Capital Employed</p>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-xs text-slate-500">D/E Ratio</p>
                                  <p className="text-lg font-semibold text-blue-500">{selectedStock.debtToEquity.toFixed(2)}</p>
                                  <p className="text-xs text-slate-600">Debt to Equity</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                          
                          <div className="text-center p-8 bg-slate-50 rounded-lg">
                            <BookOpen className="mx-auto text-slate-400 mb-3" size={32} />
                            <h3 className="text-lg font-medium text-slate-700">Financial Education</h3>
                            <p className="text-slate-600 mt-2 max-w-lg mx-auto">
                              Understanding these financial metrics can help you make better investment decisions. 
                              Check our learning modules to learn more about stock analysis.
                            </p>
                            <Button className="mt-4">
                              Learn More About Stock Analysis
                            </Button>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
                
                <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-between items-center">
                  <p className="text-sm text-slate-600">
                    <span className="font-medium">Note:</span> This is simulated data for educational purposes.
                  </p>
                  <Button onClick={() => setIsDetailVisible(false)}>Close</Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {selectedStock && (
        <BuyStockModal
          stock={selectedStock}
          isOpen={showBuyModal}
          onClose={() => setShowBuyModal(false)}
        />
      )}
    </div>
  );
};

export default StockScreener;
