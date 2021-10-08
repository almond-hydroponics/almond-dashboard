import CacheHandler from './index';

describe('CacheHandler class', () => {
	describe('The extractUrlEndpoint function', () => {
		it('should return the endpoint without query parameters', () => {
			const address = '/users?limit=10';

			expect(
				CacheHandler.extractUrlEndpoint(address, 'https://baseapi.url'),
			).toBe('/users');
		});

		it('should return the home route when the url passed is the base url', () => {
			const address = 'https://baseapi.url';

			expect(
				CacheHandler.extractUrlEndpoint(address, 'https://baseapi.url'),
			).toBe('/');
		});

		it('should remove trailing forward slashes', () => {
			const address = '/users/';

			expect(CacheHandler.extractUrlEndpoint(address)).toBe('/users');
		});

		it("should add a leading forward slash to urls that don't have", () => {
			const address = 'users';

			expect(CacheHandler.extractUrlEndpoint(address)).toBe('/users');
		});

		it('should return null if the url supplied is invalid', () => {
			const address = '//';

			expect(CacheHandler.extractUrlEndpoint(address)).toBe('');
		});
	});
});
