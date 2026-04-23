import { createSlice } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

const storeSlice = createSlice({
  name: 'settings',
  initialState: { user: {}, apiInProgress: false },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser} = storeSlice.actions;

export const store = configureStore({
  reducer: {
    settings: storeSlice.reducer,
  },
});