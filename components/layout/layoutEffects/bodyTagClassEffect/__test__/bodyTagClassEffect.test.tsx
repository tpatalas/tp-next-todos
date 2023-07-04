import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { BodyTagClassEffect } from '..';
import { LayoutTypeEffect } from '@layout/layoutEffects/layoutTypeEffect';
import { TypesLayout } from '@layout/layout.types';

describe('BodyTagClassEffect', () => {
  const renderWithBodyTagClassEffect = (path: TypesLayout['path']) => {
    const options = { session: null };
    return renderWithRecoilRootAndSession(
      <>
        <BodyTagClassEffect />
        <LayoutTypeEffect path={path} />
      </>,
      options,
    );
  };

  it('should render either the className "overflow-hidden" based on the layoutType', () => {
    const { container } = renderWithBodyTagClassEffect('app');
    const bodyElement = document.body;

    expect(container).toBeInTheDocument();
    expect(bodyElement).toHaveClass('overflow-hidden');

    renderWithBodyTagClassEffect('home');
    expect(bodyElement).not.toHaveClass('overflow-hidden');
  });
});
