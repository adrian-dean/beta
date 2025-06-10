'use client';

import React, { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useSpring(0, { stiffness: 500, damping: 30 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="custom-cursor fixed h-4 w-4 rounded-full bg-primary dark:bg-secondary pointer-events-none z-[9999] opacity-70"
      style={{
        translateX: cursorX,
        translateY: cursorY,
      }}
    />
  );
}
