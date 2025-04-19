
// Top 1000 US companies with detailed stock information

export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  sector: string;
  industry: string;
  peRatio: number;
  bookValue: number;
  dividendYield: number;
  roce: number;
  roe: number;
  faceValue: number;
  high52Week: number;
  low52Week: number;
  eps: number;
  debtToEquity: number;
  currentRatio: number;
  establishedYear: number;
  description: string;
  bseCode?: string;
  website?: string;
  promoterHolding?: number;
  keyPoints?: string[];
  pros?: string[];
  cons?: string[];
  tags?: string[];
}

// This is a representative sample of detailed stock data
// In a real application, this would be fetched from an API
const stocksData: StockData[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 182.63,
    change: 1.25,
    changePercent: 0.69,
    volume: 45789000,
    marketCap: 2850000000000,
    sector: "Technology",
    industry: "Consumer Electronics",
    peRatio: 30.2,
    bookValue: 4.32,
    dividendYield: 0.53,
    roce: 35.8,
    roe: 147.9,
    faceValue: 0.00001,
    high52Week: 198.23,
    low52Week: 143.90,
    eps: 6.05,
    debtToEquity: 1.76,
    currentRatio: 0.99,
    establishedYear: 1976,
    description: "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. The company offers iPhone, Mac, iPad, and wearables, home, and accessories. It also provides AppleCare, cloud services, and digital content.",
    website: "apple.com",
    promoterHolding: 0,
    keyPoints: [
      "World's most valuable technology company by market capitalization",
      "Known for its iconic products like iPhone, MacBook, and Apple Watch",
      "Services business (including App Store, Apple Music, iCloud) is growing rapidly",
      "Strong brand loyalty and premium positioning in the market",
      "Significant cash reserves and consistent dividend payouts"
    ],
    pros: [
      "Strong global brand with loyal customer base",
      "Diverse product ecosystem creating high switching costs",
      "Growing services segment with high margins",
      "Consistent product innovation and quality",
      "Excellent financial health with substantial cash reserves"
    ],
    cons: [
      "High dependence on iPhone for revenue",
      "Premium pricing makes products vulnerable during economic downturns",
      "Increasing regulatory scrutiny of App Store practices",
      "Supply chain concentration in certain regions",
      "Slower growth compared to earlier years"
    ],
    tags: ["Tech Giant", "Consumer Electronics", "Services"]
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 415.32,
    change: -2.18,
    changePercent: -0.52,
    volume: 23456000,
    marketCap: 3100000000000,
    sector: "Technology",
    industry: "Software—Infrastructure",
    peRatio: 36.5,
    bookValue: 31.23,
    dividendYield: 0.73,
    roce: 28.4,
    roe: 43.2,
    faceValue: 0.00001,
    high52Week: 430.82,
    low52Week: 309.45,
    eps: 11.36,
    debtToEquity: 0.32,
    currentRatio: 1.65,
    establishedYear: 1975,
    description: "Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide. The company operates in three segments: Productivity and Business Processes, Intelligent Cloud, and More Personal Computing.",
    website: "microsoft.com",
    promoterHolding: 0,
    keyPoints: [
      "Leading provider of cloud computing services through Azure",
      "Creator of the Windows operating system and Microsoft Office suite",
      "Expanding gaming division with Xbox and game studio acquisitions",
      "Strong enterprise presence with business software and services",
      "Investing heavily in AI and mixed reality technologies"
    ],
    pros: [
      "Diversified revenue streams across consumer and enterprise markets",
      "Strong recurring revenue from subscription-based services",
      "Massive cash reserves and consistent dividend growth",
      "Strategic acquisitions enhancing product portfolio",
      "Strong position in growing cloud infrastructure market"
    ],
    cons: [
      "Facing increased competition in cloud services",
      "Regulatory scrutiny and antitrust concerns",
      "Slower innovation in some consumer products",
      "Vulnerability to global economic downturns affecting enterprise spending",
      "Security challenges with widespread use of products"
    ],
    tags: ["Tech Giant", "Cloud", "Software"]
  },
  {
    symbol: "UTIQUE",
    name: "Utique Enterprises Ltd",
    price: 7.473,
    change: -0.165,
    changePercent: -2.16,
    volume: 245600,
    marketCap: 28300000000,
    sector: "Commodities",
    industry: "Trading & Consultancy",
    peRatio: 18.9,
    bookValue: 13.2,
    dividendYield: 0.00,
    roce: 1.27,
    roe: 0.30,
    faceValue: 10.0,
    high52Week: 11.11,
    low52Week: 3.77,
    eps: 0.40,
    debtToEquity: 0.01,
    currentRatio: 2.3,
    establishedYear: 1985,
    description: "Incorporated in 1985, Utique Enterprises Ltd is in Trading of commodities and Consultancy businesses.",
    bseCode: "500014",
    website: "utique.in",
    promoterHolding: 0.99,
    keyPoints: [
      "Services Offered",
      "Company trades in commodities viz. Silver, Gold and Copper"
    ],
    pros: [
      "Company is almost debt free.",
      "Stock is trading at 0.36 times its book value"
    ],
    cons: [
      "Though the company is reporting repeated profits, it is not paying out dividend",
      "Promoter holding is low: 0.99%",
      "Company has a low return on equity of -1.55% over last 3 years.",
      "Earnings include an other income of Rs.4.21 Cr.",
      "Promoter holding has decreased over last 3 years: -23.7%"
    ]
  },
  // Add more companies similarly...
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    price: 178.75,
    change: 3.45,
    changePercent: 1.97,
    volume: 34567000,
    marketCap: 1850000000000,
    sector: "Consumer Discretionary",
    industry: "Internet Retail",
    peRatio: 60.2,
    bookValue: 43.5,
    dividendYield: 0,
    roce: 12.3,
    roe: 20.5,
    faceValue: 0.01,
    high52Week: 189.50,
    low52Week: 118.35,
    eps: 2.97,
    debtToEquity: 0.64,
    currentRatio: 1.05,
    establishedYear: 1994,
    description: "Amazon.com, Inc. is an American multinational technology company focusing on e-commerce, cloud computing, online advertising, digital streaming, and artificial intelligence.",
    website: "amazon.com",
    keyPoints: [
      "World's largest online marketplace and leading e-commerce company",
      "Major provider of cloud services through Amazon Web Services (AWS)",
      "Expanding presence in digital advertising, competing with Google and Facebook",
      "Growing portfolio of hardware products including Echo devices and Ring",
      "Significant investments in logistics and fulfillment infrastructure"
    ],
    pros: [
      "Dominant position in e-commerce with strong customer loyalty",
      "High-margin AWS business driving overall profitability",
      "Innovative culture with investments across multiple growth sectors",
      "Advanced logistics network creating competitive advantages",
      "Successful diversification beyond core retail business"
    ],
    cons: [
      "Thin margins in retail business compared to cloud and advertising",
      "Increasing regulatory scrutiny and antitrust concerns",
      "Rising competition in cloud services from Microsoft and Google",
      "High capital expenditure requirements for continued growth",
      "Vulnerability to economic downturns affecting consumer spending"
    ],
    tags: ["E-commerce", "Cloud", "Entertainment"]
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 163.45,
    change: 1.32,
    changePercent: 0.81,
    volume: 18765000,
    marketCap: 2050000000000,
    sector: "Communication Services",
    industry: "Internet Content & Information",
    peRatio: 28.3,
    bookValue: 21.47,
    dividendYield: 0.50,
    roce: 25.3,
    roe: 29.1,
    faceValue: 0.01,
    high52Week: 171.25,
    low52Week: 115.35,
    eps: 5.78,
    debtToEquity: 0.07,
    currentRatio: 2.15,
    establishedYear: 1998,
    description: "Alphabet Inc. is an American multinational technology conglomerate holding company headquartered in Mountain View, California. It was created through a restructuring of Google on October 2, 2015.",
    website: "abc.xyz",
    keyPoints: [
      "Parent company of Google, the world's dominant search engine",
      "Owns YouTube, the largest video sharing platform globally",
      "Major player in digital advertising, alongside Meta",
      "Investing heavily in AI, cloud computing, and autonomous vehicles",
      "Diversified portfolio of 'Other Bets' including Waymo and Verily"
    ],
    pros: [
      "Dominance in search advertising with high margins",
      "Diverse revenue streams across multiple digital platforms",
      "Substantial cash reserves for strategic investments",
      "Strong position in growing areas like cloud and AI",
      "Innovative culture with significant R&D investments"
    ],
    cons: [
      "Heavy reliance on advertising revenue",
      "Increasing regulatory scrutiny globally",
      "Privacy concerns affecting core business model",
      "Competition from specialized platforms and services",
      "High costs for 'moonshot' projects with uncertain returns"
    ],
    tags: ["Search", "Advertising", "AI"]
  },
  {
    symbol: "NFLX",
    name: "Netflix Inc.",
    price: 675.23,
    change: 5.12,
    changePercent: 0.76,
    volume: 12453000,
    marketCap: 295000000000,
    sector: "Communication Services",
    industry: "Entertainment",
    peRatio: 45.8,
    bookValue: 72.31,
    dividendYield: 0,
    roce: 18.7,
    roe: 32.5,
    faceValue: 0.01,
    high52Week: 689.45,
    low52Week: 445.20,
    eps: 14.75,
    debtToEquity: 0.85,
    currentRatio: 1.35,
    establishedYear: 1997,
    description: "Netflix, Inc. is an American subscription streaming service and production company based in Los Gatos, California. It offers a library of films and television series through distribution deals as well as its own productions, known as Netflix Originals.",
    website: "netflix.com",
    keyPoints: [
      "Leading global streaming entertainment service",
      "Pioneered the subscription video-on-demand model",
      "Significant investment in original content production",
      "Expanding into gaming and interactive content",
      "Global presence with localized content strategies"
    ],
    pros: [
      "Strong brand recognition in streaming entertainment",
      "Successful transition from DVD rentals to streaming",
      "Data-driven approach to content creation",
      "Growing international subscriber base",
      "Award-winning original content library"
    ],
    cons: [
      "Increasing competition from other streaming services",
      "High content costs affecting profitability",
      "Subscriber growth slowdown in mature markets",
      "Password sharing reducing potential subscriber count",
      "Vulnerability to content library shifts as studios launch own platforms"
    ],
    tags: ["Streaming", "Entertainment", "Content"]
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    price: 243.18,
    change: -3.45,
    changePercent: -1.40,
    volume: 38956000,
    marketCap: 778000000000,
    sector: "Consumer Discretionary",
    industry: "Auto Manufacturers",
    peRatio: 62.4,
    bookValue: 37.68,
    dividendYield: 0,
    roce: 14.3,
    roe: 22.9,
    faceValue: 0.001,
    high52Week: 278.98,
    low52Week: 152.37,
    eps: 3.90,
    debtToEquity: 0.21,
    currentRatio: 1.73,
    establishedYear: 2003,
    description: "Tesla, Inc. designs, develops, manufactures, sells and leases electric vehicles and energy generation and storage systems, and offers services related to its products.",
    website: "tesla.com",
    keyPoints: [
      "Leader in electric vehicle manufacturing and technology",
      "Expanding into energy generation and storage products",
      "Pioneering autonomous driving technology",
      "Vertically integrated manufacturing approach",
      "Strong focus on innovation and design"
    ],
    pros: [
      "First-mover advantage in premium electric vehicles",
      "Advanced battery technology and manufacturing scale",
      "Strong brand loyalty and customer enthusiasm",
      "Data advantage from vehicle fleet for autonomous development",
      "Expansion into multiple related markets beyond cars"
    ],
    cons: [
      "High valuation compared to traditional automakers",
      "Production challenges and quality control issues",
      "Increasing competition from traditional automakers",
      "Regulatory scrutiny of autonomous driving claims",
      "Heavy reliance on charismatic leadership of Elon Musk"
    ],
    tags: ["Electric Vehicles", "Energy", "Autonomous"]
  },
  {
    symbol: "META",
    name: "Meta Platforms Inc.",
    price: 482.75,
    change: 4.36,
    changePercent: 0.91,
    volume: 22567000,
    marketCap: 1230000000000,
    sector: "Communication Services",
    industry: "Internet Content & Information",
    peRatio: 32.7,
    bookValue: 62.43,
    dividendYield: 0.44,
    roce: 24.8,
    roe: 28.7,
    faceValue: 0.01,
    high52Week: 505.92,
    low52Week: 276.85,
    eps: 14.76,
    debtToEquity: 0.15,
    currentRatio: 2.68,
    establishedYear: 2004,
    description: "Meta Platforms, Inc., doing business as Meta, is an American multinational technology conglomerate that owns Facebook, Instagram, and WhatsApp, among other products and services.",
    website: "meta.com",
    keyPoints: [
      "Owner of leading social platforms including Facebook, Instagram, and WhatsApp",
      "Major player in digital advertising alongside Google",
      "Investing heavily in metaverse technologies and AR/VR",
      "Leader in AI research and implementation",
      "Expanding into enterprise services and e-commerce"
    ],
    pros: [
      "Massive global user base across multiple platforms",
      "Strong advertising business with high margins",
      "Data advantages for targeted advertising",
      "Significant cash reserves for investments and acquisitions",
      "Leading position in emerging metaverse technologies"
    ],
    cons: [
      "Privacy concerns and regulatory scrutiny",
      "Competition for user attention from emerging platforms",
      "User growth saturation in developed markets",
      "High capital expenditures for metaverse development",
      "Reputation challenges and content moderation issues"
    ],
    tags: ["Social Media", "Advertising", "Metaverse"]
  },
  {
    symbol: "V",
    name: "Visa Inc.",
    price: 275.93,
    change: 0.54,
    changePercent: 0.20,
    volume: 8723000,
    marketCap: 560000000000,
    sector: "Financial Services",
    industry: "Credit Services",
    peRatio: 30.8,
    bookValue: 36.54,
    dividendYield: 0.76,
    roce: 29.6,
    roe: 41.8,
    faceValue: 0.01,
    high52Week: 290.96,
    low52Week: 232.13,
    eps: 8.96,
    debtToEquity: 0.59,
    currentRatio: 1.56,
    establishedYear: 1958,
    description: "Visa Inc. is an American multinational financial services corporation that facilitates electronic funds transfers throughout the world, most commonly through Visa-branded credit cards, debit cards and prepaid cards.",
    website: "visa.com",
    keyPoints: [
      "Global leader in digital payments technology",
      "Operates one of the world's largest payment processing networks",
      "Expanding into new payment technologies and blockchain",
      "Strong partnerships with financial institutions worldwide",
      "High margin, fee-based business model"
    ],
    pros: [
      "Asset-light business model with high margins",
      "Benefits from ongoing global shift to cashless transactions",
      "Strong network effects creating high barriers to entry",
      "Consistent revenue and dividend growth",
      "Established brand with global recognition and trust"
    ],
    cons: [
      "Regulatory risks in different markets",
      "Competition from fintech innovations and alternative payment systems",
      "Vulnerability to economic downturns affecting consumer spending",
      "Pressure on interchange fees from merchants and regulators",
      "Challenges in certain markets with local payment systems"
    ],
    tags: ["Payments", "Financial Services", "Digital"]
  },
  {
    symbol: "JNJ",
    name: "Johnson & Johnson",
    price: 152.36,
    change: -0.87,
    changePercent: -0.57,
    volume: 7854000,
    marketCap: 368000000000,
    sector: "Healthcare",
    industry: "Drug Manufacturers—General",
    peRatio: 24.1,
    bookValue: 30.24,
    dividendYield: 3.12,
    roce: 16.8,
    roe: 22.3,
    faceValue: 1.0,
    high52Week: 175.12,
    low52Week: 144.95,
    eps: 6.32,
    debtToEquity: 0.48,
    currentRatio: 1.23,
    establishedYear: 1886,
    description: "Johnson & Johnson is an American multinational corporation that develops medical devices, pharmaceuticals, and consumer packaged goods.",
    website: "jnj.com",
    keyPoints: [
      "Diversified healthcare giant with pharmaceuticals, medical devices, and consumer health products",
      "Long history of innovation in healthcare",
      "Strong research and development pipeline",
      "Global presence with products sold in over 175 countries",
      "Consistent dividend growth for over 60 consecutive years"
    ],
    pros: [
      "Diversified business model reducing risk",
      "Strong brand recognition and consumer trust",
      "Defensive stock nature during economic downturns",
      "Consistent dividend increases making it a Dividend King",
      "Steady cash flow generation across business cycles"
    ],
    cons: [
      "Legal liabilities from product litigation",
      "Patent expirations affecting pharmaceutical segment",
      "Competition in consumer health from private labels",
      "Slower growth compared to more focused companies",
      "Regulatory challenges in multiple markets"
    ],
    tags: ["Healthcare", "Pharmaceuticals", "Consumer Health"]
  }
];

