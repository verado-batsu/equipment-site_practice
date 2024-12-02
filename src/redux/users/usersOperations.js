import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

axios.defaults.baseURL = 'https://equipment-site-backend.onrender.com/api';

const token = {
	set(token) {
		axios.defaults.headers.common.Authorization = `Bearer ${token}`;
	},
	clear() {
		axios.defaults.headers.common.Authorization = ``;
	}
}

export const signUp = createAsyncThunk('auth/signUp', async (user, thunkAPI) => {
	try {
		await axios.post('/users/signup', user);
	} catch (error) {
		return thunkAPI.rejectWithValue(error.message);
	}
})

export const logIn = createAsyncThunk('auth/logIn', async (user, thunkAPI) => {
	try {
		const { data } = await axios.post('/users/login', user);
		token.set(data.token)
		return data
	} catch (error) {
		toast.error("Something went wrong. Сheck that the entered email and password are correct");
	}
})

export const logOut = createAsyncThunk('auth/logOut', async (_, thunkAPI) => {
	try {
		await axios.post('/users/logout');
		token.clear()
	} catch (error) {
		return thunkAPI.rejectWithValue(error.message);
	}
})

export const getCurrentUser = createAsyncThunk('auth/getCurrent', async (_, thunkAPI) => {
	const persistedToken = thunkAPI.getState().auth.token;

	if (persistedToken === null) {
		thunkAPI.rejectWithValue();
	}
	
	token.set(persistedToken)
	
	try {
		const { data } = await axios.get('/users/current');
		return data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.message);
	}
})