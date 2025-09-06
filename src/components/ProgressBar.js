import React from "react";
import { motion } from "framer-motion";

const ProgressBar = ({ currentStage, totalStages }) => {
  const progress = (currentStage / totalStages) * 100;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-elegant text-romantic-700">
          Stage {currentStage} of {totalStages}
        </span>
        <span className="text-sm font-elegant text-romantic-700">
          {Math.round(progress)}%
        </span>
      </div>

      <div className="w-full bg-white/30 rounded-full h-3 backdrop-blur-sm border border-white/20">
        <motion.div
          className="bg-gradient-to-r from-romantic-500 to-romantic-600 h-3 rounded-full shadow-lg"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>

      <div className="flex justify-between mt-2">
        {Array.from({ length: totalStages }, (_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i + 1 <= currentStage
                ? "bg-romantic-500 shadow-lg scale-110"
                : "bg-white/40 border border-romantic-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
