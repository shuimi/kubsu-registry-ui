declare module 'core' {

	export type ApiMethods = 'GET' | 'PUT' | 'UPDATE' | 'DELETE'

	export type ApiEndpoints = Record<string, ApiEndpoint>

	export type Api = {
		baseUrl: string,
		endpoints: ApiEndpoints,
	}

	export type ApiEndpoint = {
		url: string,
		methods: Array<ApiMethods>,
		name: string,
	}

	export declare function createApi(baseUrl: string, endpoints: Array<ApiEndpoint>): Api
}