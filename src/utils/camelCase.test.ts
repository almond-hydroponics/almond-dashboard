import camelCase from './camelCase';

describe('The camelCase helper function', () => {
	it('should covert a string to camel case', () => {
		expect(camelCase('Almond is cool')).toEqual('almondIsCool');
		expect(camelCase('Almond Is cool')).toEqual('almondIsCool');
		expect(camelCase('almond is Cool')).toEqual('almondIsCool');
	});
});
