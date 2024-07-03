import Head from 'next/head';
import Map from '../components/Map';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Flood Alert App</title>
        <meta name="description" content="A flood alert app using Next.js and Google Earth Engine" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Flood Alert App</h1>
        <Map />
      </main>
    </div>
  );
}
