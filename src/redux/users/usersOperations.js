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

export const signUp = createAsyncThunk('users/signUp', async user => {
	try {
		await axios.post('/users/signup', user);
	} catch (error) {
		
	}
})

export const logIn = createAsyncThunk('users/logIn', async user => {
	try {
		const { data } = await axios.post('/users/login', user);
		token.set(data.token)
		return data
	} catch (error) {
		
	}
})

export const logOut = createAsyncThunk('users/logOut', async user => {
	try {
		const { data } = await axios.post('/users/logout');
		token.clear()
		return data
	} catch (error) {
		
	}
})