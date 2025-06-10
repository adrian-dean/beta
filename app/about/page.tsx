'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const skillVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 10 } },
};

export default function AboutPage() {
  const skills = [
    { name: 'React', icon: '[https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg)' },
    { name: 'Next.js', icon: '[https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg)' },
    { name: 'Tailwind CSS', icon: '[https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg)' },
    { name: 'TypeScript', icon: '[https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-plain.svg](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-plain.svg)' },
    { name: 'JavaScript', icon: '[https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg)' },
    { name: 'Node.js', icon: '[https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg)' },
    { name: 'Python', icon: '[https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg)' },
    { name: 'MongoDB', icon: '[https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg)' },
    { name: 'PostgreSQL', icon: '[https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg)' },
    { name: 'Git', icon: '[https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg)' },
    { name: 'Figma', icon: '[https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg)' },
    { name: 'AWS', icon: '[https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg)' },
  ];

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <motion.h1
        className="text-5xl font-bold text-center text-primary dark:text-secondary mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About Me
      </motion.h1>

      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 mb-16">
        <motion.div
          className="w-full lg:w-1/3 flex justify-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/profile.jpg" // Path to your profile image in public/
            alt="Your Professional Headshot"
            width={300}
            height={300}
            className="rounded-full border-4 border-primary dark:border-secondary shadow-2xl"
          />
        </motion.div>
        <motion.div
          className="w-full lg:w-2/3 text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="mb-6">
            Hello! I&apos;m **Your Name**, a passionate and results-driven Software Engineer with a knack for crafting dynamic and intuitive web applications. My journey in tech began with a fascination for how digital experiences come to life, leading me to dive deep into front-end and full-stack development.
          </p>
          <p className="mb-6">
            I specialize in building robust and scalable solutions using modern web technologies. My expertise lies primarily in the React ecosystem, leveraging frameworks like **Next.js** to create performant, SEO-friendly, and maintainable applications. I have a strong command of **Tailwind CSS** for rapid and highly customizable styling, ensuring every pixel aligns with design vision.
          </p>
          <p>
            Beyond coding, I&apos;m a firm believer in continuous learning and problem-solving. I enjoy dissecting complex challenges and architecting elegant solutions. When I&apos;m not immersed in code, you can find me exploring new tech trends, contributing to open-source projects, or enjoying outdoor activities.
          </p>
        </motion.div>
      </div>

      <motion.section
        className="mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8 flex items-center justify-center gap-4">
          <AcademicCapIcon className="h-10 w-10 text-primary dark:text-secondary" />
          My Skillset
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-items-center">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="flex flex-col items-center p-4 bg-card dark:bg-card-dark rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300 cursor-pointer"
              variants={skillVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: index * 0.05 }}
            >
              <Image src={skill.icon} alt={skill.name} width={50} height={50} className="mb-2" />
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200 text-center">{skill.name}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <h2 className="text-4xl font-bold text-center text-primary dark:text-secondary mb-8">My Philosophy</h2>
        <div className="prose dark:prose-invert max-w-3xl mx-auto text-center text-lg text-gray-700 dark:text-gray-300">
          <p className="mb-4">
            I believe that great software is a blend of elegant code, thoughtful design, and a deep understanding of user needs. My aim is always to build solutions that are not only functional but also intuitive, accessible, and enjoyable to use.
          </p>
          <p>
            The web is constantly evolving, and so am I. I&apos;m committed to staying current with the latest technologies and best practices, ensuring that the work I deliver is modern, efficient, and future-proof.
          </p>
        </div>
      </motion.section>
    </div>
  );
}
