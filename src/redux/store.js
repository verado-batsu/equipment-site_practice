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

import { equipmentsApi } from './equipments/equipmentsApi'
import { usersReducer } from './users/usersSlice'

const authPersistConfig = {
	key: 'auth',
	storage,
	whitelist: ['token'],
}

const persistedUser = persistReducer(authPersistConfig, usersReducer)

export const store = configureStore({
	reducer: {
		auth: persistedUser,
		[equipmentsApi.reducerPath]: equipmentsApi.reducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(equipmentsApi.middleware),
})

export const persistor = persistStore(store)

// const TEACHER_ID = "a98a03f5-9918-4352-abbf-cfc8dc37141a"