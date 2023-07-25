'use client';

const cloudflareLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
  const params = [`width=${width}`, `quality=${quality || 75}`, `format=${'webp' || 'webp'}`];
  return `${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/cdn-cgi/image/${params.join(',')}/${src}`;
};

export default cloudflareLoader;
