import { render, screen } from '@testing-library/react';
import { ImageWithRemotePlaceholder } from '..';
import { TypesImageWithRemotePlaceholder } from '../imageWithRemotePlaceholder.types';
import { PATH_IMAGE } from '@/_lib/consts/assertion.consts';

type typesForTest = { configs: Pick<TypesImageWithRemotePlaceholder, 'width' | 'height' | 'src' | 'alt'> };

jest.mock('@/_components/next/imageWithRemotePlaceholder', () => ({
  ImageWithRemotePlaceholder: ({ configs }: typesForTest) => (
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

const mockImageOptions: TypesImageWithRemotePlaceholder = {
  width: 1000,
  height: 1000,
  src: PATH_IMAGE['demo'],
  alt: 'testing',
};

describe('ImageWithRemotePlaceholder', () => {
  const renderWithImageWithRemotePlaceholder = ({ configs }: typesForTest) =>
    render(<ImageWithRemotePlaceholder configs={configs} />);

  it('should properly passes the option props', async () => {
    const { container } = renderWithImageWithRemotePlaceholder({ configs: mockImageOptions });

    expect(container).toBeInTheDocument();
    Object.entries(mockImageOptions).forEach(([key, value]) => {
      const imageOption = screen.getByTestId(`mockImage-${key}`);
      expect(imageOption).toBeInTheDocument();
      expect(imageOption.textContent).toBe(value.toString());
    });
  });
});
