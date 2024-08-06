import { createSlice } from '@reduxjs/toolkit'
import { Notify } from 'notiflix'
import { logIn, logOut, signUp } from './usersOperations'

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
			})
		.addCase(logOut.fulfilled, (state) => {
				state = initialState;
			})
	},
})


export const {  } = usersSlice.actions

export const usersReducer = usersSlice.reducer