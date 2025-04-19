import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Medal, Award, Trophy, BrainCircuit, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FinancialTermTooltip from "./FinancialTermTooltip";

// Knowledge levels and titles
const knowledgeLevels = [
  { level: "Beginner", title: "Finance Newbie", icon: <Medal className="w-8 h-8 text-orange-400" /> },
  { level: "Intermediate", title: "Money Mastermind", icon: <Award className="w-8 h-8 text-blue-400" /> },
  { level: "Advanced", title: "Investor in Training", icon: <Trophy className="w-8 h-8 text-green-400" /> },
];

// Types of questions
type QuestionType = 'mcq' | 'scenario' | 'true-false' | 'math' | 'ranking';

// Question interface
interface Question {
  id: number;
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  category: string;
}

// Questions for teens (reduced to 5)
const teenQuestions: Question[] = [
  {
    id: 1,
    type: 'mcq',
    question: "What is a stock?",
    options: [
      "A type of bond issued by companies",
      "An ownership share in a company",
      "A loan given to a company",
      "Money kept in a bank account"
    ],
    correctAnswer: "An ownership share in a company",
    explanation: "A stock represents ownership in a company. When you buy a stock, you become a partial owner of that company.",
    category: "investing",
  },
  {
    id: 2,
    type: 'scenario',
    question: "You get $5000 as a gift. What would you do first?",
    options: [
      "Spend it all on entertainment",
      "Save half and spend half",
      "Save most of it in a high-interest account",
      "Invest it in stocks or funds"
    ],
    correctAnswer: "Save most of it in a high-interest account",
    explanation: "For teenagers, building an emergency fund and savings habit is typically the first recommended step before investing.",
    category: "savings",
  },
  {
    id: 3,
    type: 'ranking',
    question: "Rank these investments from safest to riskiest",
    options: [
      "Government Bonds",
      "Index Funds",
      "Individual Stocks",
      "Cryptocurrency"
    ],
    correctAnswer: ["Government Bonds", "Index Funds", "Individual Stocks", "Cryptocurrency"],
    explanation: "Government bonds are generally the safest, followed by diversified investments like index funds, then individual stocks, with cryptocurrencies being among the riskiest investments.",
    category: "risk",
  },
  {
    id: 4,
    type: 'true-false',
    question: "All debt is bad and should be avoided completely.",
    options: ["True", "False"],
    correctAnswer: "False",
    explanation: "Some debt, like student loans or mortgages, can be strategic and help build wealth over time if managed properly. Bad debt typically involves high-interest consumer goods.",
    category: "debt",
  },
  {
    id: 5,
    type: 'math',
    question: "If $10,000 earns 5% interest per year, how much will you have after 3 years? (Assume simple interest)",
    options: [
      "$10,500",
      "$11,500",
      "$11,000",
      "$11,576"
    ],
    correctAnswer: "$11,500",
    explanation: "Simple interest calculation: $10,000 × 5% × 3 years = $10,000 × 0.05 × 3 = $1,500 in interest. $10,000 + $1,500 = $11,500",
    category: "interest",
  },
];

// Young adult questions (reduced to 5)
const youngAdultQuestions: Question[] = [
  {
    id: 1,
    type: 'mcq',
    question: "What is an index fund?",
    options: [
      "A fund managed by top investors",
      "A fund that tracks a specific market index like the S&P 500",
      "A high-risk investment vehicle",
      "A government bond fund"
    ],
    correctAnswer: "A fund that tracks a specific market index like the S&P 500",
    explanation: "Index funds track a specific market index, providing broad market exposure with low operating expenses.",
    category: "investing",
  },
  {
    id: 2,
    type: 'scenario',
    question: "You've just started your first job. How should you prioritize your money?",
    options: [
      "Pay off high-interest debt, build emergency fund, then invest",
      "Immediately invest everything for maximum growth",
      "Focus on buying property as soon as possible",
      "Upgrade your lifestyle to reflect your new income"
    ],
    correctAnswer: "Pay off high-interest debt, build emergency fund, then invest",
    explanation: "The recommended order is: pay high-interest debt, build 3-6 month emergency fund, then invest for future goals.",
    category: "personal-finance",
  },
  {
    id: 3,
    type: 'true-false',
    question: "A credit score only matters when applying for loans.",
    options: ["True", "False"],
    correctAnswer: "False",
    explanation: "Credit scores affect many aspects of life including renting apartments, insurance rates, and even some job opportunities.",
    category: "credit",
  },
  {
    id: 4,
    type: 'math',
    question: "If you contribute $500 monthly to your retirement account for 40 years with an average 7% return, approximately how much will you have?",
    options: [
      "$240,000",
      "$500,000",
      "$1.2 million",
      "$2.5 million"
    ],
    correctAnswer: "$1.2 million",
    explanation: "With compound interest at 7%, $500 monthly over 40 years grows to approximately $1.2 million.",
    category: "retirement",
  },
  {
    id: 5,
    type: 'ranking',
    question: "Rank these financial priorities from highest to lowest for a young adult",
    options: [
      "Emergency Fund",
      "401(k) Match",
      "High-Interest Debt",
      "Stock Investments"
    ],
    correctAnswer: ["High-Interest Debt", "401(k) Match", "Emergency Fund", "Stock Investments"],
    explanation: "Financial experts typically recommend prioritizing high-interest debt first, then securing employer 401(k) matches (free money), building an emergency fund, and finally investing in stocks.",
    category: "priorities",
  },
];

