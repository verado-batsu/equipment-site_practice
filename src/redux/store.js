import { configureStore } from '@reduxjs/toolkit'
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { usersReducer } from './users/usersSlice'

const persistConfigUser = {
	key: 'user',
	storage,
	whitelist: ['token'],
}

const persistedUser = persistReducer(persistConfigUser, usersReducer)

export const store = configureStore({
	reducer: {
		auth: usersReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		})
			// .concat(usersApi.middleware)
	,
})

// const TEACHER_ID = "a98a03f5-9918-4352-abbf-cfc8dc37141a"