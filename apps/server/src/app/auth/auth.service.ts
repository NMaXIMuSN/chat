import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { PasswordService } from './password.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private passwordService: PasswordService,
    private jwtService: JwtService,
  ) {}

  async signUp(
    userName: string,
    password: string,
  ) {
    const user = await this.userService.findByUserName(userName);

    if (user) {
      throw new BadRequestException({ type: 'email-exists' });
    }

    const salt = this.passwordService.getSalt();
    const hash = this.passwordService.getHash(password, salt);

    const newUser = await this.userService.create(userName, hash, salt);

    const accessToken = await this.jwtService.signAsync({
      id: newUser.id,
      userName: newUser.username,
    });

    return { accessToken };
  }

  async signIn(userName: string, password: string) {
    const user = await this.userService.findByUserName(userName);

    if (!user) {
      throw new UnauthorizedException();
    }

    const hash = this.passwordService.getHash(password, user.salt);

    if (user.hash !== hash) {
      throw new UnauthorizedException();
    }

    const accessToken = await this.jwtService.signAsync({
      id: user.id,
      username: user.username,
    });

    return { accessToken };
  }
}
