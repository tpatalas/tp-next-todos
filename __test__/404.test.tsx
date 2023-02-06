import { render, screen } from '@testing-library/react';
import Custom404 from 'pages/404';

describe('Custom404', () => {
  render(<Custom404 />);

  it('should custom 404 render', () => {
    const custom404 = screen.getByText(/404/i);
    expect(custom404).toBeInTheDocument();
  });

  //Note: Testing redirection to custom 404 is not necessary as Next.js guaranteed the feature.
});
