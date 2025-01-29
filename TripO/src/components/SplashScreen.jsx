import React from "react";
import { motion } from "framer-motion";

const SplashScreen = () => {
  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-blue-500"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.5, delay: 1.5 }}
    >
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-2">TripO</h1>
        <p className="text-lg">전국 추천 여행지와 맛집을 한눈에!</p>
      </div>
    </motion.div>
  );
};

export default SplashScreen;
