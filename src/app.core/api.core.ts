import { Api, ApiEndpoint, ApiEndpoints, ApiMethods } from 'core'
import { useEffect, useState } from 'react'

export function createApi(baseUrl: string, endpoints: Array<ApiEndpoint>): Api {

	const endpointsMap: ApiEndpoints = {} as const

	endpoints.forEach((endpoint) => {
		endpointsMap[endpoint.name] = endpoint
	})


	return {
		baseUrl: baseUrl,
		endpoints: endpointsMap,
	}
}

export function createEndpoint(name: string, url: string, methods: Array<ApiMethods>): ApiEndpoint {
	return {
		name: name,
		url: url,
		methods: methods
	}
}

const api = createApi('quban.tech', [
	createEndpoint('users', '/users', ['GET', 'PUT']),
	createEndpoint('profile', '/profiles', ['GET', 'PUT']),
])


export type QueryParams = Array<{ name: string, query: string }>


export function useResource<DataModel, CreateDto>(endpoint: ApiEndpoint) {

	const [error, setError] = useState(null)

	const [isFetching, setFetching] = useState<boolean>(false)

	const [data, setData] = useState<Array<DataModel> | null>(null)


	function doFetchingOperation(operation: () => any) {
		setFetching(true)
		const result = operation()
		setFetching(false)
		return result
	}

	function resetError() {
		setError(null)
	}

	function getSingleEntity() {
		return {} as DataModel
	}

	function getResource(options?: {
		id?: number,
		pagination?: {
			pages: number,
			items?: number
		}
	}) {
		return doFetchingOperation(() => {
			return {} as Array<DataModel>
		})
	}

	function createResource(data: CreateDto){

		doFetchingOperation(() => {

			return
		})
		return actions
	}

	function updateResource(data: DataModel, options?: {
		id?: number
	}){

		doFetchingOperation(() => {

			return
		})
		return actions
	}

	function deleteResource(options?: {
		id?: number
	}){

		doFetchingOperation(() => {

			return
		})
		return actions
	}


	const actions = {
		get: getResource,
		create: createResource,
		update: updateResource,
		delete: deleteResource,
	}


	useEffect(() => {
		const data = getResource()
		setData(data)
	}, [])


	return {
		data: data,
		state: {
			isFetching: isFetching,
			error: error,
		},
		do: actions,
	}

}




const resource = useResource<{
	firstname: string,
	lastname: string,
}, {
	firstname: string,
}>(api.endpoints.profile)


const user = resource.do
	.delete({
		id: 12
	})
	.create({
		firstname: 'Kek'
	})
	.get({
		id: 142,
		pagination: {
			pages: 10,
			items: 12,
		}
	})
