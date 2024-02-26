import { configureStore } from '@reduxjs/toolkit'
import { StateSchema } from './StateSchema'
import { userReducer } from '../../../../entities/user/model/slice/UserSlice';
import { searchUsersReducer } from '../../../../entities/searchUsers'
import { ChatReducer } from '../../../../entities/chat/model/slice/ChatSlice';
import { messageInputReducer } from '../../../../entities/message';

export function createConfigureStore(initialState?: StateSchema) {
  return configureStore<StateSchema>({
    reducer: {
      user: userReducer,
      searchUsers: searchUsersReducer,
      chat: ChatReducer,
      messageInput: messageInputReducer,
    },
    preloadedState: initialState,
  })
}

