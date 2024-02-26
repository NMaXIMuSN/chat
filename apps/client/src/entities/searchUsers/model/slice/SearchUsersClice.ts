import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { SearchUsersSchema } from "../types/SearchUsersSchema"
import { IUserSchema } from "@typesApp/user"


const initialState: SearchUsersSchema = {
  users: [],
}

const searchUsersSlice = createSlice({
  initialState,
  name: 'searchUsers',
  reducers: {
    setUsers: (state, { payload }: PayloadAction<IUserSchema[]>) => {
      state.users = payload
    }
  }
})

export const { actions: searchUsersActions } = searchUsersSlice
export const { reducer: searchUsersReducer } = searchUsersSlice