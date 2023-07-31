import { render, screen } from '@testing-library/react';
import { ImageWithRemotePlaceholder } from '..';
import { TypesImageWithRemotePlaceholder } from '../imageWithRemotePlaceholder.types';
import { PATH_IMAGE } from '@/_lib/consts/assertion.consts';

type typesForTest = { options: Pick<TypesImageWithRemotePlaceholder, 'width' | 'height' | 'src' | 'alt'> };

jest.mock('@/_components/next/imageWithRemotePlaceholder', () => ({
  ImageWithRemotePlaceholder: ({ options }: typesForTest) => (
    <>
      {Object.entries(options).map(([key, value]) => (
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

const mockImageOptions: TypesImageWithRemotePlaceholder = {
  width: 1000,
  height: 1000,
  src: PATH_IMAGE['demo'],
  alt: 'testing',
};

describe('ImageWithRemotePlaceholder', () => {
  const renderWithImageWithRemotePlaceholder = ({ options }: typesForTest) =>
    render(<ImageWithRemotePlaceholder options={options} />);

  it('should properly passes the option props', async () => {
    const { container } = renderWithImageWithRemotePlaceholder({ options: mockImageOptions });

    expect(container).toBeInTheDocument();
    Object.entries(mockImageOptions).forEach(([key, value]) => {
      const imageOption = screen.getByTestId(`mockImage-${key}`);
      expect(imageOption).toBeInTheDocument();
      expect(imageOption.textContent).toBe(value.toString());
    });
  });
});
