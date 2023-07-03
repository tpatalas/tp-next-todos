import { atomLayoutType, atomLayoutNavigationOpen } from '@layout/layout.states';
import { atomHtmlTitleTag } from '@states/misc';
import { useRecoilValue } from 'recoil';

export const MockStateEffect = () => {
  const layoutType = useRecoilValue(atomLayoutType);
  const htmlTitleTag = useRecoilValue(atomHtmlTitleTag);
  const layoutNavigationOpen = useRecoilValue(atomLayoutNavigationOpen('home'));

  return (
    <>
      <div>LayoutType: {layoutType}</div>
      <div>HtmlTitleTag: {htmlTitleTag}</div>
      <div>LayoutNavigation: {layoutNavigationOpen ? 'True' : 'false'}</div>
    </>
  );
};
