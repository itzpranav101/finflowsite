
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Brain, Zap, BookOpen, AlertCircle, ChevronRight } from "lucide-react";
import { AssessmentResults as ResultsType } from "./KnowledgeAssessment";
import { motion } from "framer-motion";

interface AssessmentResultsProps {
  results: ResultsType;
  onContinue: () => void;
}

const AssessmentResults = ({ results, onContinue }: AssessmentResultsProps) => {
  const { level, title, score, totalQuestions, strengthAreas, weakAreas, recommendations } = results;
  const scorePercent = Math.round((score / totalQuestions) * 100);

  // Format category names for display
  const formatCategory = (category: string) => {
    return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  // Get icon based on knowledge level
  const getLevelIcon = () => {
    switch(level) {
      case 'Advanced':
        return <Trophy className="w-12 h-12 text-yellow-500" />;
      case 'Intermediate':
        return <Brain className="w-12 h-12 text-blue-500" />;
      default:
        return <BookOpen className="w-12 h-12 text-green-500" />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="bg-white border-blue-100 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100">
          <motion.div 
            className="h-full bg-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${scorePercent}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
        
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl text-center text-slate-800">Your Knowledge Assessment</CardTitle>
          <CardDescription className="text-center">
            Based on your answers, we've created a personalized learning plan for you.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Score and level */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-6"
          >
            <div className="inline-flex items-center justify-center rounded-full bg-blue-50 p-4 mb-3">
              {getLevelIcon()}
            </div>
            <h2 className="text-3xl font-bold text-blue-700 mb-1">
              {title}
            </h2>
            <p className="text-slate-500">You scored {score} out of {totalQuestions} ({scorePercent}%)</p>
            
            <motion.div 
              className="mt-4 inline-block px-4 py-1.5 rounded-full font-medium text-sm"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.7 }}
              style={{ 
                backgroundColor: level === 'Advanced' ? "#FEF9C3" : level === 'Intermediate' ? "#DBEAFE" : "#DCFCE7",
                color: level === 'Advanced' ? "#A16207" : level === 'Intermediate' ? "#1D4ED8" : "#166534"
              }}
            >
              {level} Level Knowledge
            </motion.div>
          </motion.div>
          
          {/* Strengths and weaknesses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strengths */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-green-50 border border-green-100 rounded-lg p-4"
            >
              <div className="flex items-center mb-3">
                <Zap className="text-green-600 mr-2" size={18} />
                <h3 className="font-semibold text-lg text-green-800">Your Strengths</h3>
              </div>
              
              {strengthAreas.length > 0 ? (
                <ul className="space-y-2">
                  {strengthAreas.map((area, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.6 + (index * 0.1) }}
                      className="flex items-center text-green-700"
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      {formatCategory(area)}
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-600 italic">Keep practicing to develop your strengths!</p>
              )}
            </motion.div>
            
            {/* Areas for improvement */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-amber-50 border border-amber-100 rounded-lg p-4"
            >
              <div className="flex items-center mb-3">
                <AlertCircle className="text-amber-600 mr-2" size={18} />
                <h3 className="font-semibold text-lg text-amber-800">Areas to Focus On</h3>
              </div>
              
              {weakAreas.length > 0 ? (
                <ul className="space-y-2">
                  {weakAreas.map((area, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.6 + (index * 0.1) }}
                      className="flex items-center text-amber-700"
                    >
                      <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                      {formatCategory(area)}
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-600 italic">Great job! You're doing well across all areas.</p>
              )}
            </motion.div>
          </div>
          
          {/* Recommendations */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-6"
          >
            <h3 className="font-semibold text-lg text-blue-800 mb-3">Your Personalized Learning Path</h3>
            
            <ul className="space-y-3">
              {recommendations.map((recommendation, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.8 + (index * 0.1) }}
                  className="flex items-start text-slate-700"
                >
                  <div className="bg-white border border-blue-200 rounded-full w-5 h-5 flex items-center justify-center text-xs text-blue-700 font-medium mt-0.5 mr-2">
                    {index + 1}
                  </div>
                  <span>{recommendation}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Continue button */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="text-center pt-4"
          >
            <Button onClick={() => onContinue()} className="px-6 py-6 text-lg group">
              Continue to Your Learning Journey
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssessmentResults;
