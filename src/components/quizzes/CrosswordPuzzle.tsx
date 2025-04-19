
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { LightbulbIcon, RefreshCw } from "lucide-react";

interface CrosswordWord {
  word: string;
  clue: string;
  direction: "across" | "down";
  startRow: number;
  startCol: number;
}

interface CrosswordPuzzleProps {
  title: string;
  description: string;
  words: CrosswordWord[];
  size: number;
  onComplete?: () => void;
}

const CrosswordPuzzle = ({ title, description, words, size, onComplete }: CrosswordPuzzleProps) => {
  const [grid, setGrid] = useState<string[][]>([]);
  const [userGrid, setUserGrid] = useState<string[][]>([]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [direction, setDirection] = useState<"across" | "down">("across");
  const [complete, setComplete] = useState(false);
  const [hints, setHints] = useState(3);

  // Initialize the grid
  useEffect(() => {
    const emptyGrid = Array(size)
      .fill("")
      .map(() => Array(size).fill(""));

    const solutionGrid = [...emptyGrid];
    
    // Fill in the words
    words.forEach((wordData) => {
      const { word, direction, startRow, startCol } = wordData;
      
      for (let i = 0; i < word.length; i++) {
        if (direction === "across") {
          solutionGrid[startRow][startCol + i] = word[i].toUpperCase();
        } else {
          solutionGrid[startRow + i][startCol] = word[i].toUpperCase();
        }
      }
    });
    
    setGrid(solutionGrid);
    
    // Create empty user grid with same structure
    const initialUserGrid = Array(size)
      .fill("")
      .map(() => Array(size).fill(""));
    setUserGrid(initialUserGrid);
  }, [words, size]);

  const handleCellClick = (row: number, col: number) => {
    if (grid[row][col] === "") return;
    
    if (selectedCell && selectedCell[0] === row && selectedCell[1] === col) {
      // Toggle direction if clicking on same cell
      setDirection(direction === "across" ? "down" : "across");
    } else {
      setSelectedCell([row, col]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!selectedCell) return;
    
    const [row, col] = selectedCell;
    
    if (/^[A-Za-z]$/.test(e.key)) {
      const newUserGrid = [...userGrid];
      newUserGrid[row][col] = e.key.toUpperCase();
      setUserGrid(newUserGrid);
      
      // Move to next cell
      moveToNextCell();
    } else if (e.key === "Backspace") {
      const newUserGrid = [...userGrid];
      newUserGrid[row][col] = "";
      setUserGrid(newUserGrid);
      
      // Move to previous cell
      moveToPrevCell();
    } else if (e.key === "ArrowRight") {
      setDirection("across");
      if (col < size - 1 && grid[row][col + 1] !== "") {
        setSelectedCell([row, col + 1]);
      }
    } else if (e.key === "ArrowLeft") {
      setDirection("across");
      if (col > 0 && grid[row][col - 1] !== "") {
        setSelectedCell([row, col - 1]);
      }
    } else if (e.key === "ArrowDown") {
      setDirection("down");
      if (row < size - 1 && grid[row + 1][col] !== "") {
        setSelectedCell([row + 1, col]);
      }
    } else if (e.key === "ArrowUp") {
      setDirection("down");
      if (row > 0 && grid[row - 1][col] !== "") {
        setSelectedCell([row - 1, col]);
      }
    }
  };

  const moveToNextCell = () => {
    if (!selectedCell) return;
    
    const [row, col] = selectedCell;
    
    if (direction === "across") {
      if (col < size - 1 && grid[row][col + 1] !== "") {
        setSelectedCell([row, col + 1]);
      }
    } else {
      if (row < size - 1 && grid[row + 1][col] !== "") {
        setSelectedCell([row + 1, col]);
      }
    }
  };

  const moveToPrevCell = () => {
    if (!selectedCell) return;
    
    const [row, col] = selectedCell;
    
    if (direction === "across") {
      if (col > 0 && grid[row][col - 1] !== "") {
        setSelectedCell([row, col - 1]);
      }
    } else {
      if (row > 0 && grid[row - 1][col] !== "") {
        setSelectedCell([row - 1, col]);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, row: number, col: number) => {
    const value = e.target.value;
    
    if (value === "" || /^[A-Za-z]$/.test(value)) {
      const newUserGrid = [...userGrid];
      newUserGrid[row][col] = value.toUpperCase();
      setUserGrid(newUserGrid);
      
      if (value !== "") {
        moveToNextCell();
      }
    }
  };

  const checkPuzzle = () => {
    // Check if all cells match
    let allCorrect = true;
    
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (grid[row][col] !== "" && grid[row][col] !== userGrid[row][col]) {
          allCorrect = false;
          break;
        }
      }
      if (!allCorrect) break;
    }
    
    if (allCorrect) {
      setComplete(true);
      toast.success("Congratulations! You solved the crossword!");
      if (onComplete) onComplete();
    } else {
      toast.error("Not yet correct. Keep trying!");
    }
  };

  const useHint = () => {
    if (hints <= 0) {
      toast.error("No hints remaining!");
      return;
    }
    
    if (!selectedCell) {
      toast.info("Select a cell first to use a hint");
      return;
    }
    
    const [row, col] = selectedCell;
    
    if (grid[row][col] === "") {
      toast.info("This cell doesn't have a letter");
      return;
    }
    
    const newUserGrid = [...userGrid];
    newUserGrid[row][col] = grid[row][col];
    setUserGrid(newUserGrid);
    setHints(hints - 1);
    toast.info(`Hint used! ${hints - 1} remaining`);
    
    // Move to next cell
    moveToNextCell();
  };

  const resetPuzzle = () => {
    setUserGrid(Array(size).fill("").map(() => Array(size).fill("")));
    setSelectedCell(null);
    setComplete(false);
    setHints(3);
  };

  // Find word numbers for clues
  const getWordNumbers = () => {
    const numbers: Record<string, number> = {};
    let counter = 1;
    
    words.sort((a, b) => {
      // Sort by row first, then by column
      if (a.startRow !== b.startRow) {
        return a.startRow - b.startRow;
      }
      return a.startCol - b.startCol;
    }).forEach(word => {
      const key = `${word.startRow}-${word.startCol}`;
      if (!numbers[key]) {
        numbers[key] = counter++;
      }
    });
    
    return numbers;
  };

  const wordNumbers = getWordNumbers();
  const acrossClues = words.filter(w => w.direction === "across");
  const downClues = words.filter(w => w.direction === "down");

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-6">
            <div>
              <h3 className="font-semibold text-blue-600 mb-2">Across</h3>
              <ul className="space-y-2">
                {acrossClues.map((word, index) => {
                  const num = wordNumbers[`${word.startRow}-${word.startCol}`];
                  return (
                    <li key={`across-${index}`} className="text-sm">
                      <span className="font-bold">{num}.</span> {word.clue}
                    </li>
                  );
                })}
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-blue-600 mb-2">Down</h3>
              <ul className="space-y-2">
                {downClues.map((word, index) => {
                  const num = wordNumbers[`${word.startRow}-${word.startCol}`];
                  return (
                    <li key={`down-${index}`} className="text-sm">
                      <span className="font-bold">{num}.</span> {word.clue}
                    </li>
                  );
                })}
              </ul>
            </div>
            
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                onClick={useHint}
                disabled={hints <= 0 || complete}
                className="flex items-center"
              >
                <LightbulbIcon className="mr-2 h-4 w-4" />
                Hint ({hints})
              </Button>
              
              <Button 
                variant="outline" 
                onClick={resetPuzzle}
                className="flex items-center"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div 
              className="grid border border-slate-300 bg-slate-50 rounded-lg overflow-hidden"
              style={{ gridTemplateRows: `repeat(${size}, 2.5rem)`, gridTemplateColumns: `repeat(${size}, 2.5rem)` }}
              tabIndex={0}
              onKeyDown={handleKeyDown}
            >
              {grid.map((row, rowIndex) => 
                row.map((cell, colIndex) => {
                  // Find if this cell is the start of a word
                  const key = `${rowIndex}-${colIndex}`;
                  const wordNumber = wordNumbers[key];
                  
                  return (
                    <div 
                      key={`${rowIndex}-${colIndex}`}
                      className={`relative border border-slate-200 flex items-center justify-center ${
                        cell === "" ? "bg-slate-800" : "bg-white"
                      } ${
                        selectedCell && selectedCell[0] === rowIndex && selectedCell[1] === colIndex
                          ? "ring-2 ring-blue-500"
                          : ""
                      }`}
                      onClick={() => cell !== "" && handleCellClick(rowIndex, colIndex)}
                    >
                      {wordNumber && (
                        <span className="absolute text-xs top-0 left-0.5 text-slate-500">
                          {wordNumber}
                        </span>
                      )}
                      
                      {cell !== "" && (
                        <input
                          type="text"
                          maxLength={1}
                          value={userGrid[rowIndex][colIndex]}
                          onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                          className={`w-full h-full text-center font-bold ${
                            complete ? "text-green-600" : ""
                          } focus:outline-none bg-transparent`}
                          disabled={complete}
                        />
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
        
        {complete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-4 bg-green-50 rounded-lg border border-green-100 text-center"
          >
            <h3 className="text-xl font-bold text-green-800">
              Congratulations! You solved the crossword!
            </h3>
            <p className="text-green-600">
              Great job completing this challenging puzzle!
            </p>
          </motion.div>
        )}
      </CardContent>
      <CardFooter className="justify-end">
        {!complete && (
          <Button onClick={checkPuzzle}>Check Answers</Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CrosswordPuzzle;
