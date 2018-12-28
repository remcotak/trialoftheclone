import Head from 'next/head';

const Meta = ({ componentName }) => (
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <meta
      name="description"
      content="Trial of the clone is an interactive gamebook adventure. This application will keep track of the progress in your adventures. Will you take the adventure with us? Try the app, it's completely free!"
    />
    <link rel="shortcut icon" href="/static/favicon.png" />
    <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
    <title>Trial of the clone</title>
  </Head>
);

export default Meta;
