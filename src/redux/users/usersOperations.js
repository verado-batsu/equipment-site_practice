import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = 'https://equipment-site-backend.onrender.com/api';

export const signUp = createAsyncThunk('users/signUp', async user => {
	try {
		const { data } = await axios.post('/users/signup', user);
		return data
	} catch (error) {
		
	}
})