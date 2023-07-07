import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { LoadingState } from '..';
import { TypesOptionsLoadingState } from '@components/loadable/loadable.types';
import { MockLoadingSkeleton } from './__mock__/mockLoadingSkeleton';
import { screen } from '@testing-library/react';

describe('LoadingState', () => {
  const renderWithLoadingState = ({ options }: { options: TypesOptionsLoadingState }) => {
    return renderWithRecoilRootAndSession(<LoadingState options={options} />);
  };

  it('should render the options props with component', () => {
    const numberOfRepeatingCount = 2;
    const mockOptions: TypesOptionsLoadingState = {
      margin: 'm-1',
      space: 'space-y-1',
      repeatingCount: numberOfRepeatingCount,
      loadingSkeleton: <MockLoadingSkeleton />,
    };
    const { container } = renderWithLoadingState({ options: mockOptions });
    const loadingStateComponent = screen.getByTestId('loadingState-testid');
    const loadingSkeletons = screen.getAllByTestId('mockLoadingSkeleton-testid');

    expect(container).toBeInTheDocument();
    expect(loadingStateComponent).toBeInTheDocument();
    expect(loadingStateComponent).toHaveClass('m-1 space-y-1');
    expect(loadingSkeletons).toHaveLength(numberOfRepeatingCount);
  });
});
