import { mouse } from '@nut-tree/nut-js';
import { Point } from '@nut-tree/nut-js/dist/lib/point.class';
import { Directions } from './types';

export const moveCursor = async (
  direction: Directions,
  distance: number
): Promise<void> => {
  const mousePosition = await mouse.getPosition();
  console.log(mousePosition);

  switch (direction) {
    case 'up':
      await mouse.setPosition(
        new Point(mousePosition.x, mousePosition.y - distance)
      );
      break;
    case 'down':
      await mouse.setPosition(
        new Point(mousePosition.x, mousePosition.y + distance)
      );
      break;
    case 'left':
      await mouse.setPosition(
        new Point(mousePosition.x - distance, mousePosition.y)
      );
      break;
    case 'right':
      await mouse.setPosition(
        new Point(mousePosition.x + distance, mousePosition.y)
      );
      break;
  }
};
