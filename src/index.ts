import 'dotenv/config';

import WebSocket, { WebSocketServer } from 'ws';
import { chooseAction, parseCommand } from './helper';
import { Command, MESSAGES_FE_PRINT } from './types';

const wss = new WebSocketServer({ port: +(process.env.PORT || 8080) });

const handleMessage = async function (
  ws: WebSocket,
  data: WebSocket.RawData,
  isBinary?: boolean
) {
  const command: Command = parseCommand(data);

  const actionResult = await chooseAction(command);

  console.log(data);

  if (command.action === MESSAGES_FE_PRINT.PRINT_SCREEN && actionResult) {
    ws.send(`${command.action} ${actionResult}`);
  } else {
    ws.send(command.action);
  }
};

const connection = function (ws: WebSocket.WebSocket): void {
  ws.on('message', async (data, isBinary) => {
    await handleMessage(ws, data, isBinary);
  });
};

wss.on('connection', connection);
