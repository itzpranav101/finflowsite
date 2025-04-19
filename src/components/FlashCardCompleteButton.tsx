
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge, Award, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface FlashCardCompleteButtonProps {
  moduleTitle: string;
  onComplete: () => void;
}

const FlashCardCompleteButton: React.FC<FlashCardCompleteButtonProps> = ({ 
  moduleTitle, 
  onComplete 
}) => {
  const handleComplete = () => {
    // Show toast notification
    toast.success(`Module "${moduleTitle}" completed! You've earned a badge!`, {
      position: "top-center",
      duration: 3000,
    });
    
    // Call the onComplete callback
    onComplete();
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-md border border-blue-100"
    >
      <motion.div 
        className="mb-6 bg-blue-100 p-4 rounded-full"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Award className="h-12 w-12 text-blue-600" />
      </motion.div>
      
      <h3 className="text-2xl font-bold text-blue-900 mb-2">Module Complete!</h3>
      <p className="text-slate-600 text-center mb-6">
        You've completed the {moduleTitle} module. Great job! Mark this module as complete to earn a badge.
      </p>
      
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={handleComplete}
          className="bg-blue-600 hover:bg-blue-700 group transition-all duration-300 px-6 py-2 text-lg"
        >
          <Badge className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
          <span className="mr-1">Complete and</span>
          <span className="relative">
            Earn Badge
            <motion.span
              className="absolute -top-1 -right-1 flex h-3 w-3"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
            </motion.span>
          </span>
        </Button>
      </motion.div>
      
      <motion.div
        className="mt-4 text-green-600 flex items-center text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <CheckCircle className="h-4 w-4 mr-1" />
        <span>Progress saved automatically</span>
      </motion.div>
    </motion.div>
  );
};

export default FlashCardCompleteButton;
