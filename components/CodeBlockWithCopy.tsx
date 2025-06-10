'use client';

import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Dark theme
import { coldarkCold } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Light theme
import { motion } from 'framer-motion';
import { CheckIcon, ClipboardIcon } from '@heroicons/react/24/outline';
import { useTheme } from 'next-themes';

interface CodeBlockProps {
  language: string;
  value: string;
}

export default function CodeBlockWithCopy({ language, value }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();

  const handleCopy = async () => {
    try {
      // Use document.execCommand('copy') as navigator.clipboard.writeText() may not work in iframes.
      const textarea = document.createElement('textarea');
      textarea.value = value;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);

      setCopied(true);
      // In a real app, you'd use the useToast hook here instead of console.log
      console.log('Code copied to clipboard!');
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Optionally show a toast error here
    }
  };

  // Determine theme for highlighter based on actual theme state
  const currentThemeStyle = theme === 'dark' ? dracula : coldarkCold;

  return (
    <div className="relative my-4 rounded-lg shadow-md overflow-hidden group">
      <SyntaxHighlighter
        language={language}
        style={currentThemeStyle}
        customStyle={{
          padding: '1rem',
          borderRadius: '0.5rem',
          fontSize: '0.9rem',
          lineHeight: '1.4',
          maxHeight: '400px', // Limit height for long code blocks
          overflowY: 'auto',
          // Ensure background/text colors align with Tailwind theme if not using default
          backgroundColor: theme === 'dark' ? '#1f2937' : '#f0f4f8',
          color: theme === 'dark' ? '#e2e8f0' : '#2d3748',
        }}
      >
        {value}
      </SyntaxHighlighter>
      <motion.button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 rounded-md bg-gray-700 text-gray-200 hover:bg-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700
                   transition-colors duration-200 opacity-0 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-secondary"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Copy code to clipboard"
      >
        {copied ? (
          <CheckIcon className="h-5 w-5 text-green-400" />
        ) : (
          <ClipboardIcon className="h-5 w-5" />
        )}
      </motion.button>
    </div>
  );
}
