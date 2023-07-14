import { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  title: 'Todos - Todo list to automate your tasks',
  description: 'Official website for atalas todos',
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang='en'>
      <body className='bg-slate-50 font-roboto'>{children}</body>
    </html>
  );
};

export default RootLayout;
