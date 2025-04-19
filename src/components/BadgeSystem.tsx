
import React from "react";
import { CircleCheck, Star, Award, Trophy, Medal, Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export interface BadgeData {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  pointsRequired: number;
  category: "quiz" | "learning" | "activity" | "achievement";
  earned: boolean;
}

export interface UserProgress {
  points: number;
  level: number;
  completedQuizzes: string[];
  completedModules: string[];
  earnedBadges: string[];
}

interface BadgeSystemProps {
  userProgress: UserProgress;
  badges: BadgeData[];
}

// Calculate points needed for next level
const calculateNextLevelPoints = (level: number): number => {
  return level * 100;
};

// Calculate progress percentage towards next level
const calculateLevelProgress = (points: number, level: number): number => {
  const currentLevelPoints = (level - 1) * 100;
  const nextLevelPoints = level * 100;
  const levelProgress = ((points - currentLevelPoints) / (nextLevelPoints - currentLevelPoints)) * 100;
  return Math.min(levelProgress, 100);
};

const BadgeSystem = ({ userProgress, badges }: BadgeSystemProps) => {
  const { points, level, earnedBadges } = userProgress;
  const levelProgress = calculateLevelProgress(points, level);
  const pointsToNextLevel = calculateNextLevelPoints(level) - points;
  
  // Filter badges by earned status
  const earnedBadgesList = badges.filter(badge => earnedBadges.includes(badge.id));
  const availableBadges = badges.filter(badge => !earnedBadges.includes(badge.id)).slice(0, 5);

  return (
    <div className="space-y-6">
      <motion.div 
        className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-blue-800">Level {level}</h3>
            <p className="text-sm text-blue-600">{points} points earned</p>
          </div>
          <div className="bg-blue-500 text-white h-14 w-14 rounded-full flex items-center justify-center text-xl font-bold">
            {level}
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-blue-700">Progress to Level {level + 1}</span>
            <span className="text-blue-700">{levelProgress.toFixed(0)}%</span>
          </div>
          <Progress value={levelProgress} className="h-2" />
          <p className="text-xs text-blue-600 text-right">{pointsToNextLevel} points needed for next level</p>
        </div>
      </motion.div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-800 flex items-center">
          <Trophy className="h-5 w-5 text-amber-500 mr-2" />
          Earned Badges ({earnedBadgesList.length})
        </h3>
        
        {earnedBadgesList.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {earnedBadgesList.map((badge) => (
              <TooltipProvider key={badge.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div 
                      className="bg-white rounded-lg border border-blue-100 p-4 flex flex-col items-center text-center cursor-help"
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <div className="bg-blue-100 p-3 rounded-full mb-3">
                        {badge.icon}
                      </div>
                      <h4 className="font-medium text-slate-800">{badge.name}</h4>
                      <Badge variant="outline" className="mt-2 bg-blue-50 text-blue-700 border-blue-200">
                        {badge.category}
                      </Badge>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent className="p-3 max-w-xs">
                    <p>{badge.description}</p>
                    <p className="text-xs text-slate-500 mt-1">{badge.pointsRequired} points</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-slate-50 rounded-lg border">
            <Trophy className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-600">Complete quizzes and activities to earn badges!</p>
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-800 flex items-center">
          <Star className="h-5 w-5 text-blue-500 mr-2" />
          Badges to Earn
        </h3>
        
        <div className="space-y-3">
          {availableBadges.map((badge) => (
            <div key={badge.id} className="bg-white rounded-lg border border-slate-200 p-4">
              <div className="flex items-center">
                <div className="bg-slate-100 p-2 rounded-full mr-4">
                  {badge.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-slate-800">{badge.name}</h4>
                  <p className="text-sm text-slate-600">{badge.description}</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="mb-2">{badge.category}</Badge>
                  <p className="text-sm text-blue-600">{badge.pointsRequired} points</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BadgeSystem;
