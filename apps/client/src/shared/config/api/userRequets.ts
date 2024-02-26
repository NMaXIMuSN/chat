import { AxiosResponse } from "axios"
import { apiInstance } from "../axios"
import { IUserSchema } from "@typesApp/user"

export const GetUserInfoResponse = async () => {
  return await apiInstance<IUserSchema>({
    method: 'GET',
    url: '/auth/user-my',
  })
}

export const SignInResponse = async (username: string, password: string) => {
  await apiInstance<AxiosResponse<IUserSchema>>({
    method: 'POST',
    url: '/auth/sign-in',
    data: {
      username,
      password
    }
  })
    
  return await GetUserInfoResponse()
}

export const SignUpResponse = async (username: string, password: string) => {
  return await apiInstance({
    method: 'POST',
    url: '/auth/sign-up',
    data: {
      username,
      password
    }
  })
    .then(async () => {
      return await GetUserInfoResponse()
    })
}

export const SignOutResponse = async () => {
  return await apiInstance({
    method: 'POST',
    url: '/auth/sign-out',
  })
}

export const SearchUsersByUserNameResponse = async (username: string) => {
  return await apiInstance({
    method: 'get',
    url: `/user/${username}`,
  })
}