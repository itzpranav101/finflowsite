
import { ageGroups } from "./ageGroups";

export interface Resource {
  title: string;
  description: string;
  url: string;
  type: "article" | "video" | "book" | "podcast" | "tool" | "course";
  difficulty?: "beginner" | "intermediate" | "advanced";
  ageGroups: string[]; // Which age groups this resource is suitable for
}

// Resources organized by age groups they're suitable for
export const resources: Resource[] = [
  // General resources for all age groups
  {
    title: "Investopedia - Financial Terms Dictionary",
    description: "Comprehensive dictionary of financial terms and concepts.",
    url: "https://www.investopedia.com/financial-term-dictionary-4769738",
    type: "tool",
    ageGroups: ["teens", "young-adults", "early-career", "mid-career", "pre-retirement", "retirement"],
  },
  
  // Teens resources
  {
    title: "Next Gen Personal Finance",
    description: "Free financial literacy curriculum and resources for students.",
    url: "https://www.ngpf.org/",
    type: "course",
    difficulty: "beginner",
    ageGroups: ["teens"],
  },
  {
    title: "Banzai - Financial Education Platform",
    description: "Interactive lessons for teens to learn financial concepts.",
    url: "https://www.teachbanzai.com/",
    type: "tool",
    difficulty: "beginner",
    ageGroups: ["teens"],
  },
  {
    title: "Savings Spree App",
    description: "Interactive game that teaches saving and spending decisions.",
    url: "https://www.moonjarchallenge.com/",
    type: "tool",
    difficulty: "beginner",
    ageGroups: ["teens"],
  },
  {
    title: "Khan Academy - Personal Finance",
    description: "Free videos and exercises on personal finance basics.",
    url: "https://www.khanacademy.org/college-careers-more/personal-finance",
    type: "course",
    difficulty: "beginner",
    ageGroups: ["teens", "young-adults"],
  },
  
  // Young Adults resources
  {
    title: "The Financial Diet",
    description: "Blog and YouTube channel focused on personal finance for young people.",
    url: "https://thefinancialdiet.com/",
    type: "article",
    difficulty: "beginner",
    ageGroups: ["young-adults", "early-career"],
  },
  {
    title: "I Will Teach You To Be Rich by Ramit Sethi",
    description: "Book on personal finance focused on young adults.",
    url: "https://www.iwillteachyoutoberich.com/book/",
    type: "book",
    difficulty: "intermediate",
    ageGroups: ["young-adults", "early-career"],
  },
  {
    title: "Mint - Budgeting App",
    description: "Free personal finance and budget tracking app.",
    url: "https://mint.intuit.com/",
    type: "tool",
    difficulty: "beginner",
    ageGroups: ["young-adults", "early-career", "mid-career"],
  },
  {
    title: "You Need A Budget (YNAB)",
    description: "Budgeting app with a focus on giving every dollar a job.",
    url: "https://www.youneedabudget.com/",
    type: "tool",
    difficulty: "intermediate",
    ageGroups: ["young-adults", "early-career", "mid-career"],
  },
  {
    title: "The Broke Millennial by Erin Lowry",
    description: "Guide to financial literacy for millennials.",
    url: "https://www.brokemillennial.com/books",
    type: "book",
    difficulty: "beginner",
    ageGroups: ["young-adults"],
  },
  
  // Early Career resources
  {
    title: "The Bogleheads' Guide to Investing",
    description: "Book on low-cost index fund investing strategy.",
    url: "https://www.bogleheads.org/wiki/Bogleheads%27_Guide_To_Investing",
    type: "book",
    difficulty: "intermediate",
    ageGroups: ["early-career", "mid-career"],
  },
  {
    title: "The Money Guy Show",
    description: "Podcast covering financial planning and investing strategies.",
    url: "https://moneyguy.com/",
    type: "podcast",
    difficulty: "intermediate",
    ageGroups: ["early-career", "mid-career", "pre-retirement"],
  },
  {
    title: "Personal Finance Subreddit",
    description: "Community-driven advice and discussions on financial topics.",
    url: "https://www.reddit.com/r/personalfinance/",
    type: "tool",
    ageGroups: ["young-adults", "early-career", "mid-career"],
  },
  {
    title: "Nerdwallet - Finance Calculators",
    description: "Tools to calculate loans, mortgages, retirement, and more.",
    url: "https://www.nerdwallet.com/personal-finance/tools-and-calculators",
    type: "tool",
    difficulty: "intermediate",
    ageGroups: ["early-career", "mid-career", "pre-retirement"],
  },
  
  // Mid Career resources
  {
    title: "The Simple Path to Wealth by JL Collins",
    description: "Book on achieving financial independence through simple investing.",
    url: "https://www.jlcollinsnh.com/book/",
    type: "book",
    difficulty: "intermediate",
    ageGroups: ["mid-career", "pre-retirement"],
  },
  {
    title: "ChooseFI Podcast",
    description: "Podcast on financial independence and early retirement.",
    url: "https://www.choosefi.com/",
    type: "podcast",
    difficulty: "intermediate",
    ageGroups: ["mid-career", "pre-retirement"],
  },
  {
    title: "Wealthfront - Investment Management",
    description: "Automated investment service with low fees.",
    url: "https://www.wealthfront.com/",
    type: "tool",
    difficulty: "intermediate",
    ageGroups: ["mid-career", "pre-retirement"],
  },
  {
    title: "Financial Samurai Blog",
    description: "Personal finance blog with in-depth articles on investing and wealth building.",
    url: "https://www.financialsamurai.com/",
    type: "article",
    difficulty: "advanced",
    ageGroups: ["mid-career", "pre-retirement"],
  },
  
  // Pre-Retirement resources
  {
    title: "NewRetirement",
    description: "Retirement planning tools and resources.",
    url: "https://www.newretirement.com/",
    type: "tool",
    difficulty: "intermediate",
    ageGroups: ["pre-retirement", "retirement"],
  },
  {
    title: "How to Make Your Money Last by Jane Bryant Quinn",
    description: "Book on retirement income strategies.",
    url: "https://www.amazon.com/How-Make-Your-Money-Last/dp/1476743770",
    type: "book",
    difficulty: "intermediate",
    ageGroups: ["pre-retirement", "retirement"],
  },
  {
    title: "Medicare.gov",
    description: "Official U.S. government site for Medicare information.",
    url: "https://www.medicare.gov/",
    type: "tool",
    ageGroups: ["pre-retirement", "retirement"],
  },
  
  // Retirement resources
  {
    title: "Social Security Administration",
    description: "Official information on Social Security benefits and planning.",
    url: "https://www.ssa.gov/",
    type: "tool",
    ageGroups: ["pre-retirement", "retirement"],
  },
  {
    title: "The Retirement Manifesto",
    description: "Blog focused on retirement planning and living.",
    url: "https://www.theretirementmanifesto.com/",
    type: "article",
    difficulty: "intermediate",
    ageGroups: ["pre-retirement", "retirement"],
  },
  {
    title: "Retire Happy Blog",
    description: "Articles on retirement finance, lifestyle, and planning.",
    url: "https://retirehappy.ca/",
    type: "article",
    difficulty: "intermediate",
    ageGroups: ["pre-retirement", "retirement"],
  },
];

// Function to get resources for a specific age group
export const getResourcesByAgeGroup = (ageGroup: string) => {
  return resources.filter(resource => resource.ageGroups.includes(ageGroup));
};
