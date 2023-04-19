import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1'
          />
          <meta
            name='description'
            content='Official website for todo-atalas'
          />
          <link
            rel='icon'
            href={`${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/favicon.png`}
          />
        </Head>
        <body className='bg-slate-50 font-roboto'>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
