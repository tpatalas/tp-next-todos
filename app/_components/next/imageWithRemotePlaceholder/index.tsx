import 'server-only';
import getBase64FromImageURL from '@/_lib/utils/base64Converter.utils';
import Image from 'next/image';
import { PropsImageWithRemotePlaceholder } from './imageWithRemotePlaceholder.types';
import cloudflareLoader from '@/_lib/utils/imageLoader.utils';

export const ImageWithRemotePlaceholder = async ({ configs }: PropsImageWithRemotePlaceholder) => {
  const { sizes = '100vw', priority = true } = configs;
  const remoteImageHandler = async () => {
    if (configs.placeholder === 'blur') return await getBase64FromImageURL(configs.src);
    return;
  };
  const remoteImageBlurDataURL = await remoteImageHandler();

  return (
    <>
      <Image
        loader={cloudflareLoader}
        width={configs.width}
        height={configs.height}
        className={configs.className}
        quality={configs.quality}
        src={configs.src}
        fill={configs.fill}
        alt={configs.alt}
        placeholder={configs.placeholder}
        style={configs.style}
        loading={configs.loading}
        blurDataURL={remoteImageBlurDataURL}
        sizes={sizes}
        priority={priority}
      />
    </>
  );
};
