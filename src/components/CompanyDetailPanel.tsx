
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpFromLine, ArrowDownFromLine, TrendingUp, Building, BarChart2, PieChart, AlertTriangle, CheckCircle, ChevronRight } from "lucide-react";
import FinancialTermTooltip from "./FinancialTermTooltip";
import { motion } from "framer-motion";

// Company detail types
export interface CompanyDetail {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: number;
  peRatio: number;
  bookValue: number;
  dividendYield: number;
  roce: number;
  roe: number;
  faceValue: number;
  industry: string;
  establishedYear: number;
  description: string;
  keyPoints: string[];
  pros: string[];
  cons: string[];
}

// Peer company comparison type
export interface PeerCompany {
  symbol: string;
  name: string;
  price: number;
  peRatio: number;
  roe: number;
  marketCap: number;
}

interface CompanyDetailPanelProps {
  company: CompanyDetail;
  peers: PeerCompany[];
  onClose: () => void;
}

const formatNumberWithCommas = (number: number) => {
  return number.toLocaleString('en-US', { maximumFractionDigits: 2 });
};

const formatMarketCap = (marketCap: number) => {
  if (marketCap >= 1e12) {
    return `$${(marketCap / 1e12).toFixed(2)}T`;
  } else if (marketCap >= 1e9) {
    return `$${(marketCap / 1e9).toFixed(2)}B`;
  } else if (marketCap >= 1e6) {
    return `$${(marketCap / 1e6).toFixed(2)}M`;
  } else {
    return `$${marketCap.toFixed(2)}`;
  }
};

