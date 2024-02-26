import { IUserSchema } from '@typesApp/user'

export interface UserSchema {
  user: IUserSchema | null;
  isAuth: boolean;
}