import { mouse, left, right, up, down } from '@nut-tree/nut-js';

export const drawRectangle = async (
  width: number,
  height: number
): Promise<void> => {
  const path1 = await right(width);
  await mouse.drag(path1);

  const path2 = await down(height);
  await mouse.drag(path2);

  const path3 = await left(width);
  await mouse.drag(path3);

  const path4 = await up(height);
  await mouse.drag(path4);
};

export const drawCircle = async (radius: number): Promise<void> => {
  const startPosition = await mouse.getPosition();
  const center = {
    a: startPosition.x,
    b: startPosition.y - radius,
  };
  const path = [];

  for (let i = 0; i <= 360; i++) {
    const newPoint = {
      x: center.a + Math.sin((i * Math.PI) / 180) * radius,
      y: center.b + Math.cos((i * Math.PI) / 180) * radius,
    };

    path.push(newPoint);
  }

  await mouse.drag(path);
};
