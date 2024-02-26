import { IUserSchema } from './user'

export interface IChatSchema {
  id: number
  users: IUserSchema[]
  type: string
  name: string
  updatedAt: string
  messages: IMessageSchema[]
}

export interface IMessageSchema {
  id: number
  createdAt: string
  content: string
  type: string
  user: IUserSchema
  isEdit: boolean
  chat: IChatSchema
  updatedAt: string
  chatId: number
  userId: number
}