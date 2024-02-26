import { SearchUsersSchema } from '../../../../entities/searchUsers/model/types/SearchUsersSchema';
import { UserSchema } from '../../../../entities/user/model/types/UserSchema';
import { ChatSchema } from '../../../../entities/chat';
import { MessageInputSchema } from '../../../../entities/message/model/types/MessageInput';

export interface StateSchema {
  user: UserSchema
  searchUsers: SearchUsersSchema,
  chat: ChatSchema,
  messageInput: MessageInputSchema,
}