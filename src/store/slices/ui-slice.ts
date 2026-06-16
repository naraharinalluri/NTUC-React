import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface UiSliceState {
  sidebarOpen: boolean
  unreadNotificationCount: number
  globalError: string | null
  isOffline: boolean
}

const initialState: UiSliceState = {
  sidebarOpen: true,
  unreadNotificationCount: 0,
  globalError: null,
  isOffline: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen(state, action: PayloadAction<boolean>) {
      state.sidebarOpen = action.payload
    },
    setUnreadCount(state, action: PayloadAction<number>) {
      state.unreadNotificationCount = action.payload
    },
    incrementUnreadCount(state) {
      state.unreadNotificationCount += 1
    },
    decrementUnreadCount(state) {
      state.unreadNotificationCount = Math.max(0, state.unreadNotificationCount - 1)
    },
    setGlobalError(state, action: PayloadAction<string | null>) {
      state.globalError = action.payload
    },
    setOffline(state, action: PayloadAction<boolean>) {
      state.isOffline = action.payload
    },
  },
})

export const {
  toggleSidebar,
  setSidebarOpen,
  setUnreadCount,
  incrementUnreadCount,
  decrementUnreadCount,
  setGlobalError,
  setOffline,
} = uiSlice.actions
export default uiSlice.reducer
