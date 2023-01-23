import { mouse } from '@nut-tree/nut-js';
import { Point } from '@nut-tree/nut-js/dist/lib/point.class';
import { Directions } from './types';

export const moveCursor = async (
  direction: Directions | 'position',
  distance: number
): Promise<void | string> => {
  const mousePosition = await mouse.getPosition();

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
    case 'position': {
      const cursorPosition = await mouse.getPosition();
      return `${cursorPosition.x},${cursorPosition.y}`;
    }
  }
};
