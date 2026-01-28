import { configureStore } from '@reduxjs/toolkit';
import heroBannerReducer from './slices/heroBannerSlice';

export const store = configureStore({
  reducer: {
    heroBanner: heroBannerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});