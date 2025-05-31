// portfolio/components/ScreenshotImage.tsx
'use client'; // This marks the component as a Client Component

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image'; // We can use Next/Image for placeholder/loading states

const SCREENSHOT_API_BASE_URL = 'https://screenshot.mithran.org';

interface ScreenshotImageProps {
  targetUrl: string; // The URL to screenshot
  altText: string;
}

const ScreenshotImage: React.FC<ScreenshotImageProps> = ({ targetUrl, altText }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchScreenshot = useCallback(async () => {
    if (!targetUrl) {
      setError('Target URL for screenshot is not defined.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    setImageUrl(null);

    const queryParams = new URLSearchParams({ url: targetUrl });
    const endpoint = `${SCREENSHOT_API_BASE_URL}/?${queryParams.toString()}`;

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.image) {
        // Assuming data.image is a relative path like /static/screenshot.png
        const fullImageUrl = data.image.startsWith('http') ? data.image : `${SCREENSHOT_API_BASE_URL}${data.image}`;
        setImageUrl(fullImageUrl);
      } else {
        throw new Error('No image URL returned from screenshot API');
      }
    } catch (err: any) {
      console.error("Failed to fetch screenshot:", err);
      setError(err.message || 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, [targetUrl]);

  useEffect(() => {
    fetchScreenshot();
  }, [fetchScreenshot]);

  const handleRefresh = () => {
    fetchScreenshot();
  };

  // Container for 16:9 aspect ratio
  const aspectRatioContainerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    paddingBottom: '56.25%', // 16:9 aspect ratio (9 / 16 * 100)
    backgroundColor: 'var(--neutral-200)', // Light placeholder background
    borderRadius: '0.5rem', // Match card rounding if image is at the top
    overflow: 'hidden',
  };
  
  const imageStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover', // Or 'contain' depending on preference
  };

  if (loading) {
    return (
      <div style={aspectRatioContainerStyle} className="animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-200 dark:bg-neutral-700">
          <p className="text-neutral-500 dark:text-neutral-400">Loading Screenshot...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={aspectRatioContainerStyle}>
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-100 dark:bg-red-900 p-4">
          <p className="text-red-700 dark:text-red-300 text-sm text-center">Error: {error}</p>
          <button
            onClick={handleRefresh}
            className="mt-2 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!imageUrl) {
    return (
      <div style={aspectRatioContainerStyle}>
         <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-200 dark:bg-neutral-700 p-4">
          <p className="text-neutral-500 dark:text-neutral-400 text-sm text-center">Screenshot not available.</p>
          <button
            onClick={handleRefresh}
            className="mt-2 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={aspectRatioContainerStyle}>
      {/* Using a regular img tag here for client-side fetched image */}
      <img
        src={imageUrl}
        alt={altText}
        style={imageStyle}
        className="dark:brightness-90"
      />
      {/* Optional: Add a small refresh button overlayed on the image */}
      <button
        onClick={handleRefresh}
        title="Refresh Screenshot"
        className="absolute bottom-2 right-2 bg-black/50 text-white p-1.5 rounded-full hover:bg-black/70 transition-opacity opacity-50 hover:opacity-100 text-xs"
        style={{ lineHeight: '1' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
          <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
        </svg>
      </button>
    </div>
  );
};

export default ScreenshotImage;