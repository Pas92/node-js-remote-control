import WebSocket from 'ws';
import { drawCircle, drawRectangle } from './drawer';
import { moveCursor } from './mouse-moves';
import { sendScreen } from './screen-reader';
import {
  Command,
  MESSAGES_FE_DRAW,
  MESSAGES_FE_MOUSE,
  MESSAGES_FE_PRINT,
} from './types';

export const parseCommand = (data: WebSocket.RawData): Command => {
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

export const chooseAction = async (
  command: Command
): Promise<void | string> => {
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
    case MESSAGES_FE_MOUSE.MOUSE_POSITION:
      return await moveCursor('position', +command.firstArg);
    case MESSAGES_FE_DRAW.DRAW_RECTANGLE:
      await drawRectangle(+command.firstArg, +command.secondArg);
      break;
    case MESSAGES_FE_DRAW.DRAW_SQUARE:
      await drawRectangle(+command.firstArg, +command.firstArg);
      break;
    case MESSAGES_FE_DRAW.DRAW_CIRCLE:
      await drawCircle(+command.firstArg);
      break;
    case MESSAGES_FE_PRINT.PRINT_SCREEN:
      return await sendScreen();
  }
};
