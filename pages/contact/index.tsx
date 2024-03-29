import { LayoutHome } from '@layout/home';
import dynamic from 'next/dynamic';
import { ReactElement } from 'react';

const UnderConstruction = dynamic(() =>
  import('@components/section/underConstruction').then((mod) => mod.UnderConstruction),
);

const Contact = () => {
  return (
    <>
      <UnderConstruction />
    </>
  );
};

Contact.getLayout = function getLayout(page: ReactElement) {
  return <LayoutHome>{page}</LayoutHome>;
};

export default Contact;
