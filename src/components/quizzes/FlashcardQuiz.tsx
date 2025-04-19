
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, RotateCw, ThumbsUp, ThumbsDown } from "lucide-react";

interface Flashcard {
  id: number;
  question: string;
  answer: string;
  category: string;
}

interface FlashcardQuizProps {
  title: string;
  description: string;
  cards: Flashcard[];
  onComplete?: (stats: { correct: number; incorrect: number; total: number }) => void;
}

const FlashcardQuiz = ({ title, description, cards, onComplete }: FlashcardQuizProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [userScores, setUserScores] = useState<Record<number, boolean | null>>({});
  const [complete, setComplete] = useState(false);

  const currentCard = cards[currentIndex];

  const flipCard = () => {
    setFlipped(!flipped);
  };

  const nextCard = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setFlipped(false);
    } else {
      finishQuiz();
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setFlipped(false);
    }
  };

  const markCard = (correct: boolean) => {
    setUserScores({ ...userScores, [currentCard.id]: correct });
    nextCard();
  };

  const finishQuiz = () => {
    setComplete(true);
    
    // Count correct and incorrect answers
    const stats = {
      correct: Object.values(userScores).filter(Boolean).length,
      incorrect: Object.values(userScores).filter(val => val === false).length,
      total: cards.length
    };
    
    if (onComplete) {
      onComplete(stats);
    }
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setFlipped(false);
    setUserScores({});
    setComplete(false);
  };

  const progressPercent = ((currentIndex + 1) / cards.length) * 100;

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="w-full bg-slate-100 h-2 rounded-full mt-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-sm text-slate-500">
          <span>Card {currentIndex + 1} of {cards.length}</span>
          <span>{Math.round(progressPercent)}% Complete</span>
        </div>
      </CardHeader>
      
      <CardContent>
        {!complete ? (
          <div className="flex justify-center">
            <div className="w-full max-w-md perspective">
              <motion.div
                className="w-full h-64 cursor-pointer preserve-3d"
                onClick={flipCard}
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute w-full h-full backface-hidden rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 p-6 flex flex-col items-center justify-center">
                  <h3 className="text-xl font-bold text-blue-800 mb-4">Question:</h3>
                  <p className="text-center text-slate-700">{currentCard.question}</p>
                  <div className="absolute bottom-3 right-3 text-xs bg-blue-100 px-2 py-1 rounded text-blue-700">
                    {currentCard.category}
                  </div>
                </div>
                
                <div className="absolute w-full h-full backface-hidden rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 p-6 flex flex-col items-center justify-center rotate-y-180">
                  <h3 className="text-xl font-bold text-green-800 mb-4">Answer:</h3>
                  <p className="text-center text-slate-700">{currentCard.answer}</p>
                </div>
              </motion.div>
              
              <div className="mt-4 text-center text-sm text-slate-500">
                {flipped ? "Click to see the question" : "Click to reveal answer"}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 text-center">
            <h3 className="text-xl font-bold text-blue-800 mb-4">Quiz Complete!</h3>
            <div className="flex justify-center space-x-8 mb-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-1">
                  {Object.values(userScores).filter(Boolean).length}
                </div>
                <div className="text-sm text-slate-600">Correct</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-red-500 mb-1">
                  {Object.values(userScores).filter(val => val === false).length}
                </div>
                <div className="text-sm text-slate-600">Incorrect</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-1">
                  {cards.length}
                </div>
                <div className="text-sm text-slate-600">Total</div>
              </div>
            </div>
            
            <Button onClick={restartQuiz} className="flex items-center">
              <RotateCw className="mr-2 h-4 w-4" />
              Restart Quiz
            </Button>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="justify-between">
        {!complete && (
          <>
            <Button 
              variant="outline" 
              onClick={prevCard} 
              disabled={currentIndex === 0}
              className="flex items-center"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Previous
            </Button>
            
            {flipped ? (
              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  onClick={() => markCard(false)}
                  className="flex items-center text-red-600 border-red-200 hover:bg-red-50"
                >
                  <ThumbsDown className="mr-2 h-4 w-4" />
                  I was wrong
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => markCard(true)}
                  className="flex items-center text-green-600 border-green-200 hover:bg-green-50"
                >
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  I was right
                </Button>
              </div>
            ) : (
              <Button 
                onClick={nextCard} 
                className="flex items-center"
              >
                {currentIndex < cards.length - 1 ? (
                  <>
                    Next
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </>
                ) : (
                  "Finish"
                )}
              </Button>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default FlashcardQuiz;
