export type Directions = 'up' | 'down' | 'left' | 'right';

export interface Command {
  action: string;
  firstArg: string;
  secondArg: string;
}

export enum MESSAGES_FE_MOUSE {
  MOUSE_UP = 'mouse_up',
  MOUSE_DOWN = 'mouse_down',
  MOUSE_LEFT = 'mouse_left',
  MOUSE_RIGHT = 'mouse_right',
  MOUSE_POSITION = 'mouse_position',
}

export enum MESSAGES_FE_DRAW {
  DRAW_CIRCLE = 'draw_circle',
  DRAW_RECTANGLE = 'draw_rectangle',
  DRAW_SQUARE = 'draw_square',
}

export enum MESSAGES_FE_PRINT {
  PRINT_SCREEN = 'prnt_scrn',
}
