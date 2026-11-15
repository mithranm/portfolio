import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

export type BlogPost = {
  slug: string;
  title: string;
  content: string;
};

const blogDirectory = path.join(process.cwd(), "public", "blog");

function getTitle(content: string, slug: string) {
  const heading = content.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
  const documentTitle = content.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
  const title = (heading?.[1] ?? documentTitle?.[1] ?? "")
    .replace(/<[^>]+>/g, "")
    .trim();

  return title || slug.replace(/[-_]+/g, " ");
}

function resolveRelativeUrls(content: string, slug: string) {
  const baseUrl = new URL(`/blog/${encodeURIComponent(slug)}/`, "https://blog.local");

  return content.replace(
    /(\b(?:src|href|poster)\s*=\s*)(["'])(.*?)\2/gi,
    (attribute, prefix: string, quote: string, value: string) => {
      if (!value || /^(?:[a-z][a-z\d+.-]*:|\/\/|\/|#)/i.test(value)) {
        return attribute;
      }

      const resolved = new URL(value, baseUrl);
      if (resolved.origin !== baseUrl.origin) return attribute;

      return `${prefix}${quote}${resolved.pathname}${resolved.search}${resolved.hash}${quote}`;
    },
  );
}

function createPost(slug: string, contentPath: string): BlogPost {
  const content = readFileSync(contentPath, "utf8");

  return {
    slug,
    title: getTitle(content, slug),
    content: resolveRelativeUrls(content, slug),
  };
}

export function getBlogPosts(): BlogPost[] {
  const posts = readdirSync(blogDirectory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(blogDirectory, entry.name);

    if (entry.isDirectory()) {
      const contentPath = path.join(entryPath, "prose.html");
      const hasProse = readdirSync(entryPath, { withFileTypes: true }).some(
        (child) => child.isFile() && child.name === "prose.html",
      );

      return hasProse ? [createPost(entry.name, contentPath)] : [];
    }

    if (entry.isFile() && entry.name.toLowerCase().endsWith(".html")) {
      return [createPost(path.basename(entry.name, path.extname(entry.name)), entryPath)];
    }

    return [];
  });

  return posts.sort((a, b) => a.slug.localeCompare(b.slug));
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return getBlogPosts().find((post) => post.slug === slug);
}
