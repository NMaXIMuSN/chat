import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { UserService } from '../user/user.service';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { MessageService } from '../message/message.service';

@WebSocketGateway({
  cors: {
    origin: '*',
    credentials: true,
  }
})

export class ChatGateway {
  constructor (
    private userService: UserService,
    private chatService: ChatService,
    private messageService: MessageService,
  ) {}

  @WebSocketServer()
  server: Server;


  @SubscribeMessage('join_room')
  async handledJoinRoom(client: Socket, [socketId, userId]) {
    await this.userService.updateSocketId(socketId, userId);
    client.join(socketId)
  }
  @SubscribeMessage('message')
  async handledMessage(client: Socket, payload) {
    const chat = await this.chatService.getOrCreateChat(payload.chat, 'private', [...payload.participants.map(participant => participant.id), payload.user.id]);
    const message = await this.messageService.createMessage(chat.id, payload.type, payload.content, payload.user.id)
    chat.users.forEach((user) => {
      this.server.in(user.socketId).emit('message', message)
    })
  }

  @SubscribeMessage('delete-message')
  async handledDeleteMessage(client: Socket, payload) {
    await this.messageService.deleteMessage(payload.messageId)

    const chat = await this.chatService.getChatByName(payload.chat)
    chat.users.forEach((user) => {
      this.server.in(user.socketId).emit('delete-message', payload)
    })
  }

  @SubscribeMessage('edit-message')
  async handledEditMessage(client: Socket, payload) {
    const newMessage = await this.messageService.updateMessage(payload.id, payload.content)

    newMessage.chat.users.forEach((user) => {
      this.server.in(user.socketId).emit('edit-message', newMessage)
    })
  }
}
