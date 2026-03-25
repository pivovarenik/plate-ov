import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  isAuthenticated: boolean
  token: string | null
  userId: number | null
  email: string | null
  fullName: string | null
  role: string | null
}

const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem('token'),
  token: localStorage.getItem('token'),
  userId: localStorage.getItem('userId') ? parseInt(localStorage.getItem('userId')!) : null,
  email: localStorage.getItem('email'),
  fullName: localStorage.getItem('fullName'),
  role: localStorage.getItem('role'),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<any>) {
      state.isAuthenticated = true
      state.token = action.payload.token
      state.userId = action.payload.userId
      state.email = action.payload.email
      state.fullName = action.payload.fullName
      state.role = action.payload.role

      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('userId', action.payload.userId.toString())
      localStorage.setItem('email', action.payload.email)
      localStorage.setItem('fullName', action.payload.fullName)
      localStorage.setItem('role', action.payload.role)
    },
    logout(state) {
      state.isAuthenticated = false
      state.token = null
      state.userId = null
      state.email = null
      state.fullName = null
      state.role = null

      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('email')
      localStorage.removeItem('fullName')
      localStorage.removeItem('role')
    },
  },
})

export const { setAuth, logout } = authSlice.actions
export default authSlice.reducer
