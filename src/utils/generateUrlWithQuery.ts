import { QueryParams } from '../types/shared.interfaces';

/**
 * This helper function generates a url with query parameters
 * @param {string} url
 * @param {object} queryParams
 * @returns {string}
 */

const generateUrlWithQuery = (
	url: string,
	queryParams: QueryParams = {},
): string => {
	if (!queryParams) return url;
	const queryKeys = Object.keys(queryParams);
	let endpoint = `${url}?`;

	if (queryKeys.length > 0) {
		queryKeys.forEach((key) => {
			if (queryParams[key]) {
				endpoint = `${endpoint}${key}=${queryParams[key]}&`;
			}
		});
	}

	return endpoint.substr(0, endpoint.length - 1);
};

export default generateUrlWithQuery;
