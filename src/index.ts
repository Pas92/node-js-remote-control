import 'dotenv/config';

import WebSocket, { WebSocketServer } from 'ws';
import { mouse, left, right, up, down } from '@nut-tree/nut-js';
import { Point } from '@nut-tree/nut-js/dist/lib/point.class';

type Directions = 'up' | 'down' | 'left' | 'right';

interface Command {
  action: string;
  firstArg: string;
  secondArg: string;
}

enum MESSAGES_FE_MOUSE {
  MOUSE_UP = 'mouse_up',
  MOUSE_DOWN = 'mouse_down',
  MOUSE_LEFT = 'mouse_left',
  MOUSE_RIGHT = 'mouse_right',
  MOUSE_POSITION = 'mouse_position',
}

enum MESSAGES_FE_DRAW {
  DRAW_CIRCLE = 'draw_circle',
  DRAW_RECTANGLE = 'draw_rectangle',
  DRAW_SQUARE = 'draw_square',
}

enum MESSAGES_FE_PRINT {
  PRINT_SCREEN = 'prnt_scrn',
}

const moveCursor = async (
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

const parseCommand = (data: WebSocket.RawData): Command => {
  const dataParamsAsString = data.toString();
  const dataParamsAsArray = dataParamsAsString.split(' ');

  const action = dataParamsAsArray[0];
  const firstArg = dataParamsAsArray[1];
  const secondArg = dataParamsAsArray[2];

  return {
    action,
    firstArg,
    secondArg,
  };
};

const wss = new WebSocketServer({ port: +(process.env.PORT || 8080) });

const handleMessage = async function (
  ws: WebSocket,
  data: WebSocket.RawData,
  isBinary?: boolean
) {
  const command = parseCommand(data);

  switch (command.action) {
    case MESSAGES_FE_MOUSE.MOUSE_DOWN:
      await moveCursor('down', +command.firstArg);
      break;
    case MESSAGES_FE_MOUSE.MOUSE_UP:
      await moveCursor('up', +command.firstArg);
      break;
    case MESSAGES_FE_MOUSE.MOUSE_RIGHT:
      await moveCursor('right', +command.firstArg);
      break;
    case MESSAGES_FE_MOUSE.MOUSE_LEFT:
      await moveCursor('left', +command.firstArg);
      break;
  }
  console.log(data);
  ws.send(command.action);
};

const connection = function (ws: WebSocket.WebSocket): void {
  ws.on('message', async (data, isBinary) => {
    await handleMessage(ws, data, isBinary);
  });
};

wss.on('connection', connection);
