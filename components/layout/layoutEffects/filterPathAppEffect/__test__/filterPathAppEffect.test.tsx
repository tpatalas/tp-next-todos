import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { FilterPathAppEffect } from '..';
import { screen, waitFor } from '@testing-library/dom';
import mockRouter from 'next-router-mock';
import { atomHtmlTitleTag } from '@states/misc';
import { useRecoilValue } from 'recoil';

const HtmlTitleTag = () => {
  const htmlTitleTag = useRecoilValue(atomHtmlTitleTag);
  return <div>{htmlTitleTag}</div>;
};

describe('FilterPathAppEffect', () => {
  const renderWithFilterPathAppEffect = () => {
    const options = { session: null };
    return renderWithRecoilRootAndSession(
      <>
        <FilterPathAppEffect />
        <HtmlTitleTag />
      </>,
      options,
    );
  };

  const testTextPresence = async (pathname: string, text: string) => {
    await waitFor(() => mockRouter.push(pathname));
    const textPresence = screen.getByText(text);

    expect(mockRouter).toMatchObject({ pathname: pathname });
    expect(textPresence).toBeInTheDocument();
  };

  it('should render the correct text based on the correct pathname', async () => {
    const { container } = renderWithFilterPathAppEffect();

    expect(container).toBeInTheDocument();

    await testTextPresence('/app', "Today's Focus");
    await testTextPresence('/app/urgent', 'Priority | Urgent');
    await testTextPresence('/app/important', 'Priority | Important');
    await testTextPresence('/app/showall', 'All Todos');
    await testTextPresence('/app/completed', 'Completed Todos');
  });
});
