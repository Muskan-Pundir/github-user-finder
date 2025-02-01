import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage
import { UserSlice } from "./store/features/userSlice";

// Persist configuration
const persistConfig = {
  key: "root", // Key for storage
  storage, // Use localStorage
};

// Create a persisted reducer
const persistedUserReducer = persistReducer(persistConfig, UserSlice.reducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer, // Use the persisted reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // To prevent warnings
    }),
});

// Persistor to persist and rehydrate the store
export const persistor = persistStore(store);
