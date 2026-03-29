'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FormAnimation = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
    }, 20);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Calculate animation stages (120 frames total)
  const frameNumber = Math.floor((progress / 100) * 120);
  
  // Icon drawing progress (frames 1-25: checkmark + envelope outlines)
  const iconProgress = Math.min(frameNumber / 20, 1);
  
  // Pie chart animation (frames 30-80: segments fill and rotate)
  const chartProgress = Math.max(0, Math.min((frameNumber - 25) / 50, 1));
  
  // Final completion (frames 80-120: hold and loop)
  const isComplete = frameNumber > 80;

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Background geometric shapes - Red shape (top-left) */}
      <motion.div
        className="absolute top-0 left-0 w-1/3 h-1/2"
        style={{
          background: '#E63946',
          clipPath: `polygon(0 0, 100% 0, ${85 - chartProgress * 15}% 100%, 0 100%)`,
        }}
      />

      {/* Background geometric shapes - Cyan shape (bottom-right) */}
      <motion.div
        className="absolute bottom-0 right-0 w-1/3 h-1/2"
        style={{
          background: '#1FE0E4',
          clipPath: `polygon(100% 100%, 0 100%, ${15 + chartProgress * 15}% 0, 100% 0)`,
        }}
      />

      {/* Main content container */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <motion.div
          className="relative w-full max-w-4xl h-full flex flex-col items-center justify-center px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Title text - fades in at frame 30 */}
          <motion.div
            className="absolute top-32 text-center"
            animate={{ opacity: frameNumber > 25 ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-[#1FE0E4] text-3xl font-light mb-3">Let's talk.</h2>
            <p className="text-gray-300 text-lg font-light">Enter your project details.</p>
          </motion.div>

          {/* Central icon container with house and pie chart */}
          <motion.div className="relative w-32 h-32 flex items-center justify-center">
            {/* House outline - visible from frame 15 onwards */}
            <motion.svg
              className="absolute w-32 h-32"
              viewBox="0 0 100 100"
              opacity={iconProgress > 0.3 ? 1 : 0}
            >
              {/* House roof */}
              <motion.path
                d="M 25 55 L 50 32 L 75 55"
                fill="none"
                stroke="#E63946"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="60"
                strokeDashoffset={60 - iconProgress * 60}
              />
              {/* House body */}
              <motion.rect
                x="25"
                y="55"
                width="50"
                height="30"
                fill="none"
                stroke="#E63946"
                strokeWidth="2"
                strokeDasharray="160"
                strokeDashoffset={160 - Math.max(0, (iconProgress - 0.2) * 120) * 160}
              />
            </motion.svg>

            {/* Pie chart - animates from frame 30 */}
            <motion.svg
              className="absolute w-28 h-28"
              viewBox="0 0 100 100"
              animate={{ rotate: chartProgress * 360 }}
              transition={{ duration: 0.1 }}
            >
              {/* Red pie segment */}
              <motion.path
                d="M 50 50 L 50 22 A 28 28 0 0 1 74 35.6 Z"
                fill="#E63946"
                opacity={chartProgress > 0.1 ? 0.85 : 0}
                transition={{ duration: 0.3 }}
              />

              {/* Cyan pie segment */}
              <motion.path
                d="M 50 50 L 74 35.6 A 28 28 0 0 1 50 78 Z"
                fill="#1FE0E4"
                opacity={chartProgress > 0.3 ? 0.85 : 0}
                transition={{ duration: 0.3 }}
              />

              {/* Pie chart border */}
              <motion.circle
                cx="50"
                cy="50"
                r="28"
                fill="none"
                stroke="#E63946"
                strokeWidth="1.5"
                opacity={chartProgress > 0 ? 0.6 : 0}
              />
            </motion.svg>
          </motion.div>

          {/* Progress bar container */}
          <motion.div className="absolute bottom-24 w-96">
            <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-red-600 via-pink-600 to-cyan-400"
                style={{ width: `${progress}%` }}
              />
            </div>
          </motion.div>

          {/* Play/Pause and mute controls */}
          <motion.div className="absolute bottom-12 flex gap-6 items-center">
            {/* Play/Pause button */}
            <motion.button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-14 h-14 rounded-full bg-white bg-opacity-15 hover:bg-opacity-25 flex items-center justify-center text-white transition-all backdrop-blur-sm border border-white border-opacity-20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isPlaying ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </motion.button>

            {/* Mute button */}
            <motion.button
              onClick={() => setProgress(0)}
              className="w-14 h-14 rounded-full bg-white bg-opacity-15 hover:bg-opacity-25 flex items-center justify-center text-white transition-all backdrop-blur-sm border border-white border-opacity-20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5h3v14H8V5zm5 0h3v14h-3V5z" />
              </svg>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default FormAnimation;
