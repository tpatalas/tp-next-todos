import 'server-only';
import Image from 'next/image';
import { PropsImageWithRemotePlaceholder } from './imageWithRemotePlaceholder.types';
import cloudflareLoader from '@/_lib/utils/imageLoader.utils';

export const ImageWithRemotePlaceholder = async ({ configs }: PropsImageWithRemotePlaceholder) => {
  const { sizes = '100vw', priority = true } = configs;
  // const remoteImageBlurDataURL = await getBase64FromImageURL(configs.src);

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
        // placeholder={configs.placeholder}
        style={configs.style}
        loading={configs.loading}
        // blurDataURL={configs.placeholder && remoteImageBlurDataURL}
        sizes={sizes}
        priority={priority}
      />
    </>
  );
};
