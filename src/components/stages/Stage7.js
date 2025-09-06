import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

const Stage7 = () => {
  const [windowDimension, setWindowDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [showConfetti, setShowConfetti] = useState(true);
  const [timeLeft, setTimeLeft] = useState(45); // 45 seconds
  const [timerStarted, setTimerStarted] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const TIMER_DURATION = 45; // 45 seconds

  const romanticTexts = [
    "Celebrating two years of pure magic... 🎉",
    "Every memory with you is precious... 📸",
    "Our love story continues to unfold... 💕",
    "Happy anniversary, my beautiful love... ✨",
    "Here's to forever with you... 🔗",
    "You are my greatest blessing... 💖",
  ];

  // Developer function to skip timer
  const skipTimer = () => {
    setTimeLeft(0);
    setShowContent(true);
    localStorage.setItem("stage7TimerCompleted", "true");
    localStorage.removeItem("stage7TimerStart");
    console.log("⏭️ Timer skipped (Dev mode)");
  };

  const detectSize = () => {
    setWindowDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);
    // Stop confetti after 10 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 10000);

    return () => {
      window.removeEventListener("resize", detectSize);
      clearTimeout(timer);
    };
  }, []);

  // Load timer state from localStorage on component mount
  useEffect(() => {
    const savedTimerStart = localStorage.getItem("stage7TimerStart");
    const savedTimerCompleted = localStorage.getItem("stage7TimerCompleted");

    if (savedTimerCompleted === "true") {
      // Timer was already completed, show content immediately
      setTimerStarted(true);
      setTimeLeft(0);
      setShowContent(true);
    } else if (savedTimerStart) {
      const startTime = parseInt(savedTimerStart);
      const currentTime = Date.now();
      const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
      const remainingTime = Math.max(0, TIMER_DURATION - elapsedSeconds);

      setTimerStarted(true);
      setTimeLeft(remainingTime);

      if (remainingTime === 0) {
        setShowContent(true);
        localStorage.setItem("stage7TimerCompleted", "true");
      }
    } else {
      // Auto-start timer when stage loads
      const startTime = Date.now();
      setTimerStarted(true);
      localStorage.setItem("stage7TimerStart", startTime.toString());
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
      setShowContent(true);
      localStorage.setItem("stage7TimerCompleted", "true");
      localStorage.removeItem("stage7TimerStart");
    }

    return () => clearInterval(interval);
  }, [timerStarted, timeLeft]);

  // Romantic text rotation effect
  useEffect(() => {
    if (timerStarted && timeLeft > 0) {
      const textInterval = setInterval(() => {
        setCurrentTextIndex((prev) => (prev + 1) % romanticTexts.length);
      }, 2500); // Change text every 2.5 seconds

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

  const photos = [
    {
      id: 1,
      src: "/images/First date.JPG",
      title: "First Date Memory",
      description: "Lido Bayside - Where it all started",
    },
    {
      id: 2,
      src: "/images/memories1.JPG",
      title: "Beautiful Moments",
      description: "Every moment with you is magical",
    },
    {
      id: 3,
      src: "/images/FIU.jpg",
      title: "Our Journey at FIU",
      description: "Building dreams together in college",
    },
    {
      id: 4,
      src: "/images/memories2.JPG",
      title: "Adventures Together",
      description: "Creating memories that last forever",
    },
    {
      id: 5,
      src: "/images/memories 3.JPG",
      title: "Special Celebrations",
      description: "Celebrating our love every day",
    },
    {
      id: 6,
      src: "/images/memories4.JPG",
      title: "Romantic Moments",
      description: "You make every day feel like a fairytale",
    },
    {
      id: 7,
      src: "/images/memories5.jpg",
      title: "Forever Together",
      description: "Every day with you is a blessing",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      {/* Developer Skip Timer Button */}
      {process.env.NODE_ENV === "development" &&
        timerStarted &&
        !showContent && (
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
      {showConfetti && (
        <Confetti
          width={windowDimension.width}
          height={windowDimension.height}
          recycle={false}
          numberOfPieces={200}
          colors={["#ec4899", "#f472b6", "#f9a8d4", "#fbcfe8", "#fce7f3"]}
        />
      )}

      {!showContent ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-10 border border-white/30 text-center max-w-3xl mx-auto mt-20"
        >
          <h3 className="font-elegant text-2xl text-romantic-700 mb-6">
            Preparing your final celebration... ⏰
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
              rotate: [0, 10, -10, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-5xl"
          >
            🎉💕✨
          </motion.div>
        </motion.div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.h1
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="font-handwritten text-6xl md:text-8xl text-gradient mb-6"
            >
              Happy 2 Years!
            </motion.h1>

            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-4"
            >
              🎉💕✨
            </motion.div>
          </motion.div>

          {/* Photo Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 md:p-8 lg:p-12 border border-white/30 mb-8"
          >
            <h2 className="font-handwritten text-4xl text-romantic-600 text-center mb-8">
              Our Memory Lane 📸
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
              {photos.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5 + index * 0.2, duration: 0.6 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-gradient-to-br from-romantic-50 to-cream-50 rounded-2xl p-3 md:p-4 border border-romantic-200 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-full aspect-[4/3] bg-romantic-200 rounded-lg overflow-hidden border border-romantic-300 shadow-inner mb-4">
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="w-full h-full object-contain hover:scale-105 transition-transform duration-300 bg-white"
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
                  <div className="text-center">
                    <h4 className="font-handwritten text-lg text-romantic-600 mb-2">
                      {photo.title}
                    </h4>
                    <p className="font-elegant text-romantic-700 text-sm">
                      {photo.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.8 }}
              className="text-center bg-gradient-to-r from-romantic-100 to-cream-100 rounded-2xl p-8 border border-romantic-200"
            >
              <div className="text-5xl mb-4">💌</div>
              <h3 className="font-handwritten text-3xl text-romantic-600 mb-4">
                Final Message
              </h3>
              <p className="font-elegant text-lg text-romantic-700 leading-relaxed mb-4">
                Happy 2 Years, my love. You're my forever, my best friend, and
                my greatest blessing. Let's keep building our dreams together.
              </p>
              <div className="text-romantic-600 font-handwritten text-xl">
                Forever yours,
                <br />
                Rickny ❤️
              </div>
            </motion.div>
          </motion.div>

          {/* Final Reward */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 3, duration: 0.8 }}
            className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-10 border border-white/30 text-center"
          >
            <motion.div
              animate={{
                bounce: [0, -20, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-7xl mb-6"
            >
              🍫🪑
            </motion.div>

            <h3 className="font-handwritten text-4xl text-romantic-600 mb-4">
              One Last Surprise!
            </h3>

            <p className="font-elegant text-lg text-romantic-700 mb-6 leading-relaxed">
              Your favorite candy is waiting for you...
              <br />
              <span className="font-semibold text-romantic-600">
                check under your seat 😉
              </span>
            </p>

            <div className="bg-orange-100 border border-orange-300 rounded-2xl p-6 shadow-lg">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-4xl mb-2"
              >
                🥜🍫
              </motion.div>
              <p className="font-elegant text-orange-800 font-semibold">
                Reese's are waiting for the sweetest girl! 💝
              </p>
            </div>
          </motion.div>

          {/* Floating Elements */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {Array.from({ length: 12 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute text-4xl"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: window.innerHeight + 50,
                }}
                animate={{
                  y: -100,
                  x: Math.random() * window.innerWidth,
                  rotate: 360,
                }}
                transition={{
                  duration: Math.random() * 8 + 12,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "linear",
                }}
              >
                {
                  ["❤️", "💕", "💖", "✨", "🌟", "💝"][
                    Math.floor(Math.random() * 6)
                  ]
                }
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4, duration: 1 }}
            className="text-center mt-12 mb-8"
          >
            <p className="font-elegant text-romantic-600 text-lg">
              🎊 Congratulations! You've completed our anniversary scavenger
              hunt! 🎊
            </p>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mt-4"
            >
              👑💕👑
            </motion.div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default Stage7;
