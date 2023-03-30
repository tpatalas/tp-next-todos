import { LayoutApp } from '@layouts/app';
import { ReactElement } from 'react';

const CatchAllLabels = () => {
  return;
};

CatchAllLabels.getLayout = function getLayout(page: ReactElement) {
  return <LayoutApp>{page}</LayoutApp>;
};

export default CatchAllLabels;