const CompanyDetailPanel = ({ company, peers, onClose }: CompanyDetailPanelProps) => {
  return (
    <Card className="bg-white border-slate-200 overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center">
              <CardTitle className="text-2xl mr-2">{company.name}</CardTitle>
              <span className="text-sm bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                {company.symbol}
              </span>
            </div>
            <CardDescription className="mt-1">
              {company.industry} • Est. {company.establishedYear}
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">${company.price.toFixed(2)}</div>
            <div className={`flex items-center justify-end text-sm font-medium ${
              company.change >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {company.change >= 0 ? (
                <ArrowUpFromLine size={14} className="mr-1" />
              ) : (
                <ArrowDownFromLine size={14} className="mr-1" />
              )}
              {company.change >= 0 ? '+' : ''}{company.change.toFixed(2)} ({company.changePercent.toFixed(2)}%)
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <Tabs defaultValue="overview" className="w-full">
          <div className="border-b border-slate-200">
            <TabsList className="bg-transparent h-auto p-0">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-700 data-[state=active]:shadow-none rounded-none px-4 py-3"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="financials" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-700 data-[state=active]:shadow-none rounded-none px-4 py-3"
              >
                Financials
              </TabsTrigger>
              <TabsTrigger 
                value="analysis" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-700 data-[state=active]:shadow-none rounded-none px-4 py-3"
              >
                Analysis
              </TabsTrigger>
              <TabsTrigger 
                value="peers" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-700 data-[state=active]:shadow-none rounded-none px-4 py-3"
              >
                Peers
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="overview" className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium mb-2">About {company.name}</h3>
                <p className="text-slate-600 mb-4">{company.description}</p>
                
                <h4 className="font-medium mb-2">Key Points</h4>
                <ul className="space-y-1 mb-6">
                  {company.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <ChevronRight size={16} className="text-blue-500 mt-1 mr-1 flex-shrink-0" />
                      <span className="text-slate-600 text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border border-green-100 rounded-lg p-4 bg-green-50">
                    <h4 className="flex items-center text-green-700 font-medium mb-2">
                      <CheckCircle size={16} className="mr-1" />
                      Pros
                    </h4>
                    <ul className="space-y-2">
                      {company.pros.map((pro, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 mr-2"></div>
                          <span className="text-sm text-slate-700">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="border border-amber-100 rounded-lg p-4 bg-amber-50">
                    <h4 className="flex items-center text-amber-700 font-medium mb-2">
                      <AlertTriangle size={16} className="mr-1" />
                      Cons
                    </h4>
                    <ul className="space-y-2">
                      {company.cons.map((con, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 mr-2"></div>
                          <span className="text-sm text-slate-700">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-3">Key Metrics</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-slate-200">
                      <FinancialTermTooltip
                        term="Market Cap"
                        definition="The total value of a company's outstanding shares, calculated by multiplying the stock price by the number of shares outstanding."
                      >
                        <span className="text-blue-500 cursor-help">Market Cap</span>
                      </FinancialTermTooltip>
                      <span className="font-medium">{formatMarketCap(company.marketCap)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2 border-b border-slate-200">
                      <FinancialTermTooltip
                        term="P/E Ratio"
                        definition="Price-to-Earnings Ratio: A company's stock price divided by its earnings per share. Helps assess if a stock is over/undervalued."
                      >
                        <span className="text-blue-500 cursor-help">P/E Ratio</span>
                      </FinancialTermTooltip>
                      <span className="font-medium">{company.peRatio.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2 border-b border-slate-200">
                      <FinancialTermTooltip
                        term="Book Value"
                        definition="The net asset value of a company, calculated by subtracting total liabilities from total assets."
                      >
                        <span className="text-blue-500 cursor-help">Book Value</span>
                      </FinancialTermTooltip>
                      <span className="font-medium">${company.bookValue.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2 border-b border-slate-200">
                      <FinancialTermTooltip
                        term="Dividend Yield"
                        definition="A financial ratio that shows how much a company pays out in dividends each year relative to its stock price."
                      >
                        <span className="text-blue-500 cursor-help">Dividend Yield</span>
                      </FinancialTermTooltip>
                      <span className="font-medium">{company.dividendYield.toFixed(2)}%</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2 border-b border-slate-200">
                      <FinancialTermTooltip
                        term="ROCE"
                        definition="Return on Capital Employed: A financial ratio that measures a company's profitability and the efficiency with which its capital is used."
                      >
                        <span className="text-blue-500 cursor-help">ROCE</span>
                      </FinancialTermTooltip>
                      <span className="font-medium">{company.roce.toFixed(2)}%</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2">
                      <FinancialTermTooltip
                        term="ROE"
                        definition="Return on Equity: A measure of financial performance calculated by dividing net income by shareholders' equity."
                      >
                        <span className="text-blue-500 cursor-help">ROE</span>
                      </FinancialTermTooltip>
                      <span className="font-medium">{company.roe.toFixed(2)}%</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <TrendingUp size={18} className="text-blue-600 mr-2" />
                    <h3 className="text-lg font-medium text-blue-800">Quick Analysis</h3>
                  </div>
                  
                  <div className="space-y-2">
                    {/* Dynamic analysis based on metrics */}
                    {company.peRatio < 15 && (
                      <div className="flex items-start">
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 mr-2"></div>
                        <span className="text-sm text-slate-700">Trading at a relatively low P/E ratio</span>
                      </div>
                    )}
                    
                    {company.peRatio > 30 && (
                      <div className="flex items-start">
                        <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 mr-2"></div>
                        <span className="text-sm text-slate-700">Higher P/E ratio may indicate overvaluation</span>
                      </div>
                    )}
                    
                    {company.dividendYield > 3 && (
                      <div className="flex items-start">
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 mr-2"></div>
                        <span className="text-sm text-slate-700">Above-average dividend yield</span>
                      </div>
                    )}
                    
                    {company.roe > 15 && (
                      <div className="flex items-start">
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 mr-2"></div>
                        <span className="text-sm text-slate-700">Strong return on equity</span>
                      </div>
                    )}
                    
                    {company.roe < 10 && (
                      <div className="flex items-start">
                        <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 mr-2"></div>
                        <span className="text-sm text-slate-700">Below-average return on equity</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="financials" className="p-4">
            <div className="flex items-center justify-center h-64">
              <div className="text-slate-500 text-center">
                <BarChart2 size={48} className="mx-auto mb-2 text-slate-400" />
                <p>Financial charts and detailed metrics would be displayed here.</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="analysis" className="p-4">
            <div className="flex items-center justify-center h-64">
              <div className="text-slate-500 text-center">
                <PieChart size={48} className="mx-auto mb-2 text-slate-400" />
                <p>Analyst ratings, target prices, and investment analysis would be displayed here.</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="peers" className="p-4">
            <h3 className="text-lg font-medium mb-3">Peer Comparison</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left p-3 text-sm font-medium text-slate-600">Company</th>
                    <th className="text-right p-3 text-sm font-medium text-slate-600">Price</th>
                    <th className="text-right p-3 text-sm font-medium text-slate-600">P/E Ratio</th>
                    <th className="text-right p-3 text-sm font-medium text-slate-600">ROE</th>
                    <th className="text-right p-3 text-sm font-medium text-slate-600">Market Cap</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Current company highlighted */}
                  <tr className="bg-blue-50 border-b border-blue-100">
                    <td className="p-3 font-medium">
                      <div className="flex items-center">
                        <Building size={16} className="text-blue-600 mr-2" />
                        {company.name} ({company.symbol})
                      </div>
                    </td>
                    <td className="p-3 text-right">${company.price.toFixed(2)}</td>
                    <td className="p-3 text-right">{company.peRatio.toFixed(2)}</td>
                    <td className="p-3 text-right">{company.roe.toFixed(2)}%</td>
                    <td className="p-3 text-right">{formatMarketCap(company.marketCap)}</td>
                  </tr>
                  
                  {/* Peer companies */}
                  {peers.map((peer, index) => (
                    <tr key={index} className="border-b border-slate-200 hover:bg-slate-50">
                      <td className="p-3">
                        <div className="flex items-center">
                          <span className="text-slate-400 mr-2">{peer.symbol}</span>
                          {peer.name}
                        </div>
                      </td>
                      <td className="p-3 text-right">${peer.price.toFixed(2)}</td>
                      <td className="p-3 text-right">{peer.peRatio.toFixed(2)}</td>
                      <td className="p-3 text-right">{peer.roe.toFixed(2)}%</td>
                      <td className="p-3 text-right">{formatMarketCap(peer.marketCap)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CompanyDetailPanel;
