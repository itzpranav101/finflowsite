
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface AuthorInfo {
  name: string;
  introduction: string;
  portfolio?: string;
  investmentStyle?: string;
}

const authorData: Record<string, AuthorInfo> = {
  "Warren Buffett": {
    name: "Warren Buffett",
    introduction: "Warren Buffett, known as the 'Oracle of Omaha,' is one of the most successful investors of all time. Born in 1930, he first bought stock at age 11 and filed his first tax return at age 13. He's the CEO of Berkshire Hathaway and has pledged to give away 99% of his wealth to philanthropic causes.",
    portfolio: "Berkshire Hathaway's portfolio includes significant stakes in Apple, Bank of America, Coca-Cola, and American Express. His investment strategy focuses on buying undervalued companies with strong fundamentals and holding them for the long term.",
    investmentStyle: "Value investing with a focus on companies with strong competitive advantages, good management, and the ability to generate consistent cash flow. He famously avoids investing in technologies he doesn't understand."
  },
  "Robert Kiyosaki": {
    name: "Robert Kiyosaki",
    introduction: "Robert Kiyosaki is an entrepreneur and author of the bestselling book 'Rich Dad Poor Dad.' Born in Hawaii in 1947, he's known for his controversial views on money and investing, and for popularizing financial education through his books and games.",
    portfolio: "His investment strategy focuses heavily on real estate and business ownership. He's known for investing in rental properties and oil wells, while also maintaining precious metals as a hedge against inflation.",
    investmentStyle: "Focus on cash-flowing assets, particularly real estate and businesses. He advocates for financial education and understanding the difference between assets and liabilities."
  },
  "Peter Lynch": {
    name: "Peter Lynch",
    introduction: "Peter Lynch is one of the most successful and well-known investors of all time. He managed the Magellan Fund at Fidelity Investments from 1977 to 1990, during which the fund's assets grew from $20 million to $14 billion.",
    portfolio: "During his tenure at the Magellan Fund, Lynch achieved an average annual return of 29.2%. He was known for holding over 1,400 stocks at one time, showcasing his diverse investment approach.",
    investmentStyle: "Lynch believes in investing in what you know and understanding the company's business model. He's famous for the saying 'invest in what you know' and advocates for thorough research before investing."
  },
  "Idowu Koyenikan": {
    name: "Idowu Koyenikan",
    introduction: "Idowu Koyenikan is an internationally acclaimed author, consultant and public speaker. He is best known for his insightful quotes and books on achievement, success, and personal development. His works often focus on financial independence and creating value."
  },
  "Ayn Rand": {
    name: "Ayn Rand",
    introduction: "Ayn Rand was a Russian-American writer and philosopher who developed a philosophical system called Objectivism. Born in 1905, she is known for her novels 'Atlas Shrugged' and 'The Fountainhead,' which promote individualism, rational self-interest, and capitalism.",
    investmentStyle: "While not an investor herself, Rand's philosophy strongly influenced many in finance and business. She believed in the moral virtue of rational self-interest and the value of laissez-faire capitalism."
  },
  "T.T. Munger": {
    name: "T.T. Munger",
    introduction: "Theodore Thornton Munger was an American theologian, author and Congregational minister born in the 19th century. Though not primarily known for financial advice, his quote about saving has become famous in financial literature, emphasizing how the habit of saving can build character and discipline."
  },
  "Charles A. Jaffe": {
    name: "Charles A. Jaffe",
    introduction: "Charles A. Jaffe is a nationally syndicated financial columnist and author. He is known for his practical advice on personal finance, mutual funds, and investment strategies. Jaffe has written for MarketWatch and the Boston Globe, providing guidance to everyday investors."
  },
  "George Foreman": {
    name: "George Foreman",
    introduction: "George Foreman is a former professional boxer, entrepreneur, and author. Beyond his boxing career, Foreman became widely known for his George Foreman Grill, which has sold over 100 million units worldwide. His business success has made him a notable voice on entrepreneurship and financial security.",
    portfolio: "Foreman's most famous investment was lending his name to the George Foreman Grill, which earned him hundreds of millions in endorsement fees. He has also invested in various businesses and real estate."
  },
  "P.T. Barnum": {
    name: "P.T. Barnum",
    introduction: "Phineas Taylor Barnum was an American showman, businessman, and politician known for founding the Barnum & Bailey Circus. Born in 1810, he was famous for his entertainment ventures and promotional skills, becoming one of the wealthiest men of his time.",
    investmentStyle: "Barnum was known for his investment in entertainment businesses and real estate. He understood the value of publicity and customer satisfaction, famously quoted as saying 'There's a sucker born every minute' (though historians debate if he actually said this)."
  },
  "Bob Hope": {
    name: "Bob Hope",
    introduction: "Bob Hope was an American comedian, actor, singer, and author who lived from 1903 to 2003. Beyond his entertainment career, Hope was a savvy businessman and real estate investor, becoming one of the wealthiest entertainers in history.",
    portfolio: "Hope invested heavily in California real estate, particularly in the Coachella Valley. At one point, he was one of the largest individual landowners in California, with his real estate investments significantly contributing to his estimated $800 million estate at the time of his death."
  },
  "Ben Graham": {
    name: "Ben Graham",
    introduction: "Benjamin Graham was an economist, professor and investor known as the 'father of value investing' and the mentor of Warren Buffett. His books 'Security Analysis' (1934) and 'The Intelligent Investor' (1949) are considered foundational texts in the field of value investing.",
    investmentStyle: "Graham pioneered value investing - the strategy of buying stocks trading below their intrinsic value. He emphasized thorough analysis, the concept of margin of safety, and the distinction between investment and speculation. His approach focuses on long-term appreciation by identifying and buying undervalued stocks."
  },
  "Jan Houtema": {
    name: "Jan Houtema",
    introduction: "Jan Houtema is known for his insightful quotes about career development and life stages. His observation about one's twenties being an apprenticeship highlights the importance of learning and growth during this formative decade of adulthood."
  },
  "Benjamin Franklin": {
    name: "Benjamin Franklin",
    introduction: "Benjamin Franklin was an American polymath, inventor, scientist, printer, politician, and diplomat. Born in 1706, he was one of the Founding Fathers of the United States. Franklin was known for his financial prudence and wisdom, which he shared in publications like 'Poor Richard's Almanack.'",
    investmentStyle: "Franklin practiced what today would be considered value investing and income generation. He invested in printing businesses, real estate, and made loans at interest. He was known for his frugality and believed strongly in self-improvement and education as investments."
  },
  "Dave Ramsey": {
    name: "Dave Ramsey",
    introduction: "Dave Ramsey is an American personal finance advisor, radio show host, and author. Born in 1960, he's known for his 'Financial Peace University' and 'The Total Money Makeover' programs, which advocate debt-free living and conservative financial management.",
    investmentStyle: "Ramsey advocates for a debt-free lifestyle and recommends investing in growth stock mutual funds within tax-advantaged accounts like 401(k)s and IRAs. He suggests a portfolio of 25% each in growth, aggressive growth, growth and income, and international funds."
  },
  "Chris Brogan": {
    name: "Chris Brogan",
    introduction: "Chris Brogan is an American author, journalist, marketing consultant, and speaker about social media marketing. He has written multiple books on business and marketing in the digital age, including 'Trust Agents' and 'The Impact Equation.' His quote about financial goals reflects his philosophy on life design and personal freedom."
  },
  "Harry Emerson Fosdick": {
    name: "Harry Emerson Fosdick",
    introduction: "Harry Emerson Fosdick was an American pastor who lived from 1878 to 1969. He was a notable figure in liberal Protestantism and served as the minister of Riverside Church in New York City. While primarily known for his religious leadership, his quotes on purpose and meaning have been applied to various aspects of life, including retirement planning."
  },
  "David Feherty": {
    name: "David Feherty",
    introduction: "David Feherty is a former professional golfer, current golf broadcaster, writer, and commentator. Born in Northern Ireland in 1958, he's known for his wit and candor both on and off the golf course. After his playing career, he successfully transitioned to broadcasting and writing, showing resilience and adaptability in his career path."
  },
  "Edmund Burke": {
    name: "Edmund Burke",
    introduction: "Edmund Burke was an Irish statesman, economist, and philosopher who lived from 1729 to 1797. He served as a member of parliament in the British House of Commons and is considered the philosophical founder of modern conservatism. His writings on politics and economics have influenced generations of thinkers."
  },
  "Woodrow Wilson": {
    name: "Woodrow Wilson",
    introduction: "Woodrow Wilson was the 28th President of the United States, serving from 1913 to 1921. Before his presidency, he was a professor and president of Princeton University. Wilson led America through World War I and advocated for the League of Nations. His economic policies included the establishment of the Federal Reserve System."
  },
  "Catherine Pulsifer": {
    name: "Catherine Pulsifer",
    introduction: "Catherine Pulsifer is a contemporary author and writer known for her inspirational quotes and books about personal development, positive thinking, and life transitions. Her works often focus on finding joy and purpose in different life stages, including retirement."
  },
  "Betty Sullivan": {
    name: "Betty Sullivan",
    introduction: "Betty Sullivan is known for her uplifting quotes about retirement and embracing new chapters in life. Her perspective encourages retirees to view retirement as a beginning rather than an end, highlighting the opportunities for new experiences and personal growth."
  },
  "Mark Twain": {
    name: "Mark Twain",
    introduction: "Mark Twain, born Samuel Langhorne Clemens (1835-1910), was an American writer, humorist, and lecturer. He's best known for novels like 'The Adventures of Tom Sawyer' and 'Adventures of Huckleberry Finn.' Beyond his literary career, Twain experienced both financial success and failure, making several poor investments that led to bankruptcy in 1894."
  },
  "Unknown": {
    name: "Unknown",
    introduction: "This quote represents collective wisdom that has been passed down through generations of financial advisors, retirement planners, and everyday people. While its original author may be unknown, its message resonates with many who are planning for or experiencing retirement."
  }
};

interface AuthorModalProps {
  author: string;
}

const AuthorModal = ({ author }: AuthorModalProps) => {
  const authorInfo = authorData[author] || {
    name: author,
    introduction: "Information about this author is not available yet."
  };

  return (
    <Dialog>
      <DialogTrigger>
        <span className="text-blue-300 hover:text-blue-400 transition-colors cursor-pointer">
          {author}
        </span>
      </DialogTrigger>
      <DialogContent className="bg-slate-800 text-white border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-300 mb-4">
            {authorInfo.name}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Click outside to close
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-blue-300 mb-2">Introduction</h3>
            <p className="text-gray-300">{authorInfo.introduction}</p>
          </div>
          {authorInfo.portfolio && (
            <div>
              <h3 className="text-lg font-semibold text-blue-300 mb-2">Investment Portfolio</h3>
              <p className="text-gray-300">{authorInfo.portfolio}</p>
            </div>
          )}
          {authorInfo.investmentStyle && (
            <div>
              <h3 className="text-lg font-semibold text-blue-300 mb-2">Investment Style</h3>
              <p className="text-gray-300">{authorInfo.investmentStyle}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthorModal;
