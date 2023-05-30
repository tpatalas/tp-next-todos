import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { screen } from '@testing-library/react';
import { mockedLabelItem } from '__mock__/label';
import { LabelItemButtonContent } from '..';

describe('LabelItemButtonContent', () => {
  const renderWithLabelItemButtonContent = (matchedSlug?: boolean) => {
    const options = { session: null };
    return renderWithRecoilRootAndSession(
      <LabelItemButtonContent
        label={mockedLabelItem}
        matchedSlug={matchedSlug as boolean}
      />,
      options,
    );
  };

  const classNameOnMatchedSlug = 'h-5 w-5 fill-yellow-500';
  const classNameOnUnmatchedSlug = 'h-5 w-5 fill-gray-500 group-hover:fill-yellow-500 ';

  it('should render the label.name as text', () => {
    const { container } = renderWithLabelItemButtonContent();
    const labelName = screen.queryByText(mockedLabelItem.name);

    expect(container).toBeInTheDocument();
    expect(labelName).toBeInTheDocument();
  });

  it('should render the proper SvgIcon when matchedSlug is true', () => {
    const { container } = renderWithLabelItemButtonContent(true);
    const svgIconComponent = screen.queryByTestId('svgIcon-testid');

    expect(container).toBeInTheDocument();
    expect(svgIconComponent).toBeInTheDocument();
    expect(svgIconComponent).toHaveClass(classNameOnMatchedSlug);
    expect(svgIconComponent).not.toHaveClass(classNameOnUnmatchedSlug);
  });

  it('should render the proper SvgIcon when matchedSlug is false', () => {
    const { container } = renderWithLabelItemButtonContent(false);
    const svgIconComponent = screen.queryByTestId('svgIcon-testid');

    expect(container).toBeInTheDocument();
    expect(svgIconComponent).toBeInTheDocument();
    expect(svgIconComponent).not.toHaveClass(classNameOnMatchedSlug);
    expect(svgIconComponent).toHaveClass(classNameOnUnmatchedSlug);
  });
});
