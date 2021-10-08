import removeQuotes from './removeQuotes';

describe('The removeQuotes function', () => {
	it('should return a rounded value from a decimal', () => {
		const quotesRemoved = removeQuotes('blah');
		expect(quotesRemoved).toEqual('blah');
	});

	it('should return a rounded value to 2 decimal points', () => {
		const quotesNotRemoved = removeQuotes('blah');
		expect(quotesNotRemoved).toEqual('blah');
	});
});
