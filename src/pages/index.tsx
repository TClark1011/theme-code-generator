import type { NextPage } from 'next';
import Head from 'next/head';
import { APP_DOMAIN, APP_TITLE } from '$/constants/branding';
import ThemeCodeGeneration from '$/components/ThemeCodeGeneration';
import LandingPage from '$/components/LandingPage';
import Meta from '$meta';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <Meta
          title={APP_TITLE}
          url={APP_DOMAIN}
          description="Exercitation voluptate non aliqua veniam. Minim nostrud ullamco irur"
        />
      </Head>
      <main>
        <LandingPage />
        <ThemeCodeGeneration />
      </main>
    </>
  );
};

export default Home;
