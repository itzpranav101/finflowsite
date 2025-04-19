
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, X, Shuffle } from "lucide-react";
import { toast } from "sonner";

interface MatchingPair {
  id: number;
  term: string;
  definition: string;
}

interface MatchingQuizProps {
  title: string;
  description: string;
  pairs: MatchingPair[];
  onComplete?: (score: number) => void;
}

const MatchingQuiz = ({ title, description, pairs, onComplete }: MatchingQuizProps) => {
  const [terms, setTerms] = useState<(MatchingPair | null)[]>([]);
  const [definitions, setDefinitions] = useState<(MatchingPair | null)[]>([]);
  const [selectedTerm, setSelectedTerm] = useState<number | null>(null);
  const [selectedDef, setSelectedDef] = useState<number | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Initialize the game with shuffled terms and definitions
  useEffect(() => {
    const shuffledTerms = [...pairs].sort(() => Math.random() - 0.5);
    const shuffledDefs = [...pairs].sort(() => Math.random() - 0.5);
    
    setTerms(shuffledTerms);
    setDefinitions(shuffledDefs);
  }, [pairs]);

  const handleSelectTerm = (index: number) => {
    if (matchedPairs.includes(terms[index]?.id || -1)) return;
    setSelectedTerm(index);
    
    // If a definition was already selected, check for a match
    if (selectedDef !== null) {
      checkForMatch(index, selectedDef);
    }
  };

  const handleSelectDefinition = (index: number) => {
    if (matchedPairs.includes(definitions[index]?.id || -1)) return;
    setSelectedDef(index);
    
    // If a term was already selected, check for a match
    if (selectedTerm !== null) {
      checkForMatch(selectedTerm, index);
    }
  };

  const checkForMatch = (termIndex: number, defIndex: number) => {
    const term = terms[termIndex];
    const def = definitions[defIndex];
    
    if (term && def && term.id === def.id) {
      // Match found!
      setMatchedPairs([...matchedPairs, term.id]);
      setScore(score + 1);
      toast.success("Match found!");
      
      // Check if all pairs are matched
      if (matchedPairs.length + 1 === pairs.length) {
        setIsComplete(true);
        if (onComplete) onComplete(score + 1);
      }
    } else {
      // No match
      toast.error("Not a match, try again!");
    }
    
    // Reset selections
    setSelectedTerm(null);
    setSelectedDef(null);
  };

  const resetGame = () => {
    const shuffledTerms = [...pairs].sort(() => Math.random() - 0.5);
    const shuffledDefs = [...pairs].sort(() => Math.random() - 0.5);
    
    setTerms(shuffledTerms);
    setDefinitions(shuffledDefs);
    setSelectedTerm(null);
    setSelectedDef(null);
    setMatchedPairs([]);
    setScore(0);
    setIsComplete(false);
  };

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-8">
          {/* Terms column */}
          <div className="space-y-3">
            <h3 className="font-semibold text-center text-blue-600">Terms</h3>
            {terms.map((term, index) => (
              <motion.div
                key={`term-${index}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => term && handleSelectTerm(index)}
                className={`p-4 rounded-lg border transition-colors cursor-pointer ${
                  matchedPairs.includes(term?.id || -1)
                    ? "bg-green-100 border-green-300"
                    : selectedTerm === index
                    ? "bg-blue-100 border-blue-400"
                    : "hover:bg-blue-50 border-slate-200"
                } ${!term ? "opacity-0" : ""}`}
              >
                {term?.term}
                {matchedPairs.includes(term?.id || -1) && (
                  <Check className="inline ml-2 text-green-500" size={16} />
                )}
              </motion.div>
            ))}
          </div>
          
          {/* Definitions column */}
          <div className="space-y-3">
            <h3 className="font-semibold text-center text-blue-600">Definitions</h3>
            {definitions.map((def, index) => (
              <motion.div
                key={`def-${index}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => def && handleSelectDefinition(index)}
                className={`p-4 rounded-lg border transition-colors cursor-pointer ${
                  matchedPairs.includes(def?.id || -1)
                    ? "bg-green-100 border-green-300"
                    : selectedDef === index
                    ? "bg-blue-100 border-blue-400"
                    : "hover:bg-blue-50 border-slate-200"
                } ${!def ? "opacity-0" : ""}`}
              >
                {def?.definition}
                {matchedPairs.includes(def?.id || -1) && (
                  <Check className="inline ml-2 text-green-500" size={16} />
                )}
              </motion.div>
            ))}
          </div>
        </div>
        
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100 text-center"
          >
            <h3 className="text-xl font-bold text-blue-800">
              Congratulations! You completed the quiz!
            </h3>
            <p className="text-blue-600">
              You matched all {pairs.length} pairs correctly!
            </p>
          </motion.div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>
          <span className="text-slate-600">
            Matched: {matchedPairs.length}/{pairs.length}
          </span>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={resetGame} className="flex items-center">
            <Shuffle className="mr-2 h-4 w-4" />
            Shuffle
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MatchingQuiz;
