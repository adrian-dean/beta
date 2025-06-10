'use client';

import { motion } from 'framer-motion';
import { AcademicCapIcon, BriefcaseIcon } from '@heroicons/react/24/outline'; // Icons for visual flair

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function EducationPage() {
  const education = [
    {
      institution: 'University of Example',
      degree: 'Master of Science in Computer Science',
      period: 'Sept 2022 - May 2024',
      details: [
        'Specialized in Software Engineering and Artificial Intelligence.',
        'Thesis: "Scalable Web Architectures with Serverless Functions".',
        'Relevant Courses: Advanced Data Structures, Distributed Systems, Machine Learning.',
      ],
    },
    {
      institution: 'State University',
      degree: 'Bachelor of Science in Software Engineering',
      period: 'Sept 2018 - May 2022',
      details: [
        'Graduated with Summa Cum Laude honors.',
        'Capstone Project: Developed a real-time collaborative code editor.',
        'Active member of the ACM student chapter.',
      ],
    },
  ];

  const training = [
    {
      title: 'Full-Stack Web Development Bootcamp',
      provider: 'DevMasters Academy',
      period: 'June 2022 - Aug 2022',
      details: [
        'Intensive 12-week program covering MERN stack, GraphQL, and cloud deployment.',
        'Built and deployed multiple full-stack applications.',
      ],
    },
    {
      title: 'Advanced React Patterns Workshop',
      provider: 'ReactCon Training',
      period: 'Jan 2023',
      details: [
        'Explored Hooks, Context API, Render Props, and higher-order components.',
        'Focused on performance optimization and best practices.',
      ],
    },
  ];

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <motion.h1
        className="text-5xl font-bold text-center text-primary dark:text-secondary mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Education & Professional Training
      </motion.h1>

      <section className="mb-16">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-10 flex items-center justify-center gap-4">
          <AcademicCapIcon className="h-10 w-10 text-primary dark:text-secondary" />
          Education
        </h2>
        <div className="space-y-10">
          {education.map((item, index) => (
            <motion.div
              key={index}
              className="bg-card dark:bg-card-dark p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={itemVariants}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-2xl font-semibold text-primary dark:text-secondary mb-2">{item.degree}</h3>
              <p className="text-xl text-gray-800 dark:text-gray-200 mb-1">{item.institution}</p>
              <p className="text-md text-gray-600 dark:text-gray-400 mb-4">{item.period}</p>
              <ul className="list-disc list-inside text-lg text-gray-700 dark:text-gray-300 space-y-2">
                {item.details.map((detail, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: index * 0.1 + i * 0.05 }}
                  >
                    {detail}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-10 flex items-center justify-center gap-4">
          <BriefcaseIcon className="h-10 w-10 text-primary dark:text-secondary" />
          Professional Training
        </h2>
        <div className="space-y-10">
          {training.map((item, index) => (
            <motion.div
              key={index}
              className="bg-card dark:bg-card-dark p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={itemVariants}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-2xl font-semibold text-primary dark:text-secondary mb-2">{item.title}</h3>
              <p className="text-xl text-gray-800 dark:text-gray-200 mb-1">{item.provider}</p>
              <p className="text-md text-gray-600 dark:text-gray-400 mb-4">{item.period}</p>
              <ul className="list-disc list-inside text-lg text-gray-700 dark:text-gray-300 space-y-2">
                {item.details.map((detail, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: index * 0.1 + i * 0.05 }}
                  >
                    {detail}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
