import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import CartReducer from "./CartReducer";
import ProudctReducer from "./ProductReducer";
import UserReducer from "./authsol/UserReducer";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import AsyncStorage from "@react-native-async-storage/async-storage";

const rootReducer = combineReducers({
  cart: CartReducer,
  product: ProudctReducer,
  user: UserReducer
});


// configure persist

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['user'], // Names of the slices to be persisted
  };

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

// Create a persistor for persisting the store
const persistor = persistStore(store);

export { store, persistor };