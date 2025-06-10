'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpCircleIcon } from '@heroicons/react/24/outline';

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) { // Show button after scrolling 300px
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-8 right-8 z-40 p-3 rounded-full bg-primary dark:bg-secondary text-white shadow-lg
                     hover:scale-110 hover:bg-secondary dark:hover:bg-primary transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-secondary"
          aria-label="Scroll to top"
        >
          <ArrowUpCircleIcon className="h-7 w-7" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
