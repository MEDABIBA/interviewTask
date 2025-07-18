import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { messagesApi } from '@/app/services/messages'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(messagesApi.middleware),
})