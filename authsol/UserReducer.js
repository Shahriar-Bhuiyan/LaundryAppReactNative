// authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { saveUser, loadUser, removeUser } from './authService';

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      saveUser(action.payload);
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      removeUser();
    },
  },
});


const initialUser = loadUser();
if (initialUser) {
  authSlice.actions.login(initialUser);
}

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
