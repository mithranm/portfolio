// portfolio/app/projects/[slug]/page.tsx
import { getAllProjectSlugs, getProjectData, ProjectData } from '@/lib/projects';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ScreenshotImage from '@/components/ScreenshotImage';

// For static site generation
export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs;
}

// For dynamic metadata
// FIX: Type `params` as a Promise that resolves to the object with the slug.
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; // Await the params promise to get the object
  const project = getProjectData(slug);

  if (!project) {
    return {
      title: "Project Not Found - Mithran Mohanraj",
    };
  }

  return {
    title: `${project.title} - Mithran Mohanraj`,
    description: project.summary,
    openGraph: {
        title: `${project.title} - Mithran Mohanraj`,
        description: project.summary,
        images: project.image.startsWith('dynamic-screenshot:') || project.image.startsWith('http') ? [project.image] : [`/images/${project.image}`],
    }
  };
}

// FIX: Type `params` as a Promise here as well. The component remains async.
export default async function ProjectPage({ params }: { params: Promise<{ slug:string }> }) {
  const { slug } = await params; // Await the params promise to get the object
  const project = getProjectData(slug);

  if (!project) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
        <p className="mb-8">The project you are looking for does not exist.</p>
        <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
          ← Back to all projects
        </Link>
      </div>
    );
  }

  const isDynamicScreenshot = project.image.startsWith('dynamic-screenshot:');
  const dynamicScreenshotUrl = isDynamicScreenshot
    ? project.image.substring('dynamic-screenshot:'.length)
    : '';

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <header className="mb-8 md:mb-12">
        <Link href="/" className="text-sm text-blue-600 dark:text-blue-400 hover:underline mb-6 inline-block">
          ← Back to all projects
        </Link>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-50 mb-3">
          {project.title}
        </h1>
        {project.summary && (
          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl">
            {project.summary}
          </p>
        )}
      </header>

      {project.image && (
        <div className="mb-8 md:mb-12 rounded-lg overflow-hidden shadow-lg">
          <div className="relative w-full bg-neutral-200 dark:bg-neutral-700" style={{ paddingBottom: '56.25%' }}>
            <div className="absolute inset-0">
              {isDynamicScreenshot ? (
                <ScreenshotImage targetUrl={dynamicScreenshotUrl} altText={project.imageAlt} />
              ) : project.image ? (
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="dark:brightness-90"
                  sizes="100vw"
                  priority
                />
              ) : null}
            </div>
          </div>
        </div>
      )}
      
      <main className="prose prose-lg dark:prose-invert max-w-none mx-auto text-neutral-800 dark:text-neutral-200">
        <div className="markdown-content"> 
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {project.content}
          </ReactMarkdown>
        </div>
      </main>

      {(project.projectUrl && project.projectUrl !== "#") && (
        <div className="mt-12 text-center">
          <a
            href={project.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
          >
            View Source / Demo →
          </a>
        </div>
      )}

      {project.tags && project.tags.length > 0 && (
        <div className="mt-12 pt-6 border-t border-neutral-200 dark:border-neutral-700">
          <h4 className="text-base font-semibold text-neutral-600 dark:text-neutral-400 mb-3 text-center">TAGS</h4>
          <div className="flex flex-wrap gap-3 justify-center">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 rounded-md text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}