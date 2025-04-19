
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Award } from "lucide-react";
import { BadgeData } from "./BadgeSystem";
import { useToast } from "@/hooks/use-toast";

interface BadgeNotificationProps {
  badge: BadgeData;
  onClose: () => void;
}

const BadgeNotification = ({ badge, onClose }: BadgeNotificationProps) => {
  const [show, setShow] = useState(true);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(false);
      setTimeout(onClose, 500); // Allow exit animation to complete
    }, 5000);
    
    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed top-4 right-4 max-w-md z-50"
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
          transition={{ type: "spring", damping: 15 }}
        >
          <div className="bg-white border border-blue-200 rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 flex items-center justify-between">
              <div className="flex items-center">
                <Award className="h-6 w-6 text-white mr-2" />
                <h3 className="text-white font-bold">Badge Earned!</h3>
              </div>
              <button
                onClick={() => {
                  setShow(false);
                  setTimeout(onClose, 300);
                }}
                className="text-white hover:text-blue-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-4 flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                {badge.icon}
              </div>
              <div>
                <h4 className="font-semibold text-slate-800">{badge.name}</h4>
                <p className="text-sm text-slate-600">{badge.description}</p>
                <p className="text-xs text-blue-600 mt-1">+{Math.floor(badge.pointsRequired / 5)} bonus points!</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const useBadgeNotification = () => {
  const [badges, setBadges] = useState<BadgeData[]>([]);
  const { toast } = useToast();
  
  // Only show a badge notification if explicitly called
  const showBadgeNotification = (badge: BadgeData) => {
    // Only add a badge notification if it doesn't already exist in the queue
    setBadges(prev => {
      if (prev.some(b => b.id === badge.id)) {
        return prev;
      }
      return [...prev, badge];
    });
    
    // Also show a toast for mobile users
    toast({
      title: "Badge Earned!",
      description: `${badge.name}: ${badge.description}`,
      duration: 5000,
    });
  };
  
  const removeBadgeNotification = (badgeId: string) => {
    setBadges(prev => prev.filter(b => b.id !== badgeId));
  };
  
  const BadgeNotifications = () => (
    <>
      {badges.map((badge) => (
        <BadgeNotification
          key={badge.id}
          badge={badge}
          onClose={() => removeBadgeNotification(badge.id)}
        />
      ))}
    </>
  );
  
  return {
    showBadgeNotification,
    BadgeNotifications
  };
};

export default BadgeNotification;
