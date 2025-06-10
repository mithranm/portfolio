import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

const Storaclev1RedirectPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Perform a client-side redirect to /githubissues
    // Using router.replace to avoid adding /storaclev1 to browser history
    router.replace('/githubissues.html', undefined, { shallow: true });
  }, [router]);

  return (
    <>
      <Head>
        <title>Redirecting...</title>
        {/* Fallback for non-JavaScript users or crawlers, though Next.js relies on JS */}
        <meta httpEquiv="refresh" content="0;url=/githubissues.html" />
      </Head>
      <div>
        <p>Redirecting to <a href="/githubissues.html">/githubissues.html</a>...</p>
      </div>
    </>
  );
};

export default Storaclev1RedirectPage;
