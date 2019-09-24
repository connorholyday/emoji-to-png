import React from 'react';
import Head from 'next/head';

export default () => (
  <Head>
    <meta charSet="utf-8" />
    <title>Emoji to image</title>
    <meta
      name="description"
      content="Convert an emoji to an image with the click of a button!"
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
      rel="apple-touch-icon"
      sizes="152x152"
      href="/static/apple-touch-icon.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/static/favicon-32x32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/static/favicon-16x16.png"
    />
    <link rel="manifest" href="/static/site.webmanifest" />
    <link
      rel="mask-icon"
      href="/static/safari-pinned-tab.svg"
      color="#ff9ff3"
    />
    <meta name="msapplication-TileColor" content="#ffd1ff" />
    <meta name="theme-color" content="#ffffff" />
  </Head>
);
