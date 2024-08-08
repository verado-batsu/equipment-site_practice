import axios from "axios";
import { createApi } from '@reduxjs/toolkit/query/react';

const axiosBaseQuery =
	({ baseUrl } = { baseUrl: '' }) =>
	async ({ url, method, data, params, headers }) => {
		try {
			const result = await axios({ url: baseUrl + url, method, data, params, headers, })
			return { data: result.data }
    	} catch (axiosError) {
      		let err = axiosError
     		return {
        		error: {
					status: err.response?.status,
					data: err.response?.data || err.message,
        		},
      		}
    	}
	}


export const equipmentsApi = createApi({
	reducerPath: 'equipmentsApi',
	baseQuery: axiosBaseQuery({
		baseUrl: 'https://equipment-site-backend.onrender.com/api',
	}),
	tagTypes: ['Equipments'],
	endpoints: (builder) => ({
		getEquipments: builder.query({
			query: () => ({ url: '/equipments' }),
			providesTags: ['Equipments'],
		}),
		getEquipmentById: builder.query({
			query: (id) => {
				return {
					url: `/equipments/${id}`,
				}
			},
			providesTags: ['Equipments'],
		}),
		addEquipment: builder.mutation({
			query: (data) => ({
				url: `/equipments`,
				method: 'POST',
				data,
			}),
			invalidatesTags: ['Equipments'],
		}),
		deleteEquipment: builder.mutation({
			query: (id) => {
				return {
					url: `/equipments/${id}`,
					method: 'DELETE'
				}
			},
			invalidatesTags: ['Equipments'],
		}),
		updateEquipmentById: builder.mutation({
			query: (id, data) => {
				return {
					url: `/equipments/${id}`,
					method: 'PUT',
					data,
				}
			},
			invalidatesTags: ['Equipments'],
		}),
		// fetchCurrentUser: builder.mutation({
		// 	query: () => ({
		// 		url: '/users/current',
		// 		method: 'GET'
		// 	}),
		// 	invalidatesTags: ['Contacts'],
		// }),
	}),
})

export const {
	useGetEquipmentsQuery,
	useGetEquipmentByIdQuery,
	useAddEquipmentMutation,
	useDeleteEquipmentMutation,
	useUpdateEquipmentByIdMutation,
} = equipmentsApi;