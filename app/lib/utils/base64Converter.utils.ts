import 'server-only';
import sharp from 'sharp';
import { PATH_IMAGE } from '../consts/assertion.consts';

const getBase64FromImageURL = async (path: PATH_IMAGE) => {
  const url = `${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/${path}`;
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const resizedBuffer = await sharp(Buffer.from(arrayBuffer)).resize(150).png({ quality: 70 }).toBuffer();
  const base64Image = resizedBuffer.toString('base64');
  const dataUrl = `data:image/jpeg;base64,${base64Image}`;
  return dataUrl;
};

export default getBase64FromImageURL;
