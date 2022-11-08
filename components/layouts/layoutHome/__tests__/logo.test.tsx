import { Logo } from '@components/layouts/layoutHome/logo';
import { render, screen } from '@testing-library/react';

describe('Logo', () => {
  it('should Logo be displayed', () => {
    render(<Logo />);
    const divElement = screen.getByText(/I am a LOGO/i);

    expect(divElement).toBeInTheDocument();
  });
});
