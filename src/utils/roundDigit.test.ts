import roundDigit from './roundDigit';

describe('The roundDigit function', () => {
	it('should return a rounded value from a decimal', () => {
		const roundedDigit = roundDigit(3.146739234, 0);
		expect(roundedDigit).toEqual(3);
	});

	it('should return a rounded value to 2 decimal points', () => {
		const roundedDigit = roundDigit(3.146739234, 2);
		expect(roundedDigit).toEqual(3.15);
	});
});
