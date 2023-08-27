import { render, screen } from '@testing-library/react';
import { ImageWithRemotePlaceholder } from '..';
import { PropsImageWithRemotePlaceholder } from '../imageWithRemotePlaceholder.types';
import { configsImageWithRemotePlaceholder } from '../imageWithRemotePlaceholder.configs';

jest.mock('@/_components/next/imageWithRemotePlaceholder', () => ({
  ImageWithRemotePlaceholder: ({ configs }: PropsImageWithRemotePlaceholder) => (
    <>
      {Object.entries(configs).map(([key, value]) => (
        <div
          key={key}
          data-testid={`mockImage-${key}`}
        >
          {value}
        </div>
      ))}
    </>
  ),
}));

const mockImageOptions = configsImageWithRemotePlaceholder({
  priority: undefined,
  width: 'demo',
  height: 'demo',
  src: 'demo',
  alt: 'demo',
});

describe('ImageWithRemotePlaceholder', () => {
  const renderWithImageWithRemotePlaceholder = ({ configs }: PropsImageWithRemotePlaceholder) =>
    render(<ImageWithRemotePlaceholder configs={configs} />);

  it('should properly passes the option props', async () => {
    const { container } = renderWithImageWithRemotePlaceholder({ configs: mockImageOptions });

    expect(container).toBeInTheDocument();
    Object.entries(mockImageOptions).forEach(([key, value]) => {
      const imageOption = screen.getByTestId(`mockImage-${key}`);
      expect(imageOption).toBeInTheDocument();
      expect(imageOption.textContent).toBe(value!.toString());
    });
  });
});
