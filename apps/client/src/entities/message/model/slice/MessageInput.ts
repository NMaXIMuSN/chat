import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { MessageInputSchema } from "../types/MessageInput" 
import { IMessageSchema } from "@typesApp/chat"
 
const initialState: MessageInputSchema = {
  content: '',
  isEdit: false,
  editMessage: undefined
}

export const MessageInputSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setContent: (state, { payload }: PayloadAction<string>) => {
      state.content = payload
    },
    setIsEditMessage: (state, { payload }: PayloadAction<IMessageSchema>) => {
      state.content = payload.content
      state.isEdit = true
      state.editMessage = payload
    },
    reset: (state) => {
      state.content = ''
      state.isEdit = false
      state.editMessage = undefined
    },
  },
})

export const { actions: messageInputActions } = MessageInputSlice
export const { reducer: messageInputReducer } = MessageInputSlice
