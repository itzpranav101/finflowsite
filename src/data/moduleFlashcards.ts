
interface FlashCard {
  front: string;
  back: string;
  category?: string;
}

interface ModuleFlashcards {
  [key: string]: {
    title: string;
    description: string;
    cards: FlashCard[];
  };
}

export const moduleFlashcards: ModuleFlashcards = {
  budgeting: {
    title: "Budgeting Fundamentals",
    description: "Master essential budgeting concepts",
    cards: [
      {
        front: "What is a Budget?",
        back: "A financial plan that helps you:\n• Track income and expenses\n• Set financial goals\n• Make informed spending decisions\n• Build better money habits",
        category: "Basics"
      },
      {
        front: "What is the 50/30/20 Rule?",
        back: "A budgeting guideline that suggests:\n• 50% for needs (housing, food)\n• 30% for wants (entertainment)\n• 20% for savings and debt repayment",
        category: "Strategy"
      },
      {
        front: "What are Fixed Expenses?",
        back: "Regular expenses that stay the same each month:\n• Rent/Mortgage\n• Car payments\n• Insurance premiums\n• Cell phone plans",
        category: "Expenses"
      },
      {
        front: "What are Variable Expenses?",
        back: "Costs that change from month to month:\n• Groceries\n• Utilities\n• Entertainment\n• Dining out\n• Shopping",
        category: "Expenses"
      },
      {
        front: "What is Zero-Based Budgeting?",
        back: "A method where income minus expenses equals zero:\n• Every dollar has a job\n• All income is allocated\n• No money is left unassigned\n• Increases awareness of spending",
        category: "Strategy"
      },
      {
        front: "What are Sinking Funds?",
        back: "Money set aside for planned future expenses:\n• Car repairs\n• Holiday gifts\n• Annual subscriptions\n• Home maintenance\n• Vacations",
        category: "Planning"
      }
    ]
  },
  saving: {
    title: "Saving Strategies",
    description: "Learn effective saving techniques",
    cards: [
      {
        front: "What is an Emergency Fund?",
        back: "Money set aside for unexpected expenses:\n• 3-6 months of living expenses\n• Easily accessible\n• Separate from regular savings\n• Protection against financial emergencies",
        category: "Basics"
      },
      {
        front: "What is the Pay Yourself First method?",
        back: "A saving strategy where you:\n• Save before spending\n• Automate savings transfers\n• Treat savings as a priority expense\n• Build wealth consistently",
        category: "Strategy"
      },
      {
        front: "What are Short-term vs Long-term Savings?",
        back: "Different saving timeframes:\n\nShort-term:\n• Emergency fund\n• Vacation\n• Large purchases\n\nLong-term:\n• Retirement\n• College fund\n• Home down payment",
        category: "Planning"
      },
      {
        front: "What is the Rule of 72?",
        back: "A formula to estimate how long it takes for an investment to double:\n• Divide 72 by the annual interest rate\n• Result is approximate years to double your money\n• Example: At 8% interest, money doubles in 9 years (72÷8=9)",
        category: "Growth"
      },
      {
        front: "What are High-Yield Savings Accounts?",
        back: "Bank accounts that offer:\n• Higher interest rates than regular savings\n• FDIC insurance protection\n• Limited monthly withdrawals\n• Online accessibility\n• No or low minimum balance requirements",
        category: "Tools"
      },
      {
        front: "What is Dollar-Cost Averaging?",
        back: "An investment strategy where you:\n• Invest fixed amounts regularly\n• Buy more shares when prices are low\n• Buy fewer shares when prices are high\n• Reduce impact of market volatility\n• Create consistent saving habits",
        category: "Strategy"
      }
    ]
  },
  investing: {
    title: "Investment Basics",
    description: "Understand fundamental investment concepts",
    cards: [
      {
        front: "What is Compound Interest?",
        back: "Interest earned on both:\n• Initial principal\n• Previously earned interest\n\nThe earlier you start, the more your money grows over time.",
        category: "Basics"
      },
      {
        front: "What is Diversification?",
        back: "Risk management strategy:\n• Spread investments across different assets\n• Don't put all eggs in one basket\n• Balance potential risk and return\n• Reduce impact of market volatility",
        category: "Strategy"
      },
      {
        front: "What are Different Investment Types?",
        back: "Common investment vehicles:\n• Stocks (company ownership)\n• Bonds (lending money)\n• Mutual Funds (pooled investments)\n• ETFs (exchange-traded funds)\n• Real Estate",
        category: "Options"
      },
      {
        front: "What is Risk Tolerance?",
        back: "Your comfort level with investment volatility:\n• Conservative: Low risk, stable returns\n• Moderate: Balanced approach\n• Aggressive: Higher risk, potential higher returns\n\nFactors: Age, financial goals, time horizon, experience",
        category: "Planning"
      },
      {
        front: "What is a Bull vs Bear Market?",
        back: "Market conditions:\n\nBull Market:\n• Rising prices\n• Investor optimism\n• Economic expansion\n\nBear Market:\n• Falling prices\n• Investor pessimism\n• Economic contraction",
        category: "Markets"
      },
      {
        front: "What is Dollar-Cost Averaging?",
        back: "Investment strategy:\n• Invest fixed amounts regularly\n• Buy more shares when prices are low\n• Buy fewer shares when prices are high\n• Reduces timing risk\n• Creates disciplined investment habit",
        category: "Strategy"
      }
    ]
  },
  planning: {
    title: "Financial Planning",
    description: "Create your financial roadmap",
    cards: [
      {
        front: "What is a Financial Goal?",
        back: "SMART financial objectives:\n• Specific\n• Measurable\n• Achievable\n• Relevant\n• Time-bound\n\nExamples: Save for house, retirement, education",
        category: "Basics"
      },
      {
        front: "What is Risk Tolerance?",
        back: "Your comfort level with investment risk:\n• Conservative (low risk)\n• Moderate (balanced)\n• Aggressive (high risk)\n\nFactors: Age, income, goals, timeline",
        category: "Planning"
      },
      {
        front: "What is Net Worth?",
        back: "Financial health measure:\n• Assets (what you own)\n• Minus Liabilities (what you owe)\n• Equals Net Worth\n\nHelps track financial progress over time",
        category: "Measurement"
      },
      {
        front: "What is a Financial Plan?",
        back: "A comprehensive strategy that includes:\n• Budget and cash flow management\n• Debt reduction strategy\n• Emergency fund setup\n• Insurance coverage\n• Retirement planning\n• Estate planning\n• Investment strategy",
        category: "Basics"
      },
      {
        front: "What is Retirement Planning?",
        back: "Preparing financially for retirement:\n• Estimating retirement expenses\n• Calculating required savings\n• Choosing retirement accounts (401k, IRA)\n• Investment allocation strategy\n• Social Security planning\n• Healthcare considerations",
        category: "Planning"
      },
      {
        front: "What is Estate Planning?",
        back: "Arranging for asset management and transfer:\n• Will creation\n• Trust establishment\n• Power of attorney designation\n• Healthcare directives\n• Beneficiary designations\n• Tax planning\n• Legacy planning",
        category: "Advanced"
      }
    ]
  },
  overview: {
    title: "Financial Literacy Overview",
    description: "Essential financial knowledge foundations",
    cards: [
      {
        front: "What is Financial Literacy?",
        back: "The ability to understand and effectively use financial skills:\n• Budgeting\n• Saving\n• Investing\n• Debt management\n• Financial planning\n• Consumer protection",
        category: "Basics"
      },
      {
        front: "Why is Financial Literacy Important?",
        back: "Financial literacy helps you:\n• Make informed financial decisions\n• Avoid excessive debt\n• Plan for future goals\n• Build wealth over time\n• Achieve financial independence\n• Reduce financial stress",
        category: "Fundamentals"
      },
      {
        front: "What are Financial Goals?",
        back: "Specific objectives for your money:\n\nShort-term (< 1 year):\n• Emergency fund\n• Vacation\n\nMedium-term (1-5 years):\n• Car purchase\n• Down payment\n\nLong-term (> 5 years):\n• Retirement\n• College fund",
        category: "Planning"
      },
      {
        front: "What is the Financial Life Cycle?",
        back: "Financial stages throughout life:\n• Early career: Building foundation\n• Mid-career: Wealth accumulation\n• Pre-retirement: Maximum saving\n• Retirement: Wealth distribution\n\nEach stage has different priorities and strategies.",
        category: "Planning"
      },
      {
        front: "What is the Time Value of Money?",
        back: "The concept that money available now is worth more than the same amount later:\n• Money can earn returns over time\n• Inflation decreases purchasing power\n• Starting early significantly increases growth\n• Key principle behind investing and saving",
        category: "Concept"
      },
      {
        front: "What is Opportunity Cost?",
        back: "The value of the next best alternative foregone when making a financial decision:\n• Spending vs. saving\n• Investing in one asset vs. another\n• Paying down debt vs. investing\n• Helps evaluate tradeoffs in decision making",
        category: "Concept"
      }
    ]
  }
};
