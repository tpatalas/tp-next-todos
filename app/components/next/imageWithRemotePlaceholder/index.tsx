import getBase64FromImageURL from '@/lib/utils/base64Converter.utils';
import Image from 'next/image';
import { PropsImageWithRemotePlaceholder } from './imageWithRemotePlaceholder.types';

export const ImageWithRemotePlaceholder = async ({ options }: PropsImageWithRemotePlaceholder) => {
  const {
    src,
    width,
    height,
    className,
    alt,
    quality,
    fill,
    style,
    loading,
    sizes = '100vw',
    placeholder = 'blur',
    priority = true,
  } = options;
  const remoteImageBlurDataURL = await getBase64FromImageURL(src);

  return (
    <>
      <Image
        width={width}
        height={height}
        className={className}
        quality={quality}
        src={src}
        fill={fill}
        sizes={sizes}
        alt={alt}
        placeholder={placeholder}
        style={style}
        loading={loading}
        blurDataURL={remoteImageBlurDataURL}
        priority={priority}
      />
    </>
  );
};
