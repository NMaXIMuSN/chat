import { createSelector } from 'reselect';
import { StateSchema } from '../../../../../app/providers/StoreProviders/config/StateSchema';

export const getChatList = createSelector([
  (state: StateSchema) => state.chat.chats,
], (chats) => {
  return Object.values(chats).filter(chat => chat.isVisited)
})