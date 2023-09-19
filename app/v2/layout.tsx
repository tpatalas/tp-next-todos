import { Header } from '@/_components/layout/header';
import { Navigation } from '@/_components/layout/header/navigation';
import { ReactNode } from 'react';

const TemporaryLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header>
        <Navigation />
      </Header>
      {children}
    </>
  );
};

export default TemporaryLayout;
