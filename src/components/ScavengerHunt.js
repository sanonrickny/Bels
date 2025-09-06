import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Stage1 from "./stages/Stage1";
import Stage2 from "./stages/Stage2";
import Stage3 from "./stages/Stage3";
import Stage4 from "./stages/Stage4";
import Stage5 from "./stages/Stage5";
import Stage6 from "./stages/Stage6";
import Stage7 from "./stages/Stage7";
import ProgressBar from "./ProgressBar";
import FloatingHearts from "./FloatingHearts";

const TOTAL_STAGES = 7;

const ScavengerHunt = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [gameData, setGameData] = useState({});
  const [isInitialized, setIsInitialized] = useState(false);

  // Load progress from localStorage on component mount
  useEffect(() => {
    const savedProgress = localStorage.getItem("anniversaryHuntProgress");
    const savedData = localStorage.getItem("anniversaryHuntData");

    console.log("🔍 Debug - Loading from localStorage:");
    console.log("📊 Raw savedProgress:", savedProgress);
    console.log("💾 Raw savedData:", savedData);

    if (savedProgress) {
      const stage = parseInt(savedProgress);
      console.log("✅ Parsed stage:", stage);
      setCurrentStage(stage);
    } else {
      console.log("❌ No saved progress found");
    }

    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        console.log("✅ Parsed data:", parsedData);
        setGameData(parsedData);
      } catch (error) {
        console.log("❌ Error parsing saved data:", error);
      }
    }

    setIsInitialized(true);
  }, []);

  // Save progress to localStorage whenever stage changes (but not during initialization)
  useEffect(() => {
    if (isInitialized) {
      console.log("💾 Saving stage to localStorage:", currentStage);
      localStorage.setItem("anniversaryHuntProgress", currentStage.toString());
    }
  }, [currentStage, isInitialized]);

  // Save game data to localStorage (but not during initialization)
  useEffect(() => {
    if (isInitialized) {
      console.log("💾 Saving game data to localStorage:", gameData);
      localStorage.setItem("anniversaryHuntData", JSON.stringify(gameData));
    }
  }, [gameData, isInitialized]);

  const nextStage = () => {
    if (currentStage < TOTAL_STAGES) {
      setCurrentStage(currentStage + 1);
    }
  };

  const updateGameData = useCallback((key, value) => {
    setGameData((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  // Developer reset function (only for testing)
  const resetProgress = () => {
    localStorage.removeItem("anniversaryHuntProgress");
    localStorage.removeItem("anniversaryHuntData");
    setCurrentStage(1);
    setGameData({});
    console.log("🔄 Progress reset to Stage 1");
  };

  const renderCurrentStage = () => {
    const stageProps = {
      onNext: nextStage,
      gameData,
      updateGameData,
    };

    switch (currentStage) {
      case 1:
        return <Stage1 {...stageProps} />;
      case 2:
        return <Stage2 {...stageProps} />;
      case 3:
        return <Stage3 {...stageProps} />;
      case 4:
        return <Stage4 {...stageProps} />;
      case 5:
        return <Stage5 {...stageProps} />;
      case 6:
        return <Stage6 {...stageProps} />;
      case 7:
        return <Stage7 {...stageProps} />;
      default:
        return <Stage1 {...stageProps} />;
    }
  };

  return (
    <div className="min-h-screen romantic-gradient relative overflow-hidden">
      <FloatingHearts />

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Developer Reset Button - Only in development */}
        {process.env.NODE_ENV === "development" && (
          <div className="fixed top-4 right-4 z-50">
            <button
              onClick={resetProgress}
              className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded shadow-lg transition-all duration-200"
              title="Reset progress (Dev only)"
            >
              🔄 Reset
            </button>
          </div>
        )}

        <ProgressBar currentStage={currentStage} totalStages={TOTAL_STAGES} />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="mt-8"
          >
            {renderCurrentStage()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ScavengerHunt;
