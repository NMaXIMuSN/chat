import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { PrismaModule } from '../prisma/prisma.module';
import { MessageModule } from '../message/message.module';

@Module({
  imports: [UserModule, PrismaModule, MessageModule],
  controllers: [ChatController],
  providers: [ChatService],
  exports: [ChatService]
})
export class ChatModule {}
