import { UseGuards } from '@nestjs/common';
import { ConnectedSocket, OnGatewayConnection, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { UserAuthType } from 'src/auth/auth.type';
import { WsAuthGuard } from 'src/auth/auth.ws.guard';
import { User } from 'src/auth/authdata.decorator';

export const subscribedClients = new Map();

@WebSocketGateway({
  cors: {
    origin: process.env.CORS_ORIGIN
  }
})
export class ChallengeEventGateway {
  @SubscribeMessage('subscribe')
  @UseGuards(WsAuthGuard)
  subscribeProcessor(@ConnectedSocket() client: any, @User() user: UserAuthType) {
    subscribedClients.set(user.sub, client);
    client.on('disconnect', () => subscribedClients.delete(user.sub));
  }
}
