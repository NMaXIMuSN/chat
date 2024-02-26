import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async getUsers() {
    return await this.prisma.user.findMany()
  }

  async getUsersByName(username: string, currentUserId: number) {
    return await this.prisma.user.findMany({
      where: {
        NOT: {
          id: currentUserId
        },
        username: {
          contains: username
        }
      },
    })
  }

  async getUsersChats(userId: number) {
    return await this.prisma.chat.findMany({
      where: {
        users: {
          some: {
            id: userId
          }
        }
      },
      include: {
        messages: {
          orderBy: {
            createdAt: 'asc',
          }
        },
        users: true,
      }
    })
  }

  async updateSocketId (socketId: string, userId: number) {
    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        socketId
      }
    })
  }

  async findByUserName(username: string) {
    return await this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  async create(
    username: string,
    hash: string,
    salt: string,
  ) {
    const user = await this.prisma.user.create({
      data: {
        username,
        hash,
        salt,
      },
    });

    return user;
  }
}
