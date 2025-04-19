
import React from "react";
import { Button } from "@/components/ui/button";
import { Brain, ArrowRight, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";

const AssessmentIntro = () => {
  const navigate = useNavigate();
  const { ageGroup } = useParams();
  
  const handleStartAssessment = () => {
    // Navigate back to the finance page with state to directly start assessment
    navigate(`/finance/${ageGroup}`, { state: { startAssessment: true } });
  };
  
  const handleSkipAssessment = () => {
    // Set the assessment as skipped in local storage
    localStorage.setItem('assessmentSkipped', 'true');
    // Navigate to learning path
    navigate(`/finance/${ageGroup}`);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto text-center space-y-6"
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Brain className="w-10 h-10 text-blue-600" />
          </motion.div>
          
          <h1 className="text-3xl font-bold text-slate-800">Knowledge Assessment</h1>
          
          <p className="text-lg text-slate-600 leading-relaxed">
            Taking this quick 5-question assessment helps us personalize your learning journey.
            We'll identify your strengths and areas for improvement to create a tailored
            learning path just for you.
          </p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 mt-8"
          >
            <h2 className="font-semibold text-slate-700 mb-3">Benefits of the Assessment:</h2>
            <ul className="text-left text-slate-600 space-y-3">
              <motion.li 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2"
              >
                <span className="inline-flex items-center justify-center p-1 bg-blue-100 text-blue-500 rounded-full">
                  <ArrowRight className="w-4 h-4" />
                </span>
                Personalized learning modules based on your knowledge level
              </motion.li>
              <motion.li 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-2"
              >
                <span className="inline-flex items-center justify-center p-1 bg-blue-100 text-blue-500 rounded-full">
                  <ArrowRight className="w-4 h-4" />
                </span>
                Focused content on areas that need improvement
              </motion.li>
              <motion.li 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-2"
              >
                <span className="inline-flex items-center justify-center p-1 bg-blue-100 text-blue-500 rounded-full">
                  <ArrowRight className="w-4 h-4" />
                </span>
                Track your progress more effectively
              </motion.li>
            </ul>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          >
            <Button
              onClick={handleStartAssessment}
              className="bg-blue-600 hover:bg-blue-700 group"
            >
              Take Assessment Now
              <Rocket className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
            </Button>
            <Button
              variant="outline"
              onClick={handleSkipAssessment}
            >
              Skip Assessment
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AssessmentIntro;
