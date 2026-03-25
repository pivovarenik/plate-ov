import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Notification {
  id: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
}

export interface UIState {
  notifications: Notification[]
  sidebarOpen: boolean
}

const initialState: UIState = {
  notifications: [],
  sidebarOpen: true,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    addNotification(state, action: PayloadAction<Omit<Notification, 'id'>>) {
      const id = Date.now().toString()
      state.notifications.push({ ...action.payload, id })
    },
    removeNotification(state, action: PayloadAction<string>) {
      state.notifications = state.notifications.filter(n => n.id !== action.payload)
    },
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen
    },
  },
})

export const { addNotification, removeNotification, toggleSidebar } = uiSlice.actions
export default uiSlice.reducer
