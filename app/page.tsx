'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function HomePage() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-background to-gray-50 dark:from-background-dark dark:to-gray-900 min-h-[calc(100vh-80px)] flex items-center justify-center">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center">
        <motion.div
          className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-primary dark:border-secondary shadow-xl mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 0.2 }}
        >
          <Image
            src="/profile.jpg" // Path to your profile image in public/
            alt="Your Profile Picture"
            width={400}
            height={400}
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Hi, I&apos;m <span className="text-primary dark:text-secondary">Your Name</span>
        </motion.h1>

        <motion.p
          className="mt-3 text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          A{' '}
          <TypeAnimation
            sequence={[
              'Software Engineer.', 1500,
              'Web Developer.', 1500,
              'Problem Solver.', 1500,
              'Tech Enthusiast.', 1500
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="font-bold text-accent dark:text-accent"
          />
          <br />Passionate about building intuitive and performant web experiences.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 mt-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-primary hover:bg-secondary dark:bg-secondary dark:hover:bg-primary transition-all duration-300 transform hover:-translate-y-1"
            >
              View My Projects
            </Link>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-primary dark:border-secondary text-base font-medium rounded-full shadow-lg text-primary dark:text-secondary bg-white dark:bg-transparent hover:bg-primary hover:text-white dark:hover:bg-secondary dark:hover:text-white transition-all duration-300 transform hover:-translate-y-1"
            >
              Get in Touch
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
