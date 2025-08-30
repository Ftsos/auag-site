import { useState, useEffect, useCallback } from 'react';
import { type Company } from '../types/companies';

export const useCompanyAnimation = (companies: Company[], interval: number = 6000) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextCompany = useCallback(() => {
    setIsAnimating(true);
    // Shorter transition time for smoother Framer Motion animations
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % companies.length);
      setIsAnimating(false);
    }, 300);
  }, [companies.length]);

  useEffect(() => {
    const timer = setInterval(nextCompany, interval);
    return () => clearInterval(timer);
  }, [nextCompany, interval]);

  return {
    currentCompany: companies[currentIndex],
    isAnimating,
    currentIndex,
    nextCompany
  };
};
