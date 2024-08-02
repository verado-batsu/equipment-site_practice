import { createSlice } from '@reduxjs/toolkit'
import { Notify } from 'notiflix'
import { logIn, signUp } from './usersOperations'
import { replace } from 'formik'

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
			.addCase(signUp.fulfilled, (state, { payload }) => {
				Notify.success(`User registered. Please login`);
			})
			.addCase(logIn.fulfilled, (state, { payload }) => {
				state.user = payload.user;
				state.token = payload.token;
				state.isLoggedIn = true;
			})
	},
})


export const {  } = usersSlice.actions

export const usersReducer = usersSlice.reducer