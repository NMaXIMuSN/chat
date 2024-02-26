import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private prismaService: PrismaService) {}

  async getUsersChat(chatId: number) {
    const chat = await this.prismaService.chat.findMany({
      where: {
        id: chatId
      },
      include: {
        users: true
      },
    })

    return chat.map(chat => chat?.users)
  }

  async getOrCreateChat(name: string, type: string, participants: number[]) {
    const chat = await this.getChatByName(name)

    if (chat) {
      return chat
    }

    return await this.createChat(name, type, participants)
  }

  async getChatByName(chatName: string) {
    return await this.prismaService.chat.findUnique({
      where: {
        name: chatName,
      },
      include: {
        users: true,
        messages: {
          orderBy: {
            createdAt: 'asc',
          }
        }
      },
    })
  }

  async createChat(name: string, type: string, participants: number[]) {
    const chat = await this.prismaService.chat.create({
      data: {
        name: name,
        type: type,
        users: {
          connect: participants.map(id => ({ id }))
        }
      },
      include: {
        users: true,
      }
    })

    return chat
  }

}
