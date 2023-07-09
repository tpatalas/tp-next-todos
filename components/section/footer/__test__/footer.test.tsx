import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { Footer } from '..';
import { fireEvent, screen } from '@testing-library/react';
import { copyRightText } from '@components/section/section.consts';
import { DATA_FOOTER_NAVIGATION, DATA_FOOTER_SOCIAL } from '@collections/footer';
import mockRouter from 'next-router-mock';

describe('Footer', () => {
  const renderWithFooter = () => {
    return renderWithRecoilRootAndSession(<Footer />);
  };

  it('should render the copyRight text when component mounts', () => {
    const { container } = renderWithFooter();
    const copyRightTextElement = screen.getByText(copyRightText);

    expect(container).toBeInTheDocument();
    expect(copyRightTextElement).toBeInTheDocument();
  });

  it('should render the child components correctly', () => {
    renderWithFooter();
    const dividerXComponentTestId = screen.getByTestId('dividerX-testid');
    const logoComponentTestId = screen.getByTestId('MainWhite-testid');

    expect(dividerXComponentTestId).toBeInTheDocument();
    expect(logoComponentTestId).toBeInTheDocument();
  });

  it('should correctly render the navigation name and route', async () => {
    mockRouter.push('/');
    renderWithFooter();

    expect(mockRouter).toMatchObject({ pathname: '/' });

    await Promise.all(
      DATA_FOOTER_NAVIGATION.map((item) => {
        const itemText = screen.getByText(item.name);

        expect(itemText).toBeInTheDocument();

        fireEvent.click(itemText);

        expect(mockRouter).toMatchObject({ pathname: item.path });
      }),
    );
  });

  it('should correctly render the social testId', async () => {
    renderWithFooter();

    await Promise.all(
      DATA_FOOTER_SOCIAL.map((item) => {
        const itemTestId = screen.getByTestId(item.testId);

        expect(itemTestId).toBeInTheDocument();
      }),
    );
  });
});
