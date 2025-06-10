'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'; // Assuming you'd install react-icons

export default function Footer() {
  const socialLinks = [
    { href: '[https://github.com/yourusername](https://github.com/yourusername)', icon: FaGithub, name: 'GitHub' },
    { href: '[https://linkedin.com/in/yourusername](https://linkedin.com/in/yourusername)', icon: FaLinkedin, name: 'LinkedIn' },
    { href: '[https://twitter.com/yourusername](https://twitter.com/yourusername)', icon: FaTwitter, name: 'Twitter' },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      className="bg-background dark:bg-background-dark text-text dark:text-gray-400 py-12 border-t border-gray-200 dark:border-gray-800"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center space-x-6 mb-6">
          {socialLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-secondary transition-colors"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              aria-label={link.name}
            >
              <link.icon className="h-8 w-8" />
            </motion.a>
          ))}
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Your Name. All rights reserved.
        </p>
        <p className="text-xs mt-2">
          Built with <span className="text-primary">&hearts;</span> using Next.js, React, and Tailwind CSS.
        </p>
        <div className="mt-4 flex justify-center space-x-4 text-sm">
          <Link href="/privacy-policy" className="hover:underline text-gray-500 dark:text-gray-400">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="hover:underline text-gray-500 dark:text-gray-400">
            Terms of Service
          </Link>
        </div>
      </div>
    </motion.footer>
  );
}
