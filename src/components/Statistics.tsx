import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// This is the array you can populate and modify at the top of the file.
const stats = [
  { target: 130, label: "Active Alumni", hasPlus: true },
  { target: 100, label: "Mentors", hasPlus: true },
  { target: 75, label: "Referrals", hasPlus: true }
];

// This component now renders all stats by mapping over the array.
const Statistics: React.FC = () => {
  return (
    // Keep the flex-row layout for all screen sizes.
    // Use responsive margin and spacing to handle different screen widths.
    <div className="flex flex-row w-full justify-around items-center mt-7 mr-0 sm:mr-4">
      {stats.map((stat, index) => (
        <StatNumber key={index} target={stat.target} label={stat.label} hasPlus={stat.hasPlus} />
      ))}
    </div>
  );
};

// This internal component handles the animation logic for a single stat.
type StatNumberProps = {
  target: number;
  label: string;
  duration?: number;
  hasPlus?: boolean;
};

const StatNumber: React.FC<StatNumberProps> = ({ target, label, duration = 2000, hasPlus = false }) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    // If target is 0, just set the count to 0 and exit.
    if (target === 0) return;

    // Calculate the increment step based on duration and target.
    const step = target / (duration / 10);
    let timer: number;

    // Start the animation.
    timer = setInterval(() => {
      setCount((prevCount) => {
        // Increment the count.
        const newCount = prevCount + step;

        // Stop the animation if we've reached or exceeded the target.
        if (newCount >= target) {
          clearInterval(timer);
          return target;
        }

        return newCount;
      });
    }, 10); // Interval of 10ms for a smooth animation.

    // Cleanup function to clear the interval when the component unmounts.
    return () => clearInterval(timer);
  }, [target, duration]);

  return (
    <motion.div
      className="flex flex-col items-center justify-center text-white"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
    >
      {/* Responsive font size for the number */}
      <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal mb-1 sm:mb-2">
        {Math.round(count)}
        {hasPlus && "+"}
      </div>
      {/* Responsive font size for the label */}
      <div className="text-sm sm:text-base md:text-lg lg:text-xl uppercase tracking-tight sm:tracking-wide text-center">
        {label}
      </div>
    </motion.div>
  );
};

export default Statistics;