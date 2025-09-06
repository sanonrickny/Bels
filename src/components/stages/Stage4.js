import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Stage4 = ({ onNext, updateGameData }) => {
  const [answer, setAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [timerStarted, setTimerStarted] = useState(false);
  const [showTimer, setShowTimer] = useState(true);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const [secretCode, setSecretCode] = useState("");

  const TIMER_DURATION = 120; // 2 minutes in seconds

  const romanticTexts = [
    "September 6th, 2023... the night everything changed... 💙",
    "An immersive art experience of the heart... 🎨",
    "The most important three words... ✨",
    "Where digital art came alive around us... 💕",
    "When I knew I wanted forever with you... 🔗",
    "The beginning of our 'I love you's... 💖",
  ];

  // Developer function to skip timer
  const skipTimer = () => {
    setTimeLeft(0);
    setShowTimer(false);
    localStorage.setItem("stage4TimerCompleted", "true");
    localStorage.removeItem("stage4TimerStart");
    console.log("⏭️ Timer skipped (Dev mode)");
  };

  // Load timer state from localStorage on component mount
  useEffect(() => {
    const savedTimerStart = localStorage.getItem("stage4TimerStart");
    const savedTimerCompleted = localStorage.getItem("stage4TimerCompleted");

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
        localStorage.setItem("stage4TimerCompleted", "true");
      }
    } else {
      // Auto-start timer when stage loads
      const startTime = Date.now();
      setTimerStarted(true);
      localStorage.setItem("stage4TimerStart", startTime.toString());
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
      localStorage.setItem("stage4TimerCompleted", "true");
      localStorage.removeItem("stage4TimerStart");
    }

    return () => clearInterval(interval);
  }, [timerStarted, timeLeft]);

  // Romantic text rotation effect
  useEffect(() => {
    if (timerStarted && timeLeft > 0) {
      const textInterval = setInterval(() => {
        setCurrentTextIndex((prev) => (prev + 1) % romanticTexts.length);
      }, 4000); // Change text every 4 seconds

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

  const scrambledWord = "SREUPLBUE";
  const correctAnswer = "superblue";

  useEffect(() => {
    // Generate the secret code
    const code = "LOVE2025";
    setSecretCode(code);
    updateGameData("secretCode", code);
  }, [updateGameData]); // Now safe with useCallback

  const checkAnswer = () => {
    const userAnswer = answer.toLowerCase().trim().replace(/\s+/g, "");
    if (userAnswer === correctAnswer) {
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
          First "I Love You"
        </h2>
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-4xl mb-4"
        >
          💙
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
            Reliving our love confession... ⏰
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
              scale: [1, 1.3, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-5xl"
          >
            💙🎨
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
              Unscramble this word to reveal the immersive
              <br />
              <span className="font-handwritten text-romantic-500">
                art experience where I said those three words
              </span>
            </h3>

            <motion.div className="bg-gradient-to-r from-cream-100 to-romantic-100 rounded-2xl p-6 mb-6 border border-romantic-200">
              <div className="text-5xl md:text-6xl font-bold text-romantic-600 tracking-wider mb-2">
                {scrambledWord.split("").map((letter, index) => (
                  <motion.span
                    key={index}
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.1,
                    }}
                    className="inline-block mx-1"
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
              <p className="font-elegant text-sm text-romantic-600">
                Rearrange these letters to form a word
              </p>
            </motion.div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type the unscrambled word..."
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
                  💡 An immersive digital art experience... it's beyond ordinary
                  blue! 🎨
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
                Unscramble It! ✨
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
              September 6th, 2023 💕
            </h3>

            <p className="font-elegant text-lg text-romantic-700 mb-6 leading-relaxed">
              The night I told you I love you ❤️
              <br />
              That was just the beginning.
            </p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="bg-gradient-to-r from-romantic-500 to-romantic-600 text-white rounded-2xl p-6 mb-6 shadow-lg"
            >
              <p className="font-elegant font-semibold mb-2">
                🔐 Secret Code Unlocked!
              </p>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-3xl font-bold tracking-wider"
              >
                {secretCode}
              </motion.div>
              <p className="font-elegant text-sm opacity-90 mt-2">
                Remember this code - you'll need it soon! 💝
              </p>
            </motion.div>

            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-5xl"
            >
              🎨💙✨
            </motion.div>
          </div>

          <motion.button
            onClick={continueToNext}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-romantic-500 to-romantic-600 text-white font-elegant font-semibold text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Keep the Magic Going 💖
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default Stage4;
