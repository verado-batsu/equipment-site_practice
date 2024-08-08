import { createSlice } from '@reduxjs/toolkit'
import { Notify } from 'notiflix'
import { getCurrentUser, logIn, logOut, signUp } from './usersOperations'

const initialState = {
	user: { name: null, email: null },
	token: null,
	isLoggedIn: false,
	isFetchingCurrent: false,
}

export const usersSlice = createSlice({
	name: 'users',
	initialState,
	extraReducers: builder => {
		builder
			.addCase(signUp.fulfilled, () => {
				Notify.success(`User registered. Please login`);
			})
			.addCase(logIn.fulfilled, (state, { payload }) => {
				state.user = payload.user;
				state.token = payload.token;
				state.isLoggedIn = true;
				Notify.success(`Welcome ${state.user.name}`);
			})
			.addCase(logOut.fulfilled, (state, _) => {
				state.user = { name: null, email: null };
				state.token = null;
				state.isLoggedIn = false;
			})
			.addCase(getCurrentUser.fulfilled, (state, { payload }) => {
				state.user = payload;
				state.isLoggedIn = true;
			})
	},
})


export const {  } = usersSlice.actions

export const usersReducer = usersSlice.reducer