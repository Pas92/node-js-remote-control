import 'dotenv/config';

import WebSocket, { WebSocketServer } from 'ws';

type Directions = 'up' | 'down' | 'left' | 'right';

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

const moveCursor = (direction: Directions, distance: number): void => {};

const wss = new WebSocketServer({ port: +(process.env.PORT || 8080) });

const handleMessage = function (
  ws: WebSocket,
  data: WebSocket.RawData,
  isBinary?: boolean
) {
  const dataParamsAsString = data.toString();
  const dataParamsAsArray = dataParamsAsString.split(' ');

  const action = dataParamsAsArray[0];
  const firstArg = dataParamsAsArray[1];
  const secondArg = dataParamsAsArray[2];

  switch (action) {
    case MESSAGES_FE_MOUSE.MOUSE_DOWN:
      moveCursor('down', +firstArg);
      break;
    case MESSAGES_FE_MOUSE.MOUSE_UP:
      moveCursor('up', +firstArg);
      break;
    case MESSAGES_FE_MOUSE.MOUSE_RIGHT:
      moveCursor('right', +firstArg);
      break;
    case MESSAGES_FE_MOUSE.MOUSE_LEFT:
      moveCursor('left', +firstArg);
      break;
  }
  console.log(data);
  ws.send(action);
};

const connection = function (ws: WebSocket.WebSocket): void {
  ws.on('message', (data, isBinary) => {
    return handleMessage(ws, data, isBinary);
  });
};

wss.on('connection', connection);
