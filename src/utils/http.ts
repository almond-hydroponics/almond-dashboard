// third-party libraries
import { displayInternalServerErrorMessage } from '@modules/internalServerError';
import CacheHandler from '@utils/CacheHandler';
import axios, { AxiosError, AxiosResponse } from 'axios';
// helpers
import authService from '@utils/auth';
import store from '../store';

const token = authService.getToken();

// create axios instance
const http = axios.create({
	// baseURL: authService.isAuthenticated
	//   ? process.env.ALMOND_API
	//   : process.env.ALMOND_AUTH_API,
	baseURL: process.env.ALMOND_API,
	headers: {
		Authorization: `Bearer ${token}`,
	},
	// withCredentials: true,
});

http.interceptors.request.use((config) => {
	if (token && authService.isExpired()) {
		return authService.redirectUser();
	}
	return config;
});

http.interceptors.response.use(
	(response: AxiosResponse<any>): AxiosResponse<any> => {
		const { method, url } = response.config;
		const endpoint: string = CacheHandler.extractUrlEndpoint(url ?? '');

		if (method !== 'get' && endpoint) {
			const requestTimestamp = new Date().getTime();
			CacheHandler.cacheInvalidationRegister[endpoint] = requestTimestamp;

			if (endpoint === '/dashboard') {
				CacheHandler.cacheInvalidationRegister['/dashboard'] =
					requestTimestamp;
			}
		}

		return response;
	},
	(error: AxiosError<any>) => {
		if (
			error.response?.status === 500 &&
			error.response?.data?.message.includes('token')
		) {
			authService.redirectUser();
		} else if (error.response?.status === 500) {
			store.dispatch(displayInternalServerErrorMessage(true));
		}

		return Promise.reject(error);
	},
);

export default http;
