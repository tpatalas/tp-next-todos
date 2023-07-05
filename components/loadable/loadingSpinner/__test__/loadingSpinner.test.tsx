import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { LoadingSpinner } from '..';
import { SPINNER } from '@constAssertions/ui';
import { screen } from '@testing-library/react';
import { MockSpinnerState } from './__mock__/mockSpinnerState';

describe('LoadingSpinner', () => {
  const renderWithLoadingSpinner = (spinnerId: SPINNER) => {
    return renderWithRecoilRootAndSession(
      <>
        <LoadingSpinner spinnerId={spinnerId} />
        <MockSpinnerState spinnerId={spinnerId} />
      </>,
    );
  };

  it('should render the loadingSpinner when spinnerId is provided', async () => {
    const SPINNER_VALUES = Object.values(SPINNER) as SPINNER[];

    SPINNER_VALUES.forEach((spinner, index) => {
      const { container } = renderWithLoadingSpinner(SPINNER[spinner]);
      const spinnerTestId = screen.queryAllByTestId('loadingSpinner-testid')[index];

      expect(container).toBeInTheDocument();
      expect(spinnerTestId).toBeInTheDocument();
    });
  });
});
