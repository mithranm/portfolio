import type { Metadata } from "next";
import Link from "next/link";
import { getBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Mithran Mohanraj",
  description: "Writing by Mithran Mohanraj.",
};

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <main className="blog-page">
      <header className="blog-header">
        <Link className="blog-back-link" href="/">
          &larr; Portfolio
        </Link>
        <h1 className="blog-title">Blog</h1>
        <p className="blog-intro">Notes, ideas, and things I’ve been working on.</p>
      </header>

      <section className="blog-post-list" aria-label="Blog posts">
        {posts.length > 0 ? (
          posts.map((post) => (
            <article className="blog-post-card" key={post.slug}>
              <h2>
                <Link href={`/blog/${encodeURIComponent(post.slug)}`}>
                  {post.title}
                </Link>
              </h2>
            </article>
          ))
        ) : (
          <p className="blog-empty">
            No posts yet. Add a post folder with a prose.html file to public/blog.
          </p>
        )}
      </section>
    </main>
  );
}
