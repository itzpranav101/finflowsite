import BadgeSystem from "@/components/BadgeSystem";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { availableBadges, useUserProgress } from "@/hooks/useUserProgress";
import { motion } from "framer-motion";
import { Award, BookOpen, Star, Trophy, Zap } from "lucide-react";
import React from "react";

// Define types for user progress
interface UserProgress {
  points: number;
  level: number;
  completedQuizzes: string[];
  completedModules: string[];
  earnedBadges: string[];
}

const BadgeProgressTab: React.FC = () => {
  // Get user progress from the hook, providing fallback defaults
  const {
    points = 0,
    level = 1,
    completedQuizzes = [],
    completedModules = [],
    earnedBadges = [],
  }: Partial<UserProgress> = useUserProgress();

  // Fallback for availableBadges
  const badges = availableBadges || [];

  // Prepare user progress data for BadgeSystem
  const userProgress: UserProgress = {
    points,
    level,
    completedQuizzes,
    completedModules,
    earnedBadges,
  };

  // Calculate earned badges percentage, avoiding division by zero
  const badgesEarnedPercentage =
    badges.length > 0 ? (earnedBadges.length / badges.length) * 100 : 0;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Your Progress & Achievements
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Track your financial education journey, collect badges, and level up as you learn new skills.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Badges & Progress Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="mr-2 h-5 w-5 text-amber-500" />
              Your Badges & Progress
            </CardTitle>
            <CardDescription>
              Complete quizzes and learning modules to earn badges and points
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BadgeSystem userProgress={userProgress} badges={badges} />
          </CardContent>
        </Card>

        {/* Achievement Stats Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="mr-2 h-5 w-5 text-blue-500" />
              Achievement Stats
            </CardTitle>
            <CardDescription>Your learning journey progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Quiz Completion */}
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-blue-800">Quiz Completion</h3>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {completedQuizzes.length} completed
                </span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${Math.min((completedQuizzes.length / 10) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-blue-700 mt-1">10 quizzes for max points</p>
            </div>

            {/* Module Completion */}
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-purple-800">Module Completion</h3>
                <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {completedModules.length} completed
                </span>
              </div>
              <div className="w-full bg-purple-200 rounded-full h-2.5">
                <div
                  className="bg-purple-600 h-2.5 rounded-full"
                  style={{ width: `${Math.min((completedModules.length / 5) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-purple-700 mt-1">5 modules for full completion</p>
            </div>

            {/* Badges Earned */}
            <div className="bg-amber-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-amber-800">Badges Earned</h3>
                <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {earnedBadges.length} / {badges.length}
                </span>
              </div>
              <div className="w-full bg-amber-200 rounded-full h-2.5">
                <div
                  className="bg-amber-500 h-2.5 rounded-full"
                  style={{ width: `${badgesEarnedPercentage}%` }}
                ></div>
              </div>
              <p className="text-xs text-amber-700 mt-1">Collect all badges!</p>
            </div>

            {/* How to Earn Points */}
            <div className="mt-4 p-4 border rounded-lg">
              <h3 className="font-medium text-slate-800 mb-2">How to Earn Points</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center text-slate-700">
                  <Zap className="h-4 w-4 text-blue-500 mr-2" />
                  Complete quiz: +10 points
                </li>
                <li className="flex items-center text-slate-700">
                  <BookOpen className="h-4 w-4 text-purple-500 mr-2" />
                  Complete module: +20 points
                </li>
                <li className="flex items-center text-slate-700">
                  <Award className="h-4 w-4 text-amber-500 mr-2" />
                  Earn badge: +bonus points
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BadgeProgressTab;