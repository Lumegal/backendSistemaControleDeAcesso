import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Cargas } from 'src/cargas/entities/cargas.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MyGateway implements OnGatewayConnection {
  handleConnection(@ConnectedSocket() client: Socket) {
    console.log('Cliente conectado:', client.id);
    console.log(client.handshake.address);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log('Cliente desconectado:', client.id);
  }

  @WebSocketServer()
  server: Server;

  emitirCargaAtualizada(carga: Cargas) {
    this.server.emit('cargaAtualizada', carga);
  }
}
