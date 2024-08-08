import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = 'https://equipment-site-backend.onrender.com/api';

const token = {
	set(token) {
		axios.defaults.headers.common.Authorization = `Bearer ${token}`;
	},
	clear() {
		axios.defaults.headers.common.Authorization = ``;
	}
}

export const signUp = createAsyncThunk('auth/signUp', async user => {
	try {
		await axios.post('/users/signup', user);
	} catch (error) {
		
	}
})

export const logIn = createAsyncThunk('auth/logIn', async user => {
	try {
		const { data } = await axios.post('/users/login', user);
		token.set(data.token)
		return data
	} catch (error) {
		
	}
})

export const logOut = createAsyncThunk('auth/logOut', async () => {
	try {
		await axios.post('/users/logout');
		token.clear()
	} catch (error) {
		
	}
})

export const getCurrentUser = createAsyncThunk('auth/getCurrent', async (_, thunkApi) => {
	const persistedToken = thunkApi.getState().auth.token;

		if (token === null) {
			return;
		}
	token.set(persistedToken)
	
	try {
		const { data } = await axios.get('/users/current');
		return data;
	} catch (error) {
		
	}
})