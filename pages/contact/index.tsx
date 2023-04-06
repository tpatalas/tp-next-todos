import { LayoutHome } from '@layouts/home';
import { ReactElement } from 'react';

const Contact = () => {
  return <>Contact</>;
};

Contact.getLayout = function getLayout(page: ReactElement) {
  return <LayoutHome>{page}</LayoutHome>;
};

export default Contact;
