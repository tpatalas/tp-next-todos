import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { UnderConstruction } from '..';
import { screen } from '@testing-library/react';
import { underConstructionText } from '@components/section/section.consts';

describe('UnderConstruction', () => {
  const renderWithUnderConstruction = () => renderWithRecoilRootAndSession(<UnderConstruction />);

  it('should render the context text proper', () => {
    const { container } = renderWithUnderConstruction();
    const contentText = screen.getByText(underConstructionText.content);

    expect(container).toBeInTheDocument();
    expect(contentText).toBeInTheDocument();
  });

  it('should render the Link button', async () => {
    renderWithUnderConstruction();
    const backToHomepageLinkButton = await screen.findByText(/Back to homepage/i);

    expect(backToHomepageLinkButton).toBeInTheDocument();
  });
});
