import { IChatSchema } from "@typesApp/chat"
import { apiInstance } from "../axios"

export const GetChatByChatName = async (chatName: string): Promise<IChatSchema> => {
  return await apiInstance({
    method: "GET",
    url: `/chat/${chatName}`
  })
    .then(({ data }) => {
      return data
    })
}

export const GetChatsByUserId = async (): Promise<IChatSchema[]> => {
  return await apiInstance({
    method: "GET",
    url: '/chat'
  })
  .then(({data}) => data)
}