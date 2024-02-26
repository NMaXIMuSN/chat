import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { ChatSchema, IChat } from "../types/ChatSchema"
import { IUserSchema } from "@typesApp/user"
import { IChatSchema, IMessageSchema } from "@typesApp/chat"

const initialState: ChatSchema = {
  chats: {},
  currentChat: null,
}

const chatSlice = createSlice({
  initialState,
  name: 'chat',
  reducers: {
    setCurrentChat: (state, { payload }: PayloadAction<string>) => {
      state.currentChat = payload
    },
    setChat: (state, { payload }: PayloadAction<{ messages: IMessageSchema[], participants: IUserSchema[], chatName: string, isVisited?: boolean, updatedAt: string}>) => {
      state.chats[payload.chatName] = {
        messages: payload.messages,
        participants: payload.participants,
        isVisited: payload.isVisited || false,
        name: payload.chatName,
        updatedAt: payload.updatedAt,
      }

      console.log(payload.messages)

    },
    setChatsForArr: (state, {payload} : PayloadAction<IChatSchema[]>) => {
      const chats = payload.reduce((obj, chat) => {
        console.log(chat.messages)
        obj[chat.name] = {
          messages: chat.messages,
          participants: chat.users,
          isVisited: true,
          name: chat.name,
          updatedAt: chat.updatedAt
        }
        return obj
      }, {} as Record<string, IChat>)

      state.chats = chats
    },
    pushNewMessages: (state, { payload }: PayloadAction<{message: IMessageSchema, chatName: string}>) => {
      if (state.chats[payload.chatName]) {
        state.chats[payload.chatName].messages.push(payload.message)
      }
    },
    setParticipants: (state, { payload }: PayloadAction<{participants: IUserSchema[], chatName: string }>) => {
      if (state.chats[payload.chatName]) {
        state.chats[payload.chatName].participants = payload.participants
      }
    },
    deleteMessages: (state, { payload }: PayloadAction<{messageId: number, chatName: string}>) => {
      if (!state.chats[payload.chatName]) {
        return
      }

      state.chats[payload.chatName].messages = state.chats[payload.chatName].messages.filter(msg => msg.id !== payload.messageId)
    },

    updatedMessage: (state, { payload }: PayloadAction<IMessageSchema>) => {
      if(!state.chats[payload.chat.name]) {
        return
      }

      const message = state.chats[payload.chat.name].messages.find(msg => msg.id === payload.id)
      if (message) {
        message.updatedAt = payload.updatedAt
        message.content = payload.content
        message.isEdit = payload.isEdit
      }
    }
  },
})


export const { actions: ChatActions } = chatSlice
export const { reducer: ChatReducer } = chatSlice