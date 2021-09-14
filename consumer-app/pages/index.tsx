import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import dynamic from 'next/dynamic';


// @ts-ignore
// const Greetings = dynamic(() => import("microfrontendreact/Greetings"), {
//   ssr: false,
// });

// @ts-ignore
// const Farewell = dynamic(() => import("microfrontendnextjs/Farewell"), {
//   ssr: false,
// });

const Farewell = dynamic(
  // @ts-ignore
  () => window.microfrontendnextjs.get("./Farewell").then((factory) => factory()),
  {
    ssr: false,
  }
);

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1>Iam a Nextjs Consumer App. I import Microfrontends.</h1>      
      <div className={styles.microfrontends}>
        {/* @ts-ignore */}
        {/* <Greetings isStandalone={false} /> */}
        {/* @ts-ignore */}
        <Farewell isStandalone={false} />
      </div>

    </div>
  )
}

export default Home
