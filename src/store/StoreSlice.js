import { createSlice } from '@reduxjs/toolkit';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  // whitelist: ['user'], // Optional: Only persist the 'user' slice
  blacklist: ['messages'], // Optional: Don't persist the 'search' slice
};

const storeSlice = createSlice({
  name: 'settings',
  initialState: { user: {} },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSortKind: (state, action) => {
      state.sortKind = action.payload;
    },
  },
});

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessage: (state, action) => {
      state.push(action.payload);
    },
    removeMessage: (state, action) => {
      let index = state.findIndex(m => m.id === action.payload);
      if (index >= 0) {
        state.splice(index, 1); 
      }
    }
  },
});

const rootReducer = combineReducers({
  settings: storeSlice.reducer,
  messages: messagesSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const { setUser, setFilter, setSortKind } = storeSlice.actions;
export const { addMessage, removeMessage } = messagesSlice.actions;

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

