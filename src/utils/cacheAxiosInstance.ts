// helpers
import CacheHandler from '@utils/CacheHandler';
import { AxiosInstance } from 'axios';

/**
 * Wraps an axios instance and caches it's get requests
 *
 * @param {Object} axiosInstance
 * @param {number} defaultTtl default time to live for caches
 * @param {CacheHandler} cacheManager a class that exposes utilities for managing cache invalidation
 *
 * @returns {Object}
 */
const cacheAxiosInstance = (
	axiosInstance: AxiosInstance,
	defaultTtl: number,
	cacheManager = CacheHandler,
): any => {
	const cacheMap = new Map();

	return new Proxy(axiosInstance, {
		get(httpObject, method, receiver) {
			const originalMethod = httpObject[method];

			if (method === 'get') {
				return (path: string, { cache = false, ttl = defaultTtl } = {}) => {
					const currentTime = () => new Date().getTime();
					const endpoint = cacheManager.extractUrlEndpoint(path);
					const lastUpdateTimestamp =
						cacheManager.cacheInvalidationRegister[endpoint] || 0;

					if (
						cache &&
						cacheMap.has(path) &&
						currentTime() - cacheMap.get(path).savedAt < ttl &&
						cacheMap.get(path).savedAt >= lastUpdateTimestamp
					) {
						return cacheMap.get(path).cachedPromise;
					}

					const response = originalMethod(path);

					cacheMap.set(path, {
						cachedPromise: response,
						savedAt: currentTime(),
					});

					return response;
				};
			}

			return Reflect.get(httpObject, method, receiver);
		},
	});
};

export default cacheAxiosInstance;