// Map age groups to their respective questions
const questionsByAgeGroup: Record<string, Question[]> = {
  "teens": teenQuestions,
  "young-adults": youngAdultQuestions,
  // Add other age groups as needed
};

interface KnowledgeAssessmentProps {
  ageGroup: string;
  onComplete: (results: AssessmentResults) => void;
}

export interface AssessmentResults {
  level: string;
  title: string;
  score: number;
  totalQuestions: number;
  strengthAreas: string[];
  weakAreas: string[];
  recommendations: string[];
}

const KnowledgeAssessment = ({ ageGroup, onComplete }: KnowledgeAssessmentProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [dragOrder, setDragOrder] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  const questions = questionsByAgeGroup[ageGroup] || teenQuestions;

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (currentQuestion?.type === 'ranking' && currentQuestion.options) {
      setDragOrder([...currentQuestion.options].sort(() => Math.random() - 0.5));
    }
  }, [currentQuestion]);

  const handleSelectAnswer = (answer: string) => {
    if (showExplanation) return;

    setAnswers({ ...answers, [currentQuestion.id]: answer });
    checkAnswer(answer);
  };

  const handleReorderRanking = (newOrder: string[]) => {
    setDragOrder(newOrder);
    setAnswers({ ...answers, [currentQuestion.id]: newOrder });
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === dragOrder.length - 1)
    ) {
      return;
    }

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const newOrder = [...dragOrder];
    [newOrder[index], newOrder[newIndex]] = [newOrder[newIndex], newOrder[index]];
    
    setDragOrder(newOrder);
    setAnswers({ ...answers, [currentQuestion.id]: newOrder });
  };

  const checkAnswer = (selectedAnswer: string | string[]) => {
    const correct = Array.isArray(currentQuestion.correctAnswer)
      ? JSON.stringify(selectedAnswer) === JSON.stringify(currentQuestion.correctAnswer)
      : selectedAnswer === currentQuestion.correctAnswer;

    setIsCorrect(correct);
    if (correct) {
      setScore(prev => prev + 1);
    }
    setShowExplanation(true);
  };

  const checkRankingAnswer = () => {
    checkAnswer(dragOrder);
  };

  const nextQuestion = () => {
    setShowExplanation(false);
    setIsCorrect(null);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    const totalQuestions = questions.length;
    const scorePercent = (score / totalQuestions) * 100;
    
    let level = "Beginner";
    if (scorePercent >= 80) {
      level = "Advanced";
    } else if (scorePercent >= 50) {
      level = "Intermediate";
    }
    
    const title = knowledgeLevels.find(k => k.level === level)?.title || "Finance Newbie";
    
    const categoriesCorrect: Record<string, number> = {};
    const categoriesTotal: Record<string, number> = {};
    
    questions.forEach((q, index) => {
      const answer = answers[q.id];
      const isAnswerCorrect = Array.isArray(q.correctAnswer)
        ? JSON.stringify(answer) === JSON.stringify(q.correctAnswer)
        : answer === q.correctAnswer;
      
      if (!categoriesTotal[q.category]) {
        categoriesTotal[q.category] = 0;
        categoriesCorrect[q.category] = 0;
      }
      
      categoriesTotal[q.category]++;
      if (isAnswerCorrect) {
        categoriesCorrect[q.category]++;
      }
    });
    
    const strengthAreas: string[] = [];
    const weakAreas: string[] = [];
    
    Object.keys(categoriesTotal).forEach(category => {
      const correctPercent = (categoriesCorrect[category] / categoriesTotal[category]) * 100;
      if (correctPercent >= 70) {
        strengthAreas.push(category);
      } else if (correctPercent < 50) {
        weakAreas.push(category);
      }
    });
    
    const recommendations: string[] = [];
    
    if (weakAreas.includes('investing')) {
      recommendations.push("Focus on learning investment basics and diversification strategies.");
    }
    
    if (weakAreas.includes('savings')) {
      recommendations.push("Explore effective saving techniques and building an emergency fund.");
    }
    
    if (weakAreas.includes('debt')) {
      recommendations.push("Learn about good vs. bad debt and debt management strategies.");
    }
    
    if (weakAreas.includes('interest')) {
      recommendations.push("Study compound interest and how it affects long-term wealth building.");
    }
    
    if (weakAreas.includes('risk')) {
      recommendations.push("Understand different risk levels and how to balance risk in your portfolio.");
    }
    
    if (weakAreas.includes('economics')) {
      recommendations.push("Learn about inflation and how it impacts your investments and savings.");
    }
    
    if (recommendations.length === 0) {
      recommendations.push("Continue building on your knowledge with advanced investment strategies.");
    }
    
    const results: AssessmentResults = {
      level,
      title,
      score,
      totalQuestions,
      strengthAreas,
      weakAreas,
      recommendations
    };
    
    setCompleted(true);
    onComplete(results);
  };

  const renderQuestion = () => {
    if (!currentQuestion) return null;

    switch (currentQuestion.type) {
      case 'mcq':
      case 'scenario':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-medium">{currentQuestion.question}</h3>
            <div className="space-y-2">
              {currentQuestion.options?.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelectAnswer(option)}
                  className={`w-full text-left p-4 rounded-lg transition-colors duration-200 ${
                    showExplanation
                      ? option === currentQuestion.correctAnswer
                        ? "bg-green-100 border-2 border-green-500"
                        : answers[currentQuestion.id] === option
                        ? "bg-red-100 border-2 border-red-500"
                        : "bg-white border border-slate-200"
                      : answers[currentQuestion.id] === option
                      ? "bg-blue-100 border-2 border-blue-400"
                      : "bg-white border border-slate-200 hover:bg-blue-50"
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                      showExplanation
                        ? option === currentQuestion.correctAnswer
                          ? "bg-green-500 text-white"
                          : answers[currentQuestion.id] === option
                          ? "bg-red-500 text-white"
                          : "bg-slate-200"
                        : answers[currentQuestion.id] === option
                        ? "bg-blue-500 text-white"
                        : "bg-slate-200"
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span>{option}</span>
                    {showExplanation && option === currentQuestion.correctAnswer && (
                      <CheckCircle2 className="ml-auto text-green-500" size={20} />
                    )}
                    {showExplanation && answers[currentQuestion.id] === option && option !== currentQuestion.correctAnswer && (
                      <AlertCircle className="ml-auto text-red-500" size={20} />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        );
      
      case 'true-false':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-medium">{currentQuestion.question}</h3>
            <div className="flex gap-3">
              {currentQuestion.options?.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSelectAnswer(option)}
                  className={`flex-1 p-4 rounded-lg text-center font-medium transition-colors duration-200 ${
                    showExplanation
                      ? option === currentQuestion.correctAnswer
                        ? "bg-green-100 border-2 border-green-500 text-green-700"
                        : answers[currentQuestion.id] === option
                        ? "bg-red-100 border-2 border-red-500 text-red-700"
                        : "bg-white border border-slate-200"
                      : answers[currentQuestion.id] === option
                      ? "bg-blue-100 border-2 border-blue-400 text-blue-700"
                      : "bg-white border border-slate-200 hover:bg-blue-50"
                  }`}
                >
                  {option}
                  {showExplanation && option === currentQuestion.correctAnswer && (
                    <CheckCircle2 className="mx-auto mt-2 text-green-500" size={24} />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        );
      
      case 'math':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-medium">{currentQuestion.question}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentQuestion.options?.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelectAnswer(option)}
                  className={`p-4 rounded-lg text-center font-medium transition-colors duration-200 ${
                    showExplanation
                      ? option === currentQuestion.correctAnswer
                        ? "bg-green-100 border-2 border-green-500 text-green-700"
                        : answers[currentQuestion.id] === option
                        ? "bg-red-100 border-2 border-red-500 text-red-700"
                        : "bg-white border border-slate-200"
                      : answers[currentQuestion.id] === option
                      ? "bg-blue-100 border-2 border-blue-400 text-blue-700"
                      : "bg-white border border-slate-200 hover:bg-blue-50"
                  }`}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </div>
        );
      
      case 'ranking':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-medium">{currentQuestion.question}</h3>
            <div className={`rounded-lg border ${shake ? 'animate-shake' : ''}`}>
              {dragOrder.map((item, index) => (
                <div 
                  key={index}
                  className={`p-4 border-b last:border-b-0 bg-white ${showExplanation && 
                    (currentQuestion.correctAnswer as string[])[index] === item 
                      ? 'bg-green-50'
                      : ''
                  }`}
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center mr-3">
                      {index + 1}
                    </div>
                    <span className="flex-1">{item}</span>
                    {!showExplanation && (
                      <div className="flex space-x-1">
                        <button 
                          onClick={() => moveItem(index, 'up')}
                          disabled={index === 0}
                          className="p-1 rounded hover:bg-slate-100 disabled:opacity-30"
                        >
                          ↑
                        </button>
                        <button 
                          onClick={() => moveItem(index, 'down')}
                          disabled={index === dragOrder.length - 1}
                          className="p-1 rounded hover:bg-slate-100 disabled:opacity-30"
                        >
                          ↓
                        </button>
                      </div>
                    )}
                    {showExplanation && (currentQuestion.correctAnswer as string[])[index] === item && (
                      <CheckCircle2 className="text-green-500 ml-2" size={18} />
                    )}
                  </div>
                </div>
              ))}
            </div>
            {currentQuestion.type === 'ranking' && !showExplanation && (
              <Button onClick={checkRankingAnswer} className="mt-4">
                Check Order
              </Button>
            )}
          </div>
        );
      
      default:
        return <div>Question type not supported</div>;
    }
  };

  const renderExplanation = () => {
    if (!showExplanation) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`mt-6 p-4 rounded-lg ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}
      >
        <div className="flex items-start">
          {isCorrect ? (
            <div className="bg-green-100 p-2 rounded-full mr-3">
              <CheckCircle2 className="text-green-600" size={20} />
            </div>
          ) : (
            <div className="bg-amber-100 p-2 rounded-full mr-3">
              <AlertCircle className="text-amber-600" size={20} />
            </div>
          )}
          <div>
            <h4 className={`font-medium ${isCorrect ? 'text-green-700' : 'text-amber-700'}`}>
              {isCorrect ? 'Correct!' : 'Not quite!'}
            </h4>
            <p className="text-slate-700 mt-1">{currentQuestion.explanation}</p>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto">
      {!completed ? (
        <Card className="bg-white shadow-lg border-blue-100">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl text-slate-800">Knowledge Assessment</CardTitle>
                <CardDescription>
                  Let's see what you already know about personal finance and investing!
                </CardDescription>
              </div>
              <BrainCircuit className="text-blue-500" size={32} />
            </div>
            <Progress value={(currentQuestionIndex / questions.length) * 100} className="h-2 mt-2" />
            <div className="flex justify-between text-sm text-slate-500 mt-1">
              <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
              <span>{Math.round((currentQuestionIndex / questions.length) * 100)}% Complete</span>
            </div>
          </CardHeader>
          
          <CardContent>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderQuestion()}
                {renderExplanation()}
              </motion.div>
            </AnimatePresence>
          </CardContent>
          
          <CardFooter className="flex justify-between border-t pt-4">
            <div>
              <span className="text-sm text-slate-500">Score: {score}/{currentQuestionIndex + (showExplanation ? 1 : 0)}</span>
            </div>
            {showExplanation && (
              <Button onClick={nextQuestion} className="group">
                {currentQuestionIndex < questions.length - 1 ? (
                  <>
                    Next Question
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                  </>
                ) : (
                  'See Results'
                )}
              </Button>
            )}
          </CardFooter>
        </Card>
      ) : null}
    </div>
  );
};

export default KnowledgeAssessment;
