// portfolio/lib/projects.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter'; // For parsing frontmatter

const projectsDirectory = path.join(process.cwd(), 'content/projects');

export interface ProjectData {
  slug: string;
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
  order: number;
  projectUrl?: string;
  tags?: string[];
  content: string; // The markdown content itself
}

export function getSortedProjectsData(): ProjectData[] {
  // Get file names under /content/projects
  const fileNames = fs.readdirSync(projectsDirectory);
  const allProjectsData = fileNames
    .filter((fileName) => fileName.endsWith('.md')) // Ensure we only read markdown files
    .map((fileName): ProjectData => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(projectsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the project metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the slug and content
      return {
        slug,
        title: matterResult.data.title || 'Untitled Project',
        summary: matterResult.data.summary || '',
        image: matterResult.data.image || '/placeholder.png',
        imageAlt: matterResult.data.imageAlt || 'Project image',
        order: matterResult.data.order || 99,
        projectUrl: matterResult.data.projectUrl,
        tags: matterResult.data.tags || [],
        content: matterResult.content,
      };
    });

  // Sort projects by order, then by title
  return allProjectsData.sort((a, b) => {
    if (a.order < b.order) {
      return -1;
    }
    if (a.order > b.order) {
      return 1;
    }
    return a.title.localeCompare(b.title);
  });
}

export function getAllProjectSlugs() {
  const fileNames = fs.readdirSync(projectsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      return {
        slug: fileName.replace(/\.md$/, ''),
      };
    });
}

export function getProjectData(slug: string): ProjectData | undefined {
  const fullPath = path.join(projectsDirectory, `${slug}.md`);
  try {
    if (!fs.existsSync(fullPath)) {
      return undefined;
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      slug,
      title: matterResult.data.title || 'Untitled Project',
      summary: matterResult.data.summary || '',
      image: matterResult.data.image || '/placeholder.png',
      imageAlt: matterResult.data.imageAlt || 'Project image',
      order: matterResult.data.order || 99, // Order might not be strictly needed here but good to have
      projectUrl: matterResult.data.projectUrl,
      tags: matterResult.data.tags || [],
      content: matterResult.content,
    };
  } catch (error) {
    console.error(`Error reading project data for slug "${slug}":`, error);
    return undefined;
  }
}