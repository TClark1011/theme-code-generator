import type { NextPage } from 'next';
import Head from 'next/head';
import { APP_TITLE } from '$/constants/branding';
import ThemeCodeGeneration from '$/components/ThemeCodeGeneration';
import LandingPage from '$/components/LandingPage';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>{APP_TITLE}</title>
      </Head>
      <main>
        <LandingPage />
        <ThemeCodeGeneration />
      </main>
    </>
  );
};

export default Home;
