import React from "react";
import { motion } from "framer-motion";

const FloatingHearts = () => {
  const hearts = Array.from({ length: 8 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute text-romantic-300/40 text-2xl pointer-events-none"
      initial={{
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 50,
      }}
      animate={{
        y: -100,
        x: Math.random() * window.innerWidth,
      }}
      transition={{
        duration: Math.random() * 10 + 15,
        repeat: Infinity,
        delay: Math.random() * 10,
        ease: "linear",
      }}
      style={{
        left: `${Math.random() * 100}%`,
      }}
    >
      ❤️
    </motion.div>
  ));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts}
    </div>
  );
};

export default FloatingHearts;
