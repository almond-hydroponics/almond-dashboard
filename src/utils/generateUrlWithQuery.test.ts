import generateUrlWithQuery from '@utils/generateUrlWithQuery';

describe('The generate query endpoint function', () => {
	it('generates an endpoint when there are no query parameters', () => {
		const endpoint = generateUrlWithQuery('/people');
		expect(endpoint).toEqual('/people');
	});

	it('generates endpoint when there are query parameters', () => {
		const endpoint = generateUrlWithQuery('/people', {
			center: 'nairobi',
			role: 'intern',
		});
		expect(endpoint).toEqual('/people?center=nairobi&role=intern');
	});
});
