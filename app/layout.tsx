import { ReactNode } from 'react';
import './globals.css';
import { Roboto } from 'next/font/google';
import { cx } from 'class-variance-authority';

export const metadata = {
  title: 'Todos - Todo list to automate your tasks',
  description: 'Official website for atalas todos',
};

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html
      lang='en'
      className={cx(roboto.className, 'bg-slate-50')}
    >
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
