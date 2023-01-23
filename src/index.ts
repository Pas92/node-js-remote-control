import 'dotenv/config';

import { httpServer } from './http_server';
import WebSocket, { WebSocketServer } from 'ws';
import { chooseAction, parseCommand } from './helper';
import { Command } from './types';

const HTTP_PORT = 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: +(process.env.PORT || 8080) });

const handleMessage = async function (
  ws: WebSocket,
  data: WebSocket.RawData,
  isBinary?: boolean
) {
  const command: Command = parseCommand(data);

  const actionResult = await chooseAction(command);

  if (actionResult) {
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
