import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { UserSchema } from "../types/UserSchema" 
import { IUserSchema } from "@typesApp/user"
 
const initialState: UserSchema = {
  isAuth: false,
  user: null
}

export const userSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<IUserSchema> ) => {
      state.user = payload
      state.isAuth = true
    },
    resetUser: (state) => {
      state.isAuth = false
      state.user = null
    },
    setUserSocketId: (state, {payload}: PayloadAction<string>) => {
      if (!state.user) {
        return
      }

      state.user.socketId = payload
    }
  },
})

export const { actions: userActions } = userSlice
export const { reducer: userReducer } = userSlice
