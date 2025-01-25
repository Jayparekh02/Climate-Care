import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session"; // defaults to localStorage for web

import registerReducer from "../features/auth/registerSlice";
import loginReducer from "../features/auth/loginSlice";
import emissionReducer from "../features/emission/emissionSlice";
import eventReducer from "../features/events/eventSlice";
import resourceReducer from "../features/resources/resourceSlice";

const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["login", "register"], // Specify which reducers you want to persist
};

const rootReducer = combineReducers({
  register: registerReducer,
  login: loginReducer,
  emission: emissionReducer,
  events: eventReducer,
  resources: resourceReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
