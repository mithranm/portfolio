// portfolio/app/projects/[slug]/page.tsx
import { getAllProjectSlugs, getProjectData, ProjectData } from '@/lib/projects';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ScreenshotImage from '@/components/ScreenshotImage';

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectData(slug);

  if (!project) {
    return { title: "Project Not Found - Mithran Mohanraj" };
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

export default async function ProjectPage({ params }: { params: Promise<{ slug:string }> }) {
  const { slug } = await params;
  const project = getProjectData(slug);

  if (!project) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
        <p className="mb-8">The project you are looking for does not exist.</p>
        <Link href="/" className="slash-btn">
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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <header className="mb-8 md:mb-12">
        <Link href="/" className="text-sm text-accent hover:underline mb-6 inline-block uppercase tracking-widest">
          ← Back to all projects
        </Link>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
          {project.title}
        </h1>
        {project.summary && (
          <p className="text-lg text-foreground/70 max-w-3xl">
            {project.summary}
          </p>
        )}
      </header>

      {project.image && (
        <div 
          className="cut-effect project-card-image-wrapper mb-8 md:mb-12"
          style={{['--clip-initial' as any]: 'polygon(0 0, 100% 0, 100% calc(100% - 60px), calc(100% - 60px) 100%, 0 100%)'}}
        >
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
      )}
      
      <main className="prose prose-lg dark:prose-invert max-w-none mx-auto">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {project.content}
        </ReactMarkdown>
      </main>

      {(project.projectUrl && project.projectUrl !== "#") && (
        <div className="mt-12 text-center">
          <a
            href={project.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="slash-btn"
          >
            View Source / Demo →
          </a>
        </div>
      )}

      {project.tags && project.tags.length > 0 && (
        <div className="mt-12 pt-6 border-t border-border/20">
          <h4 className="text-base font-semibold text-foreground/60 mb-3 text-center">TAGS</h4>
          <div className="flex flex-wrap gap-3 justify-center">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 bg-border/10 text-foreground/80 rounded-sm text-sm font-mono uppercase"
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