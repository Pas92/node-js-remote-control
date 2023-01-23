import { mouse, Region, screen } from '@nut-tree/nut-js';
import Jimp from 'jimp/es';

export const sendScreen = async (): Promise<string> => {
  const mousePosition = await mouse.getPosition();
  const screenWidth = await screen.width();
  const screenHeight = await screen.height();

  let regionX = 0;
  let regionY = 0;

  switch (true) {
    case mousePosition.x - 100 <= 0 &&
      mousePosition.y - 100 >= screenHeight - 200:
      regionX = 0;
      regionY = screenHeight - 200;
      break;
    case mousePosition.x - 100 <= 0 && mousePosition.y >= screenHeight - 200:
      regionX = 0;
      regionY = screenHeight - 200;
      break;
    case mousePosition.x - 100 <= 0 &&
      mousePosition.y - 100 <= screenHeight - 200:
      regionX = 0;
      regionY = mousePosition.y;
      break;
    case mousePosition.x <= screenWidth - 200 &&
      mousePosition.y >= screenHeight - 200:
      regionX = mousePosition.x;
      regionY = screenHeight - 200;
      break;
    case mousePosition.x >= screenWidth - 200 &&
      mousePosition.y <= screenHeight - 200:
      regionX = screenWidth - 200;
      regionY = mousePosition.y;
      break;
    case mousePosition.x >= screenWidth - 200 &&
      mousePosition.y >= screenHeight - 200:
      regionX = screenWidth - 200;
      regionY = screenHeight - 200;
      break;
    case mousePosition.x - 100 >= screenWidth - 200 &&
      mousePosition.y - 100 <= screenHeight - 200:
      regionX = screenWidth - 200;
      regionY = mousePosition.y;
      break;
    default:
      regionX = mousePosition.x;
      regionY = mousePosition.y;
  }

  const region = new Region(regionX, regionY, 200, 200);

  const img = await screen.grabRegion(region);
  const rgbImage = await img.toRGB();

  const newImage = new Jimp({
    data: rgbImage.data,
    width: 200,
    height: 200,
  });

  const pngBuffer = await newImage.getBufferAsync(Jimp.MIME_PNG);
  return pngBuffer.toString('base64');
};
