import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export interface MarkdownData {
  slug: string;
  frontMatter: { [key: string]: any };
  content: string;
}

const contentDirectory = path.join(process.cwd(), 'content');

export async function getMarkdownContent(
  directory: string
): Promise<MarkdownData[]> {
  const fullDirectoryPath = path.join(contentDirectory, directory);
  const filenames = fs.readdirSync(fullDirectoryPath);

  const allContentData = await Promise.all(
    filenames.map(async (filename) => {
      const slug = filename.replace(/\.md$/, '');
      const fullPath = path.join(fullDirectoryPath, filename);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      const { data: frontMatter, content } = matter(fileContents);

      const processedContent = await remark().use(html).process(content);
      const contentHtml = processedContent.toString();

      return {
        slug,
        frontMatter,
        content: contentHtml,
      };
    })
  );

  return allContentData;
}

export async function getSingleMarkdownContent(
  directory: string,
  slug: string
): Promise<MarkdownData | null> {
  const fullPath = path.join(contentDirectory, directory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data: frontMatter, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    frontMatter,
    content: contentHtml,
  };
}
