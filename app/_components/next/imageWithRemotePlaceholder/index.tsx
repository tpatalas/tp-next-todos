import 'server-only';
import getBase64FromImageURL from '@/_lib/utils/base64Converter.utils';
import Image from 'next/image';
import { PropsImageWithRemotePlaceholder } from './imageWithRemotePlaceholder.types';

export const ImageWithRemotePlaceholder = async ({ options }: PropsImageWithRemotePlaceholder) => {
  const { sizes = '100vw', priority = true } = options;
  const remoteImageHandler = async () => {
    if (options.placeholder === 'blur') return await getBase64FromImageURL(options.src);
    return;
  };
  const remoteImageBlurDataURL = await remoteImageHandler();

  return (
    <>
      <Image
        width={options.width}
        height={options.height}
        className={options.className}
        quality={options.quality}
        src={options.src}
        fill={options.fill}
        alt={options.alt}
        placeholder={options.placeholder}
        style={options.style}
        loading={options.loading}
        blurDataURL={remoteImageBlurDataURL}
        sizes={sizes}
        priority={priority}
      />
    </>
  );
};
