import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Stage5 = ({ onNext }) => {
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds
  const [timerStarted, setTimerStarted] = useState(false);
  const [showReward, setShowReward] = useState(false);

  const TIMER_DURATION = 180; // 3 minutes in seconds

  // Developer function to skip timer
  const skipTimer = () => {
    setTimeLeft(0);
    setShowReward(true);
    localStorage.removeItem("stage5TimerStart");
    console.log("⏭️ Timer skipped (Dev mode)");
  };

  // Load timer state from localStorage on component mount
  useEffect(() => {
    const savedTimerStart = localStorage.getItem("stage5TimerStart");

    if (savedTimerStart) {
      const startTime = parseInt(savedTimerStart);
      const currentTime = Date.now();
      const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
      const remainingTime = Math.max(0, TIMER_DURATION - elapsedSeconds);

      console.log(
        "⏰ Restoring timer - elapsed:",
        elapsedSeconds,
        "remaining:",
        remainingTime
      );

      setTimerStarted(true);
      setTimeLeft(remainingTime);

      if (remainingTime === 0) {
        setShowReward(true);
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
      setShowReward(true);
      localStorage.removeItem("stage5TimerStart"); // Clean up when timer completes
    }

    return () => clearInterval(interval);
  }, [timerStarted, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const startTimer = () => {
    const startTime = Date.now();
    setTimerStarted(true);
    localStorage.setItem("stage5TimerStart", startTime.toString());
    console.log(
      "⏰ Timer started at:",
      new Date(startTime).toLocaleTimeString()
    );
  };

  const continueToNext = () => {
    onNext();
  };

  const progressPercentage = ((180 - timeLeft) / 180) * 100;

  return (
    <div className="max-w-3xl mx-auto px-4 relative">
      {/* Developer Skip Timer Button - Only during timer countdown in development */}
      {process.env.NODE_ENV === "development" &&
        timerStarted &&
        !showReward && (
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
          The Sweet Treat
        </h2>
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 4, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity },
          }}
          className="text-4xl mb-4"
        >
          ⏰
        </motion.div>
      </motion.div>

      {!timerStarted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-10 border border-white/30 text-center"
        >
          <h3 className="font-elegant text-2xl md:text-3xl text-romantic-700 mb-6 leading-relaxed">
            Love takes patience.
            <br />
            <span className="font-handwritten text-romantic-500">
              Wait 3 minutes for your next surprise...
            </span>
          </h3>

          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-6xl mb-8"
          >
            🍫⏳
          </motion.div>

          <motion.button
            onClick={startTimer}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-romantic-500 to-romantic-600 text-white font-elegant font-semibold text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Start the Wait 💕
          </motion.button>
        </motion.div>
      ) : !showReward ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-10 border border-white/30 text-center"
        >
          <h3 className="font-elegant text-2xl text-romantic-700 mb-8">
            Patience, my love... ⏰
          </h3>

          <div className="mb-8">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-8xl md:text-9xl font-bold text-romantic-600 mb-4"
            >
              {formatTime(timeLeft)}
            </motion.div>

            <div className="w-full bg-romantic-200 rounded-full h-4 mb-4">
              <motion.div
                className="bg-gradient-to-r from-romantic-500 to-romantic-600 h-4 rounded-full shadow-lg"
                style={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            <p className="font-elegant text-romantic-600">
              Good things come to those who wait...
            </p>
          </div>

          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-6xl"
          >
            🍫💖
          </motion.div>
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
            animate={{ scale: [0, 1.3, 1] }}
            transition={{ duration: 1 }}
            className="text-8xl mb-6"
          >
            🎉
          </motion.div>

          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-10 border border-white/30 mb-8">
            <h3 className="font-handwritten text-4xl text-romantic-600 mb-6">
              Time's Up! 🍫
            </h3>

            <motion.div
              animate={{
                bounce: [0, -30, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-6"
            >
              🚗🧤
            </motion.div>

            <p className="font-elegant text-lg text-romantic-700 mb-4 leading-relaxed">
              Check the{" "}
              <span className="font-semibold text-romantic-600">
                glove compartment
              </span>{" "}
              in your car!
            </p>

            <div className="bg-romantic-100 border border-romantic-300 rounded-2xl p-4 text-center">
              <p className="font-elegant text-romantic-700 text-sm italic">
                💡 Your favorite Oreo cookies are waiting for you! 🍪
              </p>
            </div>
          </div>

          <motion.button
            onClick={continueToNext}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-romantic-500 to-romantic-600 text-white font-elegant font-semibold text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Claim Your Treat 🍫
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default Stage5;
