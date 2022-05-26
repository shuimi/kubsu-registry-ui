import { useEffect, useState } from 'react'
import axios, { AxiosInstance } from 'axios'

export const $api = axios.create()

export type Pagination<Data> = {
	count: number,
	rows: Array<Data>
}

export type PaginationOptions = {
	items: number,
	page: number,
}

export function useResource<DataModel, CreateDto>(
	endpoint: string,
	api: AxiosInstance,
	options?: {
		pagination?: PaginationOptions,
		searchQuery?: string
	}
) {
	const [items, setItems] = useState(options?.pagination?.items || 10)
	const [page, setPage] = useState(options?.pagination?.page || 0)
	const [searchQuery, setSearchQuery] = useState(options?.pagination?.page || '')

	const [error, setError] = useState(null)
	const [isFetching, setFetching] = useState<boolean>(false)
	const [data, setData] = useState<Pagination<DataModel> | null>(null)

	function doFetchingOperation(operation: () => any) {
		setFetching(true)
		const result = operation()
		setFetching(false)
		return result
	}

	function resetError() {
		setError(null)
	}

	function getResource() {
		return doFetchingOperation(() => {

			let endpointWithQuery = `${endpoint}?`

			if (items){
				endpointWithQuery = endpointWithQuery + `items=${items}&`
			}
			if (page){
				endpointWithQuery = endpointWithQuery + `page=${page}&`
			}
			if (searchQuery){
				endpointWithQuery = endpointWithQuery + `query=${searchQuery}`
			}

			api.get<Pagination<DataModel>>(endpointWithQuery)
				.then((response) => {
					resetError()
					setData(response.data)
				})
				.catch((error) => {
					setError(error)
				})
			return data
		})
	}

	function updateResourceState(){
		const data = getResource()
		setData(data)
	}

	function createResource(data: CreateDto){
		doFetchingOperation(() => {
			api.post<Array<DataModel>>(`${endpoint}`, data)
				.then((response) => {
					resetError()
				})
				.catch((error) => {
					setError(error)
				})
			return data
		})
		updateResourceState()
		return actions
	}

	const actions = {
		create: createResource,
	}


	useEffect(() => {
		updateResourceState()
	}, [])

	useEffect(() => {
		updateResourceState()
	}, [items, page, searchQuery])

	const log = () => {
		console.log(`endpoint: ${endpoint} -- data: `, data)
	}


	const totalPages = ~~((data?.count || 0) / items) + 1

	return {
		data: data,
		state: {
			isFetching: isFetching,
			error: error,
			pagination: {
				items,
				setItems,
				page,
				setPage,
				totalPages
			},
			search: {
				searchQuery,
				setSearchQuery
			}
		},
		do: actions,
		log: log,
	}

}