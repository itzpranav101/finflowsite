import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { useState } from "react";
import FlashCard from "./FlashCard";

interface FlashCardData {
  front: string;
  back: string;
  difficulty?: "easy" | "medium" | "hard";
}

interface FlashCardCarouselProps {
  cards: FlashCardData[];
  title: string;
  onComplete?: (cardIndex: number) => void;
}

const FlashCardCarousel = ({ cards, title, onComplete }: FlashCardCarouselProps) => {
  const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedCards, setCompletedCards] = useState<Set<number>>(new Set());
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Track progress
  const progress = (completedCards.size / cards.length) * 100;

  // Helper function to extract the index from event's data attribute
  const getIndexFromEvent = (event: React.MouseEvent<HTMLDivElement>): number => {
    const index = event.currentTarget.getAttribute("data-index");
    return index ? parseInt(index, 10) : 0;
  };

  // Function to handle index click
  const handleIndexClick = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 400); // Match animation duration

    const wasFlipped = flippedCards[index] || false;
    setFlippedCards((prev) => ({
      ...prev,
      [index]: !wasFlipped,
    }));

    if (!wasFlipped) {
      setCompletedCards((prev) => {
        const newSet = new Set(prev);
        newSet.add(index);
        return newSet;
      });

      if (onComplete) {
        onComplete(index);
      }
    }
  };

  // Auto-update currentIndex when carousel changes
  const handleCarouselChange = (index: number) => {
    setCurrentIndex(index);
  };

  // Assign difficulties if not provided
  const cardsWithDifficulty = cards.map((card) => {
    if (card.difficulty) return card;
    const difficulties: ("easy" | "medium" | "hard")[] = ["easy", "medium", "hard"];
    const randomDifficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
    return { ...card, difficulty: randomDifficulty };
  });

  return (
    <motion.div 
      className="w-full max-w-5xl mx-auto p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <motion.h3 
          className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          {title}
        </motion.h3>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Card {currentIndex + 1} of {cards.length}
          </div>
          
          <div className="flex items-center gap-2">
            <Progress value={progress} className="w-40 h-2" />
            <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
          </div>
          
          {completedCards.size === cards.length && (
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center text-amber-600 bg-amber-50 px-3 py-1 rounded-full text-sm"
            >
              <Trophy size={14} className="mr-1" />
              Set Completed!
            </motion.div>
          )}
        </div>
      </div>
      
      <Carousel 
        className="w-full" 
        onSelect={handleCarouselChange}
      >
        <CarouselContent>
          {cardsWithDifficulty.map((card, index) => (
            <CarouselItem key={index} className="p-4">
              <motion.div
                data-index={index} // set data attribute for index extraction
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 * Math.min(index, 5), duration: 0.4 }}
                whileHover={{ scale: 1.02 }}
                onClick={(event: React.MouseEvent<HTMLDivElement>) =>
                  handleIndexClick(getIndexFromEvent(event))
                }
              >
                <FlashCard
                  front={card.front}
                  back={card.back}
                  difficulty={card.difficulty}
                  isFlipped={flippedCards[index] || false}
                />
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-2 border-blue-500/20 hover:bg-blue-50 dark:hover:bg-slate-700 transition-all duration-300" />
        <CarouselNext className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-2 border-blue-500/20 hover:bg-blue-50 dark:hover:bg-slate-700 transition-all duration-300" />
      </Carousel>
      
      <motion.div 
        className="mt-6 flex justify-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <div className="inline-flex items-center gap-2 text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
          <span>💡 Tip:</span>
          <span>Click cards to flip, use arrows to navigate</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FlashCardCarousel;