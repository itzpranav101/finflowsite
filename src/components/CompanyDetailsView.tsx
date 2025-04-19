
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  TrendingUp, 
  TrendingDown, 
  FileText, 
  BarChart2, 
  PieChart, 
  Clock, 
  DollarSign, 
  Percent, 
  Building,
  CheckCircle,
  AlertTriangle,
  ChevronRight,
  ExternalLink,
  Calendar,
  BookOpen,
  Award,
  Target,
  BarChart,
  Info
} from "lucide-react";
import { StockData } from "@/data/stocksData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart as RechartsBarChart, Bar, Legend, Area, AreaChart, PieChart as RechartsPieChart, Pie } from "recharts";
import { motion } from "framer-motion";
import StockPriceUpdater from "./StockPriceUpdater";

interface CompanyDetailsViewProps {
  company: StockData;
  onClose: () => void;
}

// Generate sample chart data
const generateChartData = (initialPrice: number, days: number) => {
  const data = [];
  let currentPrice = initialPrice;
  
  const now = new Date();
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(now.getDate() - i);
    
    // Random daily change between -3% and +3%
    const changePercent = (Math.random() * 6) - 3;
    const change = currentPrice * (changePercent / 100);
    currentPrice += change;
    
    data.push({
      date: date.toISOString().split('T')[0],
      price: parseFloat(currentPrice.toFixed(2)),
      volume: Math.floor(100000 + Math.random() * 5000000)
    });
  }
  
  return data;
};

// Sample earnings data
const generateEarningsData = (quarters: number) => {
  const data = [];
  const now = new Date();
  let year = now.getFullYear();
  let quarter = Math.floor(now.getMonth() / 3);
  
  for (let i = 0; i < quarters; i++) {
    quarter--;
    if (quarter < 0) {
      quarter = 3;
      year--;
    }
    
    data.unshift({
      quarter: `Q${quarter + 1} ${year}`,
      revenue: parseFloat((Math.random() * 10 + 5).toFixed(2)),
      earnings: parseFloat((Math.random() * 3 + 1).toFixed(2)),
      estimate: parseFloat((Math.random() * 3 + 1).toFixed(2))
    });
  }
  
  return data;
};

const formatLargeNumber = (num: number) => {
  if (num >= 1e12) return `${(num / 1e12).toFixed(2)}T`;
  if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
  return num.toString();
};

