import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { FilterPathHomeEffect } from '..';
import mockRouter from 'next-router-mock';
import { screen, waitFor } from '@testing-library/react';
import { useRecoilValue } from 'recoil';
import { atomHtmlTitleTag } from '@states/misc';

const HtmlTitleTag = () => {
  const htmlTitleTag = useRecoilValue(atomHtmlTitleTag);
  return <div>{htmlTitleTag}</div>;
};

describe('FilterPathHomeEffect', () => {
  const renderWithFilterPathHomeEffect = () => {
    const options = { session: null };
    return renderWithRecoilRootAndSession(
      <>
        <FilterPathHomeEffect />
        <HtmlTitleTag />
      </>,
      options,
    );
  };

  const testTextPresence = async (pathname: string, text: string) => {
    await waitFor(() => {
      mockRouter.push(pathname);
    });

    expect(mockRouter).toMatchObject({ pathname: pathname });

    await waitFor(() => {
      const pricingText = screen.queryByText(text);
      expect(pricingText).toBeInTheDocument();
    });
  };

  it('should render the correct text based on the correct pathname', async () => {
    const { container } = renderWithFilterPathHomeEffect();

    expect(container).toBeInTheDocument();

    await testTextPresence('/', 'Todo list to automate your tasks');
    await testTextPresence('/pricing', 'Pricing');
    await testTextPresence('/features', 'Features');
    await testTextPresence('/implementations', 'Implementations');
    await testTextPresence('/contact', 'Contact');
  });
});
