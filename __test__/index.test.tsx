import { fireEvent, render, screen } from '@testing-library/react';
import singletonRouter from 'next/router';
import Home from 'pages';

describe('Home', () => {
  beforeEach(() => {
    render(<Home />);
  });

  it('should router button render', () => {
    const buttonComponent = screen.getByText(/Go to App/i);
    expect(buttonComponent).toBeInTheDocument();
  });

  it('should router routes', () => {
    const buttonComponent = screen.getByText(/Go to App/i);

    fireEvent.click(buttonComponent);
    expect(singletonRouter).toMatchObject({
      asPath: '/app',
    });
  });
});
