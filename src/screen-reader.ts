import { mouse, Region, screen } from '@nut-tree/nut-js';
import Jimp from 'jimp';

export const sendScreen = async (): Promise<string> => {
  const mousePosition = await mouse.getPosition();
  const region = new Region(
    mousePosition.x - 100 >= 0 ? mousePosition.x - 100 : 0,
    mousePosition.y - 100 >= 0 ? mousePosition.y - 100 : 0,
    200,
    200
  );

  const img = await screen.grabRegion(region);
  const rgbImage = await img.toRGB();

  const newImage = new Jimp({
    data: rgbImage.data,
    width: 200,
    height: 200,
  });

  const pngBase64 = await newImage.getBufferAsync(Jimp.MIME_PNG);
  return pngBase64.toString('base64');
};
