
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, ThumbsUp, ThumbsDown, RotateCw, Award } from "lucide-react";
import confetti from "canvas-confetti";

interface FlashCardProps {
  front: string;
  back: string;
  isFlipped: boolean;
  onClick: () => void;
  difficulty?: "easy" | "medium" | "hard";
}

const FlashCard = ({ front, back, isFlipped, onClick, difficulty = "medium" }: FlashCardProps) => {
  const [confidence, setConfidence] = useState<"high" | "medium" | "low" | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [hasRevealed, setHasRevealed] = useState(false);
  const [streak, setStreak] = useState(0);
  
  // Reset state when card changes
  useEffect(() => {
    setConfidence(null);
    setShowHint(false);
    if (!isFlipped) {
      setHasRevealed(false);
    } else if (isFlipped && !hasRevealed) {
      setHasRevealed(true);
    }
  }, [front, isFlipped, hasRevealed]);
  
  // Trigger confetti when user gets a streak
  useEffect(() => {
    if (streak > 0 && streak % 3 === 0) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [streak]);
  
  const handleConfidenceClick = (level: "high" | "medium" | "low") => {
    setConfidence(level);
    if (level === "high") {
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
  };
  
  const generateHint = () => {
    const words = back.split(' ');
    if (words.length <= 3) return "💡 " + words[0] + "...";
    
    const randomWordIndices = new Set<number>();
    const hintWordCount = Math.ceil(words.length * 0.25); // Show ~25% of words
    
    while (randomWordIndices.size < hintWordCount) {
      randomWordIndices.add(Math.floor(Math.random() * words.length));
    }
    
    return "💡 " + words.map((word, i) => 
      randomWordIndices.has(i) ? word : "___"
    ).join(' ');
  };
  
  const difficultyColors = {
    easy: "border-green-300 dark:border-green-800",
    medium: "border-blue-300 dark:border-blue-800",
    hard: "border-purple-300 dark:border-purple-800"
  };
  
  return (
    <div className="perspective-1000 relative w-full">
      <div className="mb-2 flex justify-between items-center">
        <div className={`text-xs font-medium px-2 py-1 rounded-full ${
          difficulty === "easy" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" :
          difficulty === "medium" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" :
          "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
        }`}>
          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </div>
        
        {streak > 0 && (
          <div className="flex items-center bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs">
            <Award size={14} className="mr-1" />
            Streak: {streak}
          </div>
        )}
      </div>
      
      <div 
        className="cursor-pointer relative w-full h-[400px]"
        onClick={onClick}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={isFlipped ? "back" : "front"}
            initial={{ rotateY: isFlipped ? -90 : 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: isFlipped ? 90 : -90, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute w-full h-full"
          >
            {!isFlipped ? (
              // Front of card
              <Card className={`w-full h-full ${difficultyColors[difficulty]} shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                <CardContent className="flex flex-col items-center justify-center h-full p-8 text-lg">
                  <p className="text-xl font-semibold text-blue-900 dark:text-blue-300 mb-4">{front}</p>
                  
                  <div className="mt-auto flex flex-col items-center gap-2">
                    {showHint && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg mb-2"
                      >
                        {generateHint()}
                      </motion.div>
                    )}
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowHint(true);
                        }}
                        className="text-amber-600 border-amber-200 hover:bg-amber-50"
                        disabled={showHint}
                      >
                        <Lightbulb size={14} className="mr-1" />
                        Hint
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Click to flip
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              // Back of card
              <Card className={`w-full h-full bg-gradient-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-800 ${difficultyColors[difficulty]}`}>
                <CardContent className="flex flex-col items-center justify-between h-full p-8 overflow-auto">
                  <div className="text-gray-800 dark:text-gray-200 whitespace-pre-line mt-4">
                    {back}
                  </div>
                  
                  <div className="w-full mt-6">
                    <p className="text-sm text-center mb-2 text-gray-500">How well did you know this?</p>
                    <div className="flex justify-between gap-2 w-full">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className={`flex-1 ${confidence === "low" ? "bg-red-100 border-red-300" : ""}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleConfidenceClick("low");
                        }}
                      >
                        <ThumbsDown size={14} className="mr-1 text-red-500" />
                        Not at all
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        className={`flex-1 ${confidence === "medium" ? "bg-yellow-100 border-yellow-300" : ""}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleConfidenceClick("medium");
                        }}
                      >
                        <RotateCw size={14} className="mr-1 text-yellow-500" />
                        Partially
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        className={`flex-1 ${confidence === "high" ? "bg-green-100 border-green-300" : ""}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleConfidenceClick("high");
                        }}
                      >
                        <ThumbsUp size={14} className="mr-1 text-green-500" />
                        Knew it!
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FlashCard;
