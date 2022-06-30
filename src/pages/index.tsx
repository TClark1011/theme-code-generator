import type { NextPage } from 'next';
import Head from 'next/head';
import { APP_DESCRIPTION, APP_DOMAIN, APP_TITLE } from '$/constants/branding';
import ThemeCodeGeneration from '$/components/ThemeCodeGeneration';
import LandingPage from '$/components/LandingPage';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>{APP_TITLE}</title>
        <meta property="og:title" content={APP_TITLE} />
        <meta name="description" content={APP_DESCRIPTION} />
        <meta name="og:description" content={APP_DESCRIPTION} />
        <meta name="og:image" content={`${APP_DOMAIN}/og-image.jpg`} />
        <meta name="og:url" content={APP_DOMAIN} />
      </Head>
      <main>
        <LandingPage />
        <ThemeCodeGeneration />
      </main>
    </>
  );
};

export default Home;
