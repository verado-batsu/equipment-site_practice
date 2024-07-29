import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
	reducerPath: 'usersApi',
	baseQuery: fetchBaseQuery({ baseUrl: "https://equipment-site-backend.onrender.com/api" }),
	endpoints: (builder) => ({
		signUp: builder.mutation({
			query: (user) => ({
				url: `/users/signup`,
				method: 'POST',
				body: user
			})
		})
	})
})

export const { useSignUpMutation } = usersApi;