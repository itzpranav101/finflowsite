
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Brain, CheckCircle, Lightbulb, Puzzle, Clock, Gamepad, Trophy } from "lucide-react";
import MatchingQuiz from "./quizzes/MatchingQuiz";
import CrosswordPuzzle from "./quizzes/CrosswordPuzzle";
import FlashcardQuiz from "./quizzes/FlashcardQuiz";
import { useUserProgress } from "@/hooks/useUserProgress";
import { useToast } from "@/hooks/use-toast";

interface QuizData {
  id: string;
  title: string;
  description: string;
  type: "matching" | "crossword" | "flashcard" | "coming-soon";
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime: string;
  data: any;
}

interface QuizzesPanelProps {
  ageGroup: string;
  quizzes: QuizData[];
}

const QuizzesPanel = ({ ageGroup, quizzes }: QuizzesPanelProps) => {
  const [activeTab, setActiveTab] = useState("all");
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);
  const { completedQuizzes, completeQuiz, addPoints } = useUserProgress();
  const { toast } = useToast();

  const filteredQuizzes = activeTab === "all" 
    ? quizzes 
    : quizzes.filter(quiz => quiz.difficulty === activeTab);

  const handleQuizComplete = (quizId: string, stats?: {correct: number, incorrect: number, total: number}) => {
    if (!completedQuizzes.includes(quizId)) {
      completeQuiz(quizId);
      
      // Give bonus points for high scores
      if (stats && stats.correct / stats.total > 0.8) {
        addPoints(5); // Bonus for 80%+ correct
        toast({
          title: "Perfect Score Bonus!",
          description: "You earned +5 bonus points for a high score!",
          duration: 3000,
        });
      }
      
      toast({
        title: "Quiz Completed!",
        description: "You earned 10 points for completing this quiz.",
        duration: 3000,
      });
    }
  };

  const renderQuiz = (quiz: QuizData) => {
    switch (quiz.type) {
      case "matching":
        return (
          <MatchingQuiz
            title={quiz.title}
            description={quiz.description}
            pairs={quiz.data.pairs}
            onComplete={() => handleQuizComplete(quiz.id)}
          />
        );
      case "crossword":
        return (
          <CrosswordPuzzle
            title={quiz.title}
            description={quiz.description}
            words={quiz.data.words}
            size={quiz.data.size}
            onComplete={() => handleQuizComplete(quiz.id)}
          />
        );
      case "flashcard":
        return (
          <FlashcardQuiz
            title={quiz.title}
            description={quiz.description}
            cards={quiz.data.cards}
            onComplete={(stats) => handleQuizComplete(quiz.id, stats)}
          />
        );
      default:
        return (
          <div className="p-8 text-center">
            <Puzzle size={48} className="mx-auto text-slate-400 mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">Coming Soon!</h3>
            <p className="text-slate-600">This quiz type is currently in development. Check back later!</p>
          </div>
        );
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "text-green-500";
      case "intermediate":
        return "text-blue-500";
      case "advanced":
        return "text-purple-500";
      default:
        return "text-slate-500";
    }
  };

  const getDifficultyBg = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-50 border-green-100";
      case "intermediate":
        return "bg-blue-50 border-blue-100";
      case "advanced":
        return "bg-purple-50 border-purple-100";
      default:
        return "bg-slate-50 border-slate-100";
    }
  };

  const getQuizTypeIcon = (type: string) => {
    switch (type) {
      case "matching":
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case "crossword":
        return <Puzzle className="h-5 w-5 text-teal-500" />;
      case "flashcard":
        return <Lightbulb className="h-5 w-5 text-amber-500" />;
      default:
        return <Gamepad className="h-5 w-5 text-purple-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Interactive Quizzes & Activities
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Test your knowledge, practice financial concepts, and have fun with these interactive challenges.
        </p>
      </div>

      {activeQuiz ? (
        <div>
          <Button 
            variant="outline" 
            onClick={() => setActiveQuiz(null)}
            className="mb-4"
          >
            ← Back to All Quizzes
          </Button>
          
          {renderQuiz(quizzes.find(q => q.id === activeQuiz)!)}
        </div>
      ) : (
        <>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-center mb-6">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="beginner">Beginner</TabsTrigger>
                <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value={activeTab} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredQuizzes.map((quiz) => (
                  <motion.div
                    key={quiz.id}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className={`h-full border ${completedQuizzes.includes(quiz.id) ? 'border-green-200' : ''}`}>
                      <CardHeader className={`pb-2 ${getDifficultyBg(quiz.difficulty)} ${quiz.type === 'coming-soon' ? 'opacity-70' : ''}`}>
                        <div className="flex justify-between items-start">
                          <div className="flex items-center">
                            {getQuizTypeIcon(quiz.type)}
                            <CardTitle className="ml-2 text-lg">
                              {quiz.title}
                            </CardTitle>
                          </div>
                          {completedQuizzes.includes(quiz.id) && (
                            <Trophy className="h-5 w-5 text-amber-500" />
                          )}
                        </div>
                        <CardDescription>{quiz.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="flex justify-between text-sm mb-4">
                          <div className="flex items-center">
                            <Brain className={`h-4 w-4 mr-1 ${getDifficultyColor(quiz.difficulty)}`} />
                            <span className="capitalize">{quiz.difficulty}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-slate-400" />
                            <span>{quiz.estimatedTime}</span>
                          </div>
                        </div>
                        <Button 
                          className="w-full" 
                          variant={quiz.type === 'coming-soon' ? 'outline' : 'default'}
                          onClick={() => quiz.type !== 'coming-soon' && setActiveQuiz(quiz.id)}
                          disabled={quiz.type === 'coming-soon'}
                        >
                          {quiz.type === 'coming-soon' ? 'Coming Soon' : completedQuizzes.includes(quiz.id) ? 'Review Quiz' : 'Start Quiz'}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default QuizzesPanel;
