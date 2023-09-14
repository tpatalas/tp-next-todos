import { render, screen } from '@testing-library/react';
import { IconButtonContent } from '..';
import { PropsIconButtonContent } from '../iconButtonContent.types';

describe('IconButtonContent', () => {
  const renderWithIconButtonContent = ({ children, extraContent }: PropsIconButtonContent) =>
    render(<IconButtonContent extraContent={extraContent}>{children}</IconButtonContent>);
  const childrenElement = 'test-children';
  const extraContentElement = 'test-extraContent';

  it('should render children and extraContent when props are passed to component', () => {
    renderWithIconButtonContent({ children: childrenElement, extraContent: extraContentElement });

    const childrenText = screen.getByText(childrenElement);
    const extraContentText = screen.getByText(extraContentElement);

    expect(childrenText).toBeInTheDocument();
    expect(extraContentText).toBeInTheDocument();
  });
});
