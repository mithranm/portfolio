// components/StaticHtmlRenderer.tsx
'use client'; // This component fetches data on the client

import { useEffect, useState } from 'react';

interface StaticHtmlRendererProps {
  filePath: string; // e.g., '/static-content/githubissues.html'
}

export default function StaticHtmlRenderer({ filePath }: StaticHtmlRendererProps) {
  const [bodyContent, setBodyContent] = useState('');
  const [styleContent, setStyleContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHtml = async () => {
      try {
        setLoading(true);
        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error(`Failed to fetch HTML file: ${response.statusText}`);
        }
        const htmlText = await response.text();

        // Use the browser's built-in parser to safely handle the HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');

        // Extract styles and body content
        const style = doc.querySelector('style')?.textContent || '';
        const body = doc.querySelector('body')?.innerHTML || 'Could not find body content.';

        setStyleContent(style);
        setBodyContent(body);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHtml();
  }, [filePath]);

  if (loading) {
    return <div className="text-center p-8">Loading Interactive Report...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">Error: {error}</div>;
  }

  return (
    <>
      {/* Inject the original CSS from the file into the page */}
      <style jsx global>{`
        ${styleContent}
      `}</style>
      
      {/* Render the HTML content from the file's body */}
      <div dangerouslySetInnerHTML={{ __html: bodyContent }} />
    </>
  );
}