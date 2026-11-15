import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost, getBlogPosts } from "@/lib/blog";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  return { title: post ? `${post.title} | Blog` : "Post not found | Blog" };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) notFound();

  return (
    <main className="blog-page blog-post-page">
      <header className="blog-header">
        <Link className="blog-back-link" href="/blog">
          &larr; All posts
        </Link>
        <h1 className="blog-title">{post.title}</h1>
      </header>
      <article
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </main>
  );
}
