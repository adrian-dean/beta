import { getMarkdownContent, getSingleMarkdownContent } from '@/lib/markdown';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import CodeBlockWithCopy from '@/components/CodeBlockWithCopy';

// Tell Next.js which paths to pre-render at build time
export async function generateStaticParams() {
  const docs = await getMarkdownContent('docs');
  return docs.map((doc) => ({
    slug: doc.slug,
  }));
}

export default async function DocDetailPage({ params }: { params: { slug: string } }) {
  const doc = await getSingleMarkdownContent('docs', params.slug);

  if (!doc) {
    return { notFound: true };
  }

  const { frontMatter, content } = doc;

  // Function to dynamically render content and replace specific elements
  // This is a simplified approach. A more robust solution uses rehype-react
  // with rehype-raw to directly render HTML and component mapping.
  const renderRichContent = (htmlContent: string) => {
    // Basic example: finding a JavaScript code block and replacing with CodeBlockWithCopy
    // This approach is limited and will only catch specific patterns.
    // For general purpose, use remark-rehype with plugins.
    const codeBlockRegex = /<pre><code class="language-(.*?)">([\s\S]*?)<\/code><\/pre>/g;
    let parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(htmlContent)) !== null) {
      const [fullMatch, language, code] = match;
      const preCode = htmlContent.substring(lastIndex, match.index);
      if (preCode) {
        parts.push(<div key={`html-${lastIndex}`} dangerouslySetInnerHTML={{ __html: preCode }} />);
      }
      parts.push(
        <CodeBlockWithCopy key={`code-${match.index}`} language={language} value={code.trim()} />
      );
      lastIndex = match.index + fullMatch.length;
    }

    if (lastIndex < htmlContent.length) {
      parts.push(<div key={`html-${lastIndex}`} dangerouslySetInnerHTML={{ __html: htmlContent.substring(lastIndex) }} />);
    }

    return <>{parts}</>;
  };

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          href="/docs"
          className="inline-flex items-center text-primary dark:text-secondary hover:underline mb-8 group"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Docs
        </Link>

        <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
          {frontMatter.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          {frontMatter.description}
        </p>

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

        <article className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200">
          {renderRichContent(content)}
        </article>

        <p className="mt-12 text-sm text-gray-500 dark:text-gray-400">
          Published on {new Date(frontMatter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </motion.div>
    </div>
  );
}
