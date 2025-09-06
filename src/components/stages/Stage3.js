import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Stage3 = ({ onNext }) => {
  const [answer, setAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90); // 1.5 minutes
  const [timerStarted, setTimerStarted] = useState(false);
  const [showTimer, setShowTimer] = useState(true);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const TIMER_DURATION = 90; // 1.5 minutes in seconds

  const romanticTexts = [
    "Our first date by the water... 🌊",
    "A TikTok discovery that changed everything... 📱",
    "Sharing food and falling in love... 🍽️",
    "That perfect waterfront evening... ✨",
    "When I knew you were special... 💕",
    "Creating our first beautiful memory... 📸",
  ];

  // Developer function to skip timer
  const skipTimer = () => {
    setTimeLeft(0);
    setShowTimer(false);
    localStorage.setItem("stage3TimerCompleted", "true");
    localStorage.removeItem("stage3TimerStart");
    console.log("⏭️ Timer skipped (Dev mode)");
  };

  // Load timer state from localStorage on component mount
  useEffect(() => {
    const savedTimerStart = localStorage.getItem("stage3TimerStart");
    const savedTimerCompleted = localStorage.getItem("stage3TimerCompleted");

    if (savedTimerCompleted === "true") {
      // Timer was already completed, skip timer entirely
      setTimerStarted(true);
      setTimeLeft(0);
      setShowTimer(false);
    } else if (savedTimerStart) {
      const startTime = parseInt(savedTimerStart);
      const currentTime = Date.now();
      const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
      const remainingTime = Math.max(0, TIMER_DURATION - elapsedSeconds);

      setTimerStarted(true);
      setTimeLeft(remainingTime);

      if (remainingTime === 0) {
        setShowTimer(false);
        localStorage.setItem("stage3TimerCompleted", "true");
      }
    } else {
      // Auto-start timer when stage loads
      const startTime = Date.now();
      setTimerStarted(true);
      localStorage.setItem("stage3TimerStart", startTime.toString());
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
      setShowTimer(false);
      localStorage.setItem("stage3TimerCompleted", "true");
      localStorage.removeItem("stage3TimerStart");
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

  const progressPercentage =
    ((TIMER_DURATION - timeLeft) / TIMER_DURATION) * 100;

  const checkAnswer = () => {
    const userAnswer = answer.toLowerCase().trim().replace(/\s+/g, " ");
    if (userAnswer === "lido bayside" || userAnswer === "lidobayside") {
      setShowReward(true);
    } else {
      // Wrong answer animation
      setAnswer("");
      setShowHint(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkAnswer();
  };

  const continueToNext = () => {
    onNext();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 relative">
      {/* Developer Skip Timer Button */}
      {process.env.NODE_ENV === "development" && timerStarted && showTimer && (
        <div className="fixed top-16 right-4 z-50">
          <button
            onClick={skipTimer}
            className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-3 py-1 rounded shadow-lg transition-all duration-200"
            title="Skip timer (Dev only)"
          >
            ⏭️ Skip Timer
          </button>
        </div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h2 className="font-handwritten text-5xl md:text-6xl text-gradient mb-4">
          Our First Date
        </h2>
        <motion.div
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="text-4xl mb-4"
        >
          🍽️
        </motion.div>
      </motion.div>

      {showTimer ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-10 border border-white/30 text-center"
        >
          <h3 className="font-elegant text-2xl text-romantic-700 mb-6">
            Remembering our first date... ⏰
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
              rotate: [0, 15, -15, 0],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-5xl"
          >
            🍽️💕
          </motion.div>
        </motion.div>
      ) : !showReward ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-10 border border-white/30"
        >
          <div className="text-center mb-8">
            <h3 className="font-elegant text-2xl md:text-3xl text-romantic-700 mb-6 leading-relaxed">
              A waterfront restaurant you discovered online,
              <br />
              <span className="font-handwritten text-romantic-500">
                where we had our very first date?
              </span>
            </h3>

            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-6xl mb-6"
            >
              📱🍕
            </motion.div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type the restaurant name..."
                className="w-full px-6 py-4 text-lg font-elegant bg-white/60 border border-romantic-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-romantic-200 focus:border-romantic-400 transition-all duration-300"
                autoFocus
              />
            </div>

            {showHint && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-romantic-100 border border-romantic-300 rounded-2xl p-4 text-center"
              >
                <p className="font-elegant text-romantic-700">
                  💡 It's an Italian word + a body of water. Think Miami
                  waterfront dining! 🌊
                </p>
              </motion.div>
            )}

            <div className="text-center">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!answer.trim()}
                className="bg-gradient-to-r from-romantic-500 to-romantic-600 text-white font-elegant font-semibold text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Check Answer ✨
              </motion.button>
            </div>
          </form>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.8 }}
            className="text-8xl mb-6"
          >
            ✅
          </motion.div>

          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-10 border border-white/30 mb-8">
            <h3 className="font-handwritten text-4xl text-romantic-600 mb-6">
              Exactly right! 💕
            </h3>

            <div className="mb-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="bg-gradient-to-r from-romantic-100 to-cream-100 rounded-2xl p-4 md:p-6 border border-romantic-200 shadow-lg"
              >
                <div className="text-6xl mb-4">📸</div>
                <p className="font-elegant text-sm text-romantic-600 italic mb-2">
                  *Our First Date Memory*
                </p>
                <div className="w-full aspect-[4/3] bg-romantic-200 rounded-lg overflow-hidden border-2 border-romantic-300 shadow-inner">
                  <img
                    src="/images/First date.JPG"
                    alt="Our first date at Lido Bayside"
                    className="w-full h-full object-contain bg-white"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.backgroundColor = "#f3f4f6";
                      e.target.style.display = "flex";
                      e.target.style.alignItems = "center";
                      e.target.style.justifyContent = "center";
                      e.target.innerHTML = "📸";
                    }}
                  />
                </div>
              </motion.div>
            </div>

            <p className="font-elegant text-lg text-romantic-700 leading-relaxed">
              That night started a tradition of making every moment special.
            </p>

            <motion.div
              animate={{ bounce: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="text-4xl mt-4"
            >
              🥂✨
            </motion.div>
          </div>

          <motion.button
            onClick={continueToNext}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-romantic-500 to-romantic-600 text-white font-elegant font-semibold text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Continue Our Journey 💖
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default Stage3;
