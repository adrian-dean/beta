import { getMarkdownContent, MarkdownData } from '@/lib/markdown';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default async function ProjectsPage() {
  const projects: MarkdownData[] = await getMarkdownContent('projects');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <motion.h1
        className="text-5xl font-bold text-center text-primary dark:text-secondary mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Projects
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {projects.map((project) => (
          <motion.div
            key={project.slug}
            variants={itemVariants}
            className="bg-card dark:bg-card-dark rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700
                       transform hover:scale-105 transition-transform duration-300 group"
          >
            <Link href={`/projects/${project.slug}`}>
              <div className="relative w-full h-48 sm:h-56 overflow-hidden">
                <Image
                  src={project.frontMatter.image || '[https://placehold.co/800x500/F0F0F0/000000?text=Project](https://placehold.co/800x500/F0F0F0/000000?text=Project)'} // Placeholder
                  alt={project.frontMatter.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {project.frontMatter.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {project.frontMatter.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.frontMatter.technologies &&
                    project.frontMatter.technologies.map((tech: string) => (
                      <span
                        key={tech}
                        className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium px-2.5 py-0.5 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                </div>
                <div className="flex justify-between items-center text-sm font-medium text-primary dark:text-secondary group-hover:underline">
                  Read More
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
