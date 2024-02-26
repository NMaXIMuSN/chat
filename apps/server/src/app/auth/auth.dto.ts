export interface GetSessionInfoDto {
  id: number;
  userName: string;
  iat: number;
  exp: number;
}

import { IsNotEmpty, IsString } from 'class-validator';

export class SignUpBodyDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SignInBodyDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
