import { LayoutApp } from '@layouts/app';
import { ReactElement } from 'react';

const Label = () => {
  return;
};

Label.getLayout = function getLayout(page: ReactElement) {
  return <LayoutApp>{page}</LayoutApp>;
};

export default Label;
