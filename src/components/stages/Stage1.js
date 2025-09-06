import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Stage1 = ({ onNext }) => {
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute in seconds
  const [timerStarted, setTimerStarted] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const TIMER_DURATION = 60; // 1 minute in seconds

  const romanticTexts = [
    "Welcome to our love story adventure... 💕",
    "Two years of beautiful memories await you... ✨",
    "Every second with you has been magical... 🌟",
    "Get ready for a journey through our love... 💖",
    "This is just the beginning of our celebration... 🎉",
  ];

  // Developer function to skip timer
  const skipTimer = () => {
    setTimeLeft(0);
    setShowContinue(true);
    localStorage.setItem("stage1TimerCompleted", "true");
    localStorage.removeItem("stage1TimerStart");
    console.log("⏭️ Timer skipped (Dev mode)");
  };

  // Developer function to reset timer
  const resetTimer = () => {
    setTimeLeft(TIMER_DURATION);
    setTimerStarted(false);
    setShowContinue(false);
    setCurrentTextIndex(0);
    localStorage.removeItem("stage1TimerStart");
    localStorage.removeItem("stage1TimerCompleted");
    console.log("🔄 Timer reset (Dev mode)");
  };

  // Developer function to reset ALL timers
  const resetAllTimers = () => {
    // Reset current stage
    resetTimer();
    // Clear all other stage timers
    const stages = [
      "stage1",
      "stage2",
      "stage3",
      "stage4",
      "stage5",
      "stage6",
      "stage7",
    ];
    stages.forEach((stage) => {
      localStorage.removeItem(`${stage}TimerStart`);
      localStorage.removeItem(`${stage}TimerCompleted`);
    });
    console.log("🗑️ All timers reset (Dev mode)");
    alert(
      "All timers have been reset! You can now test the timers from the beginning."
    );
  };

  // Load timer state from localStorage on component mount
  useEffect(() => {
    const savedTimerStart = localStorage.getItem("stage1TimerStart");
    const savedTimerCompleted = localStorage.getItem("stage1TimerCompleted");

    if (savedTimerCompleted === "true") {
      // Timer was already completed, skip to continue state
      setTimerStarted(true);
      setTimeLeft(0);
      setShowContinue(true);
    } else if (savedTimerStart) {
      const startTime = parseInt(savedTimerStart);
      const currentTime = Date.now();
      const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
      const remainingTime = Math.max(0, TIMER_DURATION - elapsedSeconds);

      setTimerStarted(true);
      setTimeLeft(remainingTime);

      if (remainingTime === 0) {
        setShowContinue(true);
        localStorage.setItem("stage1TimerCompleted", "true");
      }
    }
  }, []);

  // Timer countdown effect
  useEffect(() => {
    let interval = null;

    if (timerStarted && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerStarted) {
      setShowContinue(true);
      localStorage.setItem("stage1TimerCompleted", "true");
      localStorage.removeItem("stage1TimerStart");
    }

    return () => clearInterval(interval);
  }, [timerStarted, timeLeft]);

  // Romantic text rotation effect
  useEffect(() => {
    if (timerStarted && timeLeft > 0) {
      const textInterval = setInterval(() => {
        setCurrentTextIndex((prev) => (prev + 1) % romanticTexts.length);
      }, 3000); // Change text every 3 seconds

      return () => clearInterval(textInterval);
    }
  }, [timerStarted, timeLeft, romanticTexts.length]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const startTimer = () => {
    const startTime = Date.now();
    setTimerStarted(true);
    localStorage.setItem("stage1TimerStart", startTime.toString());
  };

  const progressPercentage =
    ((TIMER_DURATION - timeLeft) / TIMER_DURATION) * 100;
  return (
    <div className="max-w-4xl mx-auto px-4 relative">
      {/* Developer Buttons */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed top-16 right-4 z-50 space-y-2">
          {timerStarted && !showContinue && (
            <button
              onClick={skipTimer}
              className="block bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-3 py-1 rounded shadow-lg transition-all duration-200"
              title="Skip timer (Dev only)"
            >
              ⏭️ Skip Timer
            </button>
          )}
          <button
            onClick={resetTimer}
            className="block bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded shadow-lg transition-all duration-200"
            title="Reset this timer (Dev only)"
          >
            🔄 Reset Timer
          </button>
          <button
            onClick={resetAllTimers}
            className="block bg-purple-500 hover:bg-purple-600 text-white text-xs px-3 py-1 rounded shadow-lg transition-all duration-200"
            title="Reset ALL timers (Dev only)"
          >
            🗑️ Reset All
          </button>
        </div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8"
      >
        <h1 className="font-handwritten text-6xl md:text-8xl text-gradient mb-4">
          Our Anniversary
        </h1>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-4xl mb-2"
        >
          💕
        </motion.div>
        <p className="font-elegant text-romantic-700 text-lg">
          A love letter & adventure just for you
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 border border-white/30 mb-8"
      >
        <div className="text-center mb-6">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="text-6xl mb-4"
          >
            💌
          </motion.div>
        </div>

        <div className="font-elegant text-romantic-800 leading-relaxed space-y-4">
          <p className="text-lg md:text-xl">
            <span className="font-handwritten text-2xl text-romantic-600">
              My love,
            </span>
          </p>

          <p className="text-base md:text-lg">
            Two years ago today, we met behind the Zara cashier counters, and my
            life hasn't been the same since. From our first date, to the day I
            told you 'I love you', you've been my best friend, my partner, and
            my greatest blessing.
          </p>

          <p className="text-base md:text-lg">
            As we chase our dreams together at FIU — you in Finance, me in
            Computer Science — I want to remind you that no matter where life
            takes us, I'll always be your biggest supporter and your biggest
            fan.
          </p>

          <p className="text-base md:text-lg">
            This little scavenger hunt is my way of saying: our love is an
            adventure. And today, you get to go on one just for us.
          </p>

          <div className="text-center mt-8 space-y-2">
            <p className="font-handwritten text-2xl text-romantic-600">
              Happy Anniversary ❤️
            </p>
            <p className="font-elegant text-lg text-romantic-700">
              Love,
              <br />
              <span className="font-handwritten text-xl">Rickny</span>
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="text-center"
      >
        {!timerStarted ? (
          <motion.button
            onClick={startTimer}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(236, 72, 153, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-romantic-500 to-romantic-600 text-white font-elegant font-semibold text-xl px-12 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-romantic-400"
          >
            Start the Hunt 💕
          </motion.button>
        ) : !showContinue ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-10 border border-white/30 text-center"
          >
            <h3 className="font-elegant text-2xl text-romantic-700 mb-6">
              Preparing your adventure... ⏰
            </h3>

            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-6xl md:text-7xl font-bold text-romantic-600 mb-4"
            >
              {formatTime(timeLeft)}
            </motion.div>

            <div className="w-full bg-romantic-200 rounded-full h-4 mb-6">
              <motion.div
                className="bg-gradient-to-r from-romantic-500 to-romantic-600 h-4 rounded-full shadow-lg"
                style={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            <motion.p
              key={currentTextIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="font-elegant text-lg text-romantic-600 mb-4"
            >
              {romanticTexts[currentTextIndex]}
            </motion.p>

            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-5xl"
            >
              💕✨
            </motion.div>
          </motion.div>
        ) : (
          <motion.button
            onClick={onNext}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(236, 72, 153, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-romantic-500 to-romantic-600 text-white font-elegant font-semibold text-xl px-12 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-romantic-400"
          >
            Begin the Adventure 💕
          </motion.button>
        )}

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-6 text-romantic-600 font-elegant"
        >
          <div className="text-3xl">↓</div>
          <p className="text-sm">Let the adventure begin!</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Stage1;
