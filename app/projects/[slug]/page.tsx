import { getMarkdownContent, getSingleMarkdownContent } from '@/lib/markdown';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, ArrowTopRightOnSquareIcon, CodeBracketIcon } from '@heroicons/react/24/outline';
import CodeBlockWithCopy from '@/components/CodeBlockWithCopy';

// Tell Next.js which paths to pre-render at build time
export async function generateStaticParams() {
  const projects = await getMarkdownContent('projects');
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await getSingleMarkdownContent('projects', params.slug);

  if (!project) {
    // This will trigger the not-found.tsx page
    return { notFound: true };
  }

  const { frontMatter, content } = project;

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          href="/projects"
          className="inline-flex items-center text-primary dark:text-secondary hover:underline mb-8 group"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Projects
        </Link>

        <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
          {frontMatter.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          {frontMatter.description}
        </p>

        {frontMatter.image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full h-96 rounded-xl overflow-hidden shadow-2xl mb-10"
          >
            <Image
              src={frontMatter.image}
              alt={frontMatter.title}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 70vw"
              priority
            />
          </motion.div>
        )}

        <div className="flex flex-wrap gap-3 mb-8">
          {frontMatter.technologies &&
            frontMatter.technologies.map((tech: string) => (
              <span
                key={tech}
                className="bg-primary/10 dark:bg-secondary/20 text-primary dark:text-secondary text-sm font-medium px-4 py-1 rounded-full shadow-sm"
              >
                        {tech}
                      </span>
            ))}
        </div>

        <div className="flex gap-4 mb-10">
          {frontMatter.live && (
            <motion.a
              href={frontMatter.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-primary hover:bg-secondary dark:bg-secondary dark:hover:bg-primary transition-colors transform hover:-translate-y-0.5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowTopRightOnSquareIcon className="h-5 w-5 mr-2" />
              Live Demo
            </motion.a>
          )}
          {frontMatter.github && (
            <motion.a
              href={frontMatter.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-primary dark:border-secondary text-base font-medium rounded-full shadow-sm text-primary dark:text-secondary bg-transparent hover:bg-primary hover:text-white dark:hover:bg-secondary dark:hover:text-white transition-colors transform hover:-translate-y-0.5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <CodeBracketIcon className="h-5 w-5 mr-2" />
              GitHub Repo
            </motion.a>
          )}
        </div>

        <article className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </article>

        <p className="mt-12 text-sm text-gray-500 dark:text-gray-400">
          Published on {new Date(frontMatter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </motion.div>
    </div>
  );
}
