import { createSlice } from '@reduxjs/toolkit'
import { signUp } from './usersOperations'

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
				
			})
	},
})


export const {  } = usersSlice.actions

export const usersReducer = usersSlice.reducer