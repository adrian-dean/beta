'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <section className="flex items-center justify-center min-h-[calc(100vh-100px)] text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: 'spring', damping: 20 }}
        className="max-w-md"
      >
        <h1 className="text-9xl font-extrabold text-primary dark:text-secondary mb-4">404</h1>
        <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Page Not Found</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-primary hover:bg-secondary dark:bg-secondary dark:hover:bg-primary transition-colors"
          >
            Go Home
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
