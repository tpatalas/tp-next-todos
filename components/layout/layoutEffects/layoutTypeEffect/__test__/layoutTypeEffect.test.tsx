import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { LayoutTypeEffect } from '..';
import { useRecoilValue } from 'recoil';
import { atomLayoutType } from '@layout/layout.states';
import { screen } from '@testing-library/react';

const CheckLayoutPath = () => {
  const layoutPath = useRecoilValue(atomLayoutType);
  return <div>{layoutPath}</div>;
};

describe('LayoutTypeEffect', () => {
  const renderWithLayoutTypeEffect = () => {
    const options = { session: null };
    return renderWithRecoilRootAndSession(
      <>
        <LayoutTypeEffect path='app' />
        <CheckLayoutPath />
      </>,
      options,
    );
  };

  it('should render the correct layout path as text', () => {
    const { container } = renderWithLayoutTypeEffect();
    const layoutPath = screen.getByText('app');

    expect(container).toBeInTheDocument();
    expect(layoutPath).toBeInTheDocument();
  });
});
