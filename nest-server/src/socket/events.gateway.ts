import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: `${process.env.PUBLIC_APP_URL}`,
  },
})
export default class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    this.server = server;
    Logger.log('Websocket server initialized');
  }

  handleConnection(client: Socket) {
    Logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    Logger.log(`Client disconnected: ${client.id}`);
  }

  emitMessage({ event, data }: { event: string; data: any }) {
    this.server.emit(event, data);
  }

  emitToRoom({
    room,
    event,
    data,
  }: {
    room: string;
    event: string;
    data: any;
  }) {
    this.server.to(room).emit(event, data);
  }
}
