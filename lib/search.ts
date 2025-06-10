import Fuse from 'fuse.js';
import { getMarkdownContent, MarkdownData } from '@/lib/markdown';

export interface SearchIndexItem {
  id: string; // Unique identifier for the item (e.g., slug)
  title: string;
  description: string; // Short description
  content: string; // Full text content for searching
  category: 'project' | 'doc' | 'page'; // Category for filtering
  url: string; // URL to the content
}

let searchIndex: SearchIndexItem[] | null = null;
let fuseInstance: Fuse<SearchIndexItem> | null = null; // Renamed to avoid conflict

// Function to generate the search index at build time
export async function generateSearchIndex(): Promise<SearchIndexItem[]> {
  console.log('Generating search index...');

  const projects = await getMarkdownContent('projects');
  const docs = await getMarkdownContent('docs');

  const indexItems: SearchIndexItem[] = [];

  // Add projects
  projects.forEach((project) => {
    indexItems.push({
      id: `project-${project.slug}`, // Ensure unique IDs
      title: project.frontMatter.title || project.slug,
      description: project.frontMatter.description || '',
      content: project.content, // Use full content for search
      category: 'project',
      url: `/projects/${project.slug}`,
    });
  });

  // Add docs
  docs.forEach((doc) => {
    indexItems.push({
      id: `doc-${doc.slug}`, // Ensure unique IDs
      title: doc.frontMatter.title || doc.slug,
      description: doc.frontMatter.description || '',
      content: doc.content, // Use full content for search
      category: 'doc',
      url: `/docs/${doc.slug}`,
    });
  });

  // Add static pages (titles and basic content for simplicity)
  // In a real app, you might parse content from React components if needed
  indexItems.push({
    id: 'home',
    title: 'Home',
    description: 'Welcome to my portfolio.',
    content: 'Home Welcome portfolio.',
    category: 'page',
    url: '/',
  });
  indexItems.push({
    id: 'about',
    title: 'About Me',
    description: 'Learn more about me and my journey.',
    content: 'About Me Learn more about me and my journey.',
    category: 'page',
    url: '/about',
  });
  indexItems.push({
    id: 'contact',
    title: 'Contact',
    description: 'Get in touch with me.',
    content: 'Contact Get in touch with me.',
    category: 'page',
    url: '/contact',
  });
  indexItems.push({
    id: 'education',
    title: 'Education & Training',
    description: 'My academic and professional background.',
    content: 'Education & Training My academic and professional background.',
    category: 'page',
    url: '/education',
  });

  console.log(`Search index generated with ${indexItems.length} items.`);
  searchIndex = indexItems;
  return indexItems;
}

// Initialize Fuse.js for client-side searching
const fuseOptions = {
  keys: [
    { name: 'title', weight: 0.7 },
    { name: 'description', weight: 0.3 },
    { name: 'content', weight: 0.5 }, // Search in content, but lower weight
  ],
  includeScore: true,
  threshold: 0.3, // Adjust for fuzziness (0 is exact, 1 is loose)
  ignoreLocation: true,
  findAllMatches: true,
};

export async function searchContent(query: string): Promise<SearchIndexItem[]> {
  // In a real Next.js build, this function would likely load a pre-generated JSON index.
  // For simplicity and to allow it to run in development before a full build,
  // we generate it on demand if not present.
  if (!searchIndex) {
    searchIndex = await generateSearchIndex();
  }

  if (!fuseInstance) {
    fuseInstance = new Fuse(searchIndex, fuseOptions);
  }

  if (!query.trim()) {
    return [];
  }

  const results = fuseInstance.search(query).map((result) => result.item);
  return results;
}
