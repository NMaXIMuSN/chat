import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MessageService {
  constructor(
    private prismaService: PrismaService
  ) {}

  async createMessage(chatId: number, type: string, content: string, userId: number) {
    return await this.prismaService.message.create({
      data: {
        content,
        isEdit: false,
        type,
        userId,
        chatId,
      }
    })
  }

  async updateMessage(id: number, content: string) {
    return await this.prismaService.message.update({
      data: {
        content,
        isEdit: true,
      },
      where: {
        id
      },
      include: {
        chat: {
          include: {
            users: true
          }
        }
      }
    })
  }

  async deleteMessage(id: number) {
    await this.prismaService.message.delete({
      where: {
        id
      },
    })
  }
}