const CompanyDetailsView = ({ company, onClose }: CompanyDetailsViewProps) => {
  const [chartData, setChartData] = useState(generateChartData(company.price, 180));
  const [chartTimeframe, setChartTimeframe] = useState("1M");
  const [earningsData] = useState(generateEarningsData(8));
  
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };
  
  const updateChartTimeframe = (timeframe: string) => {
    setChartTimeframe(timeframe);
    
    let days;
    switch (timeframe) {
      case "1D": days = 1; break;
      case "1W": days = 7; break;
      case "1M": days = 30; break;
      case "3M": days = 90; break;
      case "6M": days = 180; break;
      case "1Y": days = 365; break;
      case "5Y": days = 365 * 5; break;
      default: days = 30;
    }
    
    setChartData(generateChartData(company.price, days));
  };
  
  return (
    <motion.div 
      className="bg-white p-4 rounded-lg max-h-[90vh] overflow-y-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex justify-between items-start mb-4">
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-slate-800">{company.name}</h2>
            <span className="text-sm bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
              {company.symbol}
            </span>
            {company.bseCode && (
              <span className="text-sm bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                BSE: {company.bseCode}
              </span>
            )}
          </div>
          
          <div className="flex items-center mt-1 text-slate-500">
            <Badge variant="outline" className="mr-2 bg-slate-50">{company.sector}</Badge>
            <span>•</span>
            <Badge variant="outline" className="mx-2 bg-slate-50">{company.industry}</Badge>
            {company.website && (
              <>
                <span className="mx-2">•</span>
                <a 
                  href={`https://${company.website}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline flex items-center"
                >
                  {company.website}
                  <ExternalLink size={14} className="ml-1" />
                </a>
              </>
            )}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            <span>Est. {company.establishedYear}</span>
          </div>
        </motion.div>
        
        <motion.div className="text-right" variants={itemVariants}>
          <div className="text-3xl font-bold">
            <StockPriceUpdater stock={company} />
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6"
        variants={itemVariants}
      >
        <Card className="p-3 bg-slate-50 border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-500">Market Cap</div>
            <DollarSign size={14} className="text-slate-400" />
          </div>
          <div className="font-semibold">{formatLargeNumber(company.marketCap)}</div>
        </Card>
        <Card className="p-3 bg-slate-50 border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-500">P/E Ratio</div>
            <BarChart size={14} className="text-slate-400" />
          </div>
          <div className="font-semibold">{company.peRatio.toFixed(2)}</div>
        </Card>
        <Card className="p-3 bg-slate-50 border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-500">Book Value</div>
            <BookOpen size={14} className="text-slate-400" />
          </div>
          <div className="font-semibold">${company.bookValue.toFixed(2)}</div>
        </Card>
        <Card className="p-3 bg-slate-50 border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-500">Dividend Yield</div>
            <Percent size={14} className="text-slate-400" />
          </div>
          <div className="font-semibold">{company.dividendYield.toFixed(2)}%</div>
        </Card>
        <Card className="p-3 bg-slate-50 border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-500">ROCE</div>
            <TrendingUp size={14} className="text-slate-400" />
          </div>
          <div className="font-semibold">{company.roce.toFixed(2)}%</div>
        </Card>
        <Card className="p-3 bg-slate-50 border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-500">ROE</div>
            <Award size={14} className="text-slate-400" />
          </div>
          <div className="font-semibold">{company.roe.toFixed(2)}%</div>
        </Card>
        <Card className="p-3 bg-slate-50 border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-500">Face Value</div>
            <Target size={14} className="text-slate-400" />
          </div>
          <div className="font-semibold">${company.faceValue.toFixed(2)}</div>
        </Card>
        <Card className="p-3 bg-slate-50 border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-500">High / Low</div>
            <PieChart size={14} className="text-slate-400" />
          </div>
          <div className="font-semibold">${company.high52Week.toFixed(2)} / ${company.low52Week.toFixed(2)}</div>
        </Card>
      </motion.div>

      <Tabs defaultValue="chart" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="chart">Chart</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="financials">Financials</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="chart">
          <motion.div 
            className="mb-4 bg-white border border-slate-200 rounded-lg p-4"
            variants={itemVariants}
          >
            <div className="mb-4 flex flex-wrap gap-2">
              {["1D", "1W", "1M", "3M", "6M", "1Y", "5Y", "Max"].map((timeframe) => (
                <Button 
                  key={timeframe}
                  variant="outline" 
                  size="sm" 
                  className={`text-xs border-slate-300 ${
                    chartTimeframe === timeframe ? "bg-blue-50 text-blue-600 border-blue-200" : ""
                  }`}
                  onClick={() => updateChartTimeframe(timeframe)}
                >
                  {timeframe}
                </Button>
              ))}
            </div>
            
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return `${date.getDate()}/${date.getMonth() + 1}`;
                    }}
                    stroke="#94a3b8"
                  />
                  <YAxis 
                    domain={['auto', 'auto']}
                    stroke="#94a3b8"
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    formatter={(value) => [`$${value}`, 'Price']}
                    labelFormatter={(label) => {
                      const date = new Date(label);
                      return date.toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      });
                    }}
                    contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '10px' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#4f46e5" 
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorPrice)"
                    activeDot={{ r: 6, fill: '#4f46e5', stroke: '#fff', strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 h-[150px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return `${date.getDate()}/${date.getMonth() + 1}`;
                    }}
                    stroke="#94a3b8"
                  />
                  <YAxis 
                    stroke="#94a3b8"
                    tickFormatter={(value) => formatLargeNumber(value)}
                  />
                  <Tooltip 
                    formatter={(value) => [formatLargeNumber(value as number), 'Volume']}
                    labelFormatter={(label) => {
                      const date = new Date(label);
                      return date.toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      });
                    }}
                    contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '10px' }}
                  />
                  <Bar 
                    dataKey="volume" 
                    fill="#cbd5e1"
                    radius={[4, 4, 0, 0]} 
                  />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="about">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={itemVariants}
          >
            <div className="md:col-span-2">
              <h3 className="text-lg font-medium mb-3">About {company.name}</h3>
              <p className="text-slate-600 mb-6">{company.description}</p>
              
              {company.keyPoints && company.keyPoints.length > 0 && (
                <>
                  <h4 className="font-medium mb-2">Key Points</h4>
                  <ul className="space-y-1 mb-6">
                    {company.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start">
                        <ChevronRight size={16} className="text-blue-500 mt-1 mr-1 flex-shrink-0" />
                        <span className="text-slate-600 text-sm">{point}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {company.pros && company.pros.length > 0 && (
                  <motion.div 
                    className="border border-green-100 rounded-lg p-4 bg-green-50"
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h4 className="flex items-center text-green-700 font-medium mb-2">
                      <CheckCircle size={16} className="mr-1" />
                      Pros
                    </h4>
                    <ul className="space-y-2">
                      {company.pros.map((pro, index) => (
                        <motion.li 
                          key={index} 
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 mr-2"></div>
                          <span className="text-sm text-slate-700">{pro}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
                
                {company.cons && company.cons.length > 0 && (
                  <motion.div 
                    className="border border-amber-100 rounded-lg p-4 bg-amber-50"
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h4 className="flex items-center text-amber-700 font-medium mb-2">
                      <AlertTriangle size={16} className="mr-1" />
                      Cons
                    </h4>
                    <ul className="space-y-2">
                      {company.cons.map((con, index) => (
                        <motion.li 
                          key={index} 
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 mr-2"></div>
                          <span className="text-sm text-slate-700">{con}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>
              
              {company.tags && company.tags.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {company.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-600 hover:bg-blue-100">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div>
              <Card className="p-4 border border-slate-200 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-medium mb-3 flex items-center">
                  <Info size={16} className="mr-2 text-slate-400" />
                  Key Metrics
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="text-slate-600">Market Cap</span>
                    <span className="font-medium">{formatLargeNumber(company.marketCap)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="text-slate-600">P/E Ratio</span>
                    <span className="font-medium">{company.peRatio.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="text-slate-600">Book Value</span>
                    <span className="font-medium">${company.bookValue.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="text-slate-600">EPS</span>
                    <span className="font-medium">${company.eps ? company.eps.toFixed(2) : "N/A"}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="text-slate-600">Dividend Yield</span>
                    <span className="font-medium">{company.dividendYield.toFixed(2)}%</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="text-slate-600">Debt to Equity</span>
                    <span className="font-medium">{company.debtToEquity ? company.debtToEquity.toFixed(2) : "N/A"}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="text-slate-600">ROE</span>
                    <span className="font-medium">{company.roe.toFixed(2)}%</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="text-slate-600">ROCE</span>
                    <span className="font-medium">{company.roce.toFixed(2)}%</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="text-slate-600">Current Ratio</span>
                    <span className="font-medium">{company.currentRatio ? company.currentRatio.toFixed(2) : "N/A"}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="text-slate-600">Face Value</span>
                    <span className="font-medium">${company.faceValue.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2">
                    <span className="text-slate-600">52 Week Range</span>
                    <span className="font-medium">${company.low52Week.toFixed(2)} - ${company.high52Week.toFixed(2)}</span>
                  </div>
                </div>
              </Card>
              
              {company.promoterHolding !== undefined && (
                <Card className="p-4 border border-slate-200 mt-4 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-medium mb-3 flex items-center">
                    <Building size={16} className="mr-2 text-slate-400" />
                    Ownership
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-slate-200">
                      <span className="text-slate-600">Promoter Holding</span>
                      <span className="font-medium">{company.promoterHolding.toFixed(2)}%</span>
                    </div>
                    
                    <div className="relative pt-1">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-slate-200">
                        <div 
                          style={{ width: `${company.promoterHolding}%` }} 
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                        ></div>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
              
              <Card className="p-4 border border-slate-200 mt-4 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-medium mb-3 flex items-center">
                  <Calendar size={16} className="mr-2 text-slate-400" />
                  Company Info
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="text-slate-600">Established</span>
                    <span className="font-medium">{company.establishedYear}</span>
                  </div>
                  {company.website && (
                    <div className="flex justify-between items-center py-2 border-b border-slate-200">
                      <span className="text-slate-600">Website</span>
                      <a 
                        href={`https://${company.website}`} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-blue-500 hover:underline flex items-center"
                      >
                        {company.website}
                        <ExternalLink size={12} className="ml-1" />
                      </a>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="financials">
          <motion.div 
            className="grid grid-cols-1 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="bg-white border border-slate-200 rounded-lg p-4"
              variants={itemVariants}
            >
              <h3 className="text-lg font-medium mb-3">Quarterly Earnings</h3>
              
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={earningsData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="quarter" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="revenue" name="Revenue (B)" fill="#8884d8" radius={[4, 4, 0, 0]} />
                    <Bar yAxisId="right" dataKey="earnings" name="Earnings (B)" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                    <Bar yAxisId="right" dataKey="estimate" name="Estimate (B)" fill="#ffc658" radius={[4, 4, 0, 0]} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              variants={itemVariants}
            >
              <Card className="p-4 border border-slate-200">
                <h3 className="text-lg font-medium mb-3">Income Statement</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between pb-2 border-b border-slate-100">
                    <span className="text-slate-600">Total Revenue</span>
                    <span className="font-medium">${(Math.random() * 50 + 10).toFixed(2)}B</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-slate-100">
                    <span className="text-slate-600">Cost of Revenue</span>
                    <span className="font-medium">${(Math.random() * 30 + 5).toFixed(2)}B</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-slate-100">
                    <span className="text-slate-600">Gross Profit</span>
                    <span className="font-medium">${(Math.random() * 20 + 5).toFixed(2)}B</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-slate-100">
                    <span className="text-slate-600">Operating Expenses</span>
                    <span className="font-medium">${(Math.random() * 15 + 2).toFixed(2)}B</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-slate-100">
                    <span className="text-slate-600">Operating Income</span>
                    <span className="font-medium">${(Math.random() * 10 + 1).toFixed(2)}B</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-slate-100">
                    <span className="text-slate-600">Net Income</span>
                    <span className="font-medium">${(Math.random() * 8 + 1).toFixed(2)}B</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">EPS</span>
                    <span className="font-medium">${(Math.random() * 5 + 0.5).toFixed(2)}</span>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 border border-slate-200">
                <h3 className="text-lg font-medium mb-3">Balance Sheet</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between pb-2 border-b border-slate-100">
                    <span className="text-slate-600">Total Assets</span>
                    <span className="font-medium">${(Math.random() * 100 + 50).toFixed(2)}B</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-slate-100">
                    <span className="text-slate-600">Current Assets</span>
                    <span className="font-medium">${(Math.random() * 50 + 20).toFixed(2)}B</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-slate-100">
                    <span className="text-slate-600">Cash & Equivalents</span>
                    <span className="font-medium">${(Math.random() * 20 + 5).toFixed(2)}B</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-slate-100">
                    <span className="text-slate-600">Total Liabilities</span>
                    <span className="font-medium">${(Math.random() * 60 + 30).toFixed(2)}B</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-slate-100">
                    <span className="text-slate-600">Current Liabilities</span>
                    <span className="font-medium">${(Math.random() * 30 + 10).toFixed(2)}B</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-slate-100">
                    <span className="text-slate-600">Long-term Debt</span>
                    <span className="font-medium">${(Math.random() * 25 + 5).toFixed(2)}B</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Shareholder's Equity</span>
                    <span className="font-medium">${(Math.random() * 40 + 20).toFixed(2)}B</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="analysis">
          <div className="text-center p-8 text-gray-500">
            <p>Analysis data is not available for this company.</p>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default CompanyDetailsView;
