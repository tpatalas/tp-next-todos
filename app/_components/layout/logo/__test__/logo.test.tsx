import { fireEvent, screen } from '@testing-library/react';
import { Logo } from '..';
import { renderAsync } from '@/_lib/utils/test.utils';
import mockRouter from 'next-router-mock';

jest.mock('next-auth', () => ({
  getServerSession: jest.fn().mockReturnValue(Promise.resolve(false)),
}));

describe('Logo', () => {
  const renderWithLogo = async () => await renderAsync(<Logo />, { nextLink: true });

  it('should render logoFull', async () => {
    renderWithLogo();
    const descLogoFull = await screen.findByText('Main logo full');

    expect(descLogoFull).toBeInTheDocument();
  });

  it('should route to the root when link is clicked', async () => {
    mockRouter.push('/test');
    renderWithLogo();

    const logoLink = await screen.findByLabelText('Logo to route to index page.');

    expect(logoLink).toBeInTheDocument();
    expect(mockRouter).toMatchObject({ pathname: '/test' });

    fireEvent.click(logoLink);

    expect(mockRouter).toMatchObject({ pathname: '/' });
  });
});