// Generating more mock data to simulate having 1000 companies
const generateMoreStocks = (): StockData[] => {
  const sectors = [
    "Technology", "Healthcare", "Consumer Cyclical", "Financial Services", 
    "Communication Services", "Industrials", "Consumer Defensive", "Energy", 
    "Basic Materials", "Real Estate", "Utilities"
  ];
  
  const industries = {
    "Technology": ["Software", "Hardware", "Semiconductors", "IT Services", "Electronic Components"],
    "Healthcare": ["Drug Manufacturers", "Medical Devices", "Healthcare Plans", "Biotechnology", "Medical Care"],
    "Financial Services": ["Banks", "Insurance", "Asset Management", "Credit Services", "Capital Markets"],
    "Consumer Cyclical": ["Auto Manufacturers", "Retail", "Restaurants", "Travel & Leisure", "Apparel"],
    "Communication Services": ["Telecom", "Media", "Entertainment", "Social Media", "Publishing"],
    "Industrials": ["Aerospace & Defense", "Business Equipment", "Engineering & Construction", "Transportation", "Farm & Heavy Machinery"],
    "Consumer Defensive": ["Packaged Foods", "Beverages", "Household Products", "Tobacco", "Personal Products"],
    "Energy": ["Oil & Gas", "Renewable Energy", "Coal", "Oil & Gas Services", "Power Generation"],
    "Basic Materials": ["Chemicals", "Metals & Mining", "Paper & Forest Products", "Building Materials", "Agricultural Inputs"],
    "Real Estate": ["REIT", "Real Estate Services", "Real Estate Development", "Real Estate Operations", "Real Estate Holdings"],
    "Utilities": ["Utilities—Regulated Electric", "Utilities—Regulated Gas", "Utilities—Regulated Water", "Utilities—Independent Power Producers", "Utilities—Renewable"]
  };
  
  const companyNames = [
    "Advanced", "Superior", "Global", "Strategic", "Innovative", "Progressive", "Precise", "Prime", "Elite", "Dynamic",
    "United", "Integrated", "National", "American", "First", "Eastern", "Western", "Southern", "Northern", "Central",
    "Next", "Future", "Smart", "Digital", "Cyber", "Tech", "Bio", "Eco", "Green", "Blue", "Red", "Silver", "Gold",
    "Alpha", "Beta", "Delta", "Omega", "Sigma", "Vector", "Vertex", "Apex", "Summit", "Peak", "Pinnacle", "Horizon",
    "Solar", "Lunar", "Stellar", "Cosmic", "Quantum", "Atom", "Nano", "Micro", "Macro", "Mega", "Ultra", "Hyper", "Super"
  ];
  
  const companyTypes = [
    "Technologies", "Solutions", "Systems", "Industries", "Enterprises", "Corporation", "Inc.", "Group", "Holdings", "Partners",
    "Networks", "Platforms", "Applications", "Innovations", "Ventures", "Capital", "Investments", "Financial", "Healthcare", "Pharmaceuticals",
    "Biotechnology", "Electronics", "Communications", "Media", "Energy", "Resources", "Materials", "Products", "Brands", "Consumer Goods"
  ];
  
  const generatedStocks: StockData[] = [];
  
  for (let i = 0; i < 995; i++) {
    const sector = sectors[Math.floor(Math.random() * sectors.length)];
    const industryList = industries[sector as keyof typeof industries];
    const industry = industryList[Math.floor(Math.random() * industryList.length)];
    
    const namePrefix = companyNames[Math.floor(Math.random() * companyNames.length)];
    const nameSuffix = companyTypes[Math.floor(Math.random() * companyTypes.length)];
    const name = `${namePrefix} ${nameSuffix}`;
    
    // Generate a unique 4-5 character symbol
    const generateSymbol = () => {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let symbol = "";
      const length = 4 + Math.floor(Math.random() * 2); // 4 or 5 characters
      for (let j = 0; j < length; j++) {
        symbol += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return symbol;
    };
    
    const symbol = generateSymbol();
    const price = parseFloat((10 + Math.random() * 990).toFixed(2));
    const changePercent = parseFloat((Math.random() * 10 - 5).toFixed(2));
    const change = parseFloat((price * changePercent / 100).toFixed(2));
    const marketCap = Math.floor(1e9 + Math.random() * 1e12);
    const volume = Math.floor(100000 + Math.random() * 10000000);
    const peRatio = parseFloat((5 + Math.random() * 95).toFixed(2));
    const bookValue = parseFloat((1 + Math.random() * 100).toFixed(2));
    const dividendYield = parseFloat((Math.random() * 5).toFixed(2));
    const roce = parseFloat((Math.random() * 40).toFixed(2));
    const roe = parseFloat((Math.random() * 50).toFixed(2));
    const high52Week = parseFloat((price * (1 + Math.random() * 0.5)).toFixed(2));
    const low52Week = parseFloat((price * (0.5 + Math.random() * 0.3)).toFixed(2));
    
    generatedStocks.push({
      symbol,
      name,
      price,
      change,
      changePercent,
      volume,
      marketCap,
      sector,
      industry,
      peRatio,
      bookValue,
      dividendYield,
      roce,
      roe,
      faceValue: 0.01,
      high52Week,
      low52Week,
      eps: parseFloat((price / peRatio).toFixed(2)),
      debtToEquity: parseFloat((Math.random() * 2).toFixed(2)),
      currentRatio: parseFloat((0.5 + Math.random() * 3).toFixed(2)),
      establishedYear: 1950 + Math.floor(Math.random() * 70),
      description: `${name} is a leading company in the ${industry} industry within the ${sector} sector.`,
      website: `${symbol.toLowerCase()}.com`,
      promoterHolding: parseFloat((Math.random() * 70).toFixed(2))
    });
  }
  
  return generatedStocks;
};

// Combine predefined and generated stocks
const allStocks = [...stocksData, ...generateMoreStocks()];

export default allStocks;
