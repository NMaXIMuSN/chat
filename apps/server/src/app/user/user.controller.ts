import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import { SessionInfo } from '../auth/session-info.decorator';
import { GetSessionInfoDto } from '../auth/auth.dto';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
  ) {}
  @Get()
  async getUsers() {
    // return await this.userService.getUsers()
  }
  @Get('/:username')
  @UseGuards(AuthGuard)
  async getUsersByUserName(
    @Param('username') username: string,
    @SessionInfo() session: GetSessionInfoDto
  ) {
    return await this.userService.getUsersByName(username, session.id)
  }
}
