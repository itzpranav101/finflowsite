
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BadgeData } from '@/components/BadgeSystem';
import { CircleCheck, Star, Award, Trophy, Medal, Crown, Brain, Zap, BookOpen, Lightbulb } from "lucide-react";

export interface UserProgress {
  points: number;
  level: number;
  completedQuizzes: string[];
  completedModules: string[];
  earnedBadges: string[];
}

interface UserProgressStore extends UserProgress {
  addPoints: (amount: number) => void;
  completeQuiz: (quizId: string) => void;
  completeModule: (moduleId: string) => void;
  earnBadge: (badgeId: string) => void;
  reset: () => void;
}

// Define available badges
export const availableBadges: BadgeData[] = [
  {
    id: "first-quiz",
    name: "First Steps",
    description: "Complete your first quiz",
    icon: <CircleCheck className="h-6 w-6 text-green-500" />,
    pointsRequired: 10,
    category: "quiz",
    earned: false
  },
  {
    id: "quiz-master",
    name: "Quiz Master",
    description: "Complete 5 quizzes",
    icon: <Award className="h-6 w-6 text-amber-500" />,
    pointsRequired: 50,
    category: "quiz",
    earned: false
  },
  {
    id: "budgeting-pro",
    name: "Budgeting Pro",
    description: "Complete the Budgeting module",
    icon: <Brain className="h-6 w-6 text-blue-500" />,
    pointsRequired: 20,
    category: "learning",
    earned: false
  },
  {
    id: "saving-expert",
    name: "Saving Expert",
    description: "Complete the Saving module",
    icon: <Lightbulb className="h-6 w-6 text-yellow-500" />,
    pointsRequired: 20,
    category: "learning",
    earned: false
  },
  {
    id: "investing-guru",
    name: "Investing Guru",
    description: "Complete the Investing module",
    icon: <Zap className="h-6 w-6 text-purple-500" />,
    pointsRequired: 20,
    category: "learning",
    earned: false
  },
  {
    id: "planning-master",
    name: "Planning Master",
    description: "Complete the Planning module",
    icon: <BookOpen className="h-6 w-6 text-indigo-500" />,
    pointsRequired: 20,
    category: "learning",
    earned: false
  },
  {
    id: "financial-graduate",
    name: "Financial Graduate",
    description: "Complete all learning modules",
    icon: <Trophy className="h-6 w-6 text-amber-500" />,
    pointsRequired: 100,
    category: "achievement",
    earned: false
  },
  {
    id: "quiz-champion",
    name: "Quiz Champion",
    description: "Complete 10 quizzes with perfect scores",
    icon: <Medal className="h-6 w-6 text-amber-500" />,
    pointsRequired: 150,
    category: "achievement",
    earned: false
  },
  {
    id: "financial-expert",
    name: "Financial Expert",
    description: "Reach level 5",
    icon: <Crown className="h-6 w-6 text-amber-500" />,
    pointsRequired: 500,
    category: "achievement",
    earned: false
  },
];

// Calculate level based on points
const calculateLevel = (points: number): number => {
  return Math.floor(points / 100) + 1;
};

// Modified to prevent automatic badge awarding
// This now only returns badges that SHOULD be earned, but doesn't trigger the earning
const checkForNewBadges = (state: UserProgress): string[] => {
  // This function only used manually in the earnBadge function now
  return [];
};

// Create the Zustand store with persistence
export const useUserProgress = create<UserProgressStore>()(
  persist(
    (set) => ({
      points: 0,
      level: 1,
      completedQuizzes: [],
      completedModules: [],
      earnedBadges: [],
      
      addPoints: (amount: number) => set((state) => {
        const newPoints = state.points + amount;
        const newLevel = calculateLevel(newPoints);
        
        // Only update points and level, no automatic badge earning
        return {
          ...state,
          points: newPoints,
          level: newLevel
        };
      }),
      
      completeQuiz: (quizId: string) => set((state) => {
        // Skip if already completed
        if (state.completedQuizzes.includes(quizId)) {
          return state;
        }
        
        // Mark the quiz as completed and award points
        return {
          ...state,
          completedQuizzes: [...state.completedQuizzes, quizId],
          points: state.points + 10, // Award 10 points for completing a quiz
          level: calculateLevel(state.points + 10)
        };
      }),
      
      completeModule: (moduleId: string) => set((state) => {
        // Skip if already completed
        if (state.completedModules.includes(moduleId)) {
          return state;
        }
        
        // Mark the module as completed and award points
        return {
          ...state,
          completedModules: [...state.completedModules, moduleId],
          points: state.points + 20, // Award 20 points for completing a module
          level: calculateLevel(state.points + 20)
        };
      }),
      
      // This will now be called explicitly when needed
      earnBadge: (badgeId: string) => set((state) => {
        // Skip if already earned
        if (state.earnedBadges.includes(badgeId)) {
          return state;
        }
        
        // Find badge points
        const badge = availableBadges.find(b => b.id === badgeId);
        const pointsToAdd = badge ? Math.floor(badge.pointsRequired / 5) : 0; // Give bonus points for earning a badge
        
        return {
          ...state,
          earnedBadges: [...state.earnedBadges, badgeId],
          points: state.points + pointsToAdd,
          level: calculateLevel(state.points + pointsToAdd)
        };
      }),
      
      reset: () => set({
        points: 0,
        level: 1,
        completedQuizzes: [],
        completedModules: [],
        earnedBadges: []
      })
    }),
    {
      name: 'user-progress-storage' // Storage key
    }
  )
);
