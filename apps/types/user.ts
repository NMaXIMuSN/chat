export interface IUserSchema {
  id: number
  username: string
  createAt: Date
  socketId?: string
}