import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { ErrorState } from '..';
import { screen } from '@testing-library/react';
import { errorStateMessage } from '@components/loadable/loadable.consts';

describe('ErrorState', () => {
  const renderWithErrorState = () => {
    return renderWithRecoilRootAndSession(<ErrorState />);
  };

  it('should render the correct errorStateMessage when the component mounts', () => {
    const { container } = renderWithErrorState();
    const errorStateMessageText = screen.getByText(errorStateMessage);

    expect(container).toBeInTheDocument();
    expect(errorStateMessageText).toBeInTheDocument();
  });
});
