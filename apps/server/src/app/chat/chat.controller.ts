import { Controller, Get, Logger, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { SessionInfo } from '../auth/session-info.decorator';
import { GetSessionInfoDto } from '../auth/auth.dto';
import { UserService } from '../user/user.service';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(
    public userService: UserService,
    public chatService: ChatService,
  ) {}
  private Logger = new Logger()
  @Get('')
  @UseGuards(AuthGuard)
  async getUserChat(@SessionInfo() session: GetSessionInfoDto) {
    this.Logger.log(session)
    return await this.userService.getUsersChats(session.id)
  }

  @Get('/:name')
  async getChatByName(
    @Param('name') name: string
  ) {
    return await this.chatService.getChatByName(name)
  }
}
