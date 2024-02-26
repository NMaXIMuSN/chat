import { StateSchema } from '../../../../../app/providers/StoreProviders/config/StateSchema';

export const getCurrentChat = (state: StateSchema) => {
  if (state.chat.currentChat) {
    return state.chat.chats[state.chat.currentChat]
  }
}