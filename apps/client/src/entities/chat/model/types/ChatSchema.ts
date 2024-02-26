import { IMessageSchema } from "@typesApp/chat"
import { IUserSchema } from "@typesApp/user"

export interface ChatSchema {
  currentChat: string | null,
  chats: Record<string, IChat>
}

export interface IChat {
  messages: IMessageSchema[]
  participants: IUserSchema[]
  name: string
  isVisited: boolean
  updatedAt: string
}

export interface MessageSchema{
  id: number
  createdAt: string
  content: string
  type: string
  user: IUserSchema
  chatId: number
  userId: number
  // ChatMessages: ChatMessages
}